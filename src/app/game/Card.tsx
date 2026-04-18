"use client";

import React from 'react';
import { GameCard } from '@/types/game';

// Mở rộng GameCard thêm thuộc tính progress (tùy chọn) để chạy thanh tiến trình
interface CardProps {
  card: GameCard & { progress?: number };
  onDragStart: (e: React.DragEvent, cardId: string) => void;
}

export default function Card({ card, onDragStart }: CardProps) {
  // Tùy chỉnh màu sắc dựa trên loại thẻ bài
  const getCardColor = (type: string) => {
    switch (type) {
      case 'villager': return 'bg-yellow-100 border-yellow-600';
      case 'resource': return 'bg-green-100 border-green-700';
      case 'building': return 'bg-orange-100 border-orange-800';
      case 'food': return 'bg-red-100 border-red-500';
      default: return 'bg-gray-100 border-gray-400';
    }
  };

  // Hàm vui: Tự động gắn icon dựa theo tên thẻ
  const getIcon = (name: string) => {
    if (name.includes('Nông dân')) return '👨‍🌾';
    if (name.includes('Bụi chuối')) return '🌿';
    if (name.includes('Buồng chuối')) return '🍌';
    return '🃏'; // Icon mặc định
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, card.id)}
      className={`absolute w-24 h-32 rounded-lg border-2 shadow-md cursor-grab active:cursor-grabbing flex flex-col items-center justify-center p-2 user-select-none transition-transform hover:scale-105 ${getCardColor(card.type)}`}
      style={{
        left: `${card.position.x}px`,
        top: `${card.position.y}px`,
      }}
    >
      {/* --- THANH TIẾN TRÌNH GHÉP BÀI --- */}
      {card.progress !== undefined && card.progress > 0 && (
        <div className="absolute -top-4 left-0 w-full h-2 bg-gray-200 rounded-full overflow-hidden border border-gray-300 shadow-sm">
          <div 
            className="h-full bg-green-500 transition-all duration-100 ease-linear"
            style={{ width: `${card.progress}%` }}
          />
        </div>
      )}

      {/* ICON & THÔNG TIN THẺ */}
      <div className="text-2xl mb-1">{getIcon(card.name)}</div>
      <h3 className="font-bold text-sm text-center text-gray-800 leading-tight">{card.name}</h3>
      
      {card.description && (
        <p className="text-xs text-center text-gray-600 mt-1 line-clamp-2">{card.description}</p>
      )}
    </div>
  );
}