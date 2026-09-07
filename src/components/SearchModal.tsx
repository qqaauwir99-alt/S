import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, X, GitBranch, BookOpen, Scroll, ArrowLeft } from 'lucide-react';
import { flattenGenealogyTree, normalizeArabic, genealogyTree } from '../data/genealogy';
import { historySections } from '../data/history';
import { referencesData } from '../data/references';
import { SearchResult } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult: (result: SearchResult) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectResult
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Pre-flatten tree once for rapid querying
  const allTreeItems = useMemo(() => flattenGenealogyTree(genealogyTree), []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Execute categorized normalized search
  const results = useMemo<SearchResult[]>(() => {
    const trimmed = query.trim();
    if (!trimmed) return [];

    const normQuery = normalizeArabic(trimmed);
    const searchResults: SearchResult[] = [];

    // 1. Search in Tree Names
    for (const item of allTreeItems) {
      const normName = normalizeArabic(item.node.name);
      const normContext = normalizeArabic(item.contextLabel);
      const normSubtitle = item.node.subtitle ? normalizeArabic(item.node.subtitle) : '';

      if (normName.includes(normQuery) || normContext.includes(normQuery) || normSubtitle.includes(normQuery)) {
        searchResults.push({
          id: item.node.id,
          title: item.node.name,
          subtitle: item.contextLabel !== item.node.name 
            ? item.contextLabel 
            : (item.node.subtitle || 'من سلسلة النسب'),
          type: 'tree',
          targetPath: `/tree#${item.node.id}`,
          nodeId: item.node.id
        });
      }
    }

    // 2. Search in History Sections
    for (const section of historySections) {
      const normTitle = normalizeArabic(section.title);
      const normSub = section.subtitle ? normalizeArabic(section.subtitle) : '';
      const normBody = section.content.map(c => normalizeArabic(c)).join(' ');

      if (normTitle.includes(normQuery) || normSub.includes(normQuery) || normBody.includes(normQuery)) {
        searchResults.push({
          id: section.id,
          title: section.title,
          subtitle: section.subtitle || section.category,
          type: 'history',
          targetPath: `/history#${section.id}`
        });
      }
    }

    // 3. Search in References
    for (const ref of referencesData) {
      const normTitle = normalizeArabic(ref.title);
      const normAuthor = normalizeArabic(ref.author);
      const normUsage = normalizeArabic(ref.usage);

      if (normTitle.includes(normQuery) || normAuthor.includes(normQuery) || normUsage.includes(normQuery)) {
        searchResults.push({
          id: ref.id,
          title: ref.title,
          subtitle: `${ref.author} • ${ref.field}`,
          type: 'reference',
          targetPath: `/references#${ref.id}`
        });
      }
    }

    return searchResults.slice(0, 25);
  }, [query, allTreeItems]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1 < results.length ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 >= 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      onSelectResult(results[selectedIndex]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#0B1714] border border-[#C5A96A]/30 rounded-2xl shadow-2xl overflow-hidden text-right flex flex-col max-h-[80vh] animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Header Input */}
        <div className="relative border-b border-[#C5A96A]/20 p-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#C5A96A] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="ابحث في الأسماء، التاريخ، المراجع (مثال: سالم، ريدة، الإكليل)..."
            className="w-full bg-transparent text-[#F3EFE5] placeholder-[#A39D8F]/60 text-base sm:text-lg focus:outline-none"
            dir="rtl"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#A39D8F] hover:text-[#F3EFE5] rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-xs text-[#A39D8F]/60 bg-[#10221E] border border-[#19312A] rounded">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 space-y-1 flex-1">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-[#A39D8F]/70 text-sm space-y-2">
              <p>اكتب اسمًا أو موضعًا تاريخيًا أو مرجعًا للاستكشاف.</p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
                {['سالم', 'صيعر', 'خالد', 'ريدة الصيعر', 'الإكليل', 'الإبل الصيعرية'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 rounded-full bg-[#10221E] hover:bg-[#162e29] border border-[#C5A96A]/20 text-xs text-[#C5A96A] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-[#A39D8F] text-sm">
              لم يتم العثور على نتائج تطابق &quot;{query}&quot;
            </div>
          ) : (
            results.map((result, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={`${result.type}-${result.id}-${idx}`}
                  onClick={() => {
                    onSelectResult(result);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-right p-3.5 rounded-xl transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#10221E] border border-[#C5A96A]/40 text-[#F3EFE5]'
                      : 'text-[#F3EFE5]/80 hover:bg-[#06100D]/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        result.type === 'tree'
                          ? 'bg-[#19312A] text-[#C5A96A]'
                          : result.type === 'history'
                          ? 'bg-[#2A2416] text-[#E0CA94]'
                          : 'bg-[#1A2634] text-[#8CB4F5]'
                      }`}
                    >
                      {result.type === 'tree' && <GitBranch className="w-4 h-4" />}
                      {result.type === 'history' && <Scroll className="w-4 h-4" />}
                      {result.type === 'reference' && <BookOpen className="w-4 h-4" />}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-base text-[#F3EFE5] group-hover:text-[#C5A96A] transition-colors">
                          {result.title}
                        </span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full border ${
                            result.type === 'tree'
                              ? 'border-[#C5A96A]/30 text-[#C5A96A] bg-[#C5A96A]/10'
                              : result.type === 'history'
                              ? 'border-[#E0CA94]/30 text-[#E0CA94] bg-[#E0CA94]/10'
                              : 'border-[#8CB4F5]/30 text-[#8CB4F5] bg-[#8CB4F5]/10'
                          }`}
                        >
                          {result.type === 'tree'
                            ? 'اسم في الشجرة'
                            : result.type === 'history'
                            ? 'موضوع تاريخي'
                            : 'مرجع'}
                        </span>
                      </div>
                      <p className="text-xs text-[#A39D8F] line-clamp-1 mt-0.5">
                        {result.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowLeft className="w-4 h-4 text-[#A39D8F] group-hover:text-[#C5A96A] -translate-x-1 group-hover:-translate-x-2 transition-transform shrink-0" />
                </button>
              );
            })
          )}
        </div>

        {/* Footer Hint */}
        <div className="p-3 border-t border-[#10221E] bg-[#06100D]/60 flex items-center justify-between text-xs text-[#A39D8F]/60">
          <span>التنقل بالأسهم • Enter للاختيار</span>
          <span>{results.length} نتيجة</span>
        </div>
      </div>
    </div>
  );
};
