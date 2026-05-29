import { getGameSocket } from "@/services/socket";
import type { Position } from "@/types/game";

export function emitInitState() {
  getGameSocket().emit("init_state");
}

export function emitBuyPack(packId: string, position: Position) {
  getGameSocket().emit("buy_pack", {
    packId,
    position,
  });
}

export function emitSellCard(instanceId: string) {
  getGameSocket().emit("sell_card", {
    instanceId,
  });
}

export function emitDropCardOnEmpty(instanceId: string, position: Position) {
  getGameSocket().emit("drop_card_on_empty", {
    instanceId,
    x: position.x,
    y: position.y,
  });
}

export function emitDropCardOnCard(draggingCardId: string, targetCardId: string, position: Position) {
  getGameSocket().emit("drop_card_on_card", {
    draggingCardId,
    targetCardId,
    position,
  });
}

export function emitDropCardOnStack(draggingCardId: string, targetStackId: string, position: Position) {
  getGameSocket().emit("drop_card_on_stack", {
    draggingCardId,
    targetStackId,
    position,
  });
}

export function emitDropStackOnEmpty(stackId: string, position: Position) {
  getGameSocket().emit("drop_stack_on_empty", {
    stackId,
    x: position.x,
    y: position.y,
  });
}

export function emitDropStackOnCard(draggingStackId: string, targetCardId: string, position: Position) {
  getGameSocket().emit("drop_stack_on_card", {
    draggingStackId,
    targetCardId,
    position,
  });
}

export function emitDropStackOnStack(draggingStackId: string, targetStackId: string, position: Position) {
  getGameSocket().emit("drop_stack_on_stack", {
    draggingStackId,
    targetStackId,
    position,
  });
}

export function emitSplitSubStackFromCard(stackId: string, cardId: string, position: Position) {
  getGameSocket().emit("split_sub_stack_from_card", {
    stackId,
    cardId,
    position,
  });
}
