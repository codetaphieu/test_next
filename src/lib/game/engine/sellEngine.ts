import { gameState } from "@/src/hooks/game/gameState";
import { CardInstance } from "@/src/types/game";
import { CARDS } from "../data/cards";

export function sell(card: CardInstance) {
    const cardDef = CARDS[card.defId];
    if (!cardDef) {
        throw new Error('Card definition not found'); 
    } else if (!cardDef.sellValue) {
        throw new Error('This card cannot be sold');
    }
    gameState.coins += cardDef.sellValue;
    gameState.cards = gameState.cards.filter(c => c.instanceId !== card.instanceId);
}

// function capitalize(str: string) {
//     return str
//         .split("_")
//         .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//         .join("_")
// }