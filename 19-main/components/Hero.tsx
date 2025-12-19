import React, { useState } from 'react';
import { ChevronRight, CheckCircle, GraduationCap, Phone, Calendar, Users, Sparkles, Check, Loader2 } from 'lucide-react';
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
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        if(onRequestCallback) {
            await onRequestCallback(formData);
        }
        setIsSubmitting(false);
        setIsSubmitted(true);
    }
  };

  return (
    <section id="home" className="relative pt-2 pb-0 lg:pt-6 lg:pb-8 overflow-visible bg-brand-cream min-h-fit">
      <div className="hidden md:block absolute top-0 right-0 w-[42%] h-full z-0">
        <img 
          src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1000&auto=format&fit=crop"
          alt="CA Student Practice"
          className="w-full h-full object-cover opacity-90"
          style={{ objectPosition: 'center 30%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-cream via-brand-cream/70 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-4 lg:gap-8">
          
          <div className="flex-1 text-center md:text-left pt-1 lg:pt-4">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white text-brand-dark text-[8px] sm:text-[10px] font-bold mb-2 border border-brand-primary/20 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse"></span>
              Jan 2026 Test Series Live
            </div>

            <h1 className="text-xl md:text-2xl lg:text-[2.2rem] font-display font-bold text-slate-900 leading-tight mb-2">
              Best CA Test Series <br />
              <span className="text-lg md:text-xl lg:text-xl text-slate-600 block mt-0.5 mb-0.5 font-medium">
                Practice ICAI Pattern & Become a
              </span>
              
              <span className="relative inline-block px-1">
                <div className="inline-grid justify-items-center md:justify-items-start">
                    <span className="font-hand text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-brand-primary font-bold overflow-hidden whitespace-nowrap border-r-4 border-brand-orange animate-writing pr-1">
                        Chartered Accountant
                    </span>
                </div>
              </span>
            </h1>

            <p className="text-[10px] md:text-xs lg:text-sm text-slate-600 mb-4 max-w-lg mx-auto md:mx-0 leading-relaxed font-sans">
              Join 5000+ students. Get detailed evaluation by Rankers in 48 hours. The most trusted CA Final, Inter, and Foundation test series platform.
            </p>

            <div className="flex flex-col md:flex-row items-center md:items-start gap-3 mb-4">
                <div className="bg-white/95 rounded-[1rem] border border-brand-primary/10 p-2.5 shadow-lg w-full max-w-[260px] relative z-20">
                   <div className="flex items-center gap-1.5 mb-1.5 pl-0.5">
                      <GraduationCap className="text-brand-orange" size={14} />
                      <h3 className="font-bold text-slate-800 text-[10px]">Select Goal</h3>
                   </div>
                   <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
                      {levels.map((level) => (
                        <button key={level.id} onClick={() => setSelectedLevel(level.id)} className={`whitespace-nowrap px-2 py-1 rounded-full text-[9px] font-bold border transition-all flex-1 ${selectedLevel === level.id ? 'bg-brand-dark text-white' : 'bg-slate-50 text-slate-600'}`}>{level.label}</button>
                      ))}
                   </div>
                   {selectedLevel && (
                     <div className="mt-1 animate-fade-up">
                       <Button fullWidth size="sm" onClick={onOpenAuth} className="justify-between rounded-lg text-[9px] py-1">Proceed <ChevronRight size={10} /></Button>
                     </div>
                   )}
                </div>

                <div className="flex flex-col items-center justify-center gap-0.5 pt-0.5 flex-shrink-0">
                  <p className="text-[7px] font-bold text-slate-400 uppercase tracking-tighter">Verified Results</p>
                  <div className="relative border-[1px] border-slate-300 px-3 py-1 rounded-xl bg-white/60 shadow-sm rotate-[-1deg]">
                     <div className="absolute -top-4 -right-2 text-red-600 font-hand font-bold text-3xl animate-marking-score z-20">78</div>
                     <div className="flex flex-col items-center font-hand text-slate-400 font-bold leading-none scale-90">
                        <div className="text-xl relative">48 <div className="absolute top-1/2 left-0 w-full h-[1px] bg-red-500 origin-left rotate-[-15deg] animate-marking-strike"></div></div>
                        <div className="w-6 h-[1px] bg-slate-300"></div>
                        <div className="text-lg">100</div>
                     </div>
                  </div>
                </div>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-2 text-[9px] font-bold text-slate-500">
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white rounded border border-slate-100"><CheckCircle size={8} className="text-brand-primary" /> Verified Faculty</div>
              <div className="flex items-center gap-1 px-1.5 py-0.5 bg-white rounded border border-slate-100"><CheckCircle size={8} className="text-brand-primary" /> Fastest Results</div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-[280px] flex flex-col gap-2 mt-2 md:mt-0 z-20 pb-4">
            <div className="bg-white/95 rounded-xl shadow-xl border border-white/50 p-3.5">
                {!isSubmitted ? (
                    <>
                        <div className="flex items-center justify-between mb-2">
                           <div>
                              <h3 className="font-display font-bold text-slate-800 text-sm">Free Strategy Call</h3>
                              <p className="text-[8px] text-slate-500 uppercase font-bold">CA Expert Call in 10 mins</p>
                           </div>
                           <Phone size={14} className="text-brand-orange animate-pulse" />
                        </div>
                        <form className="space-y-1.5" onSubmit={handleSubmit}>
                           <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" required className="w-full px-2 py-1.5 rounded-lg bg-slate-50 border-none text-[10px] focus:ring-1 focus:ring-brand-orange" />
                           <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} placeholder="Mobile" required className="w-full px-2 py-1.5 rounded-lg bg-slate-50 border-none text-[10px] focus:ring-1 focus:ring-brand-orange" />
                           <select name="course" value={formData.course} onChange={handleInputChange} required className="w-full px-2 py-1.5 rounded-lg bg-slate-50 border-none text-[10px] text-slate-600">
                              <option value="" disabled>Course</option>
                              <option value="CA Foundation">CA Foundation</option>
                              <option value="CA Inter">CA Inter</option>
                              <option value="CA Final">CA Final</option>
                           </select>
                           <Button type="submit" fullWidth className="text-[10px] py-1.5" disabled={isSubmitting}>
                              {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : 'Request Callback'}
                           </Button>
                        </form>
                    </>
                ) : (
                    <div className="text-center py-4 animate-fade-up">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 text-green-600">
                            <Check size={16} strokeWidth={3} />
                        </div>
                        <h3 className="text-xs font-bold text-slate-800">Request Sent!</h3>
                        <p className="text-[9px] text-slate-500 mt-1">Our CA Expert will call you on <br/><b>{formData.mobile}</b> shortly.</p>
                        <button onClick={() => setIsSubmitted(false)} className="text-[8px] text-brand-orange mt-2 font-bold hover:underline">Edit Request</button>
                    </div>
                )}
            </div>

            <div onClick={onOpenAuth} className="bg-brand-dark rounded-xl p-3 text-center cursor-pointer hover:bg-slate-800 transition-all border border-white/10 shadow-lg">
                <span className="text-brand-orange text-[8px] font-bold uppercase block mb-1">New Batch Jan '26</span>
                <h4 className="text-white font-hand text-lg font-bold leading-none mb-1">Join First 50 Batch</h4>
                <Button fullWidth variant="primary" className="bg-white text-brand-orange text-[9px] py-1 border-none">Book Spot <Sparkles size={10} className="ml-1" /></Button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};