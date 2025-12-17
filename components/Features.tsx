import React, { useState, useEffect, useRef } from 'react';
import { FileText, Clock, TrendingUp, Users, ShieldCheck, Zap, ArrowRight } from 'lucide-react';

const features = [
  {
    id: 1,
    icon: <FileText size={40} />,
    title: "ICAI Pattern Replication",
    subtitle: "Exact Exam Simulation",
    description: "We don't just give you questions; we replicate the ICAI font, spacing, and paper texture. Our experts ensure the difficulty level matches the latest attempt trends so you are never surprised in the exam hall.",
    color: "bg-blue-100 text-blue-600",
    borderColor: "border-blue-200"
  },
  {
    id: 2,
    icon: <Clock size={40} />,
    title: "48-Hour Rapid Evaluation",
    subtitle: "Speed Meets Quality",
    description: "Time is money for CA students. Submit your sheet, and get it checked line-by-line within 48 hours guaranteed. We highlight your mistakes and provide suggested improvements immediately.",
    color: "bg-brand-primary/20 text-brand-dark",
    borderColor: "border-brand-primary/30"
  },
  {
    id: 3,
    icon: <TrendingUp size={40} />,
    title: "Micro-Analysis Report",
    subtitle: "Data-Driven Growth",
    description: "Don't just get marks; get insights. Our dashboard tells you which chapter is weak, your average time per answer, and how you compare against the Topper of the batch.",
    color: "bg-brand-orange/20 text-brand-orange",
    borderColor: "border-brand-orange/30"
  },
  {
    id: 4,
    icon: <Users size={40} />,
    title: "Ranker Mentorship",
    subtitle: "Learn from the Best",
    description: "Stuck in a loop? Get on a 1-on-1 call with a Rank holder. They will review your paper live and tell you exactly which keywords you are missing to score that exemption.",
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
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveFeature(index);
            }
          },
          { 
            rootMargin: "-40% 0px -40% 0px", // Trigger when item is in the middle 20% of screen
            threshold: 0
          }
        );
        observer.observe(ref);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <section id="features" className="bg-white relative py-8 lg:py-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Header (Visible only on small screens) */}
        <div className="lg:hidden pb-6 text-center">
            <h2 className="text-3xl font-display font-bold text-slate-900">
                Why We Are <span className="text-blue-600">#1</span>
            </h2>
        </div>

        <div className="flex flex-col lg:flex-row">
          
          {/* LEFT SIDE: Sticky Content (Desktop Only) */}
          <div className="hidden lg:flex w-1/2 sticky top-0 h-screen flex-col justify-center pr-16">
            <div className="relative">
                {/* Background Decor */}
                <div className="absolute -top-20 -left-20 w-72 h-72 bg-slate-50 rounded-full blur-3xl z-0"></div>
                
                <h2 className="text-5xl font-display font-bold text-slate-900 mb-2 relative z-10">
                    Why We Are <span className="text-blue-600">#1</span>
                </h2>
                <p className="text-slate-500 text-lg mb-12 relative z-10">
                    The difference between 199 and 200 is our process.
                </p>

                {/* Dynamic Feature Box */}
                <div className="relative h-[400px] w-full">
                    {features.map((feature, index) => (
                        <div 
                            key={feature.id}
                            className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                                activeFeature === index 
                                    ? 'opacity-100 translate-y-0 scale-100' 
                                    : 'opacity-0 translate-y-8 scale-95 pointer-events-none'
                            }`}
                        >
                            <div className={`h-full bg-white rounded-[2.5rem] p-10 border-2 ${feature.borderColor} shadow-2xl flex flex-col justify-center relative overflow-hidden`}>
                                {/* Decorative circle inside card */}
                                <div className={`absolute top-0 right-0 w-40 h-40 ${feature.color} rounded-bl-[10rem] opacity-20`}></div>
                                
                                <div className={`w-20 h-20 rounded-2xl ${feature.color} flex items-center justify-center mb-8 shadow-sm`}>
                                    {feature.icon}
                                </div>
                                
                                <h3 className="text-3xl font-display font-bold text-slate-800 mb-2">
                                    {feature.title}
                                </h3>
                                <div className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-6">
                                    {feature.subtitle}
                                </div>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>

          {/* RIGHT SIDE: Scrollable List with Line Animation */}
          <div className="w-full lg:w-1/2 relative">
             
             {/* The Vertical Line Container */}
             <div className="absolute left-3.5 lg:left-12 top-0 bottom-0 w-1 bg-slate-100 rounded-full">
                {/* The Filled Progress Line - NOW BLUE */}
                <div 
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-400 to-blue-700 transition-all duration-500 ease-out rounded-full"
                    style={{ 
                        height: `${Math.min(((activeFeature + 0.5) / features.length) * 100, 100)}%` 
                    }}
                ></div>
             </div>

             {/* The Scrollable Items */}
             <div className="flex flex-col gap-6 lg:gap-0 lg:block">
                {features.map((feature, index) => (
                    <div 
                        key={feature.id}
                        ref={(el) => { featureRefs.current[index] = el; }}
                        className="flex gap-4 lg:gap-12 items-start lg:items-center transition-all duration-500 min-h-0 lg:min-h-[50vh]"
                    >
                        {/* Timeline Dot - NOW BLUE */}
                        <div className="relative z-10 flex-shrink-0 ml-0.5 lg:ml-9 mt-6 lg:mt-0">
                            <div className={`w-7 h-7 rounded-full border-4 border-white shadow-md transition-all duration-500 ${
                                index <= activeFeature 
                                    ? 'bg-blue-600 border-blue-600 scale-125' 
                                    : 'bg-white border-slate-300'
                            }`}></div>
                        </div>

                        {/* Content (On Mobile: Card, On Desktop: Simple Text) */}
                        <div className="py-2 w-full lg:pb-10 lg:pt-2">
                            {/* Mobile Visible Card / Desktop Visible Text */}
                            <div className="lg:hidden bg-white p-5 rounded-2xl shadow-md border border-slate-100 relative overflow-hidden">
                                 {/* Small decorative blob */}
                                <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full ${feature.color} opacity-20 blur-xl`}></div>

                                <div className="flex items-start gap-3 mb-3">
                                    <div className={`w-10 h-10 rounded-lg ${feature.color} flex items-center justify-center flex-shrink-0`}>
                                        {/* Clone icon with smaller size for mobile */}
                                        {React.cloneElement(feature.icon as React.ReactElement<any>, { size: 20 })}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 leading-tight">{feature.title}</h3>
                                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mt-1">{feature.subtitle}</p>
                                    </div>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                            </div>

                            {/* Desktop Text (Minimal, because details are on left) */}
                            <div className="hidden lg:block">
                                {/* Number: Changes from Dark Grey to Blue (Never Too Light) */}
                                <span className={`text-6xl font-display font-bold block mb-2 transition-colors duration-500 ${
                                    activeFeature === index ? 'text-blue-600' : 'text-slate-500'
                                }`}>
                                    0{index + 1}
                                </span>
                                
                                {/* Title: Changes from Slate-500 to Dark Blue */}
                                <h3 className={`text-3xl font-bold transition-colors duration-500 ${
                                    activeFeature === index ? 'text-slate-900' : 'text-slate-500'
                                }`}>
                                    {feature.title}
                                </h3>
                                
                                {/* Subtitle: Changes from Slate-400 to Blue */}
                                <p className={`mt-2 max-w-sm font-medium transition-colors duration-500 ${
                                    activeFeature === index ? 'text-blue-600' : 'text-slate-400'
                                }`}>
                                    {feature.subtitle}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                
                {/* Extra space at bottom to allow last item to scroll up */}
                <div className="h-[20vh] hidden lg:block"></div>
             </div>

          </div>

        </div>
      </div>
    </section>
  );
};