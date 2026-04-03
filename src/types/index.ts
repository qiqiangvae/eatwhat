export type GameMode = 'dice' | 'wheel' | 'elimination';

export interface HistoryItem {
  id: string;
  mode: GameMode;
  result: string;
  timestamp: number;
}

export interface FavoritesState {
  ids: string[];
  showFavoritesOnly: boolean;
}