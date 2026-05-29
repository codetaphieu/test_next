export const CARD_WIDTH = 96;
export const CARD_HEIGHT = 128;
export const CARD_TITLE_BAR_HEIGHT = 24;
export const STACK_CARD_OFFSET_X = 0;
export const STACK_CARD_OFFSET_Y = CARD_TITLE_BAR_HEIGHT;

export type CardType =
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
        equip?: EquipmentSlots;

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


export interface CardInstance {
    instanceId: string;
    defId: string;

    position: { x: number, y: number };
    // zIndex?: number; // thẻ nào nằm trên
    progress?: number;       // Giá trị từ 0 đến 100
    timerStartTime?: number;
    stats?: {
        equip?: EquipmentSlots;
    }
    // attachedToId?: string;   // ID của thẻ nằm dưới thẻ này
    // childCardId?: string;    // ID của thẻ đang đè lên thẻ này (tạo thành một stack)

    // durability?: number;     // Cho các công cụ như Rìu, Cuốc
    // isFrozen?: boolean;      // Ví dụ: thẻ bị khóa trong mùa đông
}

export interface Recipe {
    id: string;
    inputs: string[];
    outputs: string[];
    duration: number;
    deletedId: string[];
}

export interface CardStack {
    stackId: string;
    cards: CardInstance[];
    // rootCardId?: string;
    position: {x: number, y: number};
    crafting: {
        active: boolean;
        recipeId?: string;
        startAt?: number;
        duration?: number;
    };
    activeRecipe?: string;
    progress?: number;
    // lastTick: number;
}

export interface GameSnapshot {
    cards: Record<string, CardInstance>;  // instanceId → CardInstance
    stacks: Record<string, CardStack>;     // stackId → CardStack
    moon: number;                          // vòng hiện tại
    moonTimeLeft: number;                  // millisecond còn lại
    coins: number;
    cardLimit: number;                     // số thẻ tối đa trên bàn
    phase: "playing" | "gameover" | "gamewin"
}

export interface GameState extends GameSnapshot {
    connectionStatus: "idle" | "connecting" | "connected" | "disconnected" | "error";
    gameError?: { code?: string; message: string } | null;
    dragging: DragState | null;
    selectedCardId: string | null;
    selectedStackId: string | null;

    addCard: (card: CardInstance) => void;
    hydrateGameState: (state: GameSnapshot) => void;
    startCardDrag: (instanceId: string, offset: Position) => void;
    startStackDrag: (stackId: string, offset: Position) => void;
    moveDragging: (x: number, y: number) => void;
    finishDragging: (x: number, y: number) => void;
    clearDragging: () => void;
    selectCard: (instanceId: string) => void;
    selectStack: (stackId: string) => void;
    clearSelection: () => void;
    applyCardPositionUpdated: (payload: { instanceId: string; x: number; y: number }) => void;
    applyCardRemoved: (instanceId: string) => void;
    applyCardsSpawned: (cards: CardInstance[]) => void;
    applyEconomyUpdated: (payload: { coins: number }) => void;
    applyStackUpdated: (stack: CardStack) => void;
    applyStackRemoved: (stackId: string) => void;
    applyRecipeCompleted: (payload: RecipeCompletedPayload) => void;
    applyStackSplit: (payload: StackSplitPayload) => void;
    tickCraftingProgress: (now?: number) => void;
    setConnectionStatus: (status: GameState["connectionStatus"]) => void;
    setGameError: (error: GameState["gameError"]) => void;
    setPhase: (phase: GameState["phase"]) => void;
}

export type Position = { x: number; y: number };

export type DragState =
    | { type: "card"; instanceId: string; offset: Position }
    | { type: "stack"; stackId: string; offset: Position };

export interface RecipeStartedPayload {
    stack: CardStack;
    stackId: string;
    recipeId: string;
    duration: number;
    startAt: number;
}

export interface RecipeCompletedPayload {
    updatedStacks: CardStack[];
    removedStackIds: string[];
    spawnedCards: CardInstance[];
    deletedCardIds: string[];
}

export interface StackSplitPayload {
    updatedStacks: CardStack[];
    removedStackIds: string[];
    spawnedCards: CardInstance[];
    createdStacks: CardStack[];
}

export interface GameErrorPayload {
    code?: string;
    message: string;
}

export interface PackItem {
    defId: string;
    chance: number;// 0-1, xác suất xuất hiện
}

export interface Pack {
    id: string;
    name: string;
    description: string;
    cost: number;
    numberOfItems: number; // số lượng item trong pack
    items: PackItem[];
    position?: { x: number; y: number };
}

type GameEventType = "enemy_attack" | "natural_disaster" | "peaceful"

// interface GameEvent {
//     type: GameEventType;
//     description: string;
//     payload?: {
//         mobDefIds?: string[];  // giặc xuất hiện
//         destroyCount?: number;  // số ruộng bị phá
//     }
// }

export interface CombatSession {
    id: string;
    attackers: CardInstance[];
    defenders: CardInstance[];
    attackerTurn: boolean;     // True = Attacker đánh, False = Defender đánh
}

export interface EquipmentSlots {
    head: string | null;
    body: string | null;
    weapon: string | null;
}
