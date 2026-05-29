import type { Socket } from "socket.io-client";
import type {
  CardStack,
  GameErrorPayload,
  GameSnapshot,
  RecipeCompletedPayload,
  RecipeStartedPayload,
  StackSplitPayload,
} from "@/types/game";

type ListenerHandlers = {
  hydrateGameState: (state: GameSnapshot) => void;
  applyCardPositionUpdated: (payload: { instanceId: string; x: number; y: number }) => void;
  applyCardRemoved: (instanceId: string) => void;
  applyCardsSpawned: (cards: CardStack["cards"]) => void;
  applyEconomyUpdated: (payload: { coins: number }) => void;
  applyStackUpdated: (stack: CardStack) => void;
  applyStackRemoved: (stackId: string) => void;
  applyRecipeCompleted: (payload: RecipeCompletedPayload) => void;
  applyStackSplit: (payload: StackSplitPayload) => void;
  setConnectionStatus: (status: "idle" | "connecting" | "connected" | "disconnected" | "error") => void;
  setGameError: (error: GameErrorPayload | null) => void;
};

export function registerGameListeners(socket: Socket, handlers: ListenerHandlers) {
  const onConnect = () => handlers.setConnectionStatus("connected");
  const onDisconnect = () => handlers.setConnectionStatus("disconnected");
  const onConnectError = () => handlers.setConnectionStatus("error");
  const onInitState = (state: GameSnapshot) => handlers.hydrateGameState(state);
  const onCardPositionUpdated = (payload: { instanceId: string; x: number; y: number }) => {
    handlers.applyCardPositionUpdated(payload);
  };
  const onCardRemoved = (payload: { instanceId: string }) => handlers.applyCardRemoved(payload.instanceId);
  const onCardsSpawned = (payload: { cards: CardStack["cards"] }) => handlers.applyCardsSpawned(payload.cards);
  const onEconomyUpdated = (payload: { coins: number }) => handlers.applyEconomyUpdated(payload);
  const onStackUpdated = (payload: { stack: CardStack }) => handlers.applyStackUpdated(payload.stack);
  const onStackRemoved = (payload: { stackId: string }) => handlers.applyStackRemoved(payload.stackId);
  const onRecipeStarted = (payload: RecipeStartedPayload) => handlers.applyStackUpdated(payload.stack);
  const onRecipeCompleted = (payload: RecipeCompletedPayload) => handlers.applyRecipeCompleted(payload);
  const onStackSplit = (payload: StackSplitPayload) => handlers.applyStackSplit(payload);
  const onGameError = (payload: GameErrorPayload) => handlers.setGameError(payload);

  socket.on("connect", onConnect);
  socket.on("disconnect", onDisconnect);
  socket.on("connect_error", onConnectError);
  socket.on("init_state", onInitState);
  socket.on("card_position_updated", onCardPositionUpdated);
  socket.on("card_removed", onCardRemoved);
  socket.on("cards_spawned", onCardsSpawned);
  socket.on("economy_updated", onEconomyUpdated);
  socket.on("stack_updated", onStackUpdated);
  socket.on("stack_removed", onStackRemoved);
  socket.on("recipe_started", onRecipeStarted);
  socket.on("recipe_completed", onRecipeCompleted);
  socket.on("stack_split", onStackSplit);
  socket.on("game_error", onGameError);

  return () => {
    socket.off("connect", onConnect);
    socket.off("disconnect", onDisconnect);
    socket.off("connect_error", onConnectError);
    socket.off("init_state", onInitState);
    socket.off("card_position_updated", onCardPositionUpdated);
    socket.off("card_removed", onCardRemoved);
    socket.off("cards_spawned", onCardsSpawned);
    socket.off("economy_updated", onEconomyUpdated);
    socket.off("stack_updated", onStackUpdated);
    socket.off("stack_removed", onStackRemoved);
    socket.off("recipe_started", onRecipeStarted);
    socket.off("recipe_completed", onRecipeCompleted);
    socket.off("stack_split", onStackSplit);
    socket.off("game_error", onGameError);
  };
}
