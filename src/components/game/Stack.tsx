'use client'
import type { PointerEvent } from "react"
import { CardStack, STACK_CARD_OFFSET_Y } from "@/types/game/index"
import { CARDS } from "@/lib/game/data/cards"
import { gameStore } from "@/hooks/game/gameStore"
import { getCardColor, getIcon } from "./Card"


interface StackProps {
  stack: CardStack
}

export default function Stack({ stack }: StackProps) {
  const startStackDrag = gameStore(s => s.startStackDrag)
  const dragging = gameStore(s => s.dragging)
  const selectedStackId = gameStore(s => s.selectedStackId)

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || stack.crafting.active) return

    const board = e.currentTarget.closest("[data-game-board]")
    if (!board) return

    const rect = board.getBoundingClientRect()
    const offsetX = e.clientX - rect.left - stack.position.x
    const offsetY = e.clientY - rect.top - stack.position.y

    e.currentTarget.setPointerCapture(e.pointerId)
    startStackDrag(stack.stackId, { x: offsetX, y: offsetY })
  }

  const isDragging = dragging?.type === "stack" && dragging.stackId === stack.stackId
  const isSelected = selectedStackId === stack.stackId

  return (
    <div
      className="absolute touch-none"
      style={{
        left: stack.position.x,
        top: stack.position.y,
        zIndex: isDragging ? 800 : 20,
        outline: isSelected ? '4px dashed rgba(255,255,255,0.85)' : undefined,
        outlineOffset: isSelected ? '4px' : undefined,
      }}
      onPointerDown={handlePointerDown}
    >
      {/* Progress bar recipe */}
      {stack.crafting.active && (
        <div className="absolute -top-5 left-0 w-24 h-2 bg-gray-300 rounded-full overflow-hidden z-50">
          <div
            className="h-full bg-green-500 transition-all duration-100"
            style={{ width: `${(stack.progress ?? 0) * 100}%` }}
          />
        </div>
      )}

      {/* Cards xếp chồng lệch nhau */}
      {stack.cards.map((card, index) => {
        const def = CARDS[card.defId]
        if (!def) return null

        return (
          <div
            key={card.instanceId}
            className={`absolute w-24 h-32 rounded-[5px] border-[3px] border-black shadow-[5px_5px_0_rgba(0,0,0,0.25)]
              cursor-grab active:cursor-grabbing flex flex-col touch-none
              select-none overflow-hidden hover:scale-105 transition-transform
              ${getCardColor(def.type)}`}
            style={{
              top: index * STACK_CARD_OFFSET_Y,
              left: 0,
              zIndex: index,
            }}
          >
            <div className="flex h-6 w-full items-center border-b-[3px] border-black bg-[#fffbea] px-1.5 text-black">
              <h3 className="truncate text-left text-[11px] font-black leading-none">
                {def.name}
              </h3>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center px-2">
              <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-current bg-white/25 text-3xl">
                {getIcon(def.name) ?? '🃏'}
              </div>
              <p className="text-center text-[10px] font-black leading-tight opacity-80">
                {def.type}
              </p>
            </div>

            {(def.sellValue || card.defId === 'coin') && (
              <div className="absolute bottom-1 left-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1 text-[12px] font-black text-black">
                {card.defId === 'coin' ? 1 : def.sellValue}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
