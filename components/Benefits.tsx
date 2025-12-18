import React from 'react';
import { PenTool, Clock, BrainCircuit, AlertCircle } from 'lucide-react';

export const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="py-10 md:py-14 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <span className="text-brand-orange font-bold tracking-wider uppercase text-[9px] mb-1 block">
            The Competitive Edge
          </span>
          <h2 className="text-xl md:text-3xl font-display font-bold text-slate-900 mb-3">
            Don't just Study. <span className="text-brand-primary">Practice Smart.</span>
          </h2>
          <p className="text-sm md:text-base text-slate-600 leading-relaxed">
            Most students fail due to poor presentation and time management. We fix that.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          <div className="group relative bg-brand-cream rounded-[1.2rem] p-5 border border-brand-secondary/20 hover:shadow-lg transition-all overflow-hidden">
             <div className="relative z-10">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-brand-primary shadow-sm mb-4 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                   <PenTool size={20} />
                </div>
                <h3 className="text-lg font-display font-bold text-slate-800 mb-1.5">Master Presentation</h3>
                <p className="text-[11px] md:text-xs text-slate-600 mb-4 leading-relaxed">
                   Examiners have very little time. We teach you how to present answers to grab marks instantly.
                </p>
                <div className="bg-white rounded-lg p-2.5 shadow-sm border border-slate-100">
                   <div className="space-y-1">
                      <div className="h-1 w-full bg-slate-100 rounded-full"></div>
                      <div className="h-1 w-[80%] bg-brand-orange/30 rounded-full"></div>
                   </div>
                   <div className="mt-1.5 flex justify-end">
                      <span className="text-[9px] font-hand font-bold text-red-500 rotate-[-10deg]">4/4 Marks</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="group relative bg-slate-50 rounded-[1.2rem] p-5 border border-slate-200 hover:shadow-lg transition-all overflow-hidden">
             <div className="relative z-10">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 shadow-sm mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                   <Clock size={20} />
                </div>
                <h3 className="text-lg font-display font-bold text-slate-800 mb-1.5">Attempt 100% Paper</h3>
                <p className="text-[11px] md:text-xs text-slate-600 mb-4 leading-relaxed">
                   Stop leaving marks unattempted. Our tests train your muscle memory to finish on time.
                </p>
                <div className="bg-white rounded-lg p-2.5 shadow-sm border border-slate-100">
                   <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-blue-500 w-[85%]"></div>
                   </div>
                </div>
             </div>
          </div>

          <div className="group relative bg-brand-cream rounded-[1.2rem] p-5 border border-brand-secondary/20 hover:shadow-lg transition-all overflow-hidden">
             <div className="relative z-10">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-brand-orange shadow-sm mb-4 group-hover:bg-brand-orange group-hover:text-white transition-colors">
                   <BrainCircuit size={20} />
                </div>
                <h3 className="text-lg font-display font-bold text-slate-800 mb-1.5">Kill Exam Fear</h3>
                <p className="text-[11px] md:text-xs text-slate-600 mb-4 leading-relaxed">
                   Simulate the exam pressure before the actual day. Walk into the hall with confidence.
                </p>
                <div className="flex items-center justify-around gap-2 bg-white rounded-lg p-2 shadow-sm">
                   <div className="h-6 w-1 bg-green-500 rounded-full"></div>
                   <div className="h-4 w-1 bg-green-300 rounded-full"></div>
                   <div className="h-8 w-1 bg-green-600 rounded-full"></div>
                </div>
             </div>
          </div>
        </div>

        <div className="mt-8 bg-brand-dark rounded-xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-3 relative overflow-hidden">
            <div className="relative z-10 flex items-start gap-3">
               <AlertCircle size={18} className="text-brand-orange mt-0.5" />
               <div>
                  <h4 className="text-white font-bold text-sm">Did you know?</h4>
                  <p className="text-slate-300 text-[10px] md:text-xs max-w-lg">
                     The difference between pass and fail is often just <span className="text-white font-bold underline decoration-brand-orange">writing practice</span>.
                  </p>
               </div>
            </div>
        </div>
      </div>
    </section>
  );
};