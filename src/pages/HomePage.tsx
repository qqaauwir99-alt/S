import React from 'react';
import { GitBranch, Compass, Scroll, BookOpen, ArrowLeft, ShieldCheck, ChevronDown } from 'lucide-react';
import { historyFeaturedCards } from '../data/history';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onRevealSalem: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onRevealSalem
}) => {
  return (
    <div className="min-h-screen text-right" dir="rtl">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-[#C5A96A]/20 bg-gradient-to-b from-[#081512] via-[#06100D] to-[#06100D]">
        {/* Subtle royal background ornament */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 w-[700px] h-[500px] bg-[#C5A96A]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          
          {/* Royal Seal / Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10221E] border border-[#C5A96A]/30 text-[#C5A96A] text-xs sm:text-sm font-medium shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A96A] animate-pulse" />
            <span>سلسلة النسب التوثيقية المعتمدة</span>
          </div>

          {/* Primary Titles - Explicitly Spaced to prevent any overlapping */}
          <div className="space-y-4 pt-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-[#F3EFE5] font-heritage drop-shadow-sm leading-snug">
              شجرة آل سالم
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#C5A96A] font-heritage leading-relaxed">
              من قبيلة صيعر الكندية
            </h2>
            <div className="inline-block px-4 py-1 rounded-full bg-[#10221E]/80 border border-[#C5A96A]/25 text-[#E0CA94] text-xs sm:text-sm font-medium">
              مسار النسب المتصل من قحطان إلى الأبناء الثمانية
            </div>
          </div>

          {/* Short Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-[#A39D8F] max-w-2xl mx-auto font-amiri leading-loose pt-2">
            سجل توثيقي تاريخي متسلسل يعرض نسب آل سالم، وفروع قبيلة صيعر العريقة الممتدة في أمهات كتب الأنساب وتاريخ الجزيرة العربية.
          </p>

          {/* Three Primary Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-6">
            {/* 1. Explore Tree */}
            <button
              onClick={() => onNavigate('/tree')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#19312A] hover:bg-[#203f36] border border-[#C5A96A]/40 text-[#F3EFE5] font-semibold text-base transition-all flex items-center justify-center gap-2.5 shadow-lg group"
            >
              <GitBranch className="w-5 h-5 text-[#C5A96A] group-hover:scale-110 transition-transform" />
              <span>استكشف شجرة آل سالم</span>
            </button>

            {/* 2. History of Sayaar */}
            <button
              onClick={() => onNavigate('/history')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0B1714] hover:bg-[#10221E] border border-[#19312A] text-[#F3EFE5]/90 hover:text-[#F3EFE5] font-medium text-base transition-all flex items-center justify-center gap-2.5"
            >
              <Scroll className="w-5 h-5 text-[#A39D8F]" />
              <span>تاريخ قبيلة صيعر</span>
            </button>

            {/* 3. Premium Button: Salem Path */}
            <button
              onClick={onRevealSalem}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#C5A96A] to-[#E0CA94] hover:from-[#d4b97a] hover:to-[#ebdab0] text-[#06100D] font-bold text-base transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-[#C5A96A]/20 scale-100 hover:scale-[1.02]"
            >
              <Compass className="w-5 h-5 text-[#06100D]" />
              <span>المسار المباشر لآل سالم</span>
            </button>
          </div>

        </div>
      </section>

      {/* Explore Heritage: 4 Portals */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs uppercase tracking-widest text-[#C5A96A] font-semibold">
            بوابات المعرفة
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold text-[#F3EFE5] font-heritage">
            استكشف الإرث والنسب
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Portal 1: شجرة آل سالم */}
          <div
            onClick={() => onNavigate('/tree')}
            className="p-6 rounded-2xl bg-[#0B1714] border border-[#C5A96A]/20 hover:border-[#C5A96A]/60 transition-all cursor-pointer group flex flex-col justify-between hover:bg-[#10221E]/60 shadow-lg"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#10221E] border border-[#C5A96A]/30 flex items-center justify-center text-[#C5A96A] group-hover:scale-110 transition-transform">
                <GitBranch className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#F3EFE5] group-hover:text-[#C5A96A] transition-colors font-heritage">
                شجرة آل سالم
              </h4>
              <p className="text-sm text-[#A39D8F] leading-relaxed">
                تتبع النسب جيلًا بعد جيل من قحطان إلى الأبناء عبر تجربة تفاعلية منظمة ورصينة.
              </p>
            </div>
            <div className="pt-5 flex items-center text-xs text-[#C5A96A] font-medium gap-1">
              <span>تصفح الشجرة التفاعلية</span>
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Portal 2: آل سالم والأبناء */}
          <div
            onClick={onRevealSalem}
            className="p-6 rounded-2xl bg-[#0F221B] border border-[#C5A96A]/40 hover:border-[#C5A96A] transition-all cursor-pointer group flex flex-col justify-between shadow-xl shadow-[#C5A96A]/5"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#19312A] border border-[#C5A96A] flex items-center justify-center text-[#C5A96A] group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#F3EFE5] group-hover:text-[#C5A96A] transition-colors font-heritage">
                أبناء آل سالم
              </h4>
              <p className="text-sm text-[#A39D8F] leading-relaxed">
                الوصول مباشرة إلى المسار العائلي المعتمد وتتبع الأبناء الثمانية ووثائقهم.
              </p>
            </div>
            <div className="pt-5 flex items-center text-xs text-[#C5A96A] font-bold gap-1">
              <span>عرض المسار المعتمد</span>
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Portal 3: تاريخ قبيلة صيعر */}
          <div
            onClick={() => onNavigate('/history')}
            className="p-6 rounded-2xl bg-[#0B1714] border border-[#C5A96A]/20 hover:border-[#C5A96A]/60 transition-all cursor-pointer group flex flex-col justify-between hover:bg-[#10221E]/60 shadow-lg"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#10221E] border border-[#C5A96A]/30 flex items-center justify-center text-[#C5A96A] group-hover:scale-110 transition-transform">
                <Scroll className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#F3EFE5] group-hover:text-[#C5A96A] transition-colors font-heritage">
                تاريخ قبيلة صيعر
              </h4>
              <p className="text-sm text-[#A39D8F] leading-relaxed">
                الصيعر وكندة والصدف وريدة والإبل الصيعرية وشواهد الشعر واللغة في أمهات المصادر.
              </p>
            </div>
            <div className="pt-5 flex items-center text-xs text-[#C5A96A] font-medium gap-1">
              <span>قراءة السرد التاريخي</span>
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Portal 4: المراجع */}
          <div
            onClick={() => onNavigate('/references')}
            className="p-6 rounded-2xl bg-[#0B1714] border border-[#C5A96A]/20 hover:border-[#C5A96A]/60 transition-all cursor-pointer group flex flex-col justify-between hover:bg-[#10221E]/60 shadow-lg"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#10221E] border border-[#C5A96A]/30 flex items-center justify-center text-[#C5A96A] group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#F3EFE5] group-hover:text-[#C5A96A] transition-colors font-heritage">
                المراجع والمصادر
              </h4>
              <p className="text-sm text-[#A39D8F] leading-relaxed">
                الكتب والمصادر التراثية المعتمدة التي استندت إليها الشجرة مع التوثيق العلمي.
              </p>
            </div>
            <div className="pt-5 flex items-center text-xs text-[#C5A96A] font-medium gap-1">
              <span>استعراض المصادر</span>
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* Tree Preview Ladder (Minimal Preview without full details) */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-[#040A08] border-y border-[#C5A96A]/15">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <span className="text-xs tracking-widest uppercase text-[#C5A96A] font-medium">
            تدرج النسب الأساسي
          </span>
          <h3 className="text-2xl font-bold text-[#F3EFE5] font-heritage">
            من الجذم إلى الفرع
          </h3>

          <div className="flex flex-col items-center space-y-2 py-4">
            {/* Step: Qahtan */}
            <div className="px-6 py-2.5 rounded-xl bg-[#10221E] border border-[#C5A96A]/40 text-[#F3EFE5] font-bold text-sm tracking-wide">
              قحطان
            </div>
            <ChevronDown className="w-4 h-4 text-[#C5A96A]/60" />
            <div className="text-xs text-[#A39D8F] tracking-widest font-mono">
              … أجيال وبطون قحطانية …
            </div>
            <ChevronDown className="w-4 h-4 text-[#C5A96A]/60" />

            {/* Step: Sayaar */}
            <div className="px-6 py-2.5 rounded-xl bg-[#19312A] border border-[#C5A96A] text-[#C5A96A] font-bold text-sm tracking-wide">
              صيعر
            </div>
            <ChevronDown className="w-4 h-4 text-[#C5A96A]/60" />
            <div className="text-xs text-[#A39D8F] tracking-widest font-mono">
              … الفروع الخاصة المعتمدة …
            </div>
            <ChevronDown className="w-4 h-4 text-[#C5A96A]/60" />

            {/* Step: Salem */}
            <div className="px-7 py-3 rounded-xl bg-gradient-to-r from-[#19312A] via-[#1F3D34] to-[#19312A] border-2 border-[#C5A96A] text-[#F3EFE5] font-bold text-base shadow-lg shadow-[#C5A96A]/10">
              سالم (آل سالم والأبناء الثمانية)
            </div>
          </div>

          <button
            onClick={() => onNavigate('/tree')}
            className="inline-flex items-center gap-2 text-sm text-[#C5A96A] hover:underline font-medium"
          >
            <span>فتح الشجرة التفاعلية لتفقد كل جيل</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* From the Annals of History: 3 Curated Cards */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#C5A96A] font-semibold">
              إضاءات تاريخية
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-[#F3EFE5] font-heritage mt-1">
              من بطون التاريخ
            </h3>
          </div>
          <button
            onClick={() => onNavigate('/history')}
            className="px-5 py-2.5 rounded-xl bg-[#10221E] hover:bg-[#162e29] border border-[#C5A96A]/30 text-[#C5A96A] text-sm font-semibold transition-all flex items-center gap-2"
          >
            <span>اكتشف التاريخ</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {historyFeaturedCards.map((card) => (
            <div
              key={card.id}
              onClick={() => onNavigate(`/history#${card.id}`)}
              className="p-6 rounded-2xl bg-[#0B1714] border border-[#19312A] hover:border-[#C5A96A]/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-[#C5A96A] font-medium bg-[#10221E] px-2.5 py-1 rounded-md border border-[#C5A96A]/20">
                    {card.category}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-[#C5A96A]/50" />
                </div>
                <h4 className="text-xl font-bold text-[#F3EFE5] group-hover:text-[#C5A96A] transition-colors font-heritage">
                  {card.title}
                </h4>
                <p className="text-sm text-[#A39D8F] leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="pt-6 flex items-center text-xs text-[#A39D8F] group-hover:text-[#C5A96A] transition-colors gap-1">
                <span>قراءة التفاصيل والتوثيق</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
