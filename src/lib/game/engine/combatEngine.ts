import { CombatSession, CardStack, CardInstance } from "@/types/game/index";
import { getSideDef } from "./utils";
import { CARDS } from "../data/cards";

export function startCombat(movingSide: CardInstance[], targetSide: CardInstance[]) {
    // Nếu 1 phe là Dân, 1 phe là Mob -> Tạo Combat Session
    if (isHostile(movingSide, targetSide)) {
        return {
            id: `combat_${Date.now()}`,
            attackers: movingSide,
            defenders: targetSide,
            attackerTurn: true // Thằng di chuyển được đánh trước
        };
    }
    return null;
}

export function isHostile(cardsA: CardInstance[], cardsB: CardInstance[]) { //kiểm tra có phải villager và mob thì cho đánh nahu
    if (cardsA.length === 0 || cardsB.length === 0) return false;

    const typeStackA = getSideDef(cardsA);
    const typeStackB = getSideDef(cardsB);

    if (!typeStackA || !typeStackB) return false;

    const isVillagerVsMob = (typeStackA === "Villager" && typeStackB === "Mob");
    const isMobVsVillager = (typeStackA === "Mob" && typeStackB === "Villager");

    return isVillagerVsMob || isMobVsVillager;
}

export function calculateCombatStats(cards: CardInstance[]) {
    let hp = 0;
    let atk = 0;
    let defense = 0;

    cards.forEach(card => {
        const stats = CARDS[card.defId].stats;
        if (stats) {
            hp += stats.healthPoint ?? 0;
            atk += stats.attackPoint ?? 0;
            // Trang bị có thể cộng máu (áo giáp) hoặc công (kiếm)
            // atk += stats.equip?.weapon ? CARDS[stats.equip.weapon].stats.attackPoint ?? 0 : 0;
            // defense += stats.equip?.body ? CARDS[stats.equip.body].stats.defensePoint ?? 0 : 0;
        }
    });

    return { hp, atk, defense };
}



export function processCombatTick(session: CombatSession) {
    // 1. Áp dụng giới hạn Hội đồng (Ví dụ: Max 2 dân đánh 1 quái)
    const MAX_FIGHTERS = 2;
    const activeAttackers = session.attackers.slice(0, MAX_FIGHTERS);
    const activeDefenders = session.defenders.slice(0, MAX_FIGHTERS); // Mob thường đi lẻ nhưng cứ setup vậy cho chắc

    // Lấy đại diện 1 người đánh và 1 người bị đánh trong lượt này
    const currentAttacker = session.attackerTurn ? activeAttackers[0] : activeDefenders[0];
    const currentTarget = session.attackerTurn ? activeDefenders[0] : activeAttackers[0];

    // Lấy chỉ số tổng (đã cộng trang bị)
    const attackerStats = calculateCombatStats([currentAttacker]);
    const targetStats = calculateCombatStats([currentTarget]);

    const missChance = 0.20; 
    const isMiss = Math.random() < missChance;

    if (isMiss) {
        console.log( "đánh TRƯỢT!");
    } else {
        const actualDamage = Math.max(1, attackerStats.atk - targetStats.defense);
        
        targetStats.hp -= actualDamage;
        console.log(`${currentAttacker.defId} gây ${actualDamage} sát thương lên ${currentTarget.defId}`);

    }

    if (targetStats.hp <= 0) {
        console.log(`${currentTarget.defId} đã CHẾT!`);
        // Logic xóa thẻ đã chết khỏi mảng, rớt loot đồ...
    }

    // Đảo lượt đánh cho Tick tiếp theo
    session.attackerTurn = !session.attackerTurn;
}