import { useState, useMemo } from 'react';
import type { Tag } from '../data/tags';
import { MENU } from '../data/menu';

export function useMenu() {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const filteredMenu = useMemo(() => {
    if (selectedTags.length === 0) return MENU;
    return MENU.filter(item => 
      item.tags.some(tag => selectedTags.includes(tag))
    );
  }, [selectedTags]);

  const toggleTag = (tag: Tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearTags = () => setSelectedTags([]);

  return { filteredMenu, selectedTags, toggleTag, clearTags };
}