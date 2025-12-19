
import React from 'react';
import { Download, PenTool, Upload, FileCheck, ArrowRight } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    { id: 1, icon: <Download size={14} />, title: "Download Paper" },
    { id: 2, icon: <PenTool size={14} />, title: "Write Answers" },
    { id: 3, icon: <Upload size={14} />, title: "Scan & Upload" },
    { id: 4, icon: <FileCheck size={14} />, title: "Get Results" }
  ];

  return (
    <section className="py-6 bg-brand-dark text-white border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4">
          <h2 className="text-lg lg:text-2xl font-display font-bold">How it <span className="text-brand-primary">Works</span></h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center gap-2 group p-2 rounded-lg hover:bg-white/5">
              <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-orange group-hover:text-white transition-all shrink-0">
                {step.icon}
              </div>
              <div className="text-left">
                <span className="block text-[7px] font-bold text-slate-500 uppercase">Step 0{step.id}</span>
                <h3 className="text-[10px] lg:text-xs font-bold leading-none">{step.title}</h3>
              </div>
              {step.id < 4 && <ArrowRight size={10} className="hidden lg:block ml-auto text-white/20" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
