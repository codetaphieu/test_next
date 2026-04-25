import { CardInstance, CardStack } from "@/types/game/index"
import { activeRecipe } from "./recipeEngine"

export function createStack(
  cardA: CardInstance,
  cardB: CardInstance
): CardStack {
  return {
    stackId: crypto.randomUUID(),
    cards: [cardA, cardB],
    position: { x: cardB.position.x, y: cardB.position.y },
    crafting: false,
    progress: 0,
  }
}

export function addCardToStack(
  stack: CardStack,
  card: CardInstance
): CardStack {
  return {
    ...stack,
    cards: [...stack.cards, card],
  }
}

export function checkAndStartRecipe(stack: CardStack): {
  stack: CardStack
  recipeFound: boolean
  duration: number
} {
  const result = activeRecipe(stack)

  if (!result) return { stack, recipeFound: false, duration: 0 }

  return {
    stack: { ...stack, crafting: true, progress: 0 },
    recipeFound: true,
    duration: result.duration,
  }
}