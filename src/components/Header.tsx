import React, { useState } from 'react';
import { Search, Compass, Menu, X, GitBranch, Scroll, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenSearch: () => void;
  onSalemPathClick?: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onOpenSearch,
  onSalemPathClick,
  theme = 'dark',
  onToggleTheme
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isLight = theme === 'light';

  const navItems = [
    { label: 'الرئيسية', path: '/' },
    { label: 'شجرة آل سالم', path: '/tree' },
    { label: 'الشجرة الكاملة', path: '/tree/full' },
    { label: 'تاريخ صيعر', path: '/history' },
    { label: 'المراجع', path: '/references' },
    { label: 'عن المشروع', path: '/about' }
  ];

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#06100D]/95 backdrop-blur-md border-b border-[#C5A96A]/25 transition-all no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo & Brand */}
        <button
          onClick={() => handleNav('/')}
          className="flex items-center gap-3 group text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A96A] rounded-lg p-1"
          aria-label="الصفحة الرئيسية — شجرة آل سالم"
        >
          {/* Authentic Minimal Vector Logo: Tree Roots + Lineage Line */}
          <div className="w-11 h-11 rounded-xl bg-[#0B1714] border border-[#C5A96A]/40 flex items-center justify-center p-2 shadow-inner group-hover:border-[#C5A96A] transition-colors shrink-0">
            <svg viewBox="0 0 40 40" fill="none" className="w-full h-full text-[#C5A96A]">
              <path
                d="M20 6V34M20 14L10 22M20 22L30 30M20 19L13 24M20 27L27 32"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="20" cy="7" r="3" fill="currentColor" />
              <circle cx="10" cy="22" r="1.8" fill="currentColor" opacity="0.8" />
              <circle cx="30" cy="30" r="1.8" fill="currentColor" opacity="0.8" />
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-xl sm:text-2xl font-bold text-[#F3EFE5] group-hover:text-[#C5A96A] transition-colors block leading-snug font-heritage">
              شجرة آل سالم
            </span>
            <span className="text-xs text-[#C5A96A] block font-medium mt-0.5">
              قبيلة صيعر الكندية
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-[#C5A96A] bg-[#10221E] border border-[#C5A96A]/30 shadow-sm'
                    : 'text-[#F3EFE5]/80 hover:text-[#F3EFE5] hover:bg-[#0B1714]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Salem Path Trigger Button */}
          <button
            onClick={() => {
              if (onSalemPathClick) {
                onSalemPathClick();
              } else {
                onNavigate('/tree?reveal=salem');
              }
            }}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#10221E] hover:bg-[#162e29] border border-[#C5A96A]/40 text-[#C5A96A] text-xs sm:text-sm font-medium transition-all shadow-sm group hover:border-[#C5A96A]"
            title="تتبع مسار آل سالم المعتمد"
          >
            <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300 text-[#C5A96A]" />
            <span>مسار آل سالم</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0B1714] border border-[#C5A96A]/20 hover:border-[#C5A96A]/60 text-[#A39D8F] hover:text-[#F3EFE5] transition-all"
            aria-label="بحث في الأسماء والتاريخ والمراجع"
            title="بحث (Ctrl+K)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Theme Toggle Button (Light/Dark Mode) */}
          {onToggleTheme && (
            <button
              onClick={onToggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0B1714] border border-[#C5A96A]/20 hover:border-[#C5A96A]/60 text-[#A39D8F] hover:text-[#C5A96A] transition-all group"
              aria-label={isLight ? 'التبديل إلى الوضع الليلي الملكي' : 'التبديل إلى الوضع الرملي الفاخر'}
              title={isLight ? 'التبديل إلى الوضع الليلي' : 'التبديل إلى الوضع الرملي الفاخر'}
            >
              {isLight ? (
                <Moon className="w-4 h-4 text-[#C5A96A] group-hover:-rotate-12 transition-transform duration-300" />
              ) : (
                <Sun className="w-4 h-4 text-[#C5A96A] group-hover:rotate-45 transition-transform duration-300" />
              )}
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-[#0B1714] border border-[#C5A96A]/20 text-[#A39D8F] hover:text-[#F3EFE5] transition-colors"
            aria-label="فتح القائمة"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0B1714] border-b border-[#C5A96A]/20 px-4 py-4 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`w-full text-right px-4 py-3 rounded-lg text-base font-medium flex items-center justify-between ${
                  isActive
                    ? 'text-[#C5A96A] bg-[#10221E] border border-[#C5A96A]/30'
                    : 'text-[#F3EFE5]/80 hover:bg-[#10221E]/60'
                }`}
              >
                <span>{item.label}</span>
                {item.path === '/tree' && <GitBranch className="w-4 h-4 text-[#C5A96A]/60" />}
                {item.path === '/history' && <Scroll className="w-4 h-4 text-[#C5A96A]/60" />}
              </button>
            );
          })}

          {/* Mobile Theme Toggle Row */}
          {onToggleTheme && (
            <div className="pt-2 border-t border-[#19312A] flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#10221E]/60 border border-[#C5A96A]/20">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-[#F3EFE5]">
                {isLight ? <Sun className="w-4 h-4 text-[#C5A96A]" /> : <Moon className="w-4 h-4 text-[#C5A96A]" />}
                <span>المظهر: {isLight ? 'الرملي الفاخر' : 'الليلي الملكي'}</span>
              </div>
              <button
                onClick={onToggleTheme}
                className="px-3 py-1.5 rounded-lg bg-[#0B1714] border border-[#C5A96A]/40 text-xs text-[#C5A96A] font-medium hover:border-[#C5A96A] transition-colors"
              >
                {isLight ? 'تفعيل الليلي' : 'تفعيل الرملي'}
              </button>
            </div>
          )}

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onSalemPathClick) {
                  onSalemPathClick();
                } else {
                  onNavigate('/tree?reveal=salem');
                }
              }}
              className="w-full text-center py-3 rounded-lg bg-[#10221E] border border-[#C5A96A]/40 text-[#C5A96A] font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>تتبع مسار آل سالم المعتمد</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
