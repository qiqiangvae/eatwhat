import type { HistoryItem } from '../types';

interface Props {
  history: HistoryItem[];
  clearHistory: () => void;
}

const MODE_LABELS = {
  dice: '🎲 骰子',
  wheel: '🎡 转盘',
  elimination: '⚔️ 淘汰',
};

export default function HistoryPage({ history, clearHistory }: Props) {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="p-4">
      {history.length > 0 && (
        <button
          onClick={clearHistory}
          className="text-sm text-[#FF6B6B] mb-4 hover:underline"
        >
          清空历史
        </button>
      )}

      {history.length === 0 ? (
        <div className="text-center py-12 text-[#636E72]">
          <div className="text-4xl mb-4">📜</div>
          <div>还没有决策记录</div>
          <div className="text-sm mt-1">快去决定今天吃什么吧！</div>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map(item => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#636E72]">
                  {MODE_LABELS[item.mode]}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-[#2D3436]">
                  {item.result}
                </span>
                <span className="text-xs text-[#636E72]">
                  {formatTime(item.timestamp)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}