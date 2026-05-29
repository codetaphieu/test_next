'use client'
import Board from '@/components/game/Board';
import { gameStore } from '@/hooks/game/gameStore';
import { CARDS } from '@/lib/game/data/cards';
import { PACKS } from '@/lib/game/data/packs';
import { emitBuyPack, emitSellCard } from '@/services/gameEmitters';

const QUESTS = [
  'Top of the Berry Bush',
  'Mine a Rock using a Villager',
  'Sell a Card',
  'Buy the Humble Beginnings Pack',
  'Harvest a Tree using a Villager',
  'Make a Stick from Wood',
  'Pause using the play icon',
  'Grow a Berry Bush using Soil',
  'Get a Second Villager',
]

export default function GameBoard() {
  const cards = gameStore(s => s.cards)
  const stacks = gameStore(s => s.stacks)
  const coins = gameStore(s => s.coins)
  const moon = gameStore(s => s.moon)
  const cardLimit = gameStore(s => s.cardLimit)
  const selectedCardId = gameStore(s => s.selectedCardId)
  const selectedStackId = gameStore(s => s.selectedStackId)
  const cardCount = Object.keys(cards).length + Object.values(stacks).reduce((total, stack) => total + stack.cards.length, 0)
  const selectedCard = selectedCardId ? cards[selectedCardId] : null
  const selectedCardDef = selectedCard ? CARDS[selectedCard.defId] : null
  const selectedStack = selectedStackId ? stacks[selectedStackId] : null
  const selectedStackSummary = Object.values(
    selectedStack?.cards.reduce<Record<string, { label: string; count: number }>>((summary, card) => {
      const label = CARDS[card.defId]?.name ?? card.defId
      summary[card.defId] = {
        label,
        count: (summary[card.defId]?.count ?? 0) + 1,
      }
      return summary
    }, {}) ?? {},
  )
  const selectedSellValue = selectedCard?.defId === 'coin' ? 1 : selectedCardDef?.sellValue
  const canSellSelectedCard = selectedCard && selectedSellValue !== undefined && selectedSellValue > 0

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#bed0b8] font-sans text-black select-none">
      <div className="flex h-full">
        <aside className="z-20 flex w-[300px] shrink-0 flex-col border-[3px] border-black bg-[#fbf7df] shadow-[5px_0_0_rgba(0,0,0,0.18)]">
          <div className="flex h-12 border-b-[3px] border-black bg-[#f7f0c9]">
            <div className="flex flex-1 items-center gap-2 border-r-[3px] border-black px-4 text-[22px] font-black uppercase leading-none">
              Quests <span className="rounded-full bg-[#f06f61] px-2 text-base">!</span>
            </div>
            <div className="flex flex-1 items-center gap-2 px-4 text-[22px] font-black uppercase leading-none">
              Ideas <span className="rounded-full bg-[#f06f61] px-2 text-base">!</span>
            </div>
          </div>

          <div className="min-h-0 flex-1 overflow-hidden border-b-[3px] border-black p-4">
            <div className="space-y-4 pr-2 text-[20px] font-black leading-tight">
              {QUESTS.map((quest, index) => (
                <div key={quest} className="flex gap-3">
                  <span className="mt-1 h-4 w-4 shrink-0 border-2 border-[#ded8bd] bg-[#fffdf0]" />
                  <span>{quest}</span>
                  {(index === 2 || index === 7) && (
                    <span className="ml-auto rounded-full bg-[#f06f61] px-2 text-base leading-6">!</span>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-5 text-[21px] font-black leading-tight">
              Complete 3 more quests to unlock a new Pack!
            </p>
          </div>

          <div className="relative h-[250px] border-t-[3px] border-black bg-[#fffbea] p-4">
            <h2 className="mb-4 text-[24px] font-black uppercase leading-none">
              {selectedStack ? 'Stack of Cards' : 'Description'}
            </h2>
            {selectedCard && selectedCardDef ? (
              <div className="space-y-3 text-[18px] font-black leading-tight">
                <div>
                  <div>{selectedCardDef.name}</div>
                  <div className="text-sm font-bold text-black/60">{selectedCardDef.type}</div>
                </div>
                {selectedCardDef.stats?.description && (
                  <p className="text-sm font-bold leading-snug">{selectedCardDef.stats.description}</p>
                )}
                {canSellSelectedCard && (
                  <button
                    type="button"
                    onClick={() => emitSellCard(selectedCard.instanceId)}
                    className="border-[3px] border-black bg-black px-4 py-2 text-base font-black uppercase text-white shadow-[3px_3px_0_rgba(0,0,0,0.25)]"
                  >
                    Sell for {selectedSellValue} coin
                  </button>
                )}
              </div>
            ) : selectedStack ? (
              <div className="space-y-2 text-[18px] font-black leading-tight">
                {selectedStackSummary.map(item => (
                  <div key={item.label}>
                    {item.count > 1 ? `${item.count}x ` : ''}{item.label}
                  </div>
                ))}
                {selectedStack.crafting.active && (
                  <div className="mt-3 border-2 border-black bg-[#d7eed1] px-2 py-1 text-sm">
                    Crafting: {selectedStack.crafting.recipeId}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-[18px] font-black leading-tight">Select a card or stack.</p>
            )}
            <div className="absolute bottom-4 left-5 text-[18px] font-black">{coins} ⊙</div>
          </div>
        </aside>

        <section className="flex min-w-0 flex-1 flex-col">
          <header className="relative z-10 flex h-[120px] shrink-0 items-center border-b-[3px] border-black bg-[#afc3aa] px-8">
            <div className="flex h-full flex-1 items-center justify-center gap-6">
              <button
                type="button"
                disabled={!canSellSelectedCard}
                onClick={() => selectedCard && emitSellCard(selectedCard.instanceId)}
                className="h-[88px] w-[76px] border-[3px] border-white bg-black text-center text-xs font-black text-white shadow-[0_0_0_3px_rgba(255,255,255,0.45)] disabled:opacity-50"
              >
                <span className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-white text-2xl text-black">⊂</span>
                Sell
              </button>
              <div className="flex h-[88px] w-[76px] items-center justify-center border-[3px] border-dashed border-white bg-black text-center text-xs font-black text-white">
                Make Zone
              </div>

              {Object.values(PACKS).map(pack => (
                <button
                  key={pack.id}
                  type="button"
                  disabled={coins < pack.cost || cardCount + pack.numberOfItems > cardLimit}
                  onClick={() => emitBuyPack(pack.id, { x: 240, y: 150 })}
                  className="relative h-[88px] w-[76px] rounded-[5px] border-[3px] border-black bg-black px-2 text-center text-[11px] font-black leading-tight text-white shadow-[4px_4px_0_rgba(0,0,0,0.22)] disabled:opacity-45"
                >
                  <span className="block">{pack.name}</span>
                  <span className="mt-3 block text-base">{pack.cost}⊙</span>
                </button>
              ))}

              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="flex h-[88px] w-[76px] items-center justify-center rounded-[5px] border-[3px] border-black bg-black text-sm font-black text-white shadow-[4px_4px_0_rgba(0,0,0,0.22)]"
                >
                  ???
                </div>
              ))}
            </div>

            <div className="absolute right-3 top-2 flex h-11 border-[3px] border-black bg-[#f7f0c9] text-[22px] font-black leading-none">
              <div className="flex items-center gap-5 border-r-[3px] border-black px-4">
                <span>{coins} ⊙</span>
                <span>{cardCount}/{cardLimit} ▣</span>
              </div>
              <div className="flex items-center px-5">Moon {moon}</div>
              <div className="flex items-center border-l-[3px] border-black px-4 text-2xl">Ⅱ</div>
            </div>
          </header>

          <main className="min-h-0 flex-1">
            <Board />
          </main>
        </section>
      </div>
    </div>
  );
}
