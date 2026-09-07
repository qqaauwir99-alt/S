import React from 'react';
import { Info, ShieldAlert, Sparkles, GitBranch, ArrowLeft } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#06100D] text-[#F3EFE5] pb-24 text-right" dir="rtl">
      
      {/* Short Hero */}
      <section className="relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#C5A96A]/20 bg-gradient-to-b from-[#0B1714] to-[#06100D]">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10221E] border border-[#C5A96A]/30 text-xs text-[#C5A96A]">
            <Info className="w-3.5 h-3.5" />
            <span>رسالة المشروع والمنهج</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-heritage text-[#F3EFE5] leading-snug">
            عن مشروع شجرة آل سالم
          </h1>

          <p className="text-base sm:text-lg text-[#A39D8F] max-w-2xl mx-auto font-amiri leading-relaxed">
            منصة رقمية لتوثيق شجرة آل سالم وحفظ المعرفة التاريخية والتراثية لقبيلة صيعر الكندية بصورة حديثة، منظمة ومحققة استنادًا للمصادر التراثية المعتمدة.
          </p>
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        
        {/* Core Philosophy Section */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#0B1714] border border-[#C5A96A]/30 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 text-sm font-bold text-[#C5A96A]">
            <Sparkles className="w-5 h-5" />
            <span>الرؤية والهدف التراثي</span>
          </div>
          <h2 className="text-2xl font-bold font-heritage text-[#F3EFE5] leading-snug">
            مخطوطة نسب عربية أصيلة بتجربة رقمية حديثة
          </h2>
          <p className="text-sm sm:text-base text-[#F3EFE5]/90 leading-relaxed">
            انطلق هذا المشروع استجابةً للحاجة إلى تقديم شجرة آل سالم وتاريخ قبيلة صيعر بصورة تليق بعراقتها، مستلهمًا رونق المخطوطات الأثرية ولكن بأرقى أدوات التفاعل الرقمي المعاصر: خطوط نسب واضحة، وضوح تام في التسلسل الأبوي، وحفظ للمصادر دون حشو أو خلط.
          </p>
        </section>

        {/* Content Boundaries & Methodology (حدود المحتوى) */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#0B1714] border-2 border-[#C5A96A]/30 space-y-6 shadow-xl">
          <div className="flex items-center gap-2 text-sm font-bold text-[#E0CA94]">
            <ShieldAlert className="w-5 h-5 text-[#C5A96A]" />
            <span>حدود المحتوى وإبراء الذمة العلمية</span>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-[#F3EFE5]/90 leading-relaxed font-normal">
            <div className="p-4 rounded-xl bg-[#06100D] border border-[#19312A] space-y-1">
              <h4 className="font-bold text-[#C5A96A] text-sm">1. اختلاف المصادر القديمة:</h4>
              <p className="text-xs sm:text-sm text-[#A39D8F] leading-relaxed">
                يقر الموقع بأن بعض سلاسل الأنساب القديمة قبل الإسلام قد تباينت فيها روايات النسابين والمؤرخين، ويوضح الموقع المسار المعتمد لديه استنادًا إلى كبار أئمة النسب كالهمداني وابن حزم وابن عبد البر.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#06100D] border border-[#19312A] space-y-1">
              <h4 className="font-bold text-[#C5A96A] text-sm">2. المسار المعتمد الخاص:</h4>
              <p className="text-xs sm:text-sm text-[#A39D8F] leading-relaxed">
                يعرض الموقع مسار النسب المعتمد لديه وصولاً إلى فروع صيعر، ولا يلزم سائر الباحثين برأي واحد في مواضع الخلاف العلمي المشروحة في صفحة المراجع.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#06100D] border border-[#19312A] space-y-1">
              <h4 className="font-bold text-[#C5A96A] text-sm">3. بيانات ما بعد صيعر:</h4>
              <p className="text-xs sm:text-sm text-[#A39D8F] leading-relaxed">
                البيانات الخاصة لما بعد صيعر وحتى آل سالم وأبنائهم مبنية كليًا على الوثائق والمشجرات المحفوظة لدى مالك الشجرة وكبار عائلته، وتُعرض حرفيًا كما أُقرت.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#06100D] border border-[#19312A] space-y-1">
              <h4 className="font-bold text-[#C5A96A] text-sm">4. طبيعة الموقع الرقمية:</h4>
              <p className="text-xs sm:text-sm text-[#A39D8F] leading-relaxed">
                هذا الموقع منصة ثقافية تاريخية وتوثيقية عائلية، وليس جهة رسمية مخولة بإصدار وثائق الأنساب الرسمية أو القضائية.
              </p>
            </div>
          </div>
        </section>

        {/* Quick links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onNavigate('/tree')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#19312A] hover:bg-[#203f36] border border-[#C5A96A]/40 text-sm font-semibold text-[#C5A96A] flex items-center justify-center gap-2"
          >
            <GitBranch className="w-4 h-4" />
            <span>الانتقال إلى شجرة آل سالم</span>
          </button>
          <button
            onClick={() => onNavigate('/references')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0B1714] hover:bg-[#10221E] border border-[#19312A] text-sm text-[#F3EFE5] flex items-center justify-center gap-2"
          >
            <span>استعراض منهج التوثيق والمراجع</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

      </main>

    </div>
  );
};
