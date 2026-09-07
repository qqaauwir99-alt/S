import React from 'react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#040A08] border-t border-[#C5A96A]/20 py-12 px-4 sm:px-6 lg:px-8 text-center text-[#A39D8F] transition-colors no-print">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Heritage Emblem & Titles */}
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="w-8 h-8 rounded-full bg-[#0B1714] border border-[#C5A96A]/30 flex items-center justify-center mb-1">
            <span className="text-[#C5A96A] text-xs font-serif font-bold">س</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#F3EFE5] tracking-wide font-heritage">
            شجرة آل سالم — قبيلة صيعر الكندية
          </h2>
          <p className="text-sm text-[#C5A96A]/90 max-w-md mx-auto font-amiri text-base">
            توثيق مبارك للجذور، وحفظ للنسب وربط للأجيال.
          </p>
        </div>

        {/* Quick Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <button
            onClick={() => onNavigate('/')}
            className="hover:text-[#C5A96A] transition-colors"
          >
            الرئيسية
          </button>
          <span className="text-[#19312A]">•</span>
          <button
            onClick={() => onNavigate('/tree')}
            className="hover:text-[#C5A96A] transition-colors"
          >
            شجرة آل سالم
          </button>
          <span className="text-[#19312A]">•</span>
          <button
            onClick={() => onNavigate('/tree/full')}
            className="hover:text-[#C5A96A] transition-colors"
          >
            العرض الكامل
          </button>
          <span className="text-[#19312A]">•</span>
          <button
            onClick={() => onNavigate('/history')}
            className="hover:text-[#C5A96A] transition-colors"
          >
            تاريخ صيعر
          </button>
          <span className="text-[#19312A]">•</span>
          <button
            onClick={() => onNavigate('/references')}
            className="hover:text-[#C5A96A] transition-colors"
          >
            المراجع
          </button>
          <span className="text-[#19312A]">•</span>
          <button
            onClick={() => onNavigate('/about')}
            className="hover:text-[#C5A96A] transition-colors"
          >
            عن المشروع
          </button>
        </nav>

        {/* Copyright & Disclaimer */}
        <div className="pt-6 border-t border-[#0B1714] text-xs text-[#A39D8F]/60 max-w-xl mx-auto space-y-1 leading-relaxed">
          <p>
            جميع حقوق التوثيق والتصميم الرقمي محفوظة لمشروع شجرة آل سالم © {currentYear}
          </p>
          <p>
            تستند الشجرة إلى أمهات المصادر التراثية المعتمدة والوثائق المحققة لمسار آل سالم.
          </p>
        </div>

      </div>
    </footer>
  );
};
