import { Recipe } from "@/src/types/game";
import { CARDS } from "./cards";

export function validateRecipe(recipe: Recipe) {
    if (recipe.inputs.some(input => !(input in CARDS))) {
        throw new Error('Invalid recipe inputs');
    }
    if (!(recipe.output.every(output => output in CARDS))) {
        recipe.output = ["thẻ thất lạc"];
        throw new Error('Invalid recipe output');
    }
    return recipe;
}

export const RECIPES: Recipe[] = [
    

    {
        id: "axe_recipe",
        inputs: ["wood", "stone"],
        output: ["axe"],
        duration: 4000,
        deletedId: ["wood", "stone"],
    },

    {
        id: "berry_recipe",
        inputs: ["berry_bush", "villager"],
        output: ["berry"],
        duration: 3000,
        deletedId: [],
    },

    {
        id: "board_recipe",
        inputs: ["wood", "villager"],
        output: ["board"],
        duration: 3500,
        deletedId: ["wood"],
    },

    {
        id: "campfire_recipe",
        inputs: ["wood", "stone"],
        output: ["campfire"],
        duration: 5000,
        deletedId: ["wood", "stone"],
    },

    {
        id: "coin_recipe",
        inputs: ["gold_ore", "villager"],
        output: ["coin"],
        duration: 4000,
        deletedId: ["gold_ore"],
    },

    {
        id: "cook_meat_recipe",
        inputs: ["raw_meat", "campfire"],
        output: ["cooked_meat"],
        duration: 3000,
        deletedId: ["raw_meat"],
    },

    {
        id: "fish_recipe",
        inputs: ["lake", "villager"],
        output: ["fish"],
        duration: 3000,
        deletedId: [],
    },

    {
        id: "flour_recipe",
        inputs: ["wheat", "villager"],
        output: ["flour"],
        duration: 3500,
        deletedId: ["wheat"],
    },

    {
        id: "house_recipe",
        inputs: ["board", "stone"],
        output: ["house"],
        duration: 8000,
        deletedId: ["board", "stone"],
    },

    {
        id: "iron_bar_recipe",
        inputs: ["iron_ore", "campfire"],
        output: ["iron_bar"],
        duration: 5000,
        deletedId: ["iron_ore"],
    },

    {
        id: "knife_recipe",
        inputs: ["iron_bar", "wood"],
        output: ["knife"],
        duration: 4000,
        deletedId: ["iron_bar", "wood"],
    },

    {
        id: "pickaxe_recipe",
        inputs: ["wood", "stone"],
        output: ["pickaxe"],
        duration: 4000,
        deletedId: ["wood", "stone"],
    },

    {
        id: "plank_recipe",
        inputs: ["board", "villager"],
        output: ["plank"],
        duration: 3000,
        deletedId: ["board"],
    },

    {
        id: "rope_recipe",
        inputs: ["fiber"],
        output: ["rope"],
        duration: 2000,
        deletedId: ["fiber"],
    },

    {
        id: "stick_recipe",
        inputs: ["farmer", "wood"],
        output: ["stick"],
        duration: 3000,
        deletedId: ["wood"],
    },

    {
        id: "spear_recipe",
        inputs: ["wood", "stone"],
        output: ["spear"],
        duration: 3500,
        deletedId: ["wood", "stone"],
    },

    {
        id: "sword_recipe",
        inputs: ["iron_bar", "wood"],
        output: ["sword"],
        duration: 5000,
        deletedId: ["iron_bar", "wood"],
    },

    {
        id: "tent_recipe",
        inputs: ["fabric", "wood"],
        output: ["tent"],
        duration: 6000,
        deletedId: ["fabric", "wood"],
    },

    {
        id: "thread_recipe",
        inputs: ["fiber"],
        output: ["thread"],
        duration: 2000,
        deletedId: ["fiber"],
    },

    {
        id: "tool_handle_recipe",
        inputs: ["wood"],
        output: ["handle"],
        duration: 2000,
        deletedId: ["wood"],
    },

    {
        id: "wheat_recipe",
        inputs: ["farm", "villager"],
        output: ["wheat"],
        duration: 4000,
        deletedId: [],
    },


]

