import React from 'react';
import {
  Scroll,
  GitBranch,
  ShieldCheck,
  BookOpen,
  MapPin,
  Quote,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { historySections } from '../data/history';
import { CamelSilhouette } from '../components/CamelSilhouette';

interface HistoryPageProps {
  onNavigate: (path: string) => void;
}

export const HistoryPage: React.FC<HistoryPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#06100D] text-[#F3EFE5] pb-24 text-right" dir="rtl">
      
      {/* Short Luxury Hero */}
      <section className="relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#C5A96A]/20 bg-gradient-to-b from-[#0B1714] to-[#06100D]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10221E] border border-[#C5A96A]/30 text-xs text-[#C5A96A]">
            <Scroll className="w-3.5 h-3.5" />
            <span>توثيق المصادر والبلدانيات</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-heritage text-[#F3EFE5] leading-snug">
            تاريخ قبيلة صيعر
          </h1>

          <p className="text-base sm:text-lg text-[#A39D8F] max-w-2xl mx-auto font-amiri leading-relaxed">
            شواهد موثقة من أمهات كتب النسب والجغرافيا واللغة والسيرة إلى قبيلة صيعر الكندية وديارها ومآثرها.
          </p>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        
        {/* 1. Origin and Lineage */}
        {(() => {
          const section = historySections.find(s => s.id === 'origin-lineage');
          if (!section) return null;
          return (
            <section id={section.id} className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-[#0B1714] border border-[#C5A96A]/25 space-y-5 shadow-lg">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#19312A] pb-4">
                <div>
                  <span className="text-xs text-[#C5A96A] font-semibold tracking-wider">
                    {section.category}
                  </span>
                  <h2 className="text-2xl font-bold font-heritage text-[#F3EFE5] mt-1">
                    {section.title}
                  </h2>
                  {section.subtitle && (
                    <p className="text-xs text-[#A39D8F] mt-0.5">{section.subtitle}</p>
                  )}
                </div>

                <button
                  onClick={() => onNavigate('/tree')}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#19312A] hover:bg-[#203f36] border border-[#C5A96A]/40 text-xs sm:text-sm text-[#C5A96A] font-semibold transition-all self-start sm:self-center"
                >
                  <GitBranch className="w-4 h-4" />
                  <span>استكشف شجرة آل سالم</span>
                </button>
              </div>

              {/* Sequential summary */}
              <div className="p-4 rounded-xl bg-[#06100D] border border-[#19312A] flex items-center justify-center flex-wrap gap-2 text-xs sm:text-sm text-[#E0CA94] font-semibold">
                <span>قحطان</span>
                <span className="text-[#A39D8F]">←</span>
                <span>كهلان</span>
                <span className="text-[#A39D8F]">←</span>
                <span>كندة</span>
                <span className="text-[#A39D8F]">←</span>
                <span>الصدف</span>
                <span className="text-[#A39D8F]">←</span>
                <span className="text-[#F3EFE5] font-bold">صيعر</span>
              </div>

              <div className="space-y-3 text-sm sm:text-base text-[#F3EFE5]/90 leading-relaxed font-normal">
                {section.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </section>
          );
        })()}

        {/* 2. Al-Hamdani Documentation & 3. Raydat As-Sayar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Al-Hamdani */}
          {(() => {
            const section = historySections.find(s => s.id === 'al-hamdani-sifat');
            if (!section) return null;
            return (
              <section id={section.id} className="scroll-mt-28 p-6 rounded-2xl bg-[#0B1714] border border-[#19312A] space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#C5A96A] font-semibold">{section.category}</span>
                    <ShieldCheck className="w-4 h-4 text-[#C5A96A]" />
                  </div>
                  <h3 className="text-xl font-bold font-heritage text-[#F3EFE5]">{section.title}</h3>
                  <p className="text-xs text-[#A39D8F]">{section.subtitle}</p>
                  <div className="space-y-2 text-sm text-[#F3EFE5]/90 leading-relaxed">
                    {section.content.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>

                {section.quote && (
                  <div className="p-3.5 rounded-xl bg-[#10221E] border-r-2 border-[#C5A96A] space-y-1 mt-4">
                    <p className="text-xs text-[#E0CA94] font-amiri text-sm">{section.quote.text}</p>
                    <span className="text-[10px] text-[#A39D8F] block">{section.quote.source}</span>
                  </div>
                )}
              </section>
            );
          })()}

          {/* Raydat As-Sayar */}
          {(() => {
            const section = historySections.find(s => s.id === 'raydat-as-sayar');
            if (!section) return null;
            return (
              <section id={section.id} className="scroll-mt-28 p-6 rounded-2xl bg-[#0B1714] border border-[#19312A] space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#C5A96A] font-semibold">{section.category}</span>
                    <MapPin className="w-4 h-4 text-[#C5A96A]" />
                  </div>
                  <h3 className="text-xl font-bold font-heritage text-[#F3EFE5]">{section.title}</h3>
                  <p className="text-xs text-[#A39D8F]">{section.subtitle}</p>
                  <div className="space-y-2 text-sm text-[#F3EFE5]/90 leading-relaxed">
                    {section.content.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>

                {section.quote && (
                  <div className="p-3.5 rounded-xl bg-[#10221E] border-r-2 border-[#C5A96A] space-y-1 mt-4">
                    <p className="text-xs text-[#E0CA94] font-amiri text-sm">{section.quote.text}</p>
                    <span className="text-[10px] text-[#A39D8F] block">{section.quote.source}</span>
                  </div>
                )}
              </section>
            );
          })()}
        </div>

        {/* 4. Al-Ibil As-Sayariyyah (Special Highlight with Custom SVG Silhouette) */}
        {(() => {
          const section = historySections.find(s => s.id === 'al-ibil-as-sayariyyah');
          if (!section) return null;
          return (
            <section
              id={section.id}
              className="scroll-mt-28 relative overflow-hidden p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0B1714] via-[#10221E] to-[#0B1714] border-2 border-[#C5A96A]/40 shadow-2xl space-y-6"
            >
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                
                <div className="space-y-4 flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#19312A] border border-[#C5A96A]/30 text-xs text-[#C5A96A]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>مجد الركائب العربية الأصيلة</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold font-heritage text-[#F3EFE5]">
                    {section.title}
                  </h2>
                  <p className="text-sm text-[#C5A96A] font-medium">{section.subtitle}</p>

                  <div className="space-y-3 text-sm sm:text-base text-[#F3EFE5]/90 leading-relaxed">
                    {section.content.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  {/* Documented Source Card */}
                  {section.quote && (
                    <div className="p-4 rounded-xl bg-[#06100D]/90 border border-[#C5A96A]/40 space-y-2 mt-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#C5A96A]">
                        <Quote className="w-3.5 h-3.5" />
                        <span>ورد ذكرها في المصدر التاريخي:</span>
                      </div>
                      <p className="text-sm text-[#E0CA94] font-amiri leading-relaxed">
                        &quot;{section.quote.text}&quot;
                      </p>
                      <span className="text-xs text-[#A39D8F] block font-mono">
                        {section.quote.source}
                      </span>
                    </div>
                  )}
                </div>

                {/* SVG Silhouette of noble camel */}
                <div className="w-full sm:w-80 flex flex-col items-center justify-center p-4 bg-[#06100D]/50 rounded-2xl border border-[#19312A]">
                  <CamelSilhouette className="w-64 h-56 text-[#C5A96A]/80" />
                  <span className="text-xs text-[#A39D8F] mt-2 font-heritage">
                    سلالة الإبل الصيعرية النجيبة
                  </span>
                </div>

              </div>
            </section>
          );
        })()}

        {/* 5. Linguistics & 6. Ancient Poetry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Linguistics */}
          {(() => {
            const section = historySections.find(s => s.id === 'linguistics-and-mark');
            if (!section) return null;
            return (
              <section id={section.id} className="scroll-mt-28 p-6 rounded-2xl bg-[#0B1714] border border-[#19312A] space-y-4">
                <span className="text-xs text-[#C5A96A] font-semibold">{section.category}</span>
                <h3 className="text-xl font-bold font-heritage text-[#F3EFE5]">{section.title}</h3>
                <p className="text-xs text-[#A39D8F]">{section.subtitle}</p>
                <div className="space-y-2 text-sm text-[#F3EFE5]/90 leading-relaxed">
                  {section.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
                {section.quote && (
                  <div className="p-3.5 rounded-xl bg-[#10221E] border-r-2 border-[#C5A96A] space-y-1">
                    <p className="text-xs text-[#E0CA94] font-amiri text-sm">{section.quote.text}</p>
                    <span className="text-[10px] text-[#A39D8F] block">{section.quote.source}</span>
                  </div>
                )}
              </section>
            );
          })()}

          {/* Poetry */}
          {(() => {
            const section = historySections.find(s => s.id === 'ancient-poetry');
            if (!section) return null;
            return (
              <section id={section.id} className="scroll-mt-28 p-6 rounded-2xl bg-[#0B1714] border border-[#19312A] space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-xs text-[#C5A96A] font-semibold">{section.category}</span>
                  <h3 className="text-xl font-bold font-heritage text-[#F3EFE5]">{section.title}</h3>
                  <p className="text-xs text-[#A39D8F]">{section.subtitle}</p>
                  <div className="space-y-2 text-sm text-[#F3EFE5]/90 leading-relaxed">
                    {section.content.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>

                {section.poem && (
                  <div className="p-4 rounded-xl bg-[#06100D] border border-[#C5A96A]/30 space-y-3 mt-4">
                    <div className="text-center space-y-2 font-amiri text-base sm:text-lg text-[#F3EFE5]">
                      {section.poem.verses.map((v, i) => (
                        <div key={i} className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
                          <span>{v.first}</span>
                          <span className="hidden sm:inline text-[#C5A96A]">***</span>
                          <span>{v.second}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-[#19312A] text-[11px] text-[#A39D8F] flex items-center justify-between">
                      <span>{section.poem.poet}</span>
                      <span>{section.poem.source}</span>
                    </div>
                  </div>
                )}
              </section>
            );
          })()}
        </div>

        {/* 7. Folk Poetry */}
        {(() => {
          const section = historySections.find(s => s.id === 'folk-poetry-heritage');
          if (!section) return null;
          return (
            <section id={section.id} className="scroll-mt-28 p-6 rounded-2xl bg-[#0B1714] border border-[#19312A] space-y-3">
              <span className="text-xs text-[#C5A96A] font-semibold">{section.category}</span>
              <h3 className="text-xl font-bold font-heritage text-[#F3EFE5]">{section.title}</h3>
              <p className="text-xs text-[#A39D8F]">{section.subtitle}</p>
              <div className="space-y-2 text-sm text-[#F3EFE5]/90 leading-relaxed">
                {section.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </section>
          );
        })()}

        {/* 8. Kinda and Kingship */}
        {(() => {
          const section = historySections.find(s => s.id === 'kinda-and-kingship');
          if (!section) return null;
          return (
            <section id={section.id} className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-[#0B1714] border border-[#C5A96A]/30 space-y-4 shadow-lg">
              <span className="text-xs text-[#C5A96A] font-semibold">{section.category}</span>
              <h3 className="text-2xl font-bold font-heritage text-[#F3EFE5]">{section.title}</h3>
              <p className="text-xs text-[#A39D8F]">{section.subtitle}</p>
              <div className="space-y-3 text-sm sm:text-base text-[#F3EFE5]/90 leading-relaxed">
                {section.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </section>
          );
        })()}

        {/* 9. Kinda in Prophetic Sunnah (Strict Verification & Hadith Grade) */}
        {(() => {
          const section = historySections.find(s => s.id === 'kinda-in-prophetic-sunnah');
          if (!section) return null;
          return (
            <section id={section.id} className="scroll-mt-28 p-6 sm:p-8 rounded-2xl bg-[#0B1714] border-2 border-[#C5A96A]/35 space-y-5 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#C5A96A] font-semibold">{section.category}</span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-[#10221E] border border-[#C5A96A]/40 text-[#C5A96A] font-bold">
                  توثيق حديثي دقيق
                </span>
              </div>
              <h3 className="text-2xl font-bold font-heritage text-[#F3EFE5]">{section.title}</h3>
              <p className="text-xs text-[#A39D8F]">{section.subtitle}</p>

              <div className="space-y-3 text-sm sm:text-base text-[#F3EFE5]/90 leading-relaxed">
                {section.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Hadith Verification Card */}
              {section.hadithInfo && (
                <div className="p-5 rounded-2xl bg-[#06100D] border border-[#C5A96A]/30 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#19312A] pb-3 text-xs">
                    <span className="text-[#A39D8F]">
                      الراوي: <strong className="text-[#F3EFE5]">{section.hadithInfo.narrator}</strong>
                    </span>
                    <span className="text-[#A39D8F]">
                      المصدر: <strong className="text-[#F3EFE5]">{section.hadithInfo.book}</strong>
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#19312A] text-[#C5A96A] font-bold border border-[#C5A96A]/30">
                      {section.hadithInfo.grade}
                    </span>
                  </div>

                  <p className="text-base sm:text-lg text-[#E0CA94] font-amiri leading-relaxed text-center py-2">
                    {section.hadithInfo.text}
                  </p>

                  {section.hadithInfo.scholarVerdict && (
                    <div className="text-xs text-[#A39D8F] pt-2 border-t border-[#19312A]">
                      حكم المحدث: {section.hadithInfo.scholarVerdict}
                    </div>
                  )}
                </div>
              )}
            </section>
          );
        })()}

        {/* 10. Historical Milestones & 11. Places & 12. Relics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Milestones */}
          {(() => {
            const section = historySections.find(s => s.id === 'historical-milestones');
            if (!section) return null;
            return (
              <section id={section.id} className="scroll-mt-28 p-6 rounded-2xl bg-[#0B1714] border border-[#19312A] space-y-4">
                <span className="text-xs text-[#C5A96A] font-semibold">{section.category}</span>
                <h3 className="text-xl font-bold font-heritage text-[#F3EFE5]">{section.title}</h3>
                <div className="space-y-3 text-sm text-[#F3EFE5]/90 leading-relaxed">
                  {section.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </section>
            );
          })()}

          {/* Places and Relics */}
          {(() => {
            const section = historySections.find(s => s.id === 'places-and-relics');
            if (!section) return null;
            return (
              <section id={section.id} className="scroll-mt-28 p-6 rounded-2xl bg-[#0B1714] border border-[#19312A] space-y-4">
                <span className="text-xs text-[#C5A96A] font-semibold">{section.category}</span>
                <h3 className="text-xl font-bold font-heritage text-[#F3EFE5]">{section.title}</h3>
                <div className="space-y-3 text-sm text-[#F3EFE5]/90 leading-relaxed">
                  {section.content.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
                <div className="p-3 rounded-xl bg-[#06100D] text-xs text-[#A39D8F] border border-[#19312A]">
                  تنبيه توثيقي: لا يُطلق وصف أثر إلا على ما ثبت بالمسح الأثري أو النصوص المتقدمة صراحة.
                </div>
              </section>
            );
          })()}
        </div>

        {/* Link to References at bottom */}
        <div className="p-6 rounded-2xl bg-[#0B1714] border border-[#C5A96A]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-right">
            <h4 className="text-lg font-bold font-heritage text-[#F3EFE5]">
              المصادر والكتب المعتمدة
            </h4>
            <p className="text-xs text-[#A39D8F]">
              تصفح قائمة المراجع الكاملة ومنهج التوثيق في صفحة مستقلة.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/references')}
            className="px-5 py-2.5 rounded-xl bg-[#19312A] hover:bg-[#203f36] border border-[#C5A96A]/40 text-xs sm:text-sm text-[#C5A96A] font-semibold flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            <span>عرض صفحة المراجع</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

      </main>

    </div>
  );
};
