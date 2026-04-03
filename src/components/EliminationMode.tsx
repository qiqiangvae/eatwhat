import { useState, useMemo } from 'react';
import type { FoodItem } from '../data/menu';

interface Props {
  items: FoodItem[];
  onResult: (name: string) => void;
}

export default function EliminationMode({ items, onResult }: Props) {
  const [participants, setParticipants] = useState<FoodItem[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentMatch, setCurrentMatch] = useState(0);
  const [selectedForNext, setSelectedForNext] = useState<FoodItem[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [finalWinner, setFinalWinner] = useState<string | null>(null);

  const rounds = useMemo(() => {
    if (participants.length === 0) return [];
    const count = participants.length;
    const roundCount = Math.ceil(Math.log2(count));
    const bracket: FoodItem[][] = [];
    
    let current = [...participants];
    for (let i = 0; i < roundCount; i++) {
      const next: FoodItem[] = [];
      for (let j = 0; j < current.length; j += 2) {
        if (j + 1 < current.length) {
          next.push(current[j]);
        } else {
          next.push(current[j]);
        }
      }
      bracket.push(current);
      current = next;
    }
    bracket.push(current);
    return bracket;
  }, [participants]);

  const currentRoundMatches = useMemo(() => {
    if (rounds.length === 0) return [];
    const round = rounds[currentRound];
    const matches: [FoodItem, FoodItem][] = [];
    for (let i = 0; i < round.length; i += 2) {
      if (i + 1 < round.length) {
        matches.push([round[i], round[i + 1]]);
      } else {
        matches.push([round[i], round[i]]);
      }
    }
    return matches;
  }, [rounds, currentRound]);

  const startGame = (size: 8 | 16 | 32) => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setParticipants(shuffled.slice(0, size));
    setCurrentRound(0);
    setCurrentMatch(0);
    setSelectedForNext([]);
    setShowResult(false);
    setFinalWinner(null);
  };

  const selectWinner = (winner: FoodItem) => {
    const nextMatch = currentMatch + 1;
    const newSelected = [...selectedForNext, winner];

    if (nextMatch >= currentRoundMatches.length) {
      if (currentRound >= rounds.length - 2) {
        setFinalWinner(winner.name);
        setShowResult(true);
      } else {
        setSelectedForNext(newSelected);
        setCurrentRound(currentRound + 1);
        setCurrentMatch(0);
        setSelectedForNext([]);
      }
    } else {
      setSelectedForNext(newSelected);
      setCurrentMatch(nextMatch);
    }
  };

  const confirmResult = () => {
    if (finalWinner) {
      onResult(finalWinner);
    }
  };

  if (participants.length === 0) {
    return (
      <div className="flex flex-col items-center py-8">
        <div className="text-6xl mb-4">⚔️</div>
        <div className="text-lg text-[#636E72] mb-6 text-center">
          选择参赛数量开始淘汰赛
        </div>
        <div className="flex gap-3">
          {[8, 16, 32].map(size => (
            <button
              key={size}
              onClick={() => startGame(size as 8 | 16 | 32)}
              disabled={items.length < size}
              className={`px-6 py-3 rounded-xl font-medium transition-all
                ${items.length < size
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-[#FF6B6B] text-white hover:bg-[#ff5252] active:scale-95'
                }
              `}
            >
              {size} 强
            </button>
          ))}
        </div>
        {items.length === 0 && (
          <div className="text-[#636E72] text-sm mt-4">
            请先去菜单页筛选足够的选项
          </div>
        )}
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="flex flex-col items-center py-8">
        <div className="text-6xl mb-4">🏆</div>
        <div className="text-2xl text-[#636E72] mb-2">冠军</div>
        <div className="bg-[#FFE66D] text-[#2D3436] px-8 py-4 rounded-2xl text-2xl font-bold mb-6 shadow-lg animate-bounce-in">
          🎉 {finalWinner}
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setParticipants([])}
            className="px-6 py-3 bg-gray-200 text-[#636E72] rounded-xl font-medium hover:bg-gray-300 transition-all"
          >
            重新开始
          </button>
          <button
            onClick={confirmResult}
            className="px-6 py-3 bg-[#4ECDC4] text-white rounded-xl font-medium hover:bg-[#3dbdb5] active:scale-95 transition-all"
          >
            就吃这个！
          </button>
        </div>
      </div>
    );
  }

  const currentMatchData = currentRoundMatches[currentMatch];
  const isBye = currentMatchData && currentMatchData[0].id === currentMatchData[1].id;

  return (
    <div className="flex flex-col items-center py-4">
      <div className="text-sm text-[#636E72] mb-4">
        第 {currentRound + 1} 轮 · 第 {currentMatch + 1} / {currentRoundMatches.length} 场
      </div>

      {currentMatchData && (
        <div className="flex gap-4 mb-6">
          {isBye ? (
            <div className="text-center">
              <div className="bg-[#4ECDC4] text-white w-36 py-8 px-4 rounded-2xl text-lg font-bold shadow-lg">
                {currentMatchData[0].name}
              </div>
              <div className="text-xs text-[#636E72] mt-2">轮空晋级</div>
            </div>
          ) : (
            <>
              <button
                onClick={() => selectWinner(currentMatchData[0])}
                className="bg-white w-36 py-8 px-4 rounded-2xl text-lg font-bold shadow-lg hover:bg-[#FF6B6B] hover:text-white hover:scale-105 transition-all active:scale-95"
              >
                {currentMatchData[0].name}
              </button>
              <div className="flex items-center text-2xl text-[#636E72] font-bold">
                VS
              </div>
              <button
                onClick={() => selectWinner(currentMatchData[1])}
                className="bg-white w-36 py-8 px-4 rounded-2xl text-lg font-bold shadow-lg hover:bg-[#FF6B6B] hover:text-white hover:scale-105 transition-all active:scale-95"
              >
                {currentMatchData[1].name}
              </button>
            </>
          )}
        </div>
      )}

      <div className="text-xs text-[#636E72]">
        点击你喜欢的选项进行淘汰
      </div>
    </div>
  );
}