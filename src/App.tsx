import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { HomePage } from './pages/HomePage';
import { TreePage } from './pages/TreePage';
import { FullTreePage } from './pages/FullTreePage';
import { HistoryPage } from './pages/HistoryPage';
import { ReferencesPage } from './pages/ReferencesPage';
import { AboutPage } from './pages/AboutPage';
import { SearchResult } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [revealSalemTrigger, setRevealSalemTrigger] = useState(false);
  const [targetNodeId, setTargetNodeId] = useState<string | null>(() => {
    return typeof window !== 'undefined' && window.location.hash
      ? window.location.hash.replace('#', '')
      : null;
  });

  // Safe theme state management with localStorage and system preference detection
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('sayeer_theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    } catch {
      // Graceful fallback in sandboxed iframe or private storage restrictions
    }
    return 'dark';
  });

  // Apply theme to DOM and persist
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      root.setAttribute('data-theme', 'dark');
    }

    try {
      localStorage.setItem('sayeer_theme', theme);
    } catch {
      // Storage exceptions ignored safely
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigate = (pathWithHash: string) => {
    const [path, hash] = pathWithHash.split('#');
    const targetPath = path || '/';

    if (window.location.pathname !== targetPath || hash) {
      const fullUrl = hash ? `${targetPath}#${hash}` : targetPath;
      window.history.pushState({}, '', fullUrl);
    }

    if (hash) {
      setTargetNodeId(hash);
    } else {
      setTargetNodeId(null);
    }

    setCurrentPath(targetPath);
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash) || document.getElementById(`tree-node-${hash}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 250);
    }
  };

  const handleRevealSalem = () => {
    navigate('/tree');
    setRevealSalemTrigger(true);
    // Reset trigger after activation
    setTimeout(() => {
      setRevealSalemTrigger(false);
    }, 500);
  };

  const handleSelectSearchResult = (result: SearchResult) => {
    navigate(result.targetPath);
  };

  // Render Page Content based on currentPath
  const renderCurrentPage = () => {
    switch (currentPath) {
      case '/tree':
        return (
          <TreePage
            onNavigate={navigate}
            onOpenSearch={() => setIsSearchOpen(true)}
            initialRevealSalem={revealSalemTrigger}
            targetNodeId={targetNodeId}
          />
        );
      case '/tree/full':
        return <FullTreePage onNavigate={navigate} />;
      case '/history':
        return <HistoryPage onNavigate={navigate} />;
      case '/references':
        return <ReferencesPage onNavigate={navigate} />;
      case '/about':
        return <AboutPage onNavigate={navigate} />;
      case '/':
      default:
        return (
          <HomePage
            onNavigate={navigate}
            onRevealSalem={handleRevealSalem}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#06100D] text-[#F3EFE5] font-sans selection:bg-[#C5A96A]/30 selection:text-[#F3EFE5] transition-colors duration-200">
      {/* Royal Header */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSalemPathClick={handleRevealSalem}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Routed Page wrapped in ErrorBoundary */}
      <main className="flex-1">
        <ErrorBoundary fallbackTitle="حدث تنبيه في عرض المحتوى">
          {renderCurrentPage()}
        </ErrorBoundary>
      </main>

      {/* Royal Footer */}
      <Footer onNavigate={navigate} />

      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={handleSelectSearchResult}
      />
    </div>
  );
}
