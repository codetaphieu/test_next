import { CardInstance } from "@/types/game/index"
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