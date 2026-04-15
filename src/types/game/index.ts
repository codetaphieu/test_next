import { UUID } from "crypto";

type CardType =
    "Structure"
    | "Villager"
    | "Resource"
    | "Idea"
    | "Food"
    | "Mob"
    | "Location"
    | "Fish"
    | "Rumor"
    | "Equipment"
    | "Spirit and Curse";

export interface CardDef {
    id: string;
    name: string;
    type: CardType;

    // quantity?: number; 
    sellValue?: number;
    stats?: {
        description?: string; // Mô tả ngắn gọn về chỉ số này
        // Chiến đấu
        healthPoint?: number;
        attackPoint?: number;
        defensePoint?: number;
        attackSpeed?: number;
        attackChance?: number;
        attackType?: "melee" | "ranged" | "magic";

        // Sinh tồn & Tiêu thụ
        foodCost?: number;   // Dành cho Villager
        foodValue?: number;  // Dành cho Food, Fish

        // Công việc & Thời gian
        workSpeed?: number;   // Dành cho Structure
        exploreTime?: number; // Dành cho Location
        craftTime?: number;   // Dành cho Idea
        targetRecipeId?: string; // Dành cho Idea link với Recipe

        // Độ bền, độ phá & Sức chứa
        durability?: number;  // Dành cho Equipment, Structure
        damage?: number;      // Dành cho Equipment, Structure
        capacity?: number;    // Dành cho Structure (Kho bãi)

        // Đặc biệt
        isRaw?: boolean;      // Dành cho Food
        exploreCount?: number;// Số lần còn lại của Location
        spawnRate?: number;   // Tỷ lệ xuất hiện của Location
        
    }

}


interface CardInstance {
    instanceId: UUID;
    defId: string;

    position: { x: number, y: number };
    // zIndex?: number; // thẻ nào nằm trên

    attachedToId?: string;   // ID của thẻ nằm dưới thẻ này
    childCardId?: string;    // ID của thẻ đang đè lên thẻ này (tạo thành một stack)

    progress?: number;       // Giá trị từ 0 đến 100
    timerStartTime?: number; // Timestamp khi bắt đầu một hành động (nấu ăn, rèn...)

    // durability?: number;     // Cho các công cụ như Rìu, Cuốc
    // isFrozen?: boolean;      // Ví dụ: thẻ bị khóa trong mùa đông
}

export interface Recipe {
    id: string;
    inputs: string[];
    output: string[];
    duration: number;
    deletedId: string[];
}

interface CardStack {
    stackId: string;
    stacks: CardInstance[];
    // rootCardId?: string;

    activeRecipe?: string;
    progress?: number;
    // lastTick: number;
}

interface GameState {
    cards: Record<string, CardInstance>;  // instanceId → CardInstance
    stacks: Record<string, CardStack>;     // stackId → CardStack
    moon: number;                          // vòng hiện tại
    moonTimeLeft: number;                  // millisecond còn lại
    coins: number;
    cardLimit: number;                     // số thẻ tối đa trên bàn
    phase: "playing" | "gameover" | "gamewin"
}

interface PackItem {
    defId: string;
    chance: number;// 0-1, xác suất xuất hiện
}

interface Pack {
    id: string;
    name: string;
    cost: number;
    numOfItems: number; // số lượng item trong pack
    items: PackItem[];
}

type GameEventType = "enemy_attack" | "natural_disaster" | "peaceful"

interface GameEvent {
    type: GameEventType;
    description: string;
    payload?: {
        mobDefIds?: string[];  // giặc xuất hiện
        destroyCount?: number;  // số ruộng bị phá
    }
}