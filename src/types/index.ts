export type GameMode = 'dice' | 'wheel' | 'elimination';

export interface HistoryItem {
  id: string;
  mode: GameMode;
  result: string;
  timestamp: number;
}