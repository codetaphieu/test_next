import type { CardDef } from "@/src/types/game";

export const CARDS: Record<string, CardDef> = {
    //STRUCTURES

    "Apple_Tree": {
        id: "apple_tree",
        name: "Cây táo",
        type: "Structure",
        sellValue: 0,
    },
    "Berry_Bush": {
        id: "berry_bush",
        name: "bụi quả mọng",
        type: "Structure",
        sellValue: 1,
    },

    "Brickyard": {
        id: "brickyard",
        name: "Xưởng gạch",
        type: "Structure",
        sellValue: 1,
    },

    "Campfire": {
        id: "campfire",
        name: "Lửa trại",
        type: "Structure",
        sellValue: 1,
    },

    "Farm": {
        id: "farm",
        name: "Trang trại",
        type: "Structure",
        sellValue: 5,
    },

    "Garden": {
        id: "garden",
        name: "Khu vườn",
        type: "Structure",
        sellValue: 5,
    },

    "House": {
        id: "house",
        name: "Nhà",
        type: "Structure",
        sellValue: 3,
    },

    "Iron_Mine": {
        id: "iron_mine",
        name: "Hầm mỏ",
        type: "Structure",
        sellValue: 5,
    },

    "Lumber_Camp": {
        id: "lumber_camp",
        name: "Trại cưa",
        type: "Structure",
        sellValue: 5,
    },

    "Market": {
        id: "market",
        name: "Chợ",
        type: "Structure",
        sellValue: 5,
    },

    "Quarry": {
        id: "quarry",
        name: "Mỏ đá",
        type: "Structure",
        sellValue: 5,
    },

    "Sawmill": {
        id: "sawmill",
        name: "Xưởng cưa",
        type: "Structure",
        sellValue: 5,
    },

    "Shed": {
        id: "shed",
        name: "Nhà kho nhỏ",
        type: "Structure",
        sellValue: 3,
    },

    "Smelter": {
        id: "smelter",
        name: "Lò luyện kim",
        type: "Structure",
        sellValue: 5,
    },

    "Stove": {
        id: "stove",
        name: "Bếp lò",
        type: "Structure",
        sellValue: 5,
    },

    "Temple": {
        id: "temple",
        name: "Đền thờ",
        type: "Structure",
    },

    "Warehouse": {
        id: "warehouse",
        name: "Kho bãi",
        type: "Structure",
        sellValue: 5,
    },



    //VILLAGERS

    "Archer": {
        id: "archer",
        name: "Cung thủ",
        type: "Villager",
        stats: {
            healthPoint: 15,
            attackPoint: 3,
            foodCost: 2,
        },
    },

    "Baby": {
        id: "baby",
        name: "Trẻ em",
        type: "Villager",
        stats: {
            foodCost: 1,
        },
    },

    "Builder": {
        id: "builder",
        name: "Thợ xây",
        type: "Villager",
        stats: {
            healthPoint: 15,
            foodCost: 2,
        },
    },

    "Cat": {
        id: "cat",
        name: "Mèo",
        type: "Villager",
        stats: {
            healthPoint: 9,
            attackPoint: 1,
            foodCost: 1,
        },
    },

    "Dog": {
        id: "dog",
        name: "Chó",
        type: "Villager",
        stats: {
            healthPoint: 9,
            attackPoint: 1,
            foodCost: 1,
        },
    },

    "Explorer": {
        id: "explorer",
        name: "Nhà thám hiểm",
        type: "Villager",
        stats: {
            healthPoint: 15,
            attackPoint: 1,
            foodCost: 2,
        },
    },

    "Fisher": {
        id: "fisher",
        name: "Ngư dân",
        type: "Villager",
        stats: {
            healthPoint: 15,
            attackPoint: 1,
            foodCost: 2,
        },
    },

    "Friendly_Pirate": {
        id: "friendly_pirate",
        name: "Cướp biển thân thiện",
        type: "Villager",
        stats: {
            healthPoint: 15,
            attackPoint: 1,
            foodCost: 2,
        },
    },

    "Militia": {
        id: "militia",
        name: "Dân binh",
        type: "Villager",
        stats: {
            healthPoint: 15,
            attackPoint: 2,
            foodCost: 2,
        },
    },

    "Miner": {
        id: "miner",
        name: "Thợ mỏ",
        type: "Villager",
        stats: {
            healthPoint: 15,
            attackPoint: 1,
            foodCost: 2,
        },
    },

    "Swordsman": {
        id: "swordsman",
        name: "Kiếm sĩ",
        type: "Villager",
        stats: {
            healthPoint: 15,
            attackPoint: 4,
            foodCost: 3,
        },
    },

    "Trained_Monkey": {
        id: "trained_monkey",
        name: "Khỉ huấn luyện",
        type: "Villager",
        stats: {
            healthPoint: 6,
            attackPoint: 1,
            foodCost: 1,
        },
    },

    "Villager": {
        id: "villager",
        name: "Dân làng",
        type: "Villager",
        stats: {
            healthPoint: 15,
            attackPoint: 5,
            foodCost: 2,
        },
    },

    "Wizard": {
        id: "wizard",
        name: "Phù thủy",
        type: "Villager",
        stats: {
            healthPoint: 15,
            attackPoint: 5,
            foodCost: 3,
        },
    },

    "Young_Villager": {
        id: "young_villager",
        name: "Dân làng trẻ",
        type: "Villager",
        stats: {
            healthPoint: 15,
            attackPoint: 3,
            foodCost: 2,
        },
    },









    // RESOURCES

    "Brick": {
        id: "brick",
        name: "Gạch",
        type: "Resource",
        sellValue: 3,
    },

    "Charcoal": {
        id: "charcoal",
        name: "Than củi",
        type: "Resource",
        sellValue: 1,
    },

    "Coin": {
        id: "coin",
        name: "Tiền vàng",
        type: "Resource",
    },

    "Cotton": {
        id: "cotton",
        name: "Bông",
        type: "Resource",
        sellValue: 1,
    },

    "Flint": {
        id: "flint",
        name: "Đá lửa",
        type: "Resource",
        sellValue: 2,
    },

    "Gold_Bar": {
        id: "gold_bar",
        name: "Thỏi vàng",
        type: "Resource",
        sellValue: 5,
    },

    "Iron_Bar": {
        id: "iron_bar",
        name: "Thỏi sắt",
        type: "Resource",
        sellValue: 5,
    },

    "Iron_Ore": {
        id: "iron_ore",
        name: "Quặng sắt",
        type: "Resource",
        sellValue: 3,
    },

    "Plank": {
        id: "plank",
        name: "Ván gỗ",
        type: "Resource",
        sellValue: 3,
    },

    "Rope": {
        id: "rope",
        name: "Dây thừng",
        type: "Resource",
        sellValue: 3,
    },

    "Shell": {
        id: "shell",
        name: "Vỏ sò",
        type: "Resource",
    },

    "Stick": {
        id: "stick",
        name: "Que củi",
        type: "Resource",
        sellValue: 2,
    },

    "Stone": {
        id: "stone",
        name: "Đá",
        type: "Resource",
        sellValue: 1,
    },

    "Wood": {
        id: "wood",
        name: "Gỗ",
        type: "Resource",
        sellValue: 1,
    },

    "Wool": {
        id: "wool",
        name: "Len",
        type: "Resource",
        sellValue: 1,
    },


    //Ideas
    "Idea: AnimalPen": {
        id: "animal_pen",
        name: "Ý tưởng: Chuồng thú",
        type: "Idea",
        sellValue: 1,
        stats: {
            targetRecipeId: "recipe_animal_pen",
            craftTime: 5,
        },
    },

    "Idea: Brickyard": {
        id: "brickyard",
        name: "Ý tưởng: Xưởng gạch",
        type: "Idea",
        sellValue: 1,
        stats: {
            targetRecipeId: "recipe_brickyard",
            craftTime: 5,
        },
    },

    "Idea: Campfire": {
        id: "campfire",
        name: "Ý tưởng: Lửa trại",
        type: "Idea",
        sellValue: 1,
        stats: {
            targetRecipeId: "recipe_campfire",
            craftTime: 2,
        },
    },

    "Idea: Coin_Chest": {
        id: "coin_chest",
        name: "Ý tưởng: Rương tiền",
        type: "Idea",
        sellValue: 1,
        stats: {
            targetRecipeId: "recipe_coin_chest",
            craftTime: 5,
        },
    },

    "Idea: Cooked_Meat": {
        id: "cooked_meat",
        name: "Ý tưởng: Thịt chín",
        type: "Idea",
        sellValue: 1,
        stats: {
            targetRecipeId: "recipe_cooked_meat",
            craftTime: 3,
        },
    },

    "Idea: Farm": {
        id: "farm",
        name: "Ý tưởng: Trang trại",
        type: "Idea",
        sellValue: 1,
        stats: {
            targetRecipeId: "recipe_farm",
            craftTime: 10,
        },
    },

    "Idea: Fruit_Salad": {
        id: "fruit_salad",
        name: "Ý tưởng: Salad trái cây",
        type: "Idea",
        sellValue: 1,
        stats: {
            targetRecipeId: "recipe_fruit_salad",
            craftTime: 3,
        },
    },

    "Idea: Garden": {
        id: "garden",
        name: "Ý tưởng: Khu vườn",
        type: "Idea",
        sellValue: 1,
        stats: {
            targetRecipeId: "recipe_garden",
            craftTime: 5,
        },
    },

    "Idea: Growth": {
        id: "growth",
        name: "Ý tưởng: Trồng trọt",
        type: "Idea",
        sellValue: 1,
        stats: {
            targetRecipeId: "recipe_growth",
            craftTime: 2,
        },
    },

    "Idea: House": {
        id: "house",
        name: "Ý tưởng: Nhà ở",
        type: "Idea",
        sellValue: 1,
        stats: {
            targetRecipeId: "recipe_house",
            craftTime: 5,
        },
    },

    "Idea: Lumber_Camp": {
        id: "lumber_camp",
        name: "Ý tưởng: Trại cưa",
        type: "Idea",
        sellValue: 1,
        stats: {
            targetRecipeId: "recipe_lumber_camp",
            craftTime: 7,
        },
    },

    "Idea: Militia": {
        id: "militia",
        name: "Ý tưởng: Dân binh",
        type: "Idea",
        sellValue: 1,
        stats: {
            targetRecipeId: "recipe_militia",
            craftTime: 5,
        },
    },

    "Idea: Offspring": {
        id: "offspring",
        name: "Ý tưởng: Sinh sản",
        type: "Idea",
        sellValue: 1,
        stats: {
            targetRecipeId: "recipe_offspring",
            craftTime: 10,
        },
    },

    "Idea: Smelter": {
        id: "smelter",
        name: "Ý tưởng: Lò luyện kim",
        type: "Idea",
        sellValue: 1,
        stats: {
            targetRecipeId: "recipe_smelter",
            craftTime: 10,
        },
    },

    "Idea: Warehouse": {
        id: "warehouse",
        name: "Ý tưởng: Kho bãi",
        type: "Idea",
        sellValue: 1,
        stats: {
            targetRecipeId: "recipe_warehouse",
            craftTime: 7,
        },
    },


    // FOOD
    "Apple": {
        id: "apple",
        name: "Táo",
        type: "Food",
        sellValue: 1,
        stats: {
            foodValue: 2,
        },
    },

    "Banana": {
        id: "banana",
        name: "Chuối",
        type: "Food",
        sellValue: 1,
        stats: {
            foodValue: 2,
        },
    },

    "Berry": {
        id: "berry",
        name: "Quả mọng",
        type: "Food",
        sellValue: 1,
        stats: {
            foodValue: 1,
        },
    },

    "Bread": {
        id: "bread",
        name: "Bánh mì",
        type: "Food",
        sellValue: 3,
        stats: {
            foodValue: 4,
        },
    },

    "Carrot": {
        id: "carrot",
        name: "Cà rốt",
        type: "Food",
        sellValue: 1,
        stats: {
            foodValue: 2,
        },
    },

    "Cheese": {
        id: "cheese",
        name: "Phô mai",
        type: "Food",
        sellValue: 2,
        stats: {
            foodValue: 3,
        },
    },

    "Cooked Meat": {
        id: "cooked meat",
        name: "Thịt chín",
        type: "Food",
        sellValue: 2,
        stats: {
            foodValue: 3,
        },
    },

    "Egg": {
        id: "egg",
        name: "Trứng",
        type: "Food",
        sellValue: 1,
        stats: {
            foodValue: 1,
        },
    },

    "Frittata": {
        id: "frittata",
        name: "Trứng đúc thịt",
        type: "Food",
        sellValue: 3,
        stats: {
            foodValue: 4,
        },
    },

    "Fruit Salad": {
        id: "fruit salad",
        name: "Salad trái cây",
        type: "Food",
        sellValue: 3,
        stats: {
            foodValue: 4,
        },
    },

    "Milk": {
        id: "milk",
        name: "Sữa",
        type: "Food",
        sellValue: 1,
        stats: {
            foodValue: 1,
        },
    },

    "Mushroom": {
        id: "mushroom",
        name: "Nấm",
        type: "Food",
        sellValue: 1,
        stats: {
            foodValue: 1,
        },
    },

    "Omelette": {
        id: "omelette",
        name: "Trứng cuộn",
        type: "Food",
        sellValue: 2,
        stats: {
            foodValue: 3,
        },
    },

    "Potato": {
        id: "potato",
        name: "Khoai tây",
        type: "Food",
        sellValue: 1,
        stats: {
            foodValue: 2,
        },
    },

    "Raw Meat": {
        id: "raw meat",
        name: "Thịt sống",
        type: "Food",
        sellValue: 1,
        stats: {
            foodValue: 1,
        },
    },


    // MOBS
    "Bear": {
        id: "bear",
        name: "Gấu",
        type: "Mob",
        stats: {
            healthPoint: 25,
            attackPoint: 8,
            defensePoint: 5,
            attackSpeed: 2,
        },
    },


    "Ghost": {
        id: "ghost",
        name: "Ma",
        type: "Mob",
        stats: {
            healthPoint: 12,
            attackPoint: 3,
            attackType: "magic",
        },
    },

    "Goblin": {
        id: "goblin",
        name: "Goblin",
        type: "Mob",
        stats: {
            healthPoint: 9,
            attackPoint: 3,
            attackSpeed: 4,
        },
    },

    "Monkey": {
        id: "monkey",
        name: "Khỉ",
        type: "Mob",
        stats: {
            healthPoint: 10,
            attackPoint: 2,
            attackSpeed: 6,
        },
    },

    "Rat": {
        id: "rat",
        name: "Chuột",
        type: "Mob",
        stats: {
            healthPoint: 5,
            attackPoint: 1,
            attackSpeed: 4,
        },
    },

    "Skeleton": {
        id: "skeleton",
        name: "Bộ Xương",
        type: "Mob",
        stats: {
            healthPoint: 12,
            attackPoint: 4,
            defensePoint: 2,
        },
    },

    "Slime": {
        id: "slime",
        name: "Slime",
        type: "Mob",
        stats: {
            healthPoint: 8,
            attackPoint: 2,
            defensePoint: 1,
        },
    },

    "Tiger": {
        id: "tiger",
        name: "Hổ",
        type: "Mob",
        stats: {
            healthPoint: 15,
            attackPoint: 9,
            attackSpeed: 6,
        },
    },

    "Wolf": {
        id: "wolf",
        name: "Sói",
        type: "Mob",
        stats: {
            healthPoint: 20,
            attackPoint: 5,
            attackSpeed: 5,
        },
    },

    //Locations
    "Beach": {
        id: "beach",
        name: "Bãi Biển",
        type: "Location",
        stats: {
            capacity: 3,
            spawnRate: 0.3,
        },
    },

    "Cave": {
        id: "cave",
        name: "Hang Động",
        type: "Location",
        stats: {
            capacity: 2,
            spawnRate: 0.4,
        },
    },

    "Desert": {
        id: "desert",
        name: "Sa Mạc",
        type: "Location",
        stats: {
            capacity: 3,
            spawnRate: 0.2,
        },
    },

    "Forest": {
        id: "forest",
        name: "Rừng",
        type: "Location",
        stats: {
            capacity: 4,
            spawnRate: 0.5,
        },
    },

    "Jungle": {
        id: "jungle",
        name: "Rừng Nhiệt Đới",
        type: "Location",
        stats: {
            capacity: 4,
            spawnRate: 0.6,
        },
    },

    "Lake": {
        id: "lake",
        name: "Hồ",
        type: "Location",
        stats: {
            capacity: 3,
            spawnRate: 0.4,
        },
    },

    "Mountain": {
        id: "mountain",
        name: "Núi",
        type: "Location",
        stats: {
            capacity: 2,
            spawnRate: 0.3,
        },
    },

    "Plains": {
        id: "plains",
        name: "Đồng Bằng",
        type: "Location",
        stats: {
            capacity: 5,
            spawnRate: 0.5,
        },
    },

    "Ruins": {
        id: "ruins",
        name: "Tàn Tích",
        type: "Location",
        stats: {
            capacity: 2,
            spawnRate: 0.35,
        },
    },

    "Swamp": {
        id: "swamp",
        name: "Đầm Lầy",
        type: "Location",
        stats: {
            capacity: 3,
            spawnRate: 0.45,
        },
    },


    //FISH

    "Goldfish": {
        id: "goldfish",
        name: "Cá Vàng",
        type: "Fish",
        stats: {
            healthPoint: 2,
            attackPoint: 1,
            defensePoint: 0,
        },
    },

    "Salmon": {
        id: "salmon",
        name: "Cá Hồi",
        type: "Fish",
        stats: {
            healthPoint: 4,
            attackPoint: 2,
            defensePoint: 1,
        },
    },

    "Tuna": {
        id: "tuna",
        name: "Cá Ngừ",
        type: "Fish",
        stats: {
            healthPoint: 5,
            attackPoint: 3,
            defensePoint: 2,
        },
    },

    //RUMORS

    "Treasure Map": {
        id: "treasure map",
        name: "Bản Đồ Kho Báu",
        type: "Rumor",
        stats: {
            description: "Một bản đồ cũ dẫn đến kho báu bị mất.",
        },
    },

    "Ancient Artifact": {
        id: "ancientartifact",
        name: "Di Vật Cổ",
        type: "Rumor",
        stats: {
            description: "Một di vật cổ xưa được cho là mang lại sức mạnh.",
        },
    },

    //EQUIPMENT
    "Axe": {
        id: "axe",
        name: "Rìu",
        type: "Equipment",
        stats: {
            durability: 100,
            damage: 5,
        },
    },
    "Armor": {
        id: "armor",
        name: "Giáp Sắt",
        type: "Equipment",
        sellValue: 10,
        stats: {
            defensePoint: 6,
            durability: 40,
        },
    },

    "Boots": {
        id: "boots",
        name: "Giày Da",
        type: "Equipment",
        sellValue: 5,
        stats: {
            durability: 25,
        },
    },

    "Bow": {
        id: "bow",
        name: "Cung Gỗ",
        type: "Equipment",
        sellValue: 9,
        stats: {
            attackPoint: 4,
            durability: 30,
        },
    },

    "Dagger": {
        id: "dagger",
        name: "Dao Găm",
        type: "Equipment",
        sellValue: 7,
        stats: {
            attackPoint: 3,
            durability: 20,
        },
    },

    "Helmet": {
        id: "helmet",
        name: "Mũ Sắt",
        type: "Equipment",
        sellValue: 8,
        stats: {
            durability: 30,
        },
    },

    "Ring": {
        id: "ring",
        name: "Nhẫn Ma Thuật",
        type: "Equipment",
        sellValue: 15,
        stats: {
            durability: 50,
        },
    },

    "Shield": {
        id: "shield",
        name: "Khiên Gỗ",
        type: "Equipment",
        sellValue: 10,
        stats: {
            durability: 35,
        },
    },

    "Spear": {
        id: "spear",
        name: "Giáo",
        type: "Equipment",
        sellValue: 9,
        stats: {
            attackPoint: 5,
            durability: 30,
        },
    },

    "Sword": {
        id: "sword",
        name: "Kiếm",
        type: "Equipment",
        sellValue: 11,
        stats: {
            attackPoint: 6,
            durability: 35,
        },
    },

    "Wand": {
        id: "wand",
        name: "Gậy Phép",
        type: "Equipment",
        sellValue: 15,
        stats: {
            attackPoint: 2,
            durability: 25,
        },
    },

    //SPIRITS AND CURSES



}