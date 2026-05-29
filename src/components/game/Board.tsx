"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import Card from "@/components/game/Card";
import Stack from "@/components/game/Stack";
import { gameStore } from "@/hooks/game/gameStore";
import { emitInitState } from "@/services/gameEmitters";
import { registerGameListeners } from "@/services/gameListeners";
import { getGameSocket } from "@/services/socket";

export default function Board() {
  const boardRef = useRef<HTMLDivElement>(null);
  const cards = gameStore(s => s.cards);
  const stacks = gameStore(s => s.stacks);
  const dragging = gameStore(s => s.dragging);
  const moveDragging = gameStore(s => s.moveDragging);
  const finishDragging = gameStore(s => s.finishDragging);
  const tickCraftingProgress = gameStore(s => s.tickCraftingProgress);
  const gameError = gameStore(s => s.gameError);

  useEffect(() => {
    const socket = getGameSocket();
    const state = gameStore.getState();
    const cleanup = registerGameListeners(socket, {
      hydrateGameState: state.hydrateGameState,
      applyCardPositionUpdated: state.applyCardPositionUpdated,
      applyCardRemoved: state.applyCardRemoved,
      applyCardsSpawned: state.applyCardsSpawned,
      applyEconomyUpdated: state.applyEconomyUpdated,
      applyStackUpdated: state.applyStackUpdated,
      applyStackRemoved: state.applyStackRemoved,
      applyRecipeCompleted: state.applyRecipeCompleted,
      applyStackSplit: state.applyStackSplit,
      setConnectionStatus: state.setConnectionStatus,
      setGameError: state.setGameError,
    });

    state.setConnectionStatus("connecting");
    socket.connect();
    emitInitState();

    return () => {
      cleanup();
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => tickCraftingProgress(), 100);
    return () => window.clearInterval(intervalId);
  }, [tickCraftingProgress]);

  const getBoardPosition = (e: PointerEvent<HTMLDivElement>) => {
    if (!boardRef.current || !dragging) return null;

    const rect = boardRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left - dragging.offset.x,
      y: e.clientY - rect.top - dragging.offset.y,
    };
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const position = getBoardPosition(e);
    if (!position) return;

    e.preventDefault();
    moveDragging(position.x, position.y);
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    const position = getBoardPosition(e);
    if (!position) return;

    e.preventDefault();
    finishDragging(position.x, position.y);
  };

  return (
    <div
      ref={boardRef}
      data-game-board
      className="stacklands-board relative h-full w-full overflow-hidden"
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="absolute right-4 bottom-4 z-[1000] flex gap-2 text-xs">
        {gameError?.message && (
          <span className="border-[3px] border-black bg-[#fffbea] px-3 py-2 text-base font-black text-black shadow-[4px_4px_0_rgba(0,0,0,0.2)]">
            {gameError.message}
          </span>
        )}
      </div>

      {Object.values(cards).map(card => (
        <Card key={card.instanceId} card={card} />
      ))}

      {Object.values(stacks).map(stack => (
        <Stack key={stack.stackId} stack={stack} />
      ))}
    </div>
  );
}
