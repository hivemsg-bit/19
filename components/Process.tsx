import React from 'react';
import { Download, PenTool, Upload, FileCheck, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export const Process: React.FC = () => {
  const steps = [
    {
      id: 1,
      icon: <Download size={20} />,
      title: "Login & Download",
      desc: "Log in and download the test paper for your scheduled subject."
    },
    {
      id: 2,
      icon: <PenTool size={20} />,
      title: "Write Test",
      desc: "Write your answers on physical sheets within the time limit."
    },
    {
      id: 3,
      icon: <Upload size={20} />,
      title: "Scan & Upload",
      desc: "Scan your answer sheets and upload the PDF to the portal."
    },
    {
      id: 4,
      icon: <FileCheck size={20} />,
      title: "Get Analysis",
      desc: "Receive evaluated copies with comments within 48 hours."
    }
  ];

  return (
    <section className="py-8 bg-brand-dark relative overflow-hidden text-white border-y border-white/5">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-brand-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-orange rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header - Very Compact */}
        <div className="text-center mb-8">
          <span className="text-brand-orange font-bold tracking-wider uppercase text-[10px] mb-1 block">
            Simple Workflow
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
            From Preparation to <span className="text-brand-primary">Perfection</span>
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto font-light">
            Focus on your writing, we handle the evaluation logic. Simple & Fast.
          </p>
        </div>

        {/* Timeline Steps */}
        <div className="relative max-w-6xl mx-auto">
          
          {/* Connecting Line (Desktop) - Adjusted for smaller circles (Top 32px / 2rem) */}
          <div className="hidden lg:block absolute top-8 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={step.id} className="relative flex flex-col items-center text-center group">
                
                {/* Step Number Circle - Compact (w-16 h-16) */}
                <div className="w-16 h-16 rounded-full bg-brand-dark border-2 border-brand-primary/30 flex items-center justify-center mb-3 relative z-10 group-hover:border-brand-orange transition-all duration-300 shadow-lg group-hover:scale-110">
                  {/* Inner Circle */}
                  <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-orange group-hover:text-white transition-all duration-300">
                    {step.icon}
                  </div>
                  
                  {/* Number Badge */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-orange text-brand-dark font-bold flex items-center justify-center text-[10px] shadow-lg border border-brand-dark">
                    {step.id}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-base font-display font-bold mb-1 group-hover:text-brand-orange transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed max-w-[180px]">
                  {step.desc}
                </p>

                {/* Arrow for mobile (except last) */}
                {index < 3 && (
                  <div className="lg:hidden my-3 text-brand-primary/20">
                    <ArrowRight size={16} className="rotate-90 md:rotate-0" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA - Very Compact */}
        <div className="mt-8 text-center">
          <Button size="sm" className="shadow-brand-orange/20 shadow-lg px-8">
            Start Writing Now <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>

      </div>
    </section>
  );
};