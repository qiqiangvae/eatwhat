import { useState, useMemo, useEffect } from 'react';
import type { Tag } from '../data/tags';
import { MENU } from '../data/menu';

const FAVORITES_KEY = 'eatwhat-favorites';

function loadFavorites(): Set<string> {
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      return new Set(JSON.parse(stored));
    }
  } catch {}
  return new Set();
}

function saveFavorites(ids: Set<string>) {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([...ids]));
  } catch {}
}

export function useMenu() {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(() => loadFavorites());
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const filteredMenu = useMemo(() => {
    let result = MENU;
    if (showFavoritesOnly) {
      result = result.filter(item => favorites.has(item.id));
    } else if (selectedTags.length > 0) {
      result = result.filter(item => 
        item.tags.some(tag => selectedTags.includes(tag))
      );
    }
    return result;
  }, [selectedTags, favorites, showFavoritesOnly]);

  const toggleTag = (tag: Tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearTags = () => setSelectedTags([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const isFavorite = (id: string) => favorites.has(id);

  return { 
    filteredMenu, 
    selectedTags, 
    toggleTag, 
    clearTags,
    favorites,
    toggleFavorite,
    isFavorite,
    showFavoritesOnly,
    setShowFavoritesOnly
  };
}