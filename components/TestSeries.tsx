
import React, { useState } from 'react';
import { Check, BookOpen, Crown, FileText, Layers, Star } from 'lucide-react';
import { Button } from './Button';

type Level = 'foundation' | 'inter' | 'final';
type GroupOption = 'single' | 'both';

interface TestSeriesProps {
  onBuyNow?: (plan: any) => void;
}

export const TestSeries: React.FC<TestSeriesProps> = ({ onBuyNow }) => {
  const [level, setLevel] = useState<Level>('inter');
  const [groupOption, setGroupOption] = useState<GroupOption>('single');

  const getPrice = (planType: 'subject' | 'full' | 'detailed' | 'mentorship') => {
    const basePrices = {
      foundation: { subject: 299, full: 999, detailed: 1999, mentorship: 3999 },
      inter: { subject: 499, full: 1499, detailed: 2999, mentorship: 4999 },
      final: { subject: 699, full: 1999, detailed: 3499, mentorship: 5999 }
    };
    let price = basePrices[level][planType];
    if (groupOption === 'both' && planType !== 'subject') price = Math.round(price * 1.8);
    return `₹${price.toLocaleString()}`;
  };

  const plans = [
    { id: 1, title: "Subject Practice", tag: "Starter", price: getPrice('subject'), icon: <BookOpen size={40} />, bgClass: "bg-brand-secondary border-brand-secondary", textClass: "text-brand-dark", buttonClass: "bg-brand-dark text-white", features: ["1 Full Syllabus", "2 Chapter Tests"] },
    { id: 2, title: "Exam Simulator", tag: "Most Liked", price: getPrice('full'), icon: <FileText size={40} />, bgClass: "bg-brand-cream border-brand-secondary", textClass: "text-slate-800", buttonClass: "bg-brand-dark text-white", features: ["5 Full Mocks", "ICAI Pattern"] },
    { id: 3, title: "Detailed Prep", tag: "Best Seller", price: getPrice('detailed'), icon: <Layers size={40} />, bgClass: "bg-brand-dark border-brand-dark text-white shadow-lg", textClass: "text-white", buttonClass: "bg-brand-orange text-white", features: ["All Chapter Tests", "5 Full Mocks"], highlight: true },
    { id: 4, title: "Mentorship Pro", tag: "Ranker's", price: getPrice('mentorship'), icon: <Crown size={40} />, bgClass: "bg-white border-slate-200", textClass: "text-slate-800", buttonClass: "bg-slate-800 text-white", features: ["Weekly Strategy", "Study Planner"] }
  ];

  return (
    <section id="test-series" className="py-6 lg:py-10 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-5 lg:mb-8">
            <h2 className="text-xl lg:text-3xl font-display font-bold text-slate-900 mb-1">
              Select CA <span className="text-brand-primary">Test Series</span>
            </h2>
            <p className="text-slate-500 text-[10px] lg:text-xs max-w-lg mb-4">India's most accurate ICAI pattern CA mock test papers.</p>

            <div className="bg-white p-0.5 rounded shadow-sm border border-slate-200 flex flex-col md:flex-row gap-0.5 items-center">
                <div className="flex bg-slate-100 rounded p-0.5">
                    {(['foundation', 'inter', 'final'] as Level[]).map((l) => (
                        <button key={l} onClick={() => { setLevel(l); if (l === 'foundation') setGroupOption('single'); }} className={`px-2.5 py-1 rounded text-[8px] lg:text-[10px] font-bold capitalize ${level === l ? 'bg-white text-brand-dark shadow-xs' : 'text-slate-500'}`}>{l}</button>
                    ))}
                </div>
                {level !== 'foundation' && (
                    <div className="flex bg-slate-100 rounded p-0.5">
                        {(['single', 'both'] as GroupOption[]).map((g) => (
                            <button key={g} onClick={() => setGroupOption(g)} className={`px-2.5 py-1 rounded text-[8px] lg:text-[10px] font-bold capitalize ${groupOption === g ? 'bg-brand-dark text-white shadow-xs' : 'text-slate-500'}`}>{g === 'single' ? '1 Grp' : 'Both'}</button>
                        ))}
                    </div>
                )}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {plans.map((item) => (
            <div key={item.id} className={`relative rounded-lg overflow-hidden flex flex-col h-full border p-4 ${item.bgClass} ${item.highlight ? 'scale-[1.02] z-10' : ''}`}>
              {item.highlight && <div className="absolute top-0 right-0 bg-brand-orange text-white text-[7px] font-black px-1.5 py-0.5 rounded-bl uppercase">Popular</div>}
              <div className="mb-3">
                <span className="text-[7px] font-black uppercase tracking-widest px-1 py-0.5 rounded bg-black/5 mb-1 inline-block">{item.tag}</span>
                <h3 className={`text-sm lg:text-base font-display font-bold leading-tight ${item.textClass}`}>{item.title}</h3>
                <div className={`text-lg lg:text-xl font-black mt-0.5 ${item.textClass}`}>{item.price}</div>
              </div>
              <ul className="space-y-1.5 mb-4 flex-grow">
                {item.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[9px] lg:text-[10px] font-medium opacity-90">
                    <Check size={8} className="shrink-0 mt-0.5" strokeWidth={4} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Button fullWidth size="sm" className={`font-bold py-1 text-[9px] ${item.buttonClass}`}>Enroll Now</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
