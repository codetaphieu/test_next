import { CardStack, CardType, CardInstance } from "@/types/game/index";
import { CARDS } from "@/lib/game/data/cards";
export function getSideDef(cards: CardInstance[]): CardType | null { //lấy type của stack dựa vào thẻ đầu tiên trong stack
    if (!cards || cards.length === 0) return null;

    const rootCard = CARDS[cards[0].defId].type;
    return rootCard ?? null;
}