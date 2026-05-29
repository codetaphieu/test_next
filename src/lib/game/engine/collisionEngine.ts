import { CARD_HEIGHT, CARD_WIDTH, CardInstance } from "@/types/game/index"
export function findCardAtPosition(
  x: number,
  y: number,
  cards: Record<string, CardInstance>,
  excludeId: string // bỏ qua card đang kéo
): CardInstance | null {
  return Object.values(cards).find(card => {
    if (card.instanceId === excludeId) return false

    const cx = card.position.x
    const cy = card.position.y

    return (
      x >= cx &&
      x <= cx + CARD_WIDTH &&
      y >= cy &&
      y <= cy + CARD_HEIGHT
    )
  }) ?? null
}
