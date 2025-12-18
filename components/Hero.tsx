import React, { useState } from 'react';
import { ChevronRight, CheckCircle, GraduationCap, Phone, Send, Calendar, Users, Gift, Sparkles, Check } from 'lucide-react';
import { Button } from './Button';

interface HeroProps {
  onOpenAuth: () => void;
  onRequestCallback?: (data: any) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuth, onRequestCallback }) => {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', mobile: '', course: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const levels = [
    { id: 'foundation', label: 'Foundation' },
    { id: 'inter', label: 'Intermediate' },
    { id: 'final', label: 'Final' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(formData.name && formData.mobile && formData.course) {
        if(onRequestCallback) onRequestCallback(formData);
        setIsSubmitted(true);
    }
  };

  return (
    <section id="home" className="relative pt-4 pb-0 lg:pb-12 overflow-visible bg-brand-cream min-h-fit lg:min-h-[85vh]">
      <div className="hidden md:block absolute top-0 right-0 w-[45%] h-full z-0">
        <img 
          src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1000&auto=format&fit=crop"
          alt="Focused Student Studying"
          className="w-full h-full object-cover opacity-90"
          style={{ objectPosition: 'center 30%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-cream via-brand-cream/80 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-6 lg:gap-8">
          
          <div className="flex-1 text-center md:text-left pt-2 lg:pt-8 pb-0 md:pb-8">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white text-brand-dark text-[9px] sm:text-[10px] font-semibold mb-3 border border-brand-primary/20 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span>
              Test Series for Jan 2026
            </div>

            <h1 className="text-xl md:text-3xl lg:text-[2.6rem] font-display font-bold text-slate-900 leading-[1.15] mb-3">
              Practice Makes Perfect! <br />
              <span className="text-lg md:text-xl lg:text-2xl text-slate-600 block mt-1 mb-1 font-medium">
                Master the Exam & Become a
              </span>
              
              <span className="relative inline-block px-1 mt-1">
                <div className="inline-grid justify-items-center md:justify-items-start">
                    <span className="font-hand text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-brand-primary font-bold overflow-hidden whitespace-nowrap border-r-4 border-brand-orange animate-writing pr-1 pb-1">
                        Chartered Accountant
                    </span>
                </div>
                <svg className="absolute bottom-0 left-0 w-full h-1.5 text-brand-orange opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 12 100 5" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="text-xs md:text-sm lg:text-base text-slate-600 mb-5 max-w-lg mx-auto md:mx-0 leading-relaxed font-sans">
              India's most trusted test series platform. Get 48hr evaluation, detailed analysis, and rank improvement strategies.
            </p>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-[1.2rem] border border-brand-primary/10 p-3 shadow-lg w-full max-w-[280px] relative z-20">
                   <div className="flex items-center gap-1.5 mb-2 pl-0.5">
                      <GraduationCap className="text-brand-orange" size={16} />
                      <h3 className="font-bold text-slate-800 text-[11px]">Select Your Goal</h3>
                   </div>
                   
                   <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide justify-center md:justify-start">
                      {levels.map((level) => (
                        <button
                          key={level.id}
                          onClick={() => setSelectedLevel(level.id)}
                          className={`whitespace-nowrap px-2.5 py-1.5 rounded-full text-[10px] font-bold border transition-all flex-1
                            ${selectedLevel === level.id 
                              ? 'bg-brand-dark text-white border-brand-dark' 
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-brand-orange hover:bg-white'
                            }`}
                        >
                          {level.label}
                        </button>
                      ))}
                   </div>
                   
                   <div className={`mt-1.5 overflow-hidden transition-all duration-300 ${selectedLevel ? 'h-auto opacity-100' : 'h-0 opacity-0'}`}>
                     <Button fullWidth size="sm" onClick={onOpenAuth} className="justify-between group rounded-lg text-[10px] py-1.5">
                        Proceed <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
                     </Button>
                   </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-0.5 pt-0.5 flex-shrink-0">
                  <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Real Improvement</p>
                  
                  <div className="relative group hover:scale-105 transition-transform duration-300">
                     <div className="relative border-[1.5px] border-slate-400/80 px-3 py-1.5 rotate-[-2deg]
                          rounded-[255px_15px_225px_15px/15px_225px_15px_255px]
                          bg-white/40 backdrop-blur-sm shadow-sm">
                        
                        <div className="absolute -top-5 -right-3 text-red-600 font-hand font-bold text-4xl animate-marking-score z-20 drop-shadow-sm rotate-[-8deg]">
                            78
                        </div>

                        <div className="flex flex-col items-center justify-center font-hand text-slate-500 font-bold leading-none select-none">
                            <div className="text-2xl relative mb-0.5">
                               48
                               <div className="absolute top-1/2 left-[-10%] h-[1.5px] bg-red-500 rounded-full origin-left rotate-[-15deg] animate-marking-strike opacity-90"></div>
                            </div>
                            <div className="w-8 h-[1.5px] bg-slate-400 rounded-full rotate-[-2deg]"></div>
                            <div className="text-xl mt-0.5">100</div>
                        </div>
                     </div>
                  </div>
                </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2.5 text-[10px] font-semibold text-slate-500">
              <div className="flex items-center gap-1 px-2 py-0.5 bg-white/50 rounded-md border border-slate-200/50">
                <CheckCircle size={10} className="text-brand-primary" /> Verified Faculty
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 bg-white/50 rounded-md border border-slate-200/50">
                <CheckCircle size={10} className="text-brand-primary" /> Fastest Results
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-sm flex flex-col gap-3 mt-4 md:mt-0 md:sticky md:top-24 z-20 pb-6 md:pb-0">
            <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/50 p-4 relative overflow-hidden">
                {!isSubmitted ? (
                    <>
                        <div className="flex items-center justify-between mb-2">
                           <div>
                              <h3 className="font-display font-bold text-slate-800 text-base">Book Free Call</h3>
                              <p className="text-[9px] text-slate-500 uppercase font-bold tracking-tight">Custom study plan in 10 mins</p>
                           </div>
                           <div className="bg-brand-cream p-1.5 rounded-full">
                              <Phone size={14} className="text-brand-orange animate-pulse" />
                           </div>
                        </div>

                        <form className="space-y-2" onSubmit={handleSubmit}>
                           <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Your Name" required className="w-full px-3 py-2 rounded-lg bg-slate-50 border-none focus:ring-1 focus:ring-brand-primary/20 text-[11px]" />
                           <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="+91 Mobile Number" required className="w-full px-3 py-2 rounded-lg bg-slate-50 border-none focus:ring-1 focus:ring-brand-primary/20 text-[11px]" />
                           <select name="course" value={formData.course} onChange={handleInputChange} required className="w-full px-3 py-2 rounded-lg bg-slate-50 border-none focus:ring-1 focus:ring-brand-primary/20 text-[11px] text-slate-600">
                              <option value="" disabled>Select Course Level</option>
                              <option value="CA Foundation">CA Foundation</option>
                              <option value="CA Intermediate">CA Intermediate</option>
                              <option value="CA Final">CA Final</option>
                           </select>
                           <Button type="submit" fullWidth className="mt-1 text-[11px] py-2">Request Callback</Button>
                        </form>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-4 text-center animate-fade-up">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2 text-green-600">
                            <Check size={20} strokeWidth={3} />
                        </div>
                        <h3 className="text-base font-bold text-slate-800 mb-1">Request Received!</h3>
                        <p className="text-[10px] text-slate-500">We will call you shortly.</p>
                    </div>
                )}
            </div>

            <div onClick={onOpenAuth} className="relative group cursor-pointer overflow-hidden rounded-[1.2rem] shadow-lg transform hover:scale-[1.01] transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-primary to-brand-orange animate-gradient-xy"></div>
                <div className="relative p-4 flex flex-col gap-1 text-center">
                   <div className="absolute top-2 right-2">
                      <span className="bg-white text-brand-dark text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-lg flex items-center gap-1">
                        <Calendar size={8} className="text-brand-orange" /> Jan '26
                      </span>
                   </div>
                   <h4 className="font-hand text-xl text-white font-bold leading-none transform -rotate-1">New Test Series!</h4>
                   <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-1.5 mt-0.5">
                       <p className="text-white/90 text-[9px] font-medium">Exclusive Offer for</p>
                       <div className="flex items-center justify-center gap-1">
                          <Users className="text-brand-cream" size={12} />
                          <span className="font-display font-bold text-sm text-white">First 50 Students</span>
                       </div>
                   </div>
                   <div className="mt-1">
                      <p className="text-brand-cream font-hand text-lg font-bold animate-pulse mb-0.5">Free Registration</p>
                      <Button fullWidth variant="primary" className="bg-white text-brand-orange text-[10px] py-1.5">Book My Spot <Sparkles size={10} className="ml-1" /></Button>
                   </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};