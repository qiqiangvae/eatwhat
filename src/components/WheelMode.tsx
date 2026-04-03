import { useState, useEffect, useRef } from 'react';
import type { FoodItem } from '../data/menu';

interface Props {
  items: FoodItem[];
  onResult: (name: string) => void;
}

export default function WheelMode({ items, onResult }: Props) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayItems, setDisplayItems] = useState<FoodItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (items.length > 0 && displayItems.length === 0) {
      setDisplayItems(items);
    }
  }, [items, displayItems.length]);

  const startSpin = () => {
    if (isSpinning || items.length === 0) return;

    setIsSpinning(true);
    setResult(null);

    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setDisplayItems(shuffled);
    setCurrentIndex(0);

    const duration = 3000 + Math.random() * 2000;
    const totalSpins = 20 + Math.floor(Math.random() * 10);
    const finalIndex = Math.floor(Math.random() * items.length);

    let spinCount = 0;
    const itemCount = shuffled.length;

    intervalRef.current = window.setInterval(() => {
      spinCount++;
      
      if (spinCount >= totalSpins) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setCurrentIndex(finalIndex);
        setResult(shuffled[finalIndex]?.name || null);
        setIsSpinning(false);
      } else {
        setCurrentIndex((prev) => (prev + 1) % itemCount);
      }
    }, duration / totalSpins);
  };

  const confirmResult = () => {
    if (result) {
      onResult(result);
      setResult(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-6xl mb-4">🎰</div>
        <div className="text-[#636E72] text-center">
          还没有选项，请先去菜单页筛选
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-4">
      <div className="relative w-full max-w-xs">
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#FAFAFA] to-transparent z-10 pointer-events-none rounded-t-2xl" />
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#FAFAFA] to-transparent z-10 pointer-events-none rounded-b-2xl" />
        
        <div
          ref={scrollRef}
          className="bg-gradient-to-b from-[#FFF5F5] to-[#FFF0F0] rounded-2xl p-4 overflow-hidden h-64 flex flex-col border-4 border-[#FF6B6B]/20"
        >
          <div className="flex-1 flex flex-col justify-center items-center relative">
            {displayItems.map((item, index) => {
              const offset = (index - currentIndex + displayItems.length) % displayItems.length;
              const isCenter = offset === 0;
              const isNear = offset === 1 || offset === displayItems.length - 1;

              return (
                <div
                  key={item.id}
                  className={`absolute transition-all duration-200 ease-out ${
                    isCenter ? 'scale-110' : isNear ? 'scale-90 opacity-60' : 'scale-75 opacity-30'
                  }`}
                  style={{
                    transform: `translateY(${(offset - 1) * 60}px)`,
                  }}
                >
                  <div
                    className={`px-6 py-3 rounded-xl text-center font-bold whitespace-nowrap ${
                      isCenter
                        ? 'bg-[#FFE66D] text-[#2D3436] shadow-lg shadow-[#FFE66D]/50 animate-pulse'
                        : 'bg-[#FF6B6B]/10 text-[#636E72]'
                    }`}
                  >
                    {isCenter && <span className="mr-2">👉</span>}
                    {item.name}
                    {isCenter && <span className="ml-2">👈</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-[#FF6B6B] z-20" style={{ filter: 'drop-shadow(0 0 4px rgba(255,107,107,0.5))' }} />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-[#FF6B6B] z-20" style={{ filter: 'drop-shadow(0 0 4px rgba(255,107,107,0.5))' }} />
      </div>

      <div className="text-sm text-[#636E72] mt-4 text-center">
        共 {items.length} 个选项参与抽奖
      </div>

      {!result ? (
        <button
          onClick={startSpin}
          disabled={isSpinning}
          className={`mt-6 px-12 py-4 rounded-2xl text-xl font-bold shadow-lg transition-all ${
            isSpinning
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white hover:shadow-xl hover:scale-105 active:scale-95'
          }`}
        >
          {isSpinning ? '🎲 滚动中...' : '🎲 开始抽奖'}
        </button>
      ) : (
        <div className="text-center mt-6">
          <div className="bg-gradient-to-r from-[#FFE66D] to-[#FF8E53] text-[#2D3436] px-8 py-4 rounded-2xl text-2xl font-bold mb-4 shadow-xl animate-bounce">
            🎉 {result}
          </div>
          <div className="flex gap-3">
            <button
              onClick={startSpin}
              className="px-6 py-3 bg-white text-[#FF6B6B] border-2 border-[#FF6B6B] rounded-xl font-medium hover:bg-[#FF6B6B]/10 active:scale-95 transition-all"
            >
              再来一次
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