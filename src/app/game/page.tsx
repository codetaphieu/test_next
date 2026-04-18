"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Card from "./Card"; 

const initialCards = [
  { id: "card-nong-dan-1", name: "Nông dân", type: "villager", position: { x: 100, y: 150 }, progress: 0 },
  { id: "card-bui-chuoi-1", name: "Bụi chuối", type: "resource", position: { x: 300, y: 150 }, progress: 0 }
];

const isOverlapping = (pos1: {x: number, y: number}, pos2: {x: number, y: number}) => {
  const distance = Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
  return distance < 70; 
};

export default function GamePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cards, setCards] = useState(initialCards);
  
  // --- THÊM STATE QUẢN LÝ VÀNG TẠI ĐÂY ---
  // Khởi tạo người chơi mới vào làng sẽ có 10 Vàng làm vốn
  const [gold, setGold] = useState(10); 
  // ---------------------------------------

  const boardRef = useRef<HTMLDivElement>(null);
  const [draggingCardId, setDraggingCardId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  const handlePointerDown = (e: React.PointerEvent, cardId: string, currentPos: {x: number, y: number}) => {
    e.preventDefault(); 
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    if (!boardRef.current) return;
    const boardRect = boardRef.current.getBoundingClientRect();
    setDragOffset({ x: e.clientX - (boardRect.left + currentPos.x), y: e.clientY - (boardRect.top + currentPos.y) });
    setDraggingCardId(cardId);
    
    // Khi cầm thẻ bài lên thì xóa tiến trình của nó
    setCards(prev => prev.map(c => c.id === cardId ? { ...c, progress: 0 } : c));
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingCardId || !boardRef.current) return;
    const boardRect = boardRef.current.getBoundingClientRect();
    const newX = e.clientX - boardRect.left - dragOffset.x;
    const newY = e.clientY - boardRect.top - dragOffset.y;

    setCards(prevCards => prevCards.map(card => card.id === draggingCardId ? { ...card, position: { x: newX, y: newY } } : card));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (draggingCardId) {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      const droppedCard = cards.find(c => c.id === draggingCardId);
      
      if (droppedCard) {
        const targetCard = cards.find(c => c.id !== droppedCard.id && isOverlapping(droppedCard.position, c.position));

        if (targetCard && ((droppedCard.name === "Nông dân" && targetCard.name === "Bụi chuối") || (targetCard.name === "Nông dân" && droppedCard.name === "Bụi chuối"))) {
          const buiChuoiId = droppedCard.name === "Bụi chuối" ? droppedCard.id : targetCard.id;
          const nongDanId = droppedCard.name === "Nông dân" ? droppedCard.id : targetCard.id;

          // CHẠY THANH TIẾN TRÌNH 5 GIÂY
          let currentProgress = 0;
          const interval = setInterval(() => {
            currentProgress += 2; // Tăng 2% mỗi 100ms -> 5000ms là 100%
            
            setCards(prev => prev.map(c => {
              if (c.id === nongDanId || c.id === buiChuoiId) return { ...c, progress: currentProgress };
              return c;
            }));

            if (currentProgress >= 100) {
              clearInterval(interval);
              setCards(prev => {
                const nd = prev.find(c => c.id === nongDanId);
                const bc = prev.find(c => c.id === buiChuoiId);
                if (nd && bc && isOverlapping(nd.position, bc.position)) {
                  const newBanana = { id: `banana-${Date.now()}`, name: "Buồng chuối", type: "food", position: { x: nd.position.x + 120, y: nd.position.y }, progress: 0 };
                  return [...prev.filter(c => c.id !== buiChuoiId).map(c => c.id === nongDanId ? { ...c, progress: 0 } : c), newBanana];
                }
                return prev.map(c => ({ ...c, progress: 0 }));
              });
            }
          }, 100);
        }
      }
      setDraggingCardId(null);
    }
  };

  if (status === "loading") return <div className="p-10 text-center font-bold">Đang tải Làng...</div>;

  return (
    <main className="min-h-screen bg-[#f4f1ea] p-6 flex flex-col select-none touch-none">
      <header className="flex justify-between items-center mb-6 bg-white/80 p-5 rounded-2xl shadow-sm border border-stone-200">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black text-amber-900 uppercase tracking-tighter">Bàn cờ Làng Việt</h1>
          {/* HIỂN THỊ USERNAME TỪ SESSION */}
          <p className="text-stone-500 text-sm font-medium">
            Trưởng làng: <span className="text-emerald-600 font-bold">{session?.user?.name || "Người chơi ẩn danh"}</span>
          </p>
        </div>
        <div className="flex gap-3 items-center">
           {/* --- THÊM Ô HIỂN THỊ VÀNG TẠI ĐÂY --- */}
           <div className="px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg text-sm font-bold shadow-sm flex items-center gap-1 border border-yellow-200">
             <span className="text-lg leading-none">🪙</span> {gold}
           </div>
           {/* ----------------------------------- */}
           
           <div className="px-4 py-2 bg-amber-100 text-amber-800 rounded-lg text-sm font-bold shadow-sm">Ngày 1</div>
        </div>
      </header>

      <div ref={boardRef} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerUp}
           className="flex-1 w-full relative border-2 border-dashed border-stone-300 rounded-[2rem] bg-stone-200/40 p-8 overflow-hidden shadow-inner">
        <div className="absolute top-0 left-0 w-full h-full z-20 pointer-events-none">
          {cards.map((card) => (
            <div key={card.id} className="pointer-events-auto absolute top-0 left-0"
                 style={{ zIndex: draggingCardId === card.id ? 100 : 10, cursor: draggingCardId === card.id ? "grabbing" : "grab" }}
                 onPointerDown={(e) => handlePointerDown(e, card.id, card.position)}>
              <Card card={card as any} onDragStart={() => {}} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}