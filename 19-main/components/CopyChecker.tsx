import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, FileText, ArrowRight, Search, Highlighter } from 'lucide-react';
import { Button } from './Button';

export const CopyChecker: React.FC = () => {
  return (
    <section id="copy-checker" className="py-20 bg-white relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-cream/50 skew-x-12 translate-x-20 z-0"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                
                {/* Left Content: The Pitch */}
                <div className="w-full lg:w-1/2">
                    <span className="inline-block py-1 px-3 rounded-full bg-brand-orange/10 text-brand-orange font-bold tracking-wider uppercase text-[10px] mb-4 border border-brand-orange/20">
                        Detailed Evaluation
                    </span>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
                        We Don't Just Check. <br/>
                        <span className="text-brand-primary">We Correct.</span>
                    </h2>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                        ICAI reduces marks for generic answers. Our examiners identify exactly where you missed technical keywords, section numbers, or presentation logic.
                    </p>
                    
                    {/* Feature List */}
                    <div className="space-y-6 mb-10">
                        {/* Feature 1 */}
                        <div className="flex gap-4 group">
                            <div className="mt-1 w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-brand-dark group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300 shadow-sm">
                                <Highlighter size={22} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-lg group-hover:text-brand-primary transition-colors">Keyword Highlight</h4>
                                <p className="text-slate-500 text-sm leading-relaxed mt-1">We underline missing ICAI keywords in your answer so you know exactly what to write next time.</p>
                            </div>
                        </div>
                         {/* Feature 2 */}
                        <div className="flex gap-4 group">
                            <div className="mt-1 w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-brand-dark group-hover:bg-brand-orange group-hover:text-white transition-colors duration-300 shadow-sm">
                                <Search size={22} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-lg group-hover:text-brand-orange transition-colors">Step-wise Marking</h4>
                                <p className="text-slate-500 text-sm leading-relaxed mt-1">Full marks distribution per step (Working Notes + Final Answer) as per the latest suggested answers.</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button variant="primary" className="shadow-brand-orange/20 shadow-lg font-bold">
                            Submit a Sample Sheet
                        </Button>
                        <Button variant="outline" className="border-slate-300 text-slate-600 hover:border-brand-primary hover:text-brand-primary">
                            View Topper's Copy <ArrowRight size={16} className="ml-2" />
                        </Button>
                    </div>
                </div>

                {/* Right Visual: The Realistic Checked Paper */}
                <div className="w-full lg:w-1/2 relative perspective-1000">
                    
                    {/* The Paper Container */}
                    <div className="bg-white rounded-sm shadow-2xl border border-slate-200 p-6 md:p-10 relative transform rotate-1 transition-transform duration-500 hover:rotate-0 hover:scale-[1.01] max-w-md mx-auto lg:mx-0">
                        
                        {/* Paper Texture/Lines */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(transparent_23px,#000_24px)] [background-size:100%_24px]"></div>

                        {/* Question Header */}
                        <div className="flex justify-between items-start border-b-2 border-slate-800 pb-4 mb-6 relative">
                            <div>
                                <div className="font-serif font-bold text-xl text-slate-900">Q.3 (b) GST Input Tax Credit</div>
                                <div className="text-xs text-slate-500 font-medium mt-1">Max Marks: 5</div>
                            </div>
                            {/* The Score Circle */}
                            <div className="text-red-600 font-hand font-black text-4xl -rotate-12 border-4 border-red-600 rounded-full w-20 h-20 flex items-center justify-center bg-white shadow-sm z-10">
                                3.5
                            </div>
                        </div>

                        {/* Handwritten Answer Simulation */}
                        <div className="font-hand text-xl md:text-2xl text-slate-700 space-y-6 leading-loose relative">
                            
                            {/* Paragraph 1 */}
                            <div className="relative">
                                <p>
                                    As per Section 16 of CGST Act, registered person is entitled to take credit of input tax charged on any supply...
                                </p>
                                {/* Green Tick */}
                                <CheckCircle2 size={24} className="absolute -left-8 top-2 text-green-500 opacity-80" strokeWidth={3} />
                            </div>
                            
                            {/* Paragraph 2 with Error */}
                            <div className="relative">
                                <p>
                                    The payment must be made within <span className="relative inline-block px-1">
                                        120 days
                                        {/* Red Strike */}
                                        <span className="absolute top-1/2 left-0 w-full h-1 bg-red-500/60 rounded-full -rotate-3"></span>
                                    </span> from the date of invoice.
                                </p>
                                
                                {/* Correction Note (Tooltip style) */}
                                <div className="absolute left-10 -bottom-8 bg-red-50 border border-red-200 text-red-700 text-xs font-sans px-3 py-1.5 rounded-lg shadow-sm rotate-[-1deg] z-20">
                                    <span className="font-bold block text-[10px] uppercase tracking-wider">Correction</span>
                                    It is 180 days, not 120!
                                </div>
                                <XCircle size={24} className="absolute -left-8 top-2 text-red-500 opacity-80" strokeWidth={3} />
                            </div>

                            {/* Paragraph 3 */}
                            <div className="relative pt-6 opacity-60">
                                <p>
                                    Condition regarding receipt of goods must be satisfied...
                                </p>
                            </div>
                        </div>

                        {/* Examiner Comment Stamp */}
                        <div className="absolute bottom-8 right-8 rotate-[-15deg] border-2 border-brand-primary text-brand-primary px-4 py-2 rounded-lg font-stamp text-lg opacity-80 uppercase tracking-widest bg-white/80 backdrop-blur-sm">
                            Good Attempt
                        </div>
                    </div>

                    {/* Floating Stats Card - 'Absolute Positioning' outside the paper */}
                    <div className="hidden md:flex absolute top-1/2 -right-6 lg:-right-12 bg-slate-900 text-white p-4 rounded-xl shadow-2xl items-center gap-3 animate-wiggle-slow z-20">
                        <div className="bg-brand-orange p-2 rounded-lg text-white">
                            <AlertCircle size={20} />
                        </div>
                        <div>
                            <div className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Mistakes Found</div>
                            <div className="text-lg font-bold">12 Errors</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
  );
};