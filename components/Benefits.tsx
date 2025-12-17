import React from 'react';
import { PenTool, Clock, BrainCircuit, AlertCircle, CheckCircle2 } from 'lucide-react';

export const Benefits: React.FC = () => {
  return (
    <section id="benefits" className="pt-6 pb-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-orange font-bold tracking-wider uppercase text-xs mb-2 block">
            The Competitive Edge
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6">
            Don't just Study. <span className="text-brand-primary">Practice Smart.</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            Most students fail not because of a lack of knowledge, but due to poor presentation and time management. We fix that.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Benefit 1: Presentation */}
          <div className="group relative bg-brand-cream rounded-[2rem] p-8 border border-brand-secondary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
             {/* Background Blob */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-bl-[4rem] transition-transform duration-500 group-hover:scale-110"></div>
             
             <div className="relative z-10">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-primary shadow-sm mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                   <PenTool size={28} />
                </div>
                
                <h3 className="text-2xl font-display font-bold text-slate-800 mb-3">
                   Master Presentation
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                   Examiners have less than 5 minutes per copy. We teach you how to present answers (keywords, underlining) to grab marks instantly.
                </p>

                {/* Visual Representation (Abstract Answer Sheet) */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 opacity-80 group-hover:opacity-100 transition-opacity">
                   <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <div className="h-2 w-20 bg-slate-200 rounded-full"></div>
                   </div>
                   <div className="space-y-2">
                      <div className="h-1.5 w-full bg-slate-100 rounded-full"></div>
                      <div className="h-1.5 w-[90%] bg-slate-100 rounded-full"></div>
                      <div className="h-1.5 w-[60%] bg-brand-orange/30 rounded-full"></div> {/* Highlighted keyword */}
                   </div>
                   <div className="mt-3 flex justify-end">
                      <span className="text-xs font-hand font-bold text-red-500 rotate-[-12deg]">4/4 Marks</span>
                   </div>
                </div>
             </div>
          </div>

          {/* Benefit 2: Time Management */}
          <div className="group relative bg-slate-50 rounded-[2rem] p-8 border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-bl-[4rem] transition-transform duration-500 group-hover:scale-110"></div>
             
             <div className="relative z-10">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                   <Clock size={28} />
                </div>
                
                <h3 className="text-2xl font-display font-bold text-slate-800 mb-3">
                   Attempt 100% Paper
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                   Stop leaving 15-20 marks unattempted. Our time-bound tests train your muscle memory to write fast and finish on time.
                </p>

                {/* Visual Representation (Time Bar) */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 opacity-80 group-hover:opacity-100 transition-opacity">
                   <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                      <span>Exam Progress</span>
                      <span>3h 00m</span>
                   </div>
                   <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                      <div className="h-full bg-blue-500 w-[85%]"></div>
                      <div className="h-full bg-red-400 w-[15%] animate-pulse"></div>
                   </div>
                   <div className="mt-2 text-[10px] text-slate-400 text-right">
                      Last 15 mins strategy
                   </div>
                </div>
             </div>
          </div>

          {/* Benefit 3: Exam Anxiety */}
          <div className="group relative bg-brand-cream rounded-[2rem] p-8 border border-brand-secondary/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-bl-[4rem] transition-transform duration-500 group-hover:scale-110"></div>
             
             <div className="relative z-10">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-orange shadow-sm mb-6 group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300">
                   <BrainCircuit size={28} />
                </div>
                
                <h3 className="text-2xl font-display font-bold text-slate-800 mb-3">
                   Kill Exam Fear
                </h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                   Simulate the exam pressure 10 times before the actual day. Walk into the exam hall with confidence, not panic.
                </p>

                {/* Visual Representation (Stats) */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-around">
                   <div className="text-center">
                      <div className="text-xs text-slate-400 mb-1">Anxiety</div>
                      <div className="h-10 w-2 bg-red-100 rounded-full mx-auto relative">
                         <div className="absolute bottom-0 w-full h-[20%] bg-red-400 rounded-full"></div>
                      </div>
                   </div>
                   <div className="text-center">
                      <div className="text-xs text-slate-400 mb-1">Confidence</div>
                      <div className="h-10 w-2 bg-green-100 rounded-full mx-auto relative">
                         <div className="absolute bottom-0 w-full h-[90%] bg-green-500 rounded-full transition-all duration-1000 group-hover:h-[100%]"></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="mt-16 bg-brand-dark rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <div className="relative z-10 flex items-start gap-4">
               <div className="bg-white/10 p-3 rounded-full text-brand-orange">
                  <AlertCircle size={24} />
               </div>
               <div>
                  <h4 className="text-white font-bold text-lg">Did you know?</h4>
                  <p className="text-slate-300 text-sm max-w-lg">
                     ICAIs passing percentage is only ~15%. The difference between pass and fail is often just <span className="text-white font-bold underline decoration-brand-orange">writing practice</span>.
                  </p>
               </div>
            </div>
        </div>

      </div>
    </section>
  );
};