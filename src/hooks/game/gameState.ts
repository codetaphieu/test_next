import { CardInstance } from "@/src/types/game"
type GameState = {
    coins: number,
    cards: CardInstance[],
    currentMoon: number,
}

export const gameState: GameState = {
    coins: 0,
    cards: [],
    currentMoon: 0,

}