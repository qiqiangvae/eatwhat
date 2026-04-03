import type { FoodItem } from '../data/menu';
import type { Tag } from '../data/tags';
import { TAGS } from '../data/tags';

interface Props {
  filteredMenu: FoodItem[];
  selectedTags: Tag[];
  toggleTag: (tag: Tag) => void;
  clearTags: () => void;
  onDecide: (name: string) => void;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

export default function MenuPage({
  filteredMenu,
  selectedTags,
  toggleTag,
  clearTags,
  onDecide,
  isFavorite,
  toggleFavorite,
}: Props) {
  return (
    <div className="p-4">
      <div className="mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={clearTags}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0
              ${selectedTags.length === 0
                ? 'bg-[#FF6B6B] text-white'
                : 'bg-white text-[#636E72] hover:bg-gray-100'
              }
            `}
          >
            全部
          </button>
          {TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0
                ${selectedTags.includes(tag)
                  ? 'bg-[#4ECDC4] text-white'
                  : 'bg-white text-[#636E72] hover:bg-gray-100'
                }
              `}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="text-sm text-[#636E72] mb-4">
        共 {filteredMenu.length} 个选项
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filteredMenu.map(item => (
          <button
            key={item.id}
            onClick={() => onDecide(item.name)}
            className="bg-white p-4 rounded-2xl shadow-sm text-left hover:shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all relative"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(item.id);
              }}
              className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all"
            >
              <span className={`text-lg ${isFavorite(item.id) ? 'text-[#FF6B6B]' : 'text-gray-300'}`}>
                {isFavorite(item.id) ? '❤️' : '🤍'}
              </span>
            </button>
            <div className="font-medium text-[#2D3436] mb-1 truncate pr-8">
              {item.name}
            </div>
            <div className="flex flex-wrap gap-1">
              {item.tags.slice(0, 2).map(tag => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 bg-[#FFE66D]/30 text-[#636E72] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {filteredMenu.length === 0 && (
        <div className="text-center py-12 text-[#636E72]">
          <div className="text-4xl mb-4">📋</div>
          <div>没有匹配的选项</div>
          <button
            onClick={clearTags}
            className="mt-2 text-[#FF6B6B] underline"
          >
            清除筛选
          </button>
        </div>
      )}
    </div>
  );
}