'use client'
import type { PointerEvent } from 'react'
import { CardInstance } from '@/types/game/index'
import { CARDS } from '@/lib/game/data/cards'
import { gameStore } from '@/hooks/game/gameStore'

interface CardComponent {
  card: CardInstance
}

export const getCardColor = (type: string) => {
  switch (type) {
    case 'Structure': return 'bg-[#d4b293]'
    case 'Villager': return 'bg-[#fffbe8]'
    case 'Resource': return 'bg-[#72777b] text-white'
    case 'Idea': return 'bg-[#66708e] text-white'
    case 'Food': return 'bg-[#d4a98f]'
    case 'Mob': return 'bg-[#b9787b]'
    case 'Location': return 'bg-[#8fb5a8]'
    case 'Fish': return 'bg-[#93b9c8]'
    case 'Rumor': return 'bg-[#8582ac] text-white'
    case 'Equipment': return 'bg-[#9a9fa5] text-white'
    case 'Spirit and Curse': return 'bg-[#8b789e] text-white'
    default: return 'bg-[#eee6ce]'
  }
}

export const getIcon = (name: string) => {
  if (name.includes('Nông dân')) return '👨‍🌾'
  if (name.includes('Dân') || name.includes('Thợ')) return '♙'
  if (name.includes('Cây')) return '♧'
  if (name.includes('Bụi chuối')) return '🌿'
  if (name.includes('Buồng chuối')) return '🍌'
  if (name.includes('Tiền')) return '⊂'
  if (name.includes('Gỗ')) return '▧'
  if (name.includes('Đá')) return '◇'
  return '🃏'
}

export default function Card({ card }: CardComponent) {
  const startCardDrag = gameStore(s => s.startCardDrag)
  const dragging = gameStore(s => s.dragging)
  const selectedCardId = gameStore(s => s.selectedCardId)
  const def = CARDS[card.defId]

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return

    const rect = e.currentTarget.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top

    e.currentTarget.setPointerCapture(e.pointerId)
    startCardDrag(card.instanceId, { x: offsetX, y: offsetY })
  }

  if (!def) return null

  const isDragging = dragging?.type === 'card' && dragging.instanceId === card.instanceId
  const isSelected = selectedCardId === card.instanceId

  return (
    <div
      onPointerDown={handlePointerDown}
      className={`
        absolute w-24 h-32 rounded-[5px] border-[3px] border-black shadow-[5px_5px_0_rgba(0,0,0,0.25)]
        cursor-grab active:cursor-grabbing flex flex-col touch-none
        select-none overflow-hidden
        transition-transform hover:scale-105
        ${getCardColor(def.type)}
      `}
      style={{
        left: `${card.position.x}px`,
        top: `${card.position.y}px`,
        zIndex: isDragging ? 900 : 10,
        outline: isSelected ? '4px dashed rgba(255,255,255,0.85)' : undefined,
        outlineOffset: isSelected ? '4px' : undefined,
      }}
    >
      {/* Progress bar */}
      {card.progress !== undefined && card.progress > 0 && (
        <div className="absolute -top-4 left-0 w-full h-2 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
          <div
            className="h-full bg-green-500 transition-all duration-100"
            style={{ width: `${card.progress}%` }}
          />
        </div>
      )}

      <div className="flex h-6 w-full items-center border-b-[3px] border-black bg-[#fffbea] px-1.5 text-black">
        <h3 className="truncate text-left text-[11px] font-black leading-none">
          {def.name}
        </h3>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-2">
        <div className="mb-1 flex h-12 w-12 items-center justify-center rounded-full border-[3px] border-current bg-white/25 text-3xl">
          {getIcon(def.name)}
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
}
