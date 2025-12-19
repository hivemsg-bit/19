
import React, { useState } from 'react';
// Added missing CheckCircle import from lucide-react
import { Check, BookOpen, Crown, FileText, Layers, Star, AlertCircle, CheckCircle } from 'lucide-react';
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
    { id: 1, title: "Subject Practice", tag: "Starter", price: getPrice('subject'), icon: <BookOpen size={40} />, bgClass: "bg-brand-secondary border-brand-secondary", textClass: "text-brand-dark", buttonClass: "bg-brand-dark text-white", features: ["1 Full Syllabus", "2 Chapter Tests", "Standard Checking"] },
    { id: 2, title: "Exam Simulator", tag: "Most Liked", price: getPrice('full'), icon: <FileText size={40} />, bgClass: "bg-brand-cream border-brand-secondary", textClass: "text-slate-800", buttonClass: "bg-brand-dark text-white", features: ["5 Full Mocks", "ICAI Pattern Paper", "Detailed Step-wise"] },
    { id: 3, title: "Detailed Prep", tag: "Best Seller", price: getPrice('detailed'), icon: <Layers size={40} />, bgClass: "bg-brand-dark border-brand-dark text-white shadow-lg", textClass: "text-white", buttonClass: "bg-brand-orange text-white", features: ["All Chapter Tests", "5 Full Mocks", "Keyword Highlights"], highlight: true, scarcity: "Only 4 Slots Left!" },
    { id: 4, title: "Mentorship Pro", tag: "Ranker's", price: getPrice('mentorship'), icon: <Crown size={40} />, bgClass: "bg-white border-slate-200", textClass: "text-slate-800", buttonClass: "bg-slate-800 text-white", features: ["Weekly Strategy", "Study Planner", "1-on-1 Ranker Call"], scarcity: "Limited Batch" }
  ];

  return (
    <section id="test-series" className="py-12 lg:py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-8 lg:mb-12">
            <h2 className="text-2xl lg:text-4xl font-display font-bold text-slate-900 mb-2">
              Select CA <span className="text-brand-primary">Test Series</span>
            </h2>
            <p className="text-slate-500 text-xs lg:text-sm max-w-lg mb-6">Expert checking with <span className="text-brand-orange font-bold">AIR Ranker Comparison</span> included in all plans.</p>

            <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-1 items-center">
                <div className="flex bg-slate-100 rounded-lg p-1">
                    {(['foundation', 'inter', 'final'] as Level[]).map((l) => (
                        <button key={l} onClick={() => { setLevel(l); if (l === 'foundation') setGroupOption('single'); }} className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${level === l ? 'bg-white text-brand-dark shadow-md' : 'text-slate-500'}`}>{l}</button>
                    ))}
                </div>
                {level !== 'foundation' && (
                    <div className="flex bg-slate-100 rounded-lg p-1">
                        {(['single', 'both'] as GroupOption[]).map((g) => (
                            <button key={g} onClick={() => setGroupOption(g)} className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${groupOption === g ? 'bg-brand-dark text-white shadow-md' : 'text-slate-500'}`}>{g === 'single' ? '1 Grp' : 'Both'}</button>
                        ))}
                    </div>
                )}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {plans.map((item) => (
            <div key={item.id} className={`relative rounded-3xl overflow-hidden flex flex-col h-full border-2 p-6 transition-all duration-300 hover:-translate-y-1 ${item.bgClass} ${item.highlight ? 'scale-[1.05] z-10 ring-4 ring-brand-orange/20 shadow-2xl' : 'shadow-lg hover:shadow-xl'}`}>
              {item.highlight && <div className="absolute top-0 right-0 bg-brand-orange text-white text-[9px] font-black px-3 py-1 rounded-bl-xl uppercase tracking-widest">Best Value</div>}
              
              <div className="mb-4">
                <div className="flex justify-between items-start">
                    <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded bg-black/5 mb-2 inline-block">{item.tag}</span>
                    {item.scarcity && (
                        <span className="text-[8px] font-black uppercase text-red-500 flex items-center gap-1 animate-pulse"><AlertCircle size={10} /> {item.scarcity}</span>
                    )}
                </div>
                <h3 className={`text-lg font-display font-bold leading-tight ${item.textClass}`}>{item.title}</h3>
                <div className={`text-2xl font-black mt-1 ${item.textClass}`}>{item.price}</div>
              </div>
              
              <ul className="space-y-2 mb-6 flex-grow">
                {item.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-[11px] font-bold opacity-90">
                    <CheckCircle size={14} className="shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                  <div className="bg-white/10 rounded-xl p-2 text-[9px] font-bold text-center border border-white/10">
                      Free Topper Copy & AIR Support
                  </div>
                  <Button fullWidth size="md" className={`font-black py-3 rounded-xl uppercase tracking-widest shadow-lg ${item.buttonClass}`}>Enroll Now</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
