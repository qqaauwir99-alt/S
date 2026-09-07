import React, { useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Printer, ArrowRight, GitBranch } from 'lucide-react';
import { genealogyTree } from '../data/genealogy';
import { GenealogyNode } from '../types';

interface FullTreePageProps {
  onNavigate: (path: string) => void;
}

export const FullTreePage: React.FC<FullTreePageProps> = ({ onNavigate }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(0.85);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.15, 1.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.15, 0.45));
  const handleResetZoom = () => setZoomLevel(0.85);

  const handlePrint = () => {
    window.print();
  };

  // Render node in full overview mode (all nodes expanded)
  const renderFullNode = (node: GenealogyNode) => {
    const isSalem = node.id === 'marai-salem';
    const isSayaar = node.id === 'alashmoos-sayaar';
    const isLocked = node.locked;

    return (
      <div key={node.id} className="flex flex-col items-center">
        {/* Node Pill */}
        <div
          className={`px-3 py-1.5 rounded-lg border text-center transition-all min-w-[110px] max-w-[150px] shadow-sm ${
            isSalem
              ? 'bg-[#19312A] border-[#C5A96A] text-[#F3EFE5] font-bold ring-1 ring-[#C5A96A]/40'
              : isSayaar
              ? 'bg-[#10221E] border-[#C5A96A] text-[#C5A96A] font-bold'
              : isLocked
              ? 'bg-[#0B1714]/60 border-[#19312A] text-[#A39D8F]/60 text-xs'
              : 'bg-[#0B1714] border-[#C5A96A]/30 text-[#F3EFE5] text-xs font-semibold'
          }`}
        >
          <div className="font-heritage truncate">{node.name}</div>
          {node.badge && (
            <span className="text-[9px] px-1 rounded bg-[#C5A96A]/20 text-[#C5A96A]">
              {node.badge}
            </span>
          )}
        </div>

        {/* Children connections */}
        {node.children.length > 0 && (
          <div className="flex flex-col items-center w-full">
            {/* Vertical connector */}
            <div className="w-0.5 h-4 bg-[#C5A96A]/50" />

            {node.children.length === 1 ? (
              <div className="flex flex-col items-center">
                {renderFullNode(node.children[0])}
              </div>
            ) : (
              <div className="flex flex-col items-center w-full">
                {/* Horizontal bar */}
                <div className="flex w-full">
                  <div className="w-1/2 h-0.5 bg-transparent" />
                  <div className="w-full h-0.5 bg-[#C5A96A]/50" />
                  <div className="w-1/2 h-0.5 bg-transparent" />
                </div>
                {/* Children horizontal list */}
                <div className="flex items-start justify-center gap-2 pt-0.5">
                  {node.children.map((child) => (
                    <div key={child.id} className="flex flex-col items-center">
                      <div className="w-0.5 h-3 bg-[#C5A96A]/50 mb-0.5" />
                      {renderFullNode(child)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#06100D] text-[#F3EFE5] pb-20 text-right" dir="rtl">
      
      {/* Top Controls Bar */}
      <section className="sticky top-20 z-30 w-full bg-[#0B1714]/95 backdrop-blur-md border-b border-[#C5A96A]/20 py-3 px-4 sm:px-8 flex flex-wrap items-center justify-between gap-4 no-print shadow-md">
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('/tree')}
            className="p-2 rounded-lg bg-[#10221E] hover:bg-[#162e29] border border-[#19312A] text-[#F3EFE5] transition-colors flex items-center gap-1.5 text-xs sm:text-sm font-medium"
          >
            <ArrowRight className="w-4 h-4 text-[#C5A96A]" />
            <span>العودة للشجرة التفاعلية</span>
          </button>
          <div className="h-5 w-px bg-[#19312A] hidden sm:block" />
          <h2 className="text-base sm:text-lg font-bold text-[#F3EFE5] font-heritage hidden sm:block">
            عرض شجرة آل سالم الكاملة
          </h2>
        </div>

        {/* Zoom & Print Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <div className="flex items-center bg-[#10221E] border border-[#19312A] rounded-lg p-0.5 text-xs text-[#A39D8F]">
            <button
              onClick={handleZoomIn}
              className="p-1.5 hover:text-[#C5A96A] transition-colors"
              title="تكبير"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <span className="px-2 font-mono">{Math.round(zoomLevel * 100)}%</span>
            <button
              onClick={handleZoomOut}
              className="p-1.5 hover:text-[#C5A96A] transition-colors"
              title="تصغير"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="p-1.5 hover:text-[#C5A96A] transition-colors border-r border-[#19312A]"
              title="إعادة ضبط"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Print / Save PDF button */}
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-lg bg-[#19312A] hover:bg-[#203f36] border border-[#C5A96A]/50 text-xs sm:text-sm text-[#C5A96A] font-semibold flex items-center gap-2 transition-all shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>حفظ / طباعة الشجرة (PDF)</span>
          </button>
        </div>

      </section>

      {/* Print-only Banner */}
      <div className="hidden print-only text-center py-6 border-b border-black">
        <h1 className="text-2xl font-bold font-heritage">شجرة آل سالم — قبيلة صيعر الكندية</h1>
        <p className="text-sm font-amiri mt-1">سلسلة النسب الكاملة المعتمدة من قحطان حتى آل سالم</p>
      </div>

      {/* Overview Canvas with Zoom */}
      <div className="overflow-auto max-w-full p-6 sm:p-12 min-h-[700px] flex justify-center">
        <div
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: 'top center',
            transition: 'transform 0.15s ease-out'
          }}
          className="inline-block pt-4 pb-20"
        >
          {renderFullNode(genealogyTree)}
        </div>
      </div>

    </div>
  );
};
