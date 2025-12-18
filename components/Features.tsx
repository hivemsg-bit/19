import React, { useState, useEffect, useRef } from 'react';
import { FileText, Clock, TrendingUp, Users } from 'lucide-react';

const features = [
  {
    id: 1,
    icon: <FileText size={32} />,
    title: "ICAI Pattern Replication",
    subtitle: "Exact Exam Simulation",
    description: "We replicate the ICAI font, spacing, and paper texture. Difficulty matches latest trends.",
    color: "bg-blue-100 text-blue-600",
    borderColor: "border-blue-200"
  },
  {
    id: 2,
    icon: <Clock size={32} />,
    title: "48-Hour Evaluation",
    subtitle: "Speed Meets Quality",
    description: "Submit your sheet, and get it checked line-by-line within 48 hours guaranteed.",
    color: "bg-brand-primary/20 text-brand-dark",
    borderColor: "border-brand-primary/30"
  },
  {
    id: 3,
    icon: <TrendingUp size={32} />,
    title: "Micro-Analysis Report",
    subtitle: "Data-Driven Growth",
    description: "Dashboard tells you which chapter is weak and topper comparisons.",
    color: "bg-brand-orange/20 text-brand-orange",
    borderColor: "border-brand-orange/30"
  },
  {
    id: 4,
    icon: <Users size={32} />,
    title: "Ranker Mentorship",
    subtitle: "Learn from the Best",
    description: "Get on a 1-on-1 call with a Rank holder to review your paper live.",
    color: "bg-purple-100 text-purple-600",
    borderColor: "border-purple-200"
  }
];

export const Features: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const featureRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    featureRefs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) setActiveFeature(index);
        }, { rootMargin: "-45% 0px -45% 0px" });
        observer.observe(ref);
        observers.push(observer);
      }
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <section id="features" className="bg-white relative py-10 lg:py-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:hidden pb-8 text-center">
            <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900">
                Why We Are <span className="text-blue-600">#1</span>
            </h2>
            <p className="text-slate-500 text-xs mt-1">The difference between 199 and 200 is our process.</p>
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="hidden lg:flex w-1/2 sticky top-0 h-screen flex-col justify-center pr-12">
            <div className="relative">
                <h2 className="text-3xl font-display font-bold text-slate-900 mb-1">
                    Why We Are <span className="text-blue-600">#1</span>
                </h2>
                <p className="text-slate-500 text-sm mb-8">The difference between 199 and 200 is our process.</p>

                <div className="relative h-[300px] w-full">
                    {features.map((feature, index) => (
                        <div key={feature.id} className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${activeFeature === index ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95 pointer-events-none'}`}>
                            <div className={`h-full bg-white rounded-2xl p-6 border-2 ${feature.borderColor} shadow-xl flex flex-col justify-center relative overflow-hidden`}>
                                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4`}>
                                    {React.cloneElement(feature.icon as React.ReactElement<any>, { size: 24 })}
                                </div>
                                <h3 className="text-xl font-display font-bold text-slate-800 mb-0.5">{feature.title}</h3>
                                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-3">{feature.subtitle}</div>
                                <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative">
             <div className="absolute left-3 lg:left-10 top-0 bottom-0 w-0.5 bg-slate-100 rounded-full">
                <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-400 to-blue-700 transition-all duration-500 ease-out rounded-full" style={{ height: `${Math.min(((activeFeature + 0.5) / features.length) * 100, 100)}%` }}></div>
             </div>

             <div className="flex flex-col gap-6 lg:gap-0">
                {features.map((feature, index) => (
                    <div key={feature.id} ref={(el) => { featureRefs.current[index] = el; }} className="flex gap-3 lg:gap-10 items-start lg:items-center transition-all duration-500 min-h-0 lg:min-h-[45vh]">
                        <div className="relative z-10 flex-shrink-0 ml-0.5 lg:ml-7.5 mt-4 lg:mt-0">
                            <div className={`w-5 h-5 rounded-full border-[2px] border-white shadow-md transition-all duration-500 ${index <= activeFeature ? 'bg-blue-600 border-blue-600 scale-110' : 'bg-white border-slate-300'}`}></div>
                        </div>
                        <div className="py-1 w-full lg:pb-8 lg:pt-2">
                            <div className="lg:hidden bg-white p-3.5 rounded-xl shadow-md border border-slate-100 relative overflow-hidden">
                                <div className="flex items-start gap-3 mb-1.5">
                                    <div className={`w-8 h-8 rounded-lg ${feature.color} flex items-center justify-center flex-shrink-0`}>
                                        {React.cloneElement(feature.icon as React.ReactElement<any>, { size: 16 })}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900 leading-tight">{feature.title}</h3>
                                        <p className="text-[8px] font-bold text-blue-600 uppercase tracking-wide mt-0.5">{feature.subtitle}</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 text-[11px] leading-relaxed">{feature.description}</p>
                            </div>

                            <div className="hidden lg:block">
                                <span className={`text-4xl font-display font-bold block mb-0.5 transition-colors duration-500 ${activeFeature === index ? 'text-blue-600' : 'text-slate-500'}`}>0{index + 1}</span>
                                <h3 className={`text-xl font-bold transition-colors duration-500 ${activeFeature === index ? 'text-slate-900' : 'text-slate-500'}`}>{feature.title}</h3>
                                <p className={`mt-0.5 max-w-sm text-xs font-medium transition-colors duration-500 ${activeFeature === index ? 'text-blue-600' : 'text-slate-400'}`}>{feature.subtitle}</p>
                            </div>
                        </div>
                    </div>
                ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};