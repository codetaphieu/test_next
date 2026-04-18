import { Pack } from "@/types/game/index";
import { gameState } from "@/hooks/game/gameState";
import { randomUUID } from "crypto";
export function buyPack(pack: Pack) {
    if (gameState.coins < pack.cost) {
        throw new Error('Not enough coins to buy this pack');
    }
    gameState.coins -= pack.cost;
    return {
        id: pack.id,
    };
}

export function openPack(pack: Pack) {
    for (let i = 0; i < pack.numberOfItems; i++) {
        const newCard = rollCard(pack);

        gameState.cards.push({
            instanceId: randomUUID(),
            defId: newCard,
            position: { x: 1000, y: 1000 },
        });
    }
}

function rollCard(pack: Pack): string {
    const rand = Math.random();
    let acc = 0;

    for (const item of pack.items) {
        acc += item.chance;
        if (rand <= acc) {
            return item.defId;
        }
    }

    return pack.items[0].defId; // fallback
}
