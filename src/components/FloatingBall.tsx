import { useState } from 'react';
import type { Tag } from '../data/tags';
import { TAGS } from '../data/tags';

interface Props {
  selectedTags: Tag[];
  toggleTag: (tag: Tag) => void;
  clearTags: () => void;
}

export default function FloatingBall({ selectedTags, toggleTag, clearTags }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 bottom-24 w-14 h-14 bg-[#4ECDC4] rounded-full shadow-lg flex items-center justify-center text-white text-2xl z-50 hover:scale-105 active:scale-95 transition-all"
      >
        🔍
        {selectedTags.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF6B6B] rounded-full text-xs flex items-center justify-center font-medium">
            {selectedTags.length}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed right-4 bottom-36 w-64 max-h-80 bg-white rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col">
            <div className="p-3 border-b border-gray-100 flex items-center justify-between">
              <span className="font-medium text-[#2D3436]">筛选标签</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-[#636E72] hover:text-[#2D3436]"
              >
                ✕
              </button>
            </div>
            <div className="p-3 overflow-y-auto flex-1">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={clearTags}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all
                    ${selectedTags.length === 0
                      ? 'bg-[#FF6B6B] text-white'
                      : 'bg-gray-100 text-[#636E72] hover:bg-gray-200'
                    }
                  `}
                >
                  全部
                </button>
                {TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all
                      ${selectedTags.includes(tag)
                        ? 'bg-[#4ECDC4] text-white'
                        : 'bg-gray-100 text-[#636E72] hover:bg-gray-200'
                      }
                    `}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}