import { gameStore } from "@/hooks/game/gameStore"
import Card from "@/components/game/Card"
import Stack from "@/components/game/Stack"
import { Children } from "react"
export default function Board() {
  const cards = gameStore(s => s.cards)
  const stacks = gameStore(s => s.stacks)
  const dropCard = gameStore(s => s.dropCard)

  const handleDrop = (e: React.DragEvent) => {
  e.preventDefault()

  const rect = e.currentTarget.getBoundingClientRect()

  const offsetX = parseFloat(e.dataTransfer.getData('offsetX'))
  const offsetY = parseFloat(e.dataTransfer.getData('offsetY'))

  const x = e.clientX - rect.left - offsetX
  const y = e.clientY - rect.top - offsetY

  dropCard(x, y)
}

  return (
    <div
      className="relative w-full h-screen"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {Object.values(cards).map(card => (
        <Card key={card.instanceId} card={card} />
      ))}
      {/* Stacks */}
      {Object.values(stacks).map(stack => (
        <Stack key={stack.stackId} stack={stack} />
      ))}
    </div>
  )
}