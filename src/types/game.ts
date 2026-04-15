export interface Position {
  x: number;
  y: number;
}

export interface GameCard {
  id: string;
  name: string;        // Ví dụ: "Dân làng", "Bụi tre", "Gỗ"
  type: string;        // Ví dụ: 'resource', 'villager', 'building', 'food'
  position: Position;
  description?: string;
}

export interface GameState {
  cards: GameCard[];
}