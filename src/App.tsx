import { useState, useEffect } from 'react';
import { ThemeMode } from '@/types/collectable.types';
import { mockCollectables } from '@/services/mockCollectables';
import { ThemeDock } from '@/components/common/ThemeDock/ThemeDock';
import { Header } from '@/components/layout/Header/Header';
import { DiagnosticsOverview } from '@/components/diagnostics/DiagnosticsOverview';

export function App() {
  const [theme, setTheme] = useState<ThemeMode>('vault');
  const [searchQuery, setSearchQuery] = useState('');

  // Sync theme with html root data-theme attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="app-container" data-theme={theme}>
      {/* Floating frosted-glass Theme Dock */}
      <ThemeDock
        activeTheme={theme}
        onThemeChange={setTheme}
        itemCount={mockCollectables.length}
      />

      {/* Main Storefront Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content: Phase 1 Diagnostics Overview */}
      <main>
        <DiagnosticsOverview
          theme={theme}
          items={mockCollectables}
          searchQuery={searchQuery}
        />
      </main>
    </div>
  );
}

export default App;
