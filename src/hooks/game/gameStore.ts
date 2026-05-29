import { create } from "zustand";
import {
  CARD_HEIGHT,
  CARD_WIDTH,
  STACK_CARD_OFFSET_X,
  STACK_CARD_OFFSET_Y,
  type CardInstance,
  type CardStack,
  type GameState,
  type Position,
} from "@/types/game";
import {
  emitDropCardOnCard,
  emitDropCardOnEmpty,
  emitDropCardOnStack,
  emitDropStackOnCard,
  emitDropStackOnEmpty,
  emitDropStackOnStack,
} from "@/services/gameEmitters";

const initialCards: Record<string, CardInstance> = {};

function normalizeStack(stack: CardStack): CardStack {
  return {
    ...stack,
    position: { ...stack.position },
    crafting: { ...stack.crafting },
    cards: stack.cards.map((card, index) => ({
      ...card,
      position: {
        x: stack.position.x,
        y: stack.position.y + index * STACK_CARD_OFFSET_Y,
      },
    })),
  };
}

function stackBounds(stack: CardStack) {
  return {
    x: stack.position.x,
    y: stack.position.y,
    width: CARD_WIDTH + Math.max(0, stack.cards.length - 1) * STACK_CARD_OFFSET_X,
    height: CARD_HEIGHT + Math.max(0, stack.cards.length - 1) * STACK_CARD_OFFSET_Y,
  };
}

function pointInRect(point: Position, rect: { x: number; y: number; width: number; height: number }) {
  return (
    point.x >= rect.x &&
    point.x <= rect.x + rect.width &&
    point.y >= rect.y &&
    point.y <= rect.y + rect.height
  );
}

function findCardAtPoint(
  point: Position,
  cards: Record<string, CardInstance>,
  excludeId?: string,
) {
  return Object.values(cards)
    .filter(card => card.instanceId !== excludeId)
    .find(card => pointInRect(point, {
      x: card.position.x,
      y: card.position.y,
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
    }));
}

function findStackAtPoint(
  point: Position,
  stacks: Record<string, CardStack>,
  excludeId?: string,
) {
  return Object.values(stacks)
    .filter(stack => stack.stackId !== excludeId)
    .find(stack => pointInRect(point, stackBounds(stack)));
}

