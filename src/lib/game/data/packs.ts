import { Pack } from "@/src/types/game";
export const PACKS: Record<string, Pack> = {
    humble_beginning: {
        id: "humble_beginning",
        name: "Khởi Đầu Khiêm Tốn",
        description: "Bắt đầu hành trình của bạn với một khởi đầu khiêm tốn.",
        cost: 3,
        numberOfItems: Math.floor(Math.random() * 2) + 3, 
        items: [
            { defId: "villager", chance: 0.15 },
            { defId: "berry_bush", chance: 0.15 },
            { defId: "tree", chance: 0.15 },
            { defId: "stone", chance: 0.1 },
            { defId: "wood", chance: 0.1 },
            { defId: "berry", chance: 0.1 },
            { defId: "coin", chance: 0.15 }
        ]
    },

    seeking_wisdom: {
        id: "seeking_wisdom",
        name: "Tìm Kiếm Tri Thức",
        description: "Khám phá những kiến thức mới để phát triển.",
        cost: 4,
        numberOfItems: Math.floor(Math.random() * 2) + 3,
        items: [
            { defId: "villager", chance: 0.4 },
            { defId: "berry_bush", chance: 0.3 },
            { defId: "tree", chance: 0.3 },
            { defId: "stone", chance: 0.2 },
            { defId: "wood", chance: 0.2 },
            { defId: "berry", chance: 0.1 },
            { defId: "coin", chance: 0.2 }
        ]
    }
}