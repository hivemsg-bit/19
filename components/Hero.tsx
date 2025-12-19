
import React, { useState, useEffect } from 'react';
import { ChevronRight, GraduationCap, Phone, Sparkles, Check, Loader2, Eye, X, Highlighter, Search, FileText, CheckCircle, AlertTriangle, Zap, Users } from 'lucide-react';
import { Button } from './Button';

interface HeroProps {
  onOpenAuth: () => void;
  onRequestCallback?: (data: any) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuth, onRequestCallback }) => {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', mobile: '', course: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSampleOpen, setIsSampleOpen] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [liveCounter, setLiveCounter] = useState(142);

  useEffect(() => {
    const interval = setInterval(() => {
        setLiveCounter(prev => prev + Math.floor(Math.random() * 3));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const levels = [
    { id: 'foundation', label: 'Foundation' },
    { id: 'inter', label: 'Intermediate' },
    { id: 'final', label: 'Final' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(formData.name && formData.mobile && formData.course) {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        if(onRequestCallback) {
            await onRequestCallback(formData);
        }
        setIsSubmitting(false);
        setIsSubmitted(true);
    }
  };

  const handleFreeDemo = () => {
    const section = document.getElementById('copy-checker');
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-6 pb-12 lg:pt-16 lg:pb-24 overflow-visible bg-brand-cream min-h-fit">
      {/* Background Optimized */}
      <div className="hidden md:block absolute top-0 right-0 w-[45%] h-full z-0">
        <img 
          src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=60&w=800&auto=format&fit=crop"
          alt="CA Student Online Practice"
          className="w-full h-full object-cover opacity-90"
          style={{ objectPosition: 'center 30%' }}
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-cream via-brand-cream/80 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
          
          <div className="flex-1 text-center md:text-left pt-2 lg:pt-6">
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-brand-dark text-[10px] sm:text-xs font-black uppercase tracking-wider border border-brand-primary/20 shadow-sm animate-fade-up">
                  <span className="w-2 h-2 rounded-full bg-brand-orange animate-ping"></span>
                  Jan 2026 Batch Live
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] sm:text-xs font-black uppercase tracking-wider border border-red-100 shadow-sm animate-fade-up">
                  <AlertTriangle size={12} />
                  Only 12 Students/Batch
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] sm:text-xs font-black uppercase tracking-wider border border-blue-100 shadow-sm animate-fade-up">
                  <Users size={12} />
                  {liveCounter} Students Practicing
                </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-[3.5rem] font-display font-black text-slate-900 leading-[1.1] mb-6 animate-fade-up">
              Crack Your CA Exams <br />
              <span className="text-2xl md:text-3xl lg:text-[2.5rem] text-slate-600 block mt-2 mb-2 font-bold italic">
                In First Attempt & Become a
              </span>
              
              <span className="relative inline-block px-1">
                <div className="inline-grid justify-items-center md:justify-items-start">
                    <span className="font-hand text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-brand-primary font-bold overflow-hidden whitespace-nowrap border-r-4 border-brand-orange animate-writing pr-1">
                        Chartered Accountant
                    </span>
                </div>
              </span>
            </h1>

            <p className="text-xs md:text-sm lg:text-lg text-slate-600 mb-10 max-w-2xl mx-auto md:mx-0 leading-relaxed font-medium animate-fade-up">
              Expert evaluation by Rankers within 48 hours. <span className="text-brand-primary font-bold">Free AIR Topper's Copy</span> included with every test series.
            </p>

            <div className="flex flex-col items-center md:items-start gap-8 mb-10 animate-fade-up">
                {/* REFINED CTA BUTTONS */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 w-full">
                    <button 
                        onClick={handleFreeDemo}
                        className="group flex items-center gap-4 bg-brand-dark hover:bg-slate-800 text-white rounded-2xl px-6 py-3.5 shadow-xl transition-all hover:-translate-y-0.5 active:scale-95"
                    >
                        <div className="w-10 h-10 rounded-xl bg-brand-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Zap size={20} className="text-brand-orange fill-current" />
                        </div>
                        <div className="text-left">
                            <div className="text-xs font-black uppercase tracking-wider leading-none mb-1">Free Demo Check</div>
                            <div className="text-[10px] font-bold text-slate-400">1 Question Free Evaluation</div>
                        </div>
                        <ChevronRight size={18} className="ml-2 text-slate-500 group-hover:translate-x-1 transition-transform" />
                    </button>
                    
                    <button 
                        onClick={onOpenAuth}
                        className="group flex items-center gap-4 bg-white border-2 border-slate-100 hover:border-brand-primary/30 text-brand-dark rounded-2xl px-6 py-3.5 shadow-lg transition-all hover:-translate-y-0.5 active:scale-95"
                    >
                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <FileText size={20} className="text-brand-primary" />
                        </div>
                        <div className="text-left">
                            <div className="text-xs font-black uppercase tracking-wider leading-none mb-1">View Pricing</div>
                            <div className="text-[10px] font-bold text-slate-400">Jan '26 Special Offers</div>
                        </div>
                        <ChevronRight size={18} className="ml-2 text-slate-300 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="bg-white/95 rounded-[2rem] border border-brand-primary/10 p-5 shadow-2xl w-full max-w-[320px] relative z-20">
                   <div className="flex items-center gap-2 mb-3 pl-1">
                      <GraduationCap className="text-brand-orange" size={18} />
                      <h3 className="font-black text-slate-800 text-sm uppercase tracking-wider">Start Your Prep</h3>
                   </div>
                   <div className="flex gap-2 mb-3">
                      {levels.map((level) => (
                        <button 
                            key={level.id} 
                            onClick={() => setSelectedLevel(level.id)} 
                            className={`px-3 py-2 rounded-xl text-[11px] font-black uppercase tracking-tight border-2 transition-all flex-1 ${selectedLevel === level.id ? 'bg-brand-primary border-brand-primary text-white' : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-brand-primary/20'}`}
                        >
                            {level.label}
                        </button>
                      ))}
                   </div>
                   {selectedLevel ? (
                     <div className="animate-fade-up">
                       <Button fullWidth size="md" onClick={onOpenAuth} className="justify-between rounded-xl font-black text-xs py-3 uppercase tracking-widest">Select Plan <ChevronRight size={14} strokeWidth={3} /></Button>
                     </div>
                   ) : (
                     <p className="text-[10px] text-slate-400 font-bold text-center italic">Pick a level to see courses</p>
                   )}
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <div 
                        onClick={() => setIsSampleOpen(true)}
                        className="flex items-center gap-2 px-5 py-2 bg-brand-primary/10 text-brand-primary rounded-full border border-brand-primary/20 cursor-pointer hover:bg-brand-primary hover:text-white transition-all group"
                    >
                        <Eye size={14} /> 
                        <span className="font-black text-[10px] uppercase tracking-wider">Evaluated Copy</span>
                    </div>

                    <div 
                        onClick={() => setIsModelOpen(true)}
                        className="flex items-center gap-2 px-5 py-2 bg-white text-slate-600 rounded-full border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50 transition-all group"
                    >
                        <FileText size={14} /> 
                        <span className="font-black text-[10px] uppercase tracking-wider">Model Paper</span>
                    </div>
                </div>
            </div>
          </div>

          <div className="w-full max-w-[340px] flex flex-col gap-4 mt-4 md:mt-0 z-20 animate-fade-up">
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-primary/5 rounded-full -translate-y-12 translate-x-12"></div>
                {!isSubmitted ? (
                    <>
                        <div className="flex items-center justify-between mb-6">
                           <div>
                              <h3 className="font-display font-black text-slate-800 text-xl">Free Strategy Call</h3>
                              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mt-1">Talk to AIR 4 Expert</p>
                           </div>
                           <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-brand-orange">
                                <Phone size={22} className="animate-pulse" />
                           </div>
                        </div>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                           <div className="space-y-1">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Your Name</label>
                               <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Rahul Sharma" required className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border-none text-sm font-bold focus:ring-2 focus:ring-brand-orange/20 transition-all" />
                           </div>
                           <div className="space-y-1">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp Mobile</label>
                               <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="+91 98765 XXXXX" required className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border-none text-sm font-bold focus:ring-2 focus:ring-brand-orange/20 transition-all" />
                           </div>
                           <div className="space-y-1">
                               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Course Level</label>
                               <select name="course" value={formData.course} onChange={handleInputChange} required className="w-full px-5 py-3.5 rounded-xl bg-slate-50 border-none text-sm font-bold text-slate-600 appearance-none focus:ring-2 focus:ring-brand-orange/20 transition-all">
                                  <option value="" disabled>Select Course</option>
                                  <option value="CA Foundation">CA Foundation</option>
                                  <option value="CA Inter">CA Inter</option>
                                  <option value="CA Final">CA Final</option>
                               </select>
                           </div>
                           <Button type="submit" fullWidth size="lg" className="text-sm font-black uppercase tracking-widest py-4 rounded-xl shadow-xl mt-2" disabled={isSubmitting}>
                              {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : 'Call Me Back'}
                           </Button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-8 animate-fade-up">
                        <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-green-600 rotate-12">
                            <Check size={40} strokeWidth={3} />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">Success!</h3>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">Our Mentor will call you on <br/><span className="text-brand-primary font-bold">{formData.mobile}</span> shortly.</p>
                        <button onClick={() => setIsSubmitted(false)} className="mt-8 text-xs font-black text-brand-orange uppercase tracking-widest hover:underline">Send another request</button>
                    </div>
                )}
            </div>

            <div onClick={onOpenAuth} className="bg-brand-dark rounded-[2rem] p-6 text-center cursor-pointer hover:bg-slate-800 transition-all border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-orange to-brand-primary"></div>
                <span className="text-brand-orange text-[10px] font-black uppercase tracking-[0.2em] block mb-2">New Batch Jan '26</span>
                <h4 className="text-white font-hand text-3xl font-bold leading-none mb-4">Join First 50 Batch</h4>
                <Button fullWidth variant="primary" className="bg-white text-brand-orange hover:bg-slate-50 text-xs font-black uppercase tracking-widest py-3 border-none shadow-lg">Book My Spot <Sparkles size={14} className="ml-2" /></Button>
            </div>
          </div>

        </div>
      </div>

      {/* EVALUATED COPY MODAL */}
      {isSampleOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6">
              <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => setIsSampleOpen(false)}></div>
              <div className="relative bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-up">
                  {/* Header */}
                  <div className="p-6 bg-brand-dark text-white flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-brand-primary rounded-2xl flex items-center justify-center">
                              <Highlighter size={24} />
                          </div>
                          <div>
                              <h3 className="font-display font-black text-xl">Student Evaluated Copy</h3>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">How our AIR Ranker Faculty checks your paper</p>
                          </div>
                      </div>
                      <button onClick={() => setIsSampleOpen(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                          <X size={24} />
                      </button>
                  </div>

                  {/* Body - Scrollable Paper Simulation */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-12 bg-slate-100 flex flex-col items-center">
                      <div className="bg-white w-full max-w-2xl rounded-sm shadow-2xl border border-slate-300 p-8 sm:p-16 relative mb-8 min-h-[1000px]">
                          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[linear-gradient(transparent_23px,#000_24px)] [background-size:100%_24px]"></div>
                          
                          <div className="mb-16">
                              <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-8">
                                  <div>
                                      <h4 className="font-serif font-bold text-2xl text-slate-900">Q.1 (a) Financial Reporting</h4>
                                      <p className="text-xs text-slate-500 font-bold uppercase mt-1">IND AS 116 - Leases</p>
                                  </div>
                                  <div className="text-red-600 font-hand font-black text-5xl -rotate-12 border-4 border-red-600 rounded-full w-24 h-24 flex items-center justify-center bg-white/50 shadow-sm">
                                      4/5
                                  </div>
                              </div>

                              <div className="font-hand text-2xl text-slate-700 leading-relaxed space-y-8">
                                  <div className="relative">
                                      <p>As per Ind AS 116, at the commencement date, a lessee shall measure the right-of-use asset at cost.</p>
                                      <div className="absolute -left-10 top-0 text-green-600">
                                          <CheckCircle size={28} strokeWidth={3} />
                                      </div>
                                      <div className="ml-4 mt-2 inline-block px-3 py-1 bg-green-50 border border-green-200 text-green-700 text-xs font-sans rounded-lg font-bold">
                                          Excellent! Standard language used.
                                      </div>
                                  </div>

                                  <div className="relative">
                                      <p>The cost of the right-of-use asset shall comprise of the initial measurement of lease liability and any lease payments made at or before commencement...</p>
                                      <div className="absolute -left-10 top-0 text-green-600">
                                          <CheckCircle size={28} strokeWidth={3} />
                                      </div>
                                  </div>

                                  <div className="relative">
                                      <p>The interest rate implicit in the lease should be used if it is <span className="relative inline-block px-1">
                                          not available
                                          <span className="absolute top-1/2 left-0 w-full h-1 bg-red-500/60 rounded-full -rotate-2"></span>
                                      </span></p>
                                      <div className="absolute -left-10 top-0 text-red-500">
                                          <X size={28} strokeWidth={3} />
                                      </div>
                                      <div className="absolute left-20 -bottom-8 bg-red-50 border border-red-200 text-red-700 text-xs font-sans px-4 py-2 rounded-xl shadow-lg z-20 rotate-1">
                                          <span className="font-black block text-[10px] uppercase tracking-widest mb-1">Teacher Correction</span>
                                          Wrong term! It should be "readily determinable". Use ICAI keywords to avoid marks deduction.
                                      </div>
                                  </div>
                              </div>
                          </div>

                          <div className="absolute bottom-20 right-10 opacity-70 animate-stamp-drop">
                              <div className="border-8 border-brand-primary text-brand-primary p-6 rounded-3xl font-stamp text-3xl uppercase tracking-[0.2em] rotate-[-15deg] bg-white/80">
                                  Passed • Good
                              </div>
                          </div>
                      </div>

                      <div className="w-full max-w-2xl bg-white rounded-3xl p-8 shadow-xl border border-slate-200 mb-12">
                          <h4 className="font-black text-slate-800 text-lg mb-6 flex items-center gap-2">
                              <Search size={20} className="text-brand-orange" /> Expert Micro-Analysis
                          </h4>
                          <div className="space-y-4">
                              <div className="flex gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                                  <div className="w-10 h-10 bg-brand-orange text-white rounded-xl flex items-center justify-center shrink-0"><Highlighter size={18} /></div>
                                  <div>
                                      <p className="font-bold text-slate-800 text-sm">Keyword Missing: "Readily Determinable"</p>
                                      <p className="text-xs text-slate-600 mt-1">You missed 1 mark here. ICAI examiners look for this specific phrase in lease answers.</p>
                                  </div>
                              </div>
                              <div className="flex gap-4 p-4 bg-green-50 rounded-2xl border border-green-100">
                                  <div className="w-10 h-10 bg-green-600 text-white rounded-xl flex items-center justify-center shrink-0"><Check size={18} /></div>
                                  <div>
                                      <p className="font-bold text-slate-800 text-sm">Perfect Presentation</p>
                                      <p className="text-xs text-slate-600 mt-1">Calculation in Working Note 2 is presented exactly as per ICAI suggested answers. Full marks awarded.</p>
                                  </div>
                              </div>
                          </div>
                      </div>

                      <Button onClick={() => { setIsSampleOpen(false); onOpenAuth(); }} size="lg" className="px-12 py-5 rounded-2xl shadow-2xl mb-12">
                          Get Your Paper Evaluated Like This <ChevronRight size={20} className="ml-2" />
                      </Button>
                  </div>
              </div>
          </div>
      )}

      {/* MODEL PAPER MODAL */}
      {isModelOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6">
              <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md" onClick={() => setIsModelOpen(false)}></div>
              <div className="relative bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-up">
                  {/* Header */}
                  <div className="p-6 bg-slate-900 text-white flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-brand-orange rounded-2xl flex items-center justify-center">
                              <FileText size={24} />
                          </div>
                          <div>
                              <h3 className="font-display font-black text-xl">Model Question Paper</h3>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ICAI Pattern Jan 2026 Batch Sample</p>
                          </div>
                      </div>
                      <button onClick={() => setIsModelOpen(false)} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                          <X size={24} />
                      </button>
                  </div>

                  {/* Body - Paper Simulation */}
                  <div className="flex-1 overflow-y-auto p-4 sm:p-12 bg-slate-200 flex flex-col items-center">
                      <div className="bg-white w-full max-w-3xl rounded-sm shadow-2xl border border-slate-300 p-8 sm:p-16 relative mb-8">
                          <div className="text-center border-b-4 border-double border-slate-900 pb-6 mb-8">
                              <h4 className="font-serif font-black text-2xl uppercase tracking-tighter text-slate-900">MOCK TEST SERIES - JAN 2026</h4>
                              <p className="font-bold text-lg mt-1 underline">Paper 1: Financial Reporting</p>
                              <div className="flex justify-between mt-4 font-bold text-sm px-4">
                                  <span>Time: 3 Hours</span>
                                  <span>Max Marks: 100</span>
                              </div>
                          </div>
                          
                          <div className="space-y-8 font-serif text-slate-800">
                              <p className="font-bold italic underline">Note: Question No. 1 is compulsory. Attempt any four from the rest.</p>
                              
                              <div className="space-y-4">
                                  <div className="flex justify-between font-bold">
                                      <span>Q.1 (a)</span>
                                      <span>(5 Marks)</span>
                                  </div>
                                  <p className="leading-relaxed pl-4">Explain the recognition and measurement criteria for Right-of-Use (ROU) assets as per Ind AS 116. Also discuss how lease modifications are handled under the standard.</p>
                              </div>

                              <div className="space-y-4">
                                  <div className="flex justify-between font-bold">
                                      <span>Q.1 (b)</span>
                                      <span>(15 Marks)</span>
                                  </div>
                                  <p className="leading-relaxed pl-4">A Ltd. acquires a 60% stake in B Ltd. for a cash consideration of ₹500 Crores on 1st April 2024. The fair value of identifiable net assets of B Ltd. is ₹750 Crores. Calculate the Goodwill/Bargain Purchase Gain under both partial and full goodwill methods. Assume NCI is measured at fair value of ₹320 Crores for the full goodwill method.</p>
                              </div>
                              
                              <div className="h-40 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-300 italic">
                                  ... Remaining 8 Questions Follow ICAI Pattern ...
                              </div>
                          </div>
                      </div>

                      <Button onClick={() => { setIsModelOpen(false); onOpenAuth(); }} size="lg" className="px-12 py-5 rounded-2xl shadow-2xl mb-12">
                          Start Solving Full Paper <ChevronRight size={20} className="ml-2" />
                      </Button>
                  </div>
              </div>
          </div>
      )}
    </section>
  );
};