export const gameStore = create<GameState>((set, get) => ({
  cards: initialCards,
  stacks: {},
  moon: 1,
  moonTimeLeft: 120000,
  coins: 10,
  cardLimit: 10,
  phase: "playing",
  connectionStatus: "idle",
  gameError: null,
  dragging: null,
  selectedCardId: null,
  selectedStackId: null,

  addCard: card =>
    set(state => ({
      cards: { ...state.cards, [card.instanceId]: card },
    })),

  hydrateGameState: state =>
    set({
      cards: state.cards,
      stacks: Object.fromEntries(
        Object.entries(state.stacks).map(([stackId, stack]) => [stackId, normalizeStack(stack)]),
      ),
      moon: state.moon,
      moonTimeLeft: state.moonTimeLeft,
      coins: state.coins,
      cardLimit: state.cardLimit,
      phase: state.phase,
      gameError: null,
      selectedCardId: null,
      selectedStackId: null,
    }),

  startCardDrag: (instanceId, offset) => {
    const card = get().cards[instanceId];
    if (!card) return;

    set({
      dragging: { type: "card", instanceId, offset },
      selectedCardId: instanceId,
      selectedStackId: null,
      gameError: null,
    });
  },

  startStackDrag: (stackId, offset) => {
    const stack = get().stacks[stackId];
    if (!stack || stack.crafting.active) return;

    set({
      dragging: { type: "stack", stackId, offset },
      selectedCardId: null,
      selectedStackId: stackId,
      gameError: null,
    });
  },

  moveDragging: (x, y) => {
    const { dragging, cards, stacks } = get();
    if (!dragging) return;

    if (dragging.type === "card") {
      const card = cards[dragging.instanceId];
      if (!card) return;

      set({
        cards: {
          ...cards,
          [dragging.instanceId]: {
            ...card,
            position: { x, y },
          },
        },
      });
      return;
    }

    const stack = stacks[dragging.stackId];
    if (!stack) return;

    set({
      stacks: {
        ...stacks,
        [dragging.stackId]: normalizeStack({
          ...stack,
          position: { x, y },
        }),
      },
    });
  },

  finishDragging: (x, y) => {
    const { dragging, cards, stacks } = get();
    if (!dragging) return;

    const hitPoint = { x: x + CARD_WIDTH / 2, y: y + CARD_HEIGHT / 2 };

    if (dragging.type === "card") {
      const targetStack = findStackAtPoint(hitPoint, stacks);
      if (targetStack) {
        emitDropCardOnStack(dragging.instanceId, targetStack.stackId, { x, y });
      } else {
        const targetCard = findCardAtPoint(hitPoint, cards, dragging.instanceId);
        if (targetCard) {
          emitDropCardOnCard(dragging.instanceId, targetCard.instanceId, { x, y });
        } else {
          emitDropCardOnEmpty(dragging.instanceId, { x, y });
        }
      }
    } else {
      const targetStack = findStackAtPoint(hitPoint, stacks, dragging.stackId);
      if (targetStack) {
        emitDropStackOnStack(dragging.stackId, targetStack.stackId, { x, y });
      } else {
        const targetCard = findCardAtPoint(hitPoint, cards);
        if (targetCard) {
          emitDropStackOnCard(dragging.stackId, targetCard.instanceId, { x, y });
        } else {
          emitDropStackOnEmpty(dragging.stackId, { x, y });
        }
      }
    }

    set({ dragging: null });
  },

  clearDragging: () => set({ dragging: null }),

  selectCard: instanceId => set({
    selectedCardId: instanceId,
    selectedStackId: null,
  }),

  selectStack: stackId => set({
    selectedCardId: null,
    selectedStackId: stackId,
  }),

  clearSelection: () => set({
    selectedCardId: null,
    selectedStackId: null,
  }),

  applyCardPositionUpdated: ({ instanceId, x, y }) =>
    set(state => {
      const card = state.cards[instanceId];
      if (!card) return state;

      return {
        cards: {
          ...state.cards,
          [instanceId]: {
            ...card,
            position: { x, y },
          },
        },
      };
    }),

  applyCardRemoved: instanceId =>
    set(state => {
      const nextCards = { ...state.cards };
      delete nextCards[instanceId];

      return {
        cards: nextCards,
        selectedCardId: state.selectedCardId === instanceId ? null : state.selectedCardId,
      };
    }),

  applyCardsSpawned: cards =>
    set(state => ({
      cards: {
        ...state.cards,
        ...Object.fromEntries(cards.map(card => [card.instanceId, card])),
      },
    })),

  applyEconomyUpdated: ({ coins }) => set({ coins }),

  applyStackUpdated: stack =>
    set(state => {
      const nextCards = { ...state.cards };
      for (const card of stack.cards) {
        delete nextCards[card.instanceId];
      }

      return {
        cards: nextCards,
        stacks: {
          ...state.stacks,
          [stack.stackId]: normalizeStack(stack),
        },
        selectedCardId: stack.cards.some(card => card.instanceId === state.selectedCardId)
          ? null
          : state.selectedCardId,
      };
    }),

  applyStackRemoved: stackId =>
    set(state => {
      const nextStacks = { ...state.stacks };
      delete nextStacks[stackId];
      return {
        stacks: nextStacks,
        selectedStackId: state.selectedStackId === stackId ? null : state.selectedStackId,
      };
    }),

  applyRecipeCompleted: payload =>
    set(state => {
      const nextCards = { ...state.cards };
      const nextStacks = { ...state.stacks };

      for (const cardId of payload.deletedCardIds) {
        delete nextCards[cardId];
      }
      for (const stackId of payload.removedStackIds) {
        delete nextStacks[stackId];
      }
      for (const stack of payload.updatedStacks) {
        nextStacks[stack.stackId] = normalizeStack(stack);
      }
      for (const card of payload.spawnedCards) {
        nextCards[card.instanceId] = card;
      }

      return {
        cards: nextCards,
        stacks: nextStacks,
        selectedCardId: payload.deletedCardIds.includes(state.selectedCardId ?? "")
          ? null
          : state.selectedCardId,
        selectedStackId: payload.removedStackIds.includes(state.selectedStackId ?? "")
          ? null
          : state.selectedStackId,
      };
    }),

  applyStackSplit: payload =>
    set(state => {
      const nextCards = { ...state.cards };
      const nextStacks = { ...state.stacks };

      for (const stackId of payload.removedStackIds) {
        delete nextStacks[stackId];
      }
      for (const stack of payload.updatedStacks) {
        nextStacks[stack.stackId] = normalizeStack(stack);
      }
      for (const stack of payload.createdStacks) {
        nextStacks[stack.stackId] = normalizeStack(stack);
      }
      for (const card of payload.spawnedCards) {
        nextCards[card.instanceId] = card;
      }

      return {
        cards: nextCards,
        stacks: nextStacks,
        selectedStackId: payload.removedStackIds.includes(state.selectedStackId ?? "")
          ? null
          : state.selectedStackId,
      };
    }),

  tickCraftingProgress: (now = Date.now()) =>
    set(state => ({
      stacks: Object.fromEntries(
        Object.entries(state.stacks).map(([stackId, stack]) => {
          if (!stack.crafting.active || !stack.crafting.startAt || !stack.crafting.duration) {
            return [stackId, stack];
          }

          return [
            stackId,
            {
              ...stack,
              progress: Math.min((now - stack.crafting.startAt) / stack.crafting.duration, 1),
            },
          ];
        }),
      ),
    })),

  setConnectionStatus: connectionStatus => set({ connectionStatus }),
  setGameError: gameError => set({ gameError }),
  setPhase: phase => set({ phase }),
}));
