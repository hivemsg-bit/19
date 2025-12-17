import React from 'react';
import { Bell, Play, ExternalLink } from 'lucide-react';

export const NewsAndVideo: React.FC = () => {
  const newsItems = [
    { date: "Oct 24", text: "ICAI Exam Dates for Nov 2024 Announced. Check Schedule." },
    { date: "Oct 22", text: "RTPs for Final & Inter Nov 24 attempt are now live." },
    { date: "Oct 20", text: "New Syllabus FAQ updated by BOS. Download PDF." },
    { date: "Oct 18", text: "Correction Window for Exam Form opens tomorrow." },
    { date: "Oct 15", text: "Webinar on 'How to tackle Costing' by BOS Faculty." },
    { date: "Oct 12", text: "Result Date for May 24 expected around 5th July." },
    { date: "Oct 10", text: "Campus Placement Registration begins next week." },
    { date: "Oct 08", text: "Important Announcement regarding exemption rules." },
    { date: "Oct 05", text: "Mock Test Series Series-I starts from 1st Nov." },
    { date: "Oct 02", text: "Admit Cards will be hosted 14 days before exams." },
    { date: "Sep 28", text: "Last date to convert from Old to New Scheme extended." },
    { date: "Sep 25", text: "BOS Live Learning Classes schedule updated." },
  ];

  return (
    <section className="py-12 md:py-16 bg-white border-y border-slate-100 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* LEFT: YouTube Video Section */}
          <div className="space-y-6 flex flex-col">
            <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-red-50 text-red-600 rounded-lg border border-red-100">
                    <Play size={24} fill="currentColor" />
                </div>
                <div>
                    <h3 className="text-2xl font-display font-bold text-slate-800">Strategy of the Week</h3>
                    <p className="text-slate-500 text-sm">Expert tips to boost your preparation.</p>
                </div>
            </div>
            
            {/* Video Container - Aspect Ratio 16:9 */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-slate-900 group cursor-pointer flex-grow">
                {/* Embed YouTube Video (Using iframe for realism or placeholder) */}
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/5Hq4Zq6Jj_U?si=placeholder" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                ></iframe>
                
                {/* Fallback Overlay if needed (optional) */}
                <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] rounded-2xl"></div>
            </div>
            
             <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                 <h4 className="font-bold text-slate-800 text-sm mb-1">In this video:</h4>
                 <p className="text-slate-500 text-xs">AIR 1 shares his secret to scoring 80+ in Audit using keyword techniques and proper presentation standards.</p>
             </div>
          </div>

          {/* RIGHT: News Ticker Section */}
          <div className="flex flex-col h-full min-h-[400px]">
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-orange/10 text-brand-orange rounded-lg animate-pulse">
                        <Bell size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-display font-bold text-slate-800">Latest Updates</h3>
                        <p className="text-slate-500 text-sm">Official announcements & news.</p>
                    </div>
                </div>
                <button className="text-sm font-bold text-brand-primary hover:underline flex items-center gap-1">
                    View All <ExternalLink size={14} />
                </button>
             </div>

             {/* News Container with inner shadow for depth */}
             <div className="bg-brand-cream/30 rounded-2xl p-6 border border-brand-secondary/20 flex-grow relative overflow-hidden shadow-inner">
                
                {/* Gradient Masks for Top/Bottom Fade */}
                <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-[#FCF9EA] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#FCF9EA] to-transparent z-10 pointer-events-none"></div>

                {/* Vertical Marquee Animation Container */}
                <div className="absolute top-6 left-6 right-6 animate-marquee-vertical hover:[animation-play-state:paused]">
                    <div className="space-y-4 pb-4">
                        {/* Render List Twice for seamless loop */}
                        {[...newsItems, ...newsItems].map((item, index) => (
                            <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-4 items-start hover:border-brand-primary/50 hover:shadow-md transition-all group cursor-pointer">
                                <div className="flex-shrink-0 flex flex-col items-center justify-center bg-slate-50 rounded-lg p-2 w-14 border border-slate-200 group-hover:bg-brand-primary/10 group-hover:border-brand-primary/20 transition-colors">
                                    <span className="text-[10px] text-slate-400 font-bold uppercase group-hover:text-brand-primary">{item.date.split(' ')[0]}</span>
                                    <span className="text-lg font-bold text-slate-800 leading-none group-hover:text-brand-dark">{item.date.split(' ')[1]}</span>
                                </div>
                                <div>
                                    <p className="text-slate-700 text-sm font-medium leading-relaxed group-hover:text-brand-primary transition-colors line-clamp-2">
                                        {item.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};