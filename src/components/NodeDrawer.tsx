import React, { useState } from 'react';
import { X, Copy, Check, Share2, BookOpen, GitFork, ShieldCheck } from 'lucide-react';
import { GenealogyNode } from '../types';
import { buildLineageString } from '../data/genealogy';

interface NodeDrawerProps {
  node: GenealogyNode | null;
  ancestryPath: GenealogyNode[];
  isOpen: boolean;
  onClose: () => void;
  onNavigateToReferences: (refId?: string) => void;
}

export const NodeDrawer: React.FC<NodeDrawerProps> = ({
  node,
  ancestryPath,
  isOpen,
  onClose,
  onNavigateToReferences
}) => {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  if (!isOpen || !node) return null;

  const lineageString = buildLineageString(ancestryPath);

  const handleCopyLineage = async () => {
    try {
      await navigator.clipboard.writeText(lineageString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/tree#${node.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `سلسلة نسب ${node.name} — الصيعري`,
          text: lineageString,
          url: shareUrl
        });
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch {
        // User cancelled or not supported
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShared(true);
        setTimeout(() => setShared(false), 2500);
      } catch {
        // fallback
      }
    }
  };

  // Determine relation description
  let relationDescription = 'تسلسل أبوي مباشر';
  if (node.locked) {
    relationDescription = 'فرع قبلي جانبي (خارج المسار المعتمد)';
  } else if (node.relationType === 'tribal') {
    relationDescription = 'انتساب قبلي جامع (من الصدف)';
  } else if (node.category === 'tribe') {
    relationDescription = 'جد قبلي جامع للبطون';
  } else if (node.category === 'family') {
    relationDescription = 'المسار العائلي المعتمد (آل سالم)';
  }

  // Reference mapping if applicable
  let relevantRefId = 'jamharat-ansab';
  if (node.generation && node.generation >= 6 && node.generation <= 24) {
    relevantRefId = 'al-iklil';
  } else if (node.generation && node.generation > 24) {
    relevantRefId = 'shajarah-private-archive';
  }

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs pointer-events-auto transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container: Side Panel on Desktop (md:), Bottom Sheet on Mobile */}
      <div
        className="absolute bottom-0 md:bottom-auto md:top-0 md:left-0 md:right-auto md:h-full w-full md:w-[420px] bg-[#0B1714] border-t md:border-t-0 md:border-r border-[#C5A96A]/30 shadow-2xl pointer-events-auto flex flex-col max-h-[85vh] md:max-h-full rounded-t-3xl md:rounded-none animate-fadeIn overflow-hidden text-right"
        dir="rtl"
      >
        {/* Mobile Pull Bar */}
        <div className="md:hidden w-12 h-1.5 bg-[#C5A96A]/30 rounded-full mx-auto my-3 shrink-0" />

        {/* Header */}
        <div className="p-5 border-b border-[#C5A96A]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#10221E] border border-[#C5A96A]/40 flex items-center justify-center text-[#C5A96A]">
              <GitFork className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#F3EFE5] font-heritage leading-snug">
                {node.name}
              </h3>
              {node.subtitle && (
                <p className="text-xs text-[#C5A96A] font-medium mt-1 leading-normal">{node.subtitle}</p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#10221E] text-[#A39D8F] hover:text-[#F3EFE5] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 text-sm">
          
          {/* Badges / Meta */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-xl bg-[#10221E]/70 border border-[#19312A]">
              <span className="text-xs text-[#A39D8F] block mb-1">الجيل من قحطان</span>
              <span className="text-base font-bold text-[#F3EFE5]">
                {node.generation ? `الجيل ${node.generation}` : '—'}
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#10221E]/70 border border-[#19312A]">
              <span className="text-xs text-[#A39D8F] block mb-1">نوع الصلة</span>
              <span className="text-xs font-semibold text-[#C5A96A] block leading-normal">
                {relationDescription}
              </span>
            </div>
          </div>

          {/* Full Lineage Path */}
          <div className="p-4 rounded-xl bg-[#06100D] border border-[#C5A96A]/20 space-y-2">
            <span className="text-xs font-medium text-[#C5A96A] block">
              سلسلة النسب حتى قحطان:
            </span>
            <p className="text-[#F3EFE5] leading-relaxed font-amiri text-base font-normal">
              {lineageString}
            </p>
          </div>

          {/* Special notes for key nodes */}
          {node.locked && (
            <div className="p-3.5 rounded-xl bg-[#10221E] border border-[#C5A96A]/30 text-xs text-[#E0CA94] space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#C5A96A]">
                <ShieldCheck className="w-4 h-4" />
                <span>فرع قبلي جانبي موثق</span>
              </div>
              <p className="text-[#F3EFE5]/85 leading-relaxed">
                هذا الفرع مذكور في كتب الأنساب الكبرى، ويقتصر نطاق هذه الشجرة الخاصة على المسار الرأسي المعتمد المؤدي إلى قبيلة صيعر وآل سالم.
              </p>
            </div>
          )}

          {node.id === 'marai-salem' && (
            <div className="p-3.5 rounded-xl bg-[#162923] border border-[#C5A96A]/40 text-xs text-[#E0CA94] space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-[#C5A96A]" />
                <span>المسار العائلي المعتمد (آل سالم)</span>
              </div>
              <p className="text-[#F3EFE5]/90 leading-relaxed">
                يتفرع من سالم أبناؤه الثمانية، ويعد هذا الفرع المحور الرئيسي لشجرة النسب العائلية الخاصة.
              </p>
            </div>
          )}

          {node.id === 'alashmoos-sayaar' && (
            <div className="p-3.5 rounded-xl bg-[#162923] border border-[#C5A96A]/40 text-xs text-[#E0CA94] space-y-1">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-4 h-4 text-[#C5A96A]" />
                <span>فروع صيعر</span>
              </div>
              <p className="text-[#F3EFE5]/90 leading-relaxed">
                صيعر الجد الجامع لفروع القبيلة الكريمة التي توارثت المجد والمنعة وريدة الصيعر ونجائب الإبل.
              </p>
            </div>
          )}

          {/* Action: Copy Lineage */}
          <button
            onClick={handleCopyLineage}
            className="w-full py-3 px-4 rounded-xl bg-[#10221E] hover:bg-[#162e29] border border-[#C5A96A]/40 text-[#C5A96A] hover:text-[#F3EFE5] transition-all flex items-center justify-center gap-2 font-medium"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>تم نسخ سلسلة النسب بنجاح</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>نسخ سلسلة النسب</span>
              </>
            )}
          </button>

          {/* Action: Share */}
          <button
            onClick={handleShare}
            className="w-full py-3 px-4 rounded-xl bg-[#0B1714] hover:bg-[#10221E] border border-[#19312A] text-[#A39D8F] hover:text-[#F3EFE5] transition-all flex items-center justify-center gap-2 text-xs"
          >
            {shared ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>تم نسخ رابط العقدة</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>مشاركة رابط هذه العقدة</span>
              </>
            )}
          </button>

          {/* Action: View Reference (Strictly no long book texts in tree) */}
          <button
            onClick={() => {
              onClose();
              onNavigateToReferences(relevantRefId);
            }}
            className="w-full py-3 px-4 rounded-xl bg-[#06100D] hover:bg-[#0c1c17] border border-[#C5A96A]/20 text-[#A39D8F] hover:text-[#C5A96A] transition-all flex items-center justify-between text-xs"
          >
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#C5A96A]" />
              <span>عرض توثيق المصدر في صفحة المراجع</span>
            </span>
            <span className="text-[#C5A96A] text-lg leading-none">‹</span>
          </button>
        </div>
      </div>
    </div>
  );
};
