'use client'
import { CardStack } from "@/types/game/index"
import { CARDS } from "@/lib/game/data/cards"
import { gameStore } from "@/hooks/game/gameStore"
import { getIcon } from "./Card"


interface StackProps {
  stack: CardStack
}

export default function Stack({ stack }: StackProps) {
  const startDrag = gameStore(s => s.startDrag)

  return (
    <div
      className="absolute"
      style={{ left: stack.position.x, top: stack.position.y }}
    >
      {/* Progress bar recipe */}
      {stack.crafting && (
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
            draggable
            onDragStart={() => startDrag(card.instanceId)}
            className="absolute w-24 h-32 rounded-lg border-2 shadow-md
              cursor-grab active:cursor-grabbing flex flex-col
              items-center justify-center p-2 select-none
              bg-white border-gray-400 hover:scale-105 transition-transform"
            style={{
              top:  index * 20,   // lệch xuống 20px mỗi card
              left: index * 4,    // lệch phải 4px mỗi card
              zIndex: index,
            }}
          >
            <div className="text-2xl mb-1">{getIcon(def.name)  ?? '🃏'}</div>
            <h3 className="font-bold text-xs text-center text-gray-800">
              {def.name}
            </h3>
          </div>
        )
      })}
    </div>
  )
}