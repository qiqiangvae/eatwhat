import { useState, useEffect, useCallback } from 'react';
import type { HistoryItem, GameMode } from '../types';

const STORAGE_KEY = 'eatwhat_history';

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const addHistory = useCallback((mode: GameMode, result: string) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      mode,
      result,
      timestamp: Date.now(),
    };
    setHistory(prev => {
      const updated = [newItem, ...prev].slice(0, 50);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return { history, addHistory, clearHistory };
}