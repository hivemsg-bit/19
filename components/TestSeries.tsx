
import React, { useState } from 'react';
import { Check, BookOpen, Crown, FileText, Layers, Star, AlertCircle, CheckCircle, ArrowRight, Zap } from 'lucide-react';
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
    return price;
  };

  const plans = [
    { 
        id: 1, 
        title: "Subject Wise", 
        tag: "Foundation", 
        price: getPrice('subject'), 
        icon: <BookOpen size={28} />, 
        color: "brand-primary",
        features: ["1 Full Syllabus Test", "3 Chapter-wise Tests", "Evaluation in 48-72h", "Suggested Answers"] 
    },
    { 
        id: 2, 
        title: "Exam Simulator", 
        tag: "Most Popular", 
        price: getPrice('full'), 
        icon: <FileText size={28} />, 
        color: "blue-500",
        features: ["5 Full Syllabus Mocks", "ICAI Pattern Paper", "Expert Micro-Feedback", "Doubt Support"] 
    },
    { 
        id: 3, 
        title: "Detailed Prep", 
        tag: "Best Seller", 
        price: getPrice('detailed'), 
        icon: <Layers size={28} />, 
        color: "brand-orange",
        highlight: true, 
        scarcity: "Only 12 Slots Left!",
        features: ["All Chapter Tests", "5 Full Mocks", "Keyword Highlighting", "Ranker Comparison", "IndAS Special Charts"] 
    },
    { 
        id: 4, 
        title: "Mentorship Pro", 
        tag: "Ranker's Choice", 
        price: getPrice('mentorship'), 
        icon: <Crown size={28} />, 
        color: "purple-600",
        features: ["Includes Detailed Prep", "1-on-1 Ranker Call", "Study Plan by AIR 4", "WhatsApp Priority"] 
    }
  ];

  return (
    <section id="test-series" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange/10 text-brand-orange rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                <Zap size={14} className="fill-current" /> Special Jan '26 Offers
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-black text-slate-900 mb-4">
              Select Your <span className="text-brand-primary">Test Series</span>
            </h2>
            <p className="text-slate-500 text-sm max-w-lg mb-10">Expert checking with <span className="text-brand-orange font-bold">AIR Ranker Comparison</span> included in all plans.</p>

            <div className="bg-white p-2 rounded-[2rem] shadow-xl border border-slate-100 flex flex-col md:flex-row gap-2 items-center">
                <div className="flex bg-slate-100 rounded-2xl p-1.5 w-full md:w-auto">
                    {(['foundation', 'inter', 'final'] as Level[]).map((l) => (
                        <button key={l} onClick={() => { setLevel(l); if (l === 'foundation') setGroupOption('single'); }} className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex-1 md:flex-none ${level === l ? 'bg-white text-brand-dark shadow-md' : 'text-slate-500 hover:text-brand-primary'}`}>{l}</button>
                    ))}
                </div>
                {level !== 'foundation' && (
                    <div className="flex bg-slate-100 rounded-2xl p-1.5 w-full md:w-auto">
                        {(['single', 'both'] as GroupOption[]).map((g) => (
                            <button key={g} onClick={() => setGroupOption(g)} className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex-1 md:flex-none ${groupOption === g ? 'bg-brand-dark text-white shadow-md' : 'text-slate-500 hover:text-brand-primary'}`}>{g === 'single' ? '1 Group' : 'Both Grps'}</button>
                        ))}
                    </div>
                )}
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div 
                key={plan.id} 
                className={`relative bg-white rounded-[2.5rem] p-8 flex flex-col h-full border-2 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${plan.highlight ? 'border-brand-orange ring-8 ring-brand-orange/5' : 'border-slate-100 shadow-lg'}`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-orange text-white text-[10px] font-black px-6 py-2 rounded-full shadow-lg uppercase tracking-widest flex items-center gap-2">
                    <Star size={12} fill="white" /> Recommended
                </div>
              )}
              
              <div className="mb-8">
                <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-opacity-10 flex items-center justify-center text-${plan.color} ${plan.id === 1 ? 'bg-brand-primary text-brand-primary' : plan.id === 2 ? 'bg-blue-500 text-blue-500' : plan.id === 3 ? 'bg-brand-orange text-brand-orange' : 'bg-purple-600 text-purple-600'}`}>
                        {plan.icon}
                    </div>
                    {plan.scarcity && (
                        <div className="px-3 py-1 bg-red-50 text-red-600 rounded-full text-[9px] font-black uppercase tracking-widest animate-pulse border border-red-100 flex items-center gap-1">
                            <AlertCircle size={10} /> {plan.scarcity}
                        </div>
                    )}
                </div>
                <h3 className="text-xl font-display font-black text-slate-900 mb-2 leading-tight">{plan.title}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900 tracking-tighter">₹{plan.price.toLocaleString()}</span>
                    <span className="text-slate-400 font-bold text-xs uppercase">/ package</span>
                </div>
              </div>
              
              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs font-bold text-slate-600 group">
                    <CheckCircle size={16} className={`shrink-0 mt-0.5 ${plan.highlight ? 'text-brand-orange' : 'text-brand-primary'}`} />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto space-y-4">
                  <div className="bg-slate-50 rounded-2xl p-3 text-[10px] font-bold text-center border border-slate-100 text-slate-500">
                      Jan '26 Batch Enrollment Open
                  </div>
                  <Button 
                    fullWidth 
                    variant={plan.highlight ? 'primary' : 'outline'} 
                    onClick={() => onBuyNow?.(plan)}
                    className="font-black py-4 rounded-2xl uppercase tracking-widest shadow-xl group"
                  >
                    Enroll Now <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-slate-500 bg-white px-6 py-3 rounded-full border border-slate-200 shadow-sm">
                <CheckCircle size={16} className="text-green-500" />
                <span>Secure Payment Gateway • Instant Access • 24/7 Support</span>
            </div>
        </div>
      </div>
    </section>
  );
};
