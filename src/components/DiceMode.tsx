import { useState } from 'react';
import type { FoodItem } from '../data/menu';

interface Props {
  items: FoodItem[];
  onResult: (name: string) => void;
}

export default function DiceMode({ items, onResult }: Props) {
  const [isOpening, setIsOpening] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [boxState, setBoxState] = useState<'closed' | 'opening' | 'open'>('closed');

  const openBox = () => {
    if (isOpening || items.length === 0) return;

    setIsOpening(true);
    setResult(null);
    setBoxState('opening');

    const randomIndex = Math.floor(Math.random() * items.length);
    const selectedItem = items[randomIndex];

    setTimeout(() => {
      setResult(selectedItem?.name || null);
      setBoxState('open');
      setIsOpening(false);
    }, 1000);
  };

  const confirmResult = () => {
    if (result) {
      onResult(result);
      setResult(null);
      setBoxState('closed');
    }
  };

  const resetBox = () => {
    setResult(null);
    setBoxState('closed');
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">🎁</div>
        <div className="text-[#636E72] text-center">
          还没有选项，请先去菜单页筛选
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48 mb-8">
        {boxState === 'closed' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              className={`text-8xl cursor-pointer transition-transform ${isOpening ? 'animate-wiggle' : 'hover:scale-110'}`}
              onClick={openBox}
            >
              <div className="relative">
                <div className="text-[#8B4513]">📦</div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-2xl">🎀</div>
              </div>
            </div>
          </div>
        )}

        {boxState === 'opening' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-8xl animate-open">
              <div className="relative">
                <div className="text-[#8B4513] animate-lid-rise">📦</div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-2xl animate-lid-fly">🎀</div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-5xl animate-content-rise">✨</div>
            </div>
          </div>
        )}

        {boxState === 'open' && result && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-6xl mb-4 animate-bounce-in">🎁</div>
            <div className="bg-[#FFE66D] text-[#2D3436] px-6 py-3 rounded-2xl text-xl font-bold shadow-xl animate-pop-up">
              🎉 {result}
            </div>
          </div>
        )}
      </div>

      <div className="text-sm text-[#636E72] mb-6 text-center">
        共 {items.length} 个选项，随机抽取一个
      </div>

      {boxState === 'closed' && (
        <button
          onClick={openBox}
          disabled={isOpening}
          className={`px-10 py-4 rounded-2xl text-lg font-bold shadow-lg transition-all ${
            isOpening
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white hover:shadow-xl hover:scale-105 active:scale-95'
          }`}
        >
          {isOpening ? '✨ 开箱中...' : '🎁 开盲盒'}
        </button>
      )}

      {boxState === 'open' && (
        <div className="text-center mt-4">
          <div className="flex gap-3">
            <button
              onClick={resetBox}
              className="px-6 py-3 bg-white text-[#FF6B6B] border-2 border-[#FF6B6B] rounded-xl font-medium hover:bg-[#FF6B6B]/10 active:scale-95 transition-all"
            >
              再开一个
            </button>
            <button
              onClick={confirmResult}
              className="px-6 py-3 bg-[#4ECDC4] text-white rounded-xl font-medium hover:bg-[#3dbdb5] active:scale-95 transition-all"
            >
              就吃这个！
            </button>
          </div>
        </div>
      )}
    </div>
  );
}