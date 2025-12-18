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
    { id: 1, title: "Subject Wise", tag: "Starter", price: getPrice('subject'), icon: <BookOpen size={60} />, bgClass: "bg-brand-secondary border-brand-secondary", textClass: "text-brand-dark", buttonClass: "bg-brand-dark text-white", features: ["1 Full Syllabus", "2 Chapter-wise", "Standard Evaluation"] },
    { id: 2, title: "Full Syllabus", tag: "Exam Ready", price: getPrice('full'), icon: <FileText size={60} />, bgClass: "bg-brand-cream border-brand-secondary", textClass: "text-slate-800", buttonClass: "bg-brand-dark text-white", features: ["5 Full Mocks", "ICAI Pattern", "3-Day Evaluation"] },
    { id: 3, title: "Detailed Series", tag: "Best Seller", price: getPrice('detailed'), icon: <Layers size={60} />, bgClass: "bg-brand-dark border-brand-dark text-white shadow-xl", textClass: "text-white", buttonClass: "bg-brand-orange text-white", features: ["All Chapter Tests", "5 Full Mocks", "Step Marking"], highlight: true },
    { id: 4, title: "Mentorship Pro", tag: "Ranker", price: getPrice('mentorship'), icon: <Crown size={60} />, bgClass: "bg-white border-slate-200", textClass: "text-slate-800", buttonClass: "bg-slate-800 text-white", features: ["Priority Evaluation", "Weekly Strategy", "Study Planner"] }
  ];

  return (
    <section id="test-series" className="py-10 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-6 md:mb-10">
            <h2 className="text-xl md:text-3xl font-display font-bold text-slate-900 mb-2">
              Choose Your <span className="text-brand-primary">Plan</span>
            </h2>
            <p className="text-slate-500 text-xs md:text-sm max-w-lg mb-5">Plans for every stage of your preparation.</p>

            <div className="bg-white p-1 rounded-lg shadow-md border border-slate-200 flex flex-col md:flex-row gap-1 items-center">
                <div className="flex bg-slate-100 rounded p-0.5">
                    {(['foundation', 'inter', 'final'] as Level[]).map((l) => (
                        <button key={l} onClick={() => { setLevel(l); if (l === 'foundation') setGroupOption('single'); }} className={`px-3 py-1.5 rounded text-[9px] md:text-[11px] font-bold capitalize ${level === l ? 'bg-white text-brand-dark shadow-sm' : 'text-slate-500'}`}>{l}</button>
                    ))}
                </div>
                {level !== 'foundation' && (
                    <div className="flex bg-slate-100 rounded p-0.5">
                        {(['single', 'both'] as GroupOption[]).map((g) => (
                            <button key={g} onClick={() => setGroupOption(g)} className={`px-3 py-1.5 rounded text-[9px] md:text-[11px] font-bold capitalize ${groupOption === g ? 'bg-brand-dark text-white shadow-sm' : 'text-slate-500'}`}>{g === 'single' ? '1 Grp' : 'Both'}</button>
                        ))}
                    </div>
                )}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((item) => (
            <div key={item.id} className={`relative rounded-xl overflow-hidden transition-all flex flex-col h-full border-2 p-5 ${item.bgClass}`}>
              {item.highlight && <div className="absolute top-0 right-0 bg-brand-orange text-white text-[8px] font-extrabold px-2 py-0.5 rounded-bl uppercase z-20">Most Popular</div>}
              <div className="mb-4">
                <span className="text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/20 mb-1 inline-block">{item.tag}</span>
                <h3 className={`text-base font-display font-bold leading-tight ${item.textClass}`}>{item.title}</h3>
                <div className={`text-xl font-bold mt-1 ${item.textClass}`}>{item.price}</div>
              </div>
              <ul className="space-y-2 mb-6 flex-grow">
                {item.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-[10px] font-medium opacity-90">
                    <Check size={10} className="shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              <Button fullWidth size="sm" className={`font-bold py-1.5 text-[10px] ${item.buttonClass}`}>Buy Now</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};