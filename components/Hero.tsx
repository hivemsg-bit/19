import React, { useState } from 'react';
import { ChevronRight, CheckCircle, GraduationCap, Phone, Send, Calendar, Users, Gift, Sparkles, Check } from 'lucide-react';
import { Button } from './Button';

interface HeroProps {
  onOpenAuth: () => void;
  onRequestCallback?: (data: any) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuth, onRequestCallback }) => {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  // Form State
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
        if(onRequestCallback) {
            onRequestCallback(formData);
        }
        setIsSubmitted(true);
        // Reset form after showing success message for a while (optional)
        // setTimeout(() => { setIsSubmitted(false); setFormData({name:'', mobile:'', course:''}); }, 5000); 
    }
  };

  return (
    <section id="home" className="relative pt-8 pb-0 md:pb-0 lg:pb-16 overflow-visible bg-brand-cream min-h-fit lg:min-h-[90vh]">
      
      {/* 1. IMAGE BACKGROUND (Right Side - Visible on Tablet+) */}
      <div className="hidden md:block absolute top-0 right-0 w-[45%] h-full z-0">
        <img 
          // Updated Image: Studious Female Student (Library Setting)
          src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=1000&auto=format&fit=crop"
          alt="Focused Student Studying"
          className="w-full h-full object-cover object-center opacity-90"
          style={{ objectPosition: 'center 30%' }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-cream via-brand-cream/80 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-12 lg:gap-8">
          
          {/* LEFT CONTENT (Scrollable) */}
          <div className="flex-1 text-center md:text-left pt-6 lg:pt-10 pb-0 md:pb-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-brand-dark text-sm font-semibold mb-6 border border-brand-primary/20 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
              Test Series for Jan 2026
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] font-display font-bold text-slate-900 leading-[1.2] mb-6">
              Practice Makes Perfect! <br />
              <span className="text-2xl md:text-3xl lg:text-4xl text-slate-600 block mt-2 mb-2 font-medium">
                Master the Exam & Become a
              </span>
              
              {/* RESTORED ANIMATION SECTION */}
              <span className="relative inline-block px-1 mt-1">
                <div className="inline-grid justify-items-center md:justify-items-start">
                    <span className="font-hand text-5xl sm:text-6xl md:text-7xl text-brand-primary font-bold overflow-hidden whitespace-nowrap border-r-4 border-brand-orange animate-writing pr-1 pb-2">
                        Chartered Accountant
                    </span>
                </div>
                {/* Decorative Underline */}
                <svg className="absolute bottom-0 left-0 w-full h-3 text-brand-orange opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 12 100 5" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed font-sans mt-4">
              India's most trusted test series platform. Get 48hr evaluation, detailed analysis, and rank improvement strategies.
            </p>

            {/* CONTAINER: SELECT COURSE + ANIMATION (Side by Side) */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
                
                {/* STEP 1: SELECT COURSE (Compact & Round) */}
                <div className="bg-white/90 backdrop-blur-sm rounded-[2rem] border border-brand-primary/10 p-5 shadow-xl w-full max-w-[360px] relative z-20">
                   <div className="flex items-center gap-2 mb-3 pl-1">
                      <GraduationCap className="text-brand-orange" size={20} />
                      <h3 className="font-bold text-slate-800">Select Your Goal</h3>
                   </div>
                   
                   <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide justify-center md:justify-start">
                      {levels.map((level) => (
                        <button
                          key={level.id}
                          onClick={() => setSelectedLevel(level.id)}
                          className={`whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-bold border transition-all flex-1
                            ${selectedLevel === level.id 
                              ? 'bg-brand-dark text-white border-brand-dark shadow-md' 
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-brand-orange hover:bg-white'
                            }`}
                        >
                          {level.label}
                        </button>
                      ))}
                   </div>
                   
                   {/* Next Button appearing */}
                   <div className={`mt-3 overflow-hidden transition-all duration-300 ${selectedLevel ? 'h-auto opacity-100' : 'h-0 opacity-0'}`}>
                     <Button fullWidth size="sm" onClick={onOpenAuth} className="justify-between group rounded-xl">
                        Proceed <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                     </Button>
                   </div>
                </div>

                {/* MARKING ANIMATION (Side Placement) */}
                <div className="flex flex-col items-center justify-center gap-2 pt-2 flex-shrink-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Real Improvement</p>
                  
                  <div className="relative group hover:scale-105 transition-transform duration-300">
                     {/* Irregular Circle Container */}
                     <div className="relative border-[3px] border-slate-400/80 px-5 py-3 rotate-[-2deg]
                          rounded-[255px_15px_225px_15px/15px_225px_15px_255px]
                          bg-white/40 backdrop-blur-sm shadow-sm">
                        
                        {/* The New Score (78) */}
                        <div className="absolute -top-7 -right-5 text-red-600 font-hand font-bold text-6xl animate-marking-score z-20 drop-shadow-sm rotate-[-8deg]">
                            78
                        </div>

                        {/* The Fraction: 48 / 100 */}
                        <div className="flex flex-col items-center justify-center font-hand text-slate-500 font-bold leading-none select-none">
                            {/* 48 (Old Score) */}
                            <div className="text-4xl relative mb-0.5">
                               48
                               <div className="absolute top-1/2 left-[-10%] h-[3px] bg-red-500 rounded-full origin-left rotate-[-15deg] animate-marking-strike opacity-90"></div>
                            </div>
                            
                            {/* Divider */}
                            <div className="w-12 h-[2px] bg-slate-400 rounded-full rotate-[-2deg]"></div>
                            
                            {/* 100 */}
                            <div className="text-3xl mt-0.5">
                               100
                            </div>
                        </div>
                     </div>
                  </div>
                </div>

            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-semibold text-slate-500">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/50 rounded-lg border border-slate-200/50">
                <CheckCircle size={14} className="text-brand-primary" />
                Verified Faculty
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/50 rounded-lg border border-slate-200/50">
                <CheckCircle size={14} className="text-brand-primary" />
                Fastest Results
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/50 rounded-lg border border-slate-200/50">
                <CheckCircle size={14} className="text-brand-primary" />
                AIR 1 Guidance
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT - STICKY (Moves with scroll) */}
          <div className="flex-1 w-full max-w-md flex flex-col gap-6 mt-8 md:mt-0 md:sticky md:top-24 z-20 pb-8 md:pb-0">
            
            {/* 2. ENQUIRY FORM */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 p-6 relative overflow-hidden">
                {!isSubmitted ? (
                    <>
                        <div className="flex items-center justify-between mb-4">
                           <div>
                              <h3 className="font-display font-bold text-slate-800 text-xl">Book Free Call</h3>
                              <p className="text-xs text-slate-500">Get a custom study plan in 10 mins</p>
                           </div>
                           <div className="bg-brand-cream p-2 rounded-full">
                              <Phone size={20} className="text-brand-orange animate-pulse" />
                           </div>
                        </div>

                        <form className="space-y-3" onSubmit={handleSubmit}>
                           <input 
                             type="text"
                             name="name"
                             value={formData.name}
                             onChange={handleInputChange}
                             placeholder="Your Name" 
                             required
                             className="w-full px-4 py-3 rounded-lg bg-slate-50 border-none focus:ring-2 focus:ring-brand-primary/20 text-sm"
                           />
                           <input 
                             type="tel"
                             name="mobile"
                             value={formData.mobile}
                             onChange={handleInputChange} 
                             placeholder="+91 Mobile Number" 
                             required
                             className="w-full px-4 py-3 rounded-lg bg-slate-50 border-none focus:ring-2 focus:ring-brand-primary/20 text-sm"
                           />
                           <select 
                                name="course"
                                value={formData.course}
                                onChange={handleInputChange}
                                required
                                className="w-full px-4 py-3 rounded-lg bg-slate-50 border-none focus:ring-2 focus:ring-brand-primary/20 text-sm text-slate-600"
                            >
                              <option value="" disabled>Select Course Level</option>
                              <option value="CA Foundation">CA Foundation</option>
                              <option value="CA Intermediate">CA Intermediate</option>
                              <option value="CA Final">CA Final</option>
                           </select>
                           <Button type="submit" fullWidth className="mt-2 shadow-lg shadow-brand-orange/20">
                              Request Callback
                           </Button>
                        </form>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-up">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600 shadow-sm">
                            <Check size={32} strokeWidth={3} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">Request Received!</h3>
                        <p className="text-sm text-slate-500 mb-4 px-4">
                            Thanks <span className="font-bold text-slate-800">{formData.name}</span>. Our academic counselor will call you shortly on your number ending with <span className="font-mono bg-slate-100 px-1 rounded">XX{formData.mobile.slice(-4)}</span>.
                        </p>
                        <button onClick={() => { setIsSubmitted(false); setFormData({name:'',mobile:'',course:''}); }} className="text-xs font-bold text-brand-primary hover:underline">
                            Request another call
                        </button>
                    </div>
                )}
            </div>

            {/* 3. JANUARY PROMO (Bigger, Multicolor, Handwriting, Sticky) */}
            <div 
              onClick={onOpenAuth}
              className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-[0_10px_40px_-10px_rgba(255,162,57,0.5)] transform hover:scale-[1.02] transition-all duration-300"
            >
                
                {/* Multicolor Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-primary to-brand-orange animate-gradient-xy"></div>
                
                {/* Decorative Elements */}
                <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
                <div className="absolute left-0 bottom-0 w-32 h-32 bg-brand-orange/20 rounded-full blur-2xl transform -translate-x-10 translate-y-10"></div>

                <div className="relative p-8 flex flex-col gap-2 text-center">
                   
                   {/* Top Badge */}
                   <div className="absolute top-4 right-4">
                      <span className="bg-white text-brand-dark text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <Calendar size={12} className="text-brand-orange" /> Jan '26
                      </span>
                   </div>

                   {/* Handwriting Header */}
                   <h4 className="font-hand text-4xl text-white font-bold leading-none tracking-wide drop-shadow-md transform -rotate-2">
                      New Test Series!
                   </h4>
                   
                   <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 mt-2">
                       <p className="text-white/90 text-sm font-medium mb-1">Exclusive Offer for</p>
                       <div className="flex items-center justify-center gap-2">
                          <Users className="text-brand-cream" size={20} />
                          <span className="font-display font-bold text-2xl text-white">
                             First 50 Students
                          </span>
                       </div>
                   </div>

                   {/* Highlighted Action */}
                   <div className="mt-2">
                      <p className="text-brand-cream font-hand text-3xl font-bold animate-pulse mb-2">
                         Free Entry & Registration
                      </p>
                      <Button fullWidth variant="primary" className="bg-white text-brand-orange hover:bg-slate-50 hover:text-brand-dark border-none shadow-xl font-bold">
                         Book My Spot Now <Sparkles size={18} className="ml-2 fill-current" />
                      </Button>
                   </div>
                   
                   <p className="text-[10px] text-white/60 mt-2">
                      *Offer valid for today only. Terms apply.
                   </p>
                </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};