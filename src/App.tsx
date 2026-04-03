import { useState } from 'react';
import DecisionPage from './components/DecisionPage';
import MenuPage from './components/MenuPage';
import HistoryPage from './components/HistoryPage';
import FloatingBall from './components/FloatingBall';
import { useHistory } from './hooks/useHistory';
import { useMenu } from './hooks/useMenu';

type Tab = 'decision' | 'menu' | 'history';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('decision');
  const { history, addHistory, clearHistory } = useHistory();
  const { 
    filteredMenu, 
    selectedTags, 
    toggleTag, 
    clearTags,
    toggleFavorite,
    isFavorite,
    showFavoritesOnly,
    setShowFavoritesOnly,
    favorites,
  } = useMenu();

  const handleDecide = (result: string, mode: 'dice' | 'wheel' | 'elimination') => {
    addHistory(mode, result);
    setActiveTab('history');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <header className="h-0" />

      <main className="flex-1 overflow-auto pb-20">
        {activeTab === 'decision' && (
          <DecisionPage
            filteredMenu={filteredMenu}
            onDecide={handleDecide}
          />
        )}
        {activeTab === 'menu' && (
          <MenuPage
            filteredMenu={filteredMenu}
            selectedTags={selectedTags}
            toggleTag={toggleTag}
            clearTags={clearTags}
            onDecide={(name) => handleDecide(name, 'wheel')}
            isFavorite={isFavorite}
            toggleFavorite={toggleFavorite}
          />
        )}
        {activeTab === 'history' && (
          <HistoryPage history={history} clearHistory={clearHistory} />
        )}
      </main>

      <FloatingBall
        selectedTags={selectedTags}
        toggleTag={toggleTag}
        clearTags={clearTags}
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
        favoritesCount={favorites.size}
      />

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 safe-area-bottom">
        {[
          { id: 'decision' as Tab, icon: '🎲', label: '决策' },
          { id: 'menu' as Tab, icon: '📋', label: '菜单' },
          { id: 'history' as Tab, icon: '📜', label: '记录' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all ${
              activeTab === tab.id
                ? 'text-[#FF6B6B] bg-[#FF6B6B]/10'
                : 'text-[#636E72]'
            }`}
          >
            <span className="text-2xl">{tab.icon}</span>
            <span className="text-xs mt-1 font-medium">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}