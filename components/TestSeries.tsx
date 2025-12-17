import React, { useState } from 'react';
import { ArrowRight, Sparkles, Check, BookOpen, Crown, Zap, FileText, Layers, Star } from 'lucide-react';
import { Button } from './Button';

type Level = 'foundation' | 'inter' | 'final';
type GroupOption = 'single' | 'both';

interface TestSeriesProps {
  onBuyNow?: (plan: any) => void;
}

export const TestSeries: React.FC<TestSeriesProps> = ({ onBuyNow }) => {
  const [level, setLevel] = useState<Level>('inter');
  const [groupOption, setGroupOption] = useState<GroupOption>('single');

  // Pricing Logic Database
  const getPrice = (planType: 'subject' | 'full' | 'detailed' | 'mentorship') => {
    const basePrices = {
      foundation: { subject: 299, full: 999, detailed: 1999, mentorship: 3999 },
      inter: { subject: 499, full: 1499, detailed: 2999, mentorship: 4999 },
      final: { subject: 699, full: 1999, detailed: 3499, mentorship: 5999 }
    };

    let price = basePrices[level][planType];
    
    // Adjust for Both Groups (Not applicable for Subject Wise usually, but for logic sake)
    if (groupOption === 'both' && planType !== 'subject') {
        price = Math.round(price * 1.8); // 80% of double
    }

    return `₹${price.toLocaleString()}`;
  };

  const plans = [
    {
      id: 1,
      title: "Subject Wise",
      subtitle: "Focus on Weak Areas",
      tag: "Starter",
      icon: <BookOpen size={100} />,
      price: getPrice('subject'),
      period: "/ subject",
      // THEME UPDATE: Light Sage (Brand Secondary) - Not White, "Thoda Dark"
      bgClass: "bg-brand-secondary border-2 border-brand-secondary shadow-lg",
      textClass: "text-brand-dark", // Dark Green Text for readability
      accentClass: "text-brand-dark/70",
      iconClass: "text-brand-primary/40",
      // Button: Dark Green on Light Sage (High Contrast)
      buttonClass: "bg-brand-dark text-white hover:bg-slate-900 border-none font-bold shadow-md",
      checkColor: "text-brand-dark",
      tagClass: "bg-brand-dark text-white",
      features: [
        "1 Full Syllabus Test",
        "2 Chapter-wise Tests",
        "Standard Evaluation",
        "Suggested Answers"
      ],
      cta: "Buy Now"
    },
    {
      id: 2,
      title: "Full Syllabus",
      subtitle: "Exam Simulation Only",
      tag: "Exam Ready",
      icon: <FileText size={100} />,
      price: getPrice('full'),
      period: groupOption === 'both' ? "/ both grps" : "/ group",
      // THEME: Light Cream (Contrast)
      bgClass: "bg-brand-cream border-2 border-brand-secondary",
      textClass: "text-slate-800",
      accentClass: "text-brand-dark",
      iconClass: "text-brand-secondary",
      // UPDATE: Button changed to Dark Green for better visibility
      buttonClass: "bg-brand-dark text-white hover:bg-brand-primary border-none font-bold shadow-md",
      checkColor: "text-brand-dark",
      tagClass: "bg-white text-slate-600",
      features: [
        "5 Full Syllabus Mocks",
        "ICAI Pattern Papers",
        "Evaluation in 3 Days",
        "Performance Analysis"
      ],
      cta: "Buy Now"
    },
    {
      id: 3,
      title: "Detailed Series",
      subtitle: "Chapterwise + Full Mocks",
      tag: "Best Seller",
      icon: <Layers size={100} />,
      price: getPrice('detailed'),
      period: groupOption === 'both' ? "/ both grps" : "/ group",
      // THEME: Brand Dark (Darkest Green)
      bgClass: "bg-brand-dark border-2 border-brand-dark text-white transform md:-translate-y-4 shadow-2xl",
      textClass: "text-white",
      accentClass: "text-brand-orange", 
      iconClass: "text-white/10",
      // Button: Brand Orange on Dark Green (Maximum Pop)
      buttonClass: "bg-brand-orange text-white hover:bg-white hover:text-brand-orange font-bold shadow-lg border-none", 
      checkColor: "text-brand-orange",
      tagClass: "bg-brand-orange text-white",
      features: [
        "All Chapter-wise Tests",
        "5 Full Syllabus Tests",
        "Step-wise Marking",
        "Topper Sheet Comparison",
        "Detailed Comments"
      ],
      cta: "Buy Now",
      highlight: true
    },
    {
      id: 4,
      title: "Mentorship Pro",
      subtitle: "Guidance + Series",
      tag: "Ranker's Choice",
      icon: <Crown size={100} />,
      price: getPrice('mentorship'),
      period: groupOption === 'both' ? "/ both grps" : "/ group",
      // THEME: White (Clean Professional)
      bgClass: "bg-white border-2 border-slate-200",
      textClass: "text-slate-800",
      accentClass: "text-slate-500",
      iconClass: "text-slate-200",
      buttonClass: "bg-slate-800 text-white hover:bg-slate-700",
      checkColor: "text-slate-800",
      tagClass: "bg-slate-100 text-slate-600",
      features: [
        "Everything in Detailed",
        "Priority 24hr Checking",
        "Weekly Strategy Calls",
        "Personal Study Planner",
        "WhatsApp Doubt Support"
      ],
      cta: "Apply Now"
    }
  ];

  return (
    <section id="test-series" className="pt-4 pb-12 md:pt-4 md:pb-12 lg:py-12 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-3">
              Choose Your <span className="text-brand-primary">Plan</span>
            </h2>
            <p className="text-slate-500 text-base md:text-lg max-w-2xl mb-6 leading-relaxed">
              From subject-wise practice to full mentorship, we have a plan for every stage of your preparation.
            </p>

            {/* CONTROL PANEL BOX */}
            <div className="bg-white p-1.5 rounded-2xl shadow-lg border border-slate-200 inline-flex flex-col md:flex-row gap-2 items-center w-full md:w-auto max-w-sm md:max-w-none">
                
                {/* Level Selector */}
                <div className="flex bg-slate-100 rounded-xl p-1 w-full md:w-auto">
                    {(['foundation', 'inter', 'final'] as Level[]).map((l) => (
                        <button
                            key={l}
                            onClick={() => {
                                setLevel(l);
                                if (l === 'foundation') setGroupOption('single'); 
                            }}
                            className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-300 capitalize ${
                                level === l 
                                ? 'bg-white text-brand-dark shadow-sm ring-1 ring-black/5' 
                                : 'text-slate-500 hover:text-slate-700'
                            }`}
                        >
                            {l}
                        </button>
                    ))}
                </div>

                {/* Vertical Divider (Desktop) */}
                <div className="hidden md:block w-px h-6 bg-slate-200"></div>

                {/* Group Selector */}
                {level !== 'foundation' && (
                    <div className="flex bg-slate-100 rounded-xl p-1 w-full md:w-auto">
                        {(['single', 'both'] as GroupOption[]).map((g) => (
                            <button
                                key={g}
                                onClick={() => setGroupOption(g)}
                                className={`flex-1 md:flex-none px-4 md:px-6 py-2 rounded-lg text-xs md:text-sm font-bold transition-all duration-300 capitalize ${
                                    groupOption === g 
                                    ? 'bg-brand-dark text-white shadow-sm' 
                                    : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                {g === 'single' ? '1 Grp' : 'Both'}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* 4 Cards Grid - Compact Mobile Gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 align-start">
          {plans.map((item) => (
            <div 
              key={item.id} 
              className={`relative rounded-3xl overflow-hidden transition-all duration-300 flex flex-col h-full ${item.bgClass}`}
            >
              
              {/* Decorative Icon Background */}
              <div className={`absolute -right-6 -top-6 opacity-[0.08] transform rotate-12 pointer-events-none ${item.iconClass}`}>
                {item.icon}
              </div>

              {/* Tag for Highlighted Plan */}
              {item.highlight && (
                 <div className="absolute top-0 right-0 bg-brand-orange text-white text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider shadow-sm z-20">
                    <Star size={10} className="inline mb-0.5 mr-0.5 fill-current" /> Most Popular
                 </div>
              )}

              {/* Card Content */}
              <div className="p-6 md:p-6 flex flex-col h-full relative z-10">
                 
                 {/* Top Section */}
                 <div className="mb-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 inline-block ${item.tagClass}`}>
                        {item.tag}
                    </span>
                    <h3 className={`text-xl font-display font-bold leading-tight ${item.textClass}`}>
                        {item.title}
                    </h3>
                    <p className={`text-xs mt-1 ${item.accentClass}`}>{item.subtitle}</p>
                 </div>

                 {/* Price Section */}
                 <div className="mb-6">
                    <div className={`flex items-baseline gap-1 ${item.textClass}`}>
                        <span className="text-3xl font-bold tracking-tight">{item.price}</span>
                    </div>
                    <span className={`text-xs font-medium ${item.accentClass}`}>{item.period}</span>
                 </div>

                 {/* Features List */}
                 <ul className="space-y-3 mb-6 flex-grow">
                    {item.features.map((feat, i) => (
                       <li key={i} className={`flex items-start gap-2 text-xs font-medium ${
                           item.id === 3 ? 'text-white/90' : 
                           item.id === 1 ? 'text-brand-dark/90' : 'text-slate-600'
                       }`}>
                          <Check size={14} className={`shrink-0 mt-0.5 ${item.checkColor}`} strokeWidth={3} />
                          <span className="leading-tight">{feat}</span>
                       </li>
                    ))}
                 </ul>
                 
                 {/* CTA Button */}
                 <Button 
                    fullWidth 
                    size="sm"
                    className={`font-bold mt-auto ${item.buttonClass}`}
                    onClick={() => onBuyNow && onBuyNow(item)}
                 >
                    {item.cta} 
                 </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="mt-8 text-center">
            <p className="text-slate-500 text-xs md:text-sm">
                Need help choosing? <a href="#" className="text-brand-primary font-bold hover:underline">Chat with us</a> for a free consultation.
            </p>
        </div>

      </div>
    </section>
  );
};