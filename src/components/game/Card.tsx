'use client'
import React from 'react'
import { CardInstance } from '@/types/game/index'
import { CARDS } from '@/lib/game/data/cards'
import { gameStore } from '@/hooks/game/gameStore'

interface CardComponent {
  card: CardInstance
}

const getCardColor = (type: string) => {
  switch (type) {
    case 'Structure': return 'bg-orange-100 border-orange-800'
    case 'Villager': return 'bg-yellow-100 border-yellow-600'
    case 'Resource': return 'bg-green-100 border-green-700'
    case 'Idea': return 'bg-purple-100 border-purple-600'
    case 'Food': return 'bg-red-100 border-red-500'
    case 'Mob': return 'bg-rose-200 border-rose-700'
    case 'Location': return 'bg-teal-100 border-teal-600'
    case 'Fish': return 'bg-cyan-100 border-cyan-600'
    case 'Rumor': return 'bg-indigo-100 border-indigo-500'
    case 'Equipment': return 'bg-slate-200 border-slate-600'
    case 'Spirit and Curse': return 'bg-violet-200 border-violet-800'
    default: return 'bg-gray-100 border-gray-400'
  }
}

export const getIcon = (name: string) => {
  if (name.includes('Nông dân')) return '👨‍🌾'
  if (name.includes('Bụi chuối')) return '🌿'
  if (name.includes('Buồng chuối')) return '🍌'
  return '🃏'
}

export default function Card({ card }: CardComponent) {
  const startDrag = gameStore(s => s.startDrag)
  const def = CARDS[card.defId]

  const handleDragStart = (e: React.DragEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()

    // Khoảng cách từ góc trên trái card → vị trí chuột
    const offsetX = e.clientX - rect.left
    const offsetY = e.clientY - rect.top

    // Lưu vào dataTransfer để Board đọc được
    e.dataTransfer.setData('offsetX', offsetX.toString())
    e.dataTransfer.setData('offsetY', offsetY.toString())

    startDrag(card.instanceId)
  }

  if (!def) return null
  console.log(def.type)
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className={`
        absolute w-24 h-32 rounded-lg border-2 shadow-md
        cursor-grab active:cursor-grabbing flex flex-col
        items-center justify-center p-2 select-none
        transition-transform hover:scale-105
        ${getCardColor(def.type)}
      `}
      style={{
        left: `${card.position.x}px`,
        top: `${card.position.y}px`,
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

      <div className="text-2xl mb-1">{getIcon(def.name)}</div>
      <h3 className="font-bold text-sm text-center text-gray-800 leading-tight">
        {def.name}
      </h3>
    </div>
  )
}