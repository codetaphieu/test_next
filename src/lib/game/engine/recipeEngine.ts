import { CardStack } from "@/src/types/game";
import { RECIPES } from "../data/recipes";
export function activeRecipe(stack: CardStack) { //active recipe cho stack, trả về recipe nếu có, null nếu không
    if (stack.cards.length < 2) return;
    const recipe = findMatchingRecipe(stack);
    if (!recipe) return;

    return {
        id: recipe.id,
        duration: recipe.duration ?? 0,
        outputs: recipe.outputs ?? [],
        deleteCard: recipe.deletedId ?? null
    }
}

export function findMatchingRecipe(stack: CardStack) {
    const inputCards = JSON.stringify(stack.cards.map(c => c.defId).sort());
    return RECIPES.find(recipe => {
        const inputs = JSON.stringify(recipe.inputs.sort())
        return inputs === inputCards;
    }) ?? null;
}