
import React from 'react';
import { Download, PenTool, Upload, FileCheck, ArrowRight, MousePointer2, Sparkles, Trophy } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    { 
        id: 1, 
        icon: <Download size={24} />, 
        title: "Download Paper", 
        desc: "Get your ICAI-pattern question paper instantly after enrollment.",
        color: "bg-blue-500"
    },
    { 
        id: 2, 
        icon: <PenTool size={24} />, 
        title: "Write Answers", 
        desc: "Solve on physical A4 sheets within the time limit for real exam feel.",
        color: "bg-brand-orange"
    },
    { 
        id: 3, 
        icon: <Upload size={24} />, 
        title: "Scan & Upload", 
        desc: "Use any mobile scanner to upload your answer sheet on our portal.",
        color: "bg-brand-primary"
    },
    { 
        id: 4, 
        icon: <Trophy size={24} />, 
        title: "Ranker Feedback", 
        desc: "Get checked sheet with AIR Ranker's tips within 48 hours.",
        color: "bg-purple-600"
    }
  ];

  return (
    <section id="process" className="py-20 bg-brand-dark text-white relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-orange/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-brand-orange font-black uppercase tracking-[0.2em] text-[10px] mb-2 block">Our Workflow</span>
          <h2 className="text-3xl md:text-5xl font-display font-black">How Your <span className="text-brand-primary">Marks Improve</span></h2>
          <p className="text-slate-400 text-sm mt-4 max-w-xl mx-auto">A seamless 4-step process designed by Rankers to identify your weak points before the actual ICAI exam.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.id} className="relative group">
              {/* Connector for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-[2px] bg-gradient-to-r from-white/20 to-transparent z-0">
                    <div className="absolute right-0 -top-1">
                        <ArrowRight size={12} className="text-white/20" />
                    </div>
                </div>
              )}

              <div className="bg-white/5 border border-white/10 p-8 rounded-[2.5rem] hover:bg-white/10 transition-all duration-300 relative z-10 h-full group-hover:-translate-y-2">
                <div className={`w-16 h-16 rounded-2xl ${step.color} flex items-center justify-center text-white mb-6 shadow-xl group-hover:scale-110 transition-transform`}>
                    {step.icon}
                </div>
                <div className="absolute top-8 right-8 text-4xl font-black text-white/5 italic">0{step.id}</div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed font-medium">
                    {step.desc}
                </p>
                
                <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More <MousePointer2 size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-4 rounded-full">
                <Sparkles size={18} className="text-brand-orange" />
                <span className="text-sm font-bold text-slate-300 italic">"The process that helped 500+ students score 60+ in Audit & FR."</span>
            </div>
        </div>
      </div>
    </section>
  );
};
