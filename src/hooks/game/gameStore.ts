import { findCardAtPosition } from '@/lib/game/engine/collisionEngine';
import { activeRecipe } from '@/lib/game/engine/recipeEngine';
import { addCardToStack, checkAndStartRecipe, createStack } from '@/lib/game/engine/stackEngine';
import { GameState } from '@/types/game/index';
import { UUID } from 'crypto';
import { get } from 'lodash';
import { create } from 'zustand'
export const gameStore = create<GameState>((set, get) => ({
    cards: {
        '1234-1234-1243-1243-1243': { instanceId: '1234-1234-1243-1243-1243', defId: 'villager', position: { x: 100, y: 100 } },
        '2345-2345-2345-2345-2345': { instanceId: '2345-2345-2345-2345-2345', defId: 'berry_bush', position: { x: 300, y: 150 } },
    },
    stacks: {},
    moon: 1,
    moonTimeLeft: 120000,
    coins: 0,
    cardLimit: 10,
    phase: "playing",

    addCard: (card) =>
        set((state) => ({
            cards: { ...state.cards, [card.instanceId]: card }
        })),

    startDrag: (instanceId) =>
        set((state) => ({
            draggingId: state.cards[instanceId] ? instanceId : null,
        })),
    dropCard: (x, y) => {
        const { draggingId, cards, stacks } = get()
        if (!draggingId) return

        const draggingCard = cards[draggingId]
        if (!draggingCard) return

        // 1. Tìm card bị đè lên
        const hitCard = findCardAtPosition(x, y, cards, draggingId)

        if (!hitCard) {
            // Không va chạm → di chuyển bình thường
            set({
                cards: {
                    ...cards,
                    [draggingId]: { ...draggingCard, position: { x, y } }
                },
                draggingId: null
            })
            return
        }

        // 2. Va chạm → kiểm tra hitCard đã trong stack chưa
        const existingStack = Object.values(stacks).find(s =>
            s.cards.some(c => c.instanceId === hitCard.instanceId)
        )

        let newStack = existingStack
            ? addCardToStack(existingStack, draggingCard)
            : createStack(hitCard, draggingCard)

        // 3. Kiểm tra recipe
        const { stack: updatedStack, recipeFound, duration } = checkAndStartRecipe(newStack)

        // 4. Xóa card khỏi cards (đã vào stack)
        const newCards = { ...cards }
        delete newCards[draggingId]
        if (!existingStack) delete newCards[hitCard.instanceId]

        set({
            cards: newCards,
            stacks: {
                ...stacks,
                [updatedStack.stackId]: updatedStack,
            },
            draggingId: null
        })

        // 5. Nếu có recipe → chạy timer
        if (recipeFound) {
            const recipe = activeRecipe(updatedStack)!
            let start = Date.now()
            const interval = setInterval(() => {
                const elapsed = Date.now() - start
                const progress = Math.min(elapsed / duration, 1)

                // Cập nhật progress trực tiếp
                set(state => ({
                    stacks: {
                        ...state.stacks,
                        [updatedStack.stackId]: {
                            ...state.stacks[updatedStack.stackId],
                            progress
                        }
                    }
                }))

                if (progress >= 1) {
                    clearInterval(interval)

                    // Xóa stack, spawn output cards
                    const { stacks, cards } = get()
                    const finishedStack = stacks[updatedStack.stackId]
                    if (!finishedStack) return

                    const newStacks = { ...stacks }
                    delete newStacks[updatedStack.stackId]

                    const newCards = Object.fromEntries(
                        recipe.outputs.map((defId: string) => {
                            const id = crypto.randomUUID() as UUID
                            return [id, {
                                instanceId: id,
                                defId,
                                position: { ...finishedStack.position }
                            }]
                        })
                    )

                    set({
                        stacks: newStacks,
                        cards: { ...cards, ...newCards },
                    })
                }
            }, 100)
        }
    },
    // updateStackProgress: (stackId, progress) =>
    //     set(state => ({
    //         stacks: {
    //             ...state.stacks,
    //             [stackId]: { ...state.stacks[stackId], progress }
    //         }
    //     })),

    // finishRecipe: (stackId, recipe) => {
    //     const { stacks, cards } = get()
    //     const stack = stacks[stackId]
    //     if (!stack) return

    //     // Xóa stack
    //     const newStacks = { ...stacks }
    //     delete newStacks[stackId]

    //     // Spawn output cards
    //     const newCards = { ...cards }
    //     recipe.outputs.forEach((defId: string) => {
    //         const id = crypto.randomUUID()
    //         newCards[id] = {
    //             instanceId: id,
    //             defId,
    //             position: { ...stack.position },
    //             progress: undefined,
    //         }
    //     })

    //     set({ stacks: newStacks, cards: newCards })
    // },
    draggingId: null,
    setPhase: (phase) => set({ phase })
}));