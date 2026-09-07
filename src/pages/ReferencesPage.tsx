import React, { useState } from 'react';
import { BookOpen, ShieldCheck, ExternalLink, Bookmark } from 'lucide-react';
import { referencesData, methodologyStatement } from '../data/references';

interface ReferencesPageProps {
  onNavigate: (path: string) => void;
}

export const ReferencesPage: React.FC<ReferencesPageProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'الجميع' },
    { id: 'genealogy', label: 'كتب النسب' },
    { id: 'history', label: 'التاريخ والجغرافيا' },
    { id: 'hadith', label: 'الحديث والسيرة' },
    { id: 'linguistics', label: 'اللغة والشعر' },
    { id: 'modern', label: 'مصادر حديثة وخاصة' }
  ];

  const filteredReferences = selectedCategory === 'all'
    ? referencesData
    : referencesData.filter((r) => r.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#06100D] text-[#F3EFE5] pb-24 text-right" dir="rtl">
      
      {/* Header Hero */}
      <section className="relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#C5A96A]/20 bg-gradient-to-b from-[#0B1714] to-[#06100D]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10221E] border border-[#C5A96A]/30 text-xs text-[#C5A96A]">
            <BookOpen className="w-3.5 h-3.5" />
            <span>التوثيق العلمي والمنهجي</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-heritage text-[#F3EFE5] leading-snug">
            المراجع والمصادر التوثيقية
          </h1>

          <p className="text-base sm:text-lg text-[#A39D8F] max-w-2xl mx-auto font-amiri leading-relaxed">
            أمهات كتب الأنساب والتاريخ واللغة التي استند إليها توثيق شجرة آل سالم وتاريخ قبيلة صيعر الكندية.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* Section: منهج الموقع (Site Methodology Statement) */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0B1714] via-[#10221E] to-[#0B1714] border-2 border-[#C5A96A]/30 shadow-xl space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-[#C5A96A]">
            <ShieldCheck className="w-5 h-5" />
            <span>منهج الموقع والضبط العلمي</span>
          </div>
          <p className="text-base sm:text-lg text-[#F3EFE5] font-amiri leading-relaxed">
            {methodologyStatement}
          </p>
          <div className="pt-2 text-xs text-[#A39D8F]">
            تنبيه: يفصل الموقع بين الشجرة التفاعلية (لتجربة النسب الصافية) وبين هذه الصفحة (للتحقيق وحفظ المراجع).
          </div>
        </section>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#19312A] border border-[#C5A96A] text-[#C5A96A] shadow-md'
                    : 'bg-[#0B1714] border border-[#19312A] text-[#A39D8F] hover:text-[#F3EFE5] hover:bg-[#10221E]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* References Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReferences.map((ref) => (
            <div
              key={ref.id}
              id={ref.id}
              className="scroll-mt-28 p-6 rounded-2xl bg-[#0B1714] border border-[#19312A] hover:border-[#C5A96A]/40 transition-all flex flex-col justify-between space-y-5 shadow-lg group"
            >
              <div className="space-y-3">
                
                {/* Field & Tag */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#C5A96A] bg-[#10221E] px-2.5 py-1 rounded-md border border-[#C5A96A]/20 font-medium">
                    {ref.field}
                  </span>
                  {ref.deathYear && (
                    <span className="text-[#A39D8F] font-mono">
                      توفي: {ref.deathYear}
                    </span>
                  )}
                </div>

                {/* Title & Author */}
                <div>
                  <h3 className="text-xl font-bold font-heritage text-[#F3EFE5] group-hover:text-[#C5A96A] transition-colors">
                    {ref.title}
                  </h3>
                  <p className="text-xs text-[#A39D8F] mt-1 font-medium">
                    المؤلف: <strong className="text-[#F3EFE5]/90">{ref.author}</strong>
                  </p>
                </div>

                {/* What was used from it */}
                <div className="p-3.5 rounded-xl bg-[#06100D] border border-[#19312A] space-y-1 text-xs">
                  <span className="text-[#C5A96A] font-semibold block">موضع الإفادة في الموقع:</span>
                  <p className="text-[#F3EFE5]/85 leading-relaxed">
                    {ref.usage}
                  </p>
                </div>

                {/* Citation & Edition */}
                {ref.citation && (
                  <div className="text-xs text-[#A39D8F] space-y-0.5">
                    <span className="text-[#C5A96A]/80 font-medium">التحقيق / الطبعة:</span>
                    <p className="text-[#A39D8F]/90 font-mono text-[11px]">{ref.citation}</p>
                  </div>
                )}

                {/* Methodology note */}
                {ref.methodologyNotes && (
                  <div className="p-3 rounded-lg bg-[#10221E]/60 text-xs text-[#E0CA94] border-r-2 border-[#C5A96A]">
                    {ref.methodologyNotes}
                  </div>
                )}

              </div>

              <div className="pt-2 border-t border-[#19312A] flex items-center justify-between text-xs text-[#A39D8F]">
                <span className="flex items-center gap-1">
                  <Bookmark className="w-3.5 h-3.5 text-[#C5A96A]" />
                  <span>مرجع معتمد</span>
                </span>
                {ref.digitalLink && (
                  <a
                    href={ref.digitalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C5A96A] hover:underline flex items-center gap-1"
                  >
                    <span>رابط المصدر</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </main>

    </div>
  );
};
