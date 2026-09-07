import React from 'react';
import { X, Printer } from 'lucide-react';
import { getNodeAncestryPath, genealogyTree, findNodeById } from '../data/genealogy';

interface LineageCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LineageCertificateModal: React.FC<LineageCertificateModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  // Retrieve path from Qahtan to Salem
  const pathNodes = getNodeAncestryPath(genealogyTree, 'marai-salem') || [];
  const salemNode = findNodeById(genealogyTree, 'marai-salem');
  const sons = salemNode ? salemNode.children : [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      
      {/* Container */}
      <div
        className="relative w-full max-w-4xl bg-[#0B1714] text-[#F3EFE5] border-2 border-[#C5A96A] rounded-2xl shadow-2xl p-6 sm:p-10 my-auto text-right print-page animate-fadeIn overflow-hidden"
        dir="rtl"
      >
        {/* Subtle decorative corners */}
        <div className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 border-[#C5A96A]/60 pointer-events-none" />
        <div className="absolute top-2 left-2 w-12 h-12 border-t-2 border-l-2 border-[#C5A96A]/60 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-12 h-12 border-b-2 border-r-2 border-[#C5A96A]/60 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-12 h-12 border-b-2 border-l-2 border-[#C5A96A]/60 pointer-events-none" />

        {/* Modal Controls (Hidden in Print) */}
        <div className="flex items-center justify-between pb-6 border-b border-[#C5A96A]/20 no-print">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-[#10221E] text-[#A39D8F] hover:text-[#F3EFE5] flex items-center justify-center transition-colors"
            title="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-[#10221E] hover:bg-[#162e29] border border-[#C5A96A]/50 text-[#C5A96A] hover:text-[#F3EFE5] font-semibold text-sm flex items-center gap-2 transition-all shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة / حفظ PDF</span>
            </button>
          </div>
        </div>

        {/* Certificate Header */}
        <div className="text-center py-6 sm:py-8 space-y-2.5">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#10221E] border-2 border-[#C5A96A] mb-2 text-[#C5A96A]">
            <svg viewBox="0 0 32 32" className="w-7 h-7 fill-none stroke-current" strokeWidth="2">
              <path d="M16 4v24M16 10l-7 7M16 16l8 7M16 14l-5 4M16 20l5 4" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-xs uppercase tracking-widest text-[#C5A96A] font-semibold">
            شجرة آل سالم — قبيلة صيعر الكندية
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold font-heritage text-[#F3EFE5] tracking-wide leading-snug">
            وثيقة سلسلة نسب آل سالم
          </h2>
          <p className="text-sm sm:text-base text-[#A39D8F] max-w-xl mx-auto font-amiri leading-relaxed">
            بيان تسلسل النسب المعتمد من قحطان إلى سالم بن مرعي وأبنائه الكرام.
          </p>
        </div>

        {/* Lineage Chain in Sequential Columns */}
        <div className="my-6 p-6 rounded-2xl bg-[#06100D]/80 border border-[#C5A96A]/30">
          <h4 className="text-xs font-bold text-[#C5A96A] mb-4 tracking-wider uppercase">
            سلسلة الآباء والأجداد جيلًا بعد جيل:
          </h4>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm">
            {pathNodes.map((node, index) => {
              const isSalem = node.id === 'marai-salem';
              const isSayaar = node.id === 'alashmoos-sayaar';
              const isQahtan = node.id === 'qahtan';

              return (
                <div
                  key={node.id}
                  className={`p-2.5 rounded-lg border text-center transition-colors ${
                    isSalem
                      ? 'bg-[#19312A] border-[#C5A96A] text-[#F3EFE5] font-bold shadow-sm'
                      : isSayaar || isQahtan
                      ? 'bg-[#10221E] border-[#C5A96A]/60 text-[#C5A96A] font-semibold'
                      : 'bg-[#0B1714] border-[#19312A] text-[#F3EFE5]/85'
                  }`}
                >
                  <div className="text-[10px] text-[#A39D8F]/70 font-mono mb-0.5">
                    {index + 1}
                  </div>
                  <div className="font-heritage text-sm">
                    {node.name.split('—')[0].trim()}
                  </div>
                  {node.relationLabel && (
                    <div className="text-[9px] text-[#C5A96A] font-medium mt-0.5">
                      {node.relationLabel}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Salem and the Eight Sons Section */}
        <div className="my-6 p-6 rounded-2xl bg-[#10221E]/60 border border-[#C5A96A]/40 text-center space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#19312A] border border-[#C5A96A] text-[#C5A96A] font-bold text-sm">
            أبناء سالم بن مرعي (آل سالم)
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            {sons.map((son, i) => (
              <div
                key={son.id}
                className="p-3 rounded-xl bg-[#0B1714] border border-[#C5A96A]/30 flex flex-col items-center justify-center space-y-1"
              >
                <div className="text-[11px] text-[#A39D8F]">
                  الابن {i + 1}
                </div>
                <div className="text-base font-bold text-[#F3EFE5] font-heritage">
                  {son.name}
                </div>
                {son.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C5A96A]/20 text-[#C5A96A] border border-[#C5A96A]/40 font-medium">
                    {son.badge}
                  </span>
                )}
              </div>
            ))}
          </div>

          <p className="text-xs text-[#A39D8F] font-serif pt-2">
            وتستمر الأجيال…
          </p>
        </div>

        {/* Verification & Method Footer */}
        <div className="pt-4 border-t border-[#C5A96A]/20 text-xs text-[#A39D8F]/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>
            المصادر: جمهرة أنساب العرب، الإكليل، صفة جزيرة العرب، وأرشيف آل سالم المعتمد.
          </span>
          <span className="font-mono text-[11px] text-[#C5A96A]">
            منصة الصيعري الرقمية
          </span>
        </div>

      </div>
    </div>
  );
};
