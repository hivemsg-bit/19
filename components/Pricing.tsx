import React, { useState } from 'react';
import { Check, X, Zap, Crown } from 'lucide-react';
import { Button } from './Button';

export const Pricing: React.FC = () => {
  const [isBothGroups, setIsBothGroups] = useState(false); // Default to Single Group for lower perceived price

  const plans = [
    {
      name: "Subject Wise",
      price: "₹499",
      period: "/ subject",
      desc: "Perfect for strengthening specific weak subjects.",
      features: [
        "1 Full Syllabus Test",
        "3 Chapter-wise Tests",
        "Evaluation in 5-7 Days",
        "Suggested Answers",
        "Standard Comments"
      ],
      cta: "Select Subject",
      popular: false,
      color: "border-slate-200"
    },
    {
      name: "Detailed Series",
      price: isBothGroups ? "₹5,499" : "₹2,999",
      period: isBothGroups ? "/ both groups" : "/ group",
      desc: "Comprehensive practice with detailed sheet analysis.",
      features: [
        "5 Full Syllabus Tests",
        "All Chapter-wise Tests",
        "Evaluation in 3-4 Days",
        "Detailed Step-wise Marking",
        "Performance Dashboard",
        "Topper's Sheet Comparison"
      ],
      cta: "Start Now",
      popular: true,
      color: "border-brand-orange"
    },
    {
      name: "Mentorship Series",
      price: isBothGroups ? "₹8,499" : "₹4,999",
      period: isBothGroups ? "/ both groups" : "/ group",
      desc: "Priority support and guidance for aiming ranks.",
      features: [
        "Includes 'Detailed Series'",
        "Priority Evaluation (2-3 Days)",
        "Weekly Strategy Zoom Calls",
        "Personalized Study Planner",
        "WhatsApp Doubt Support",
        "Video Solutions for Tough Qs"
      ],
      cta: "Apply for Batch",
      popular: false,
      color: "border-brand-primary"
    }
  ];

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-4">
            Simple, Transparent <span className="text-brand-orange">Pricing</span>
          </h2>
          <p className="text-slate-600 text-lg">
            High quality evaluation at student-friendly prices. No hidden charges.
          </p>

          {/* Toggle */}
          <div className="mt-8 inline-flex bg-white p-1 rounded-full border border-slate-200 shadow-sm relative cursor-pointer select-none">
             <div 
                className="flex relative z-10"
                onClick={() => setIsBothGroups(!isBothGroups)}
             >
                <div className={`px-6 py-2 rounded-full text-sm font-bold transition-colors duration-300 ${!isBothGroups ? 'text-white' : 'text-slate-500'}`}>
                    Single Group
                </div>
                <div className={`px-6 py-2 rounded-full text-sm font-bold transition-colors duration-300 ${isBothGroups ? 'text-white' : 'text-slate-500'}`}>
                    Both Groups
                </div>
             </div>
             
             {/* Sliding Pill */}
             <div className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-brand-dark rounded-full transition-all duration-300 ${isBothGroups ? 'translate-x-full' : 'translate-x-0'}`}></div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
           {plans.map((plan, index) => (
             <div 
                key={index}
                className={`relative bg-white rounded-3xl p-8 border-2 transition-all duration-300 ${plan.popular ? 'border-brand-orange shadow-2xl scale-105 z-10' : 'border-slate-100 shadow-lg hover:shadow-xl hover:-translate-y-1'}`}
             >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-orange text-white text-xs font-bold px-4 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1">
                     <Crown size={12} fill="currentColor" /> Best Value
                  </div>
                )}

                <div className="mb-6">
                   <h3 className="text-xl font-display font-bold text-slate-800">{plan.name}</h3>
                   <p className="text-slate-500 text-xs mt-1">{plan.desc}</p>
                </div>

                <div className="mb-6 flex items-baseline gap-1">
                   <span className="text-4xl font-bold text-slate-900">{plan.price}</span>
                   <span className="text-slate-400 font-medium text-sm">{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-8">
                   {plan.features.map((feature, i) => (
                     <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                        <Check size={18} className="text-brand-primary flex-shrink-0 mt-0.5" strokeWidth={3} />
                        <span className="leading-tight">{feature}</span>
                     </li>
                   ))}
                </ul>

                <Button 
                   fullWidth 
                   variant={plan.popular ? 'primary' : 'outline'}
                   className={plan.popular ? 'shadow-brand-orange/20 shadow-lg' : ''}
                >
                   {plan.cta}
                </Button>
             </div>
           ))}
        </div>

        {/* Trust Footer */}
        <div className="mt-12 text-center">
           <div className="inline-flex items-center gap-2 text-sm text-slate-500 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm">
              <Zap size={16} className="text-brand-orange fill-current" />
              <span>Try our free demo mock test before enrolling.</span>
           </div>
        </div>

      </div>
    </section>
  );
};