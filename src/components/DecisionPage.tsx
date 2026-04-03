import { useState } from 'react';
import type { FoodItem } from '../data/menu';
import type { GameMode } from '../types';
import DiceMode from './DiceMode';
import WheelMode from './WheelMode';
import EliminationMode from './EliminationMode';

interface Props {
  filteredMenu: FoodItem[];
  onDecide: (result: string, mode: GameMode) => void;
}

type Mode = 'dice' | 'wheel' | 'elimination';

export default function DecisionPage({ filteredMenu, onDecide }: Props) {
  const [mode, setMode] = useState<Mode>('wheel');

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4 bg-white rounded-2xl p-2 shadow-sm">
        {[
          { id: 'dice' as Mode, icon: '🎁', label: '盲盒' },
          { id: 'wheel' as Mode, icon: '🎰', label: '随便' },
          { id: 'elimination' as Mode, icon: '⚔️', label: '淘汰' },
        ].map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`flex-1 py-3 px-2 rounded-xl flex flex-col items-center transition-all ${
              mode === m.id
                ? 'bg-[#FF6B6B] text-white shadow-md'
                : 'text-[#636E72] hover:bg-gray-100'
            }`}
          >
            <span className="text-2xl">{m.icon}</span>
            <span className="text-sm font-medium mt-1">{m.label}</span>
          </button>
        ))}
      </div>

      <div className="text-center text-[#636E72] text-sm mb-4">
        当前 {filteredMenu.length} 个选项
      </div>

      {mode === 'dice' && (
        <DiceMode items={filteredMenu} onResult={(name) => onDecide(name, 'dice')} />
      )}
      {mode === 'wheel' && (
        <WheelMode items={filteredMenu} onResult={(name) => onDecide(name, 'wheel')} />
      )}
      {mode === 'elimination' && (
        <EliminationMode items={filteredMenu} onResult={(name) => onDecide(name, 'elimination')} />
      )}
    </div>
  );
}