import React from 'react';
import { Instagram, Facebook, Youtube, Twitter, Mail, Phone, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-10 pb-6 border-t border-brand-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="w-8 h-8 relative transition-transform duration-300 group-hover:scale-105">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  <rect x="10" y="10" width="80" height="80" rx="20" fill="rgba(255,255,255,0.1)" stroke="#FFA239" strokeWidth="2" />
                  <path d="M40 52L48 60L65 40" stroke="#FFA239" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl font-display font-bold text-white">ca<span className="text-brand-primary">exam</span><span className="text-brand-orange font-hand text-2xl ml-0.5">.online</span></span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">India's most trusted platform for CA Test Series.</p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-brand-orange hover:text-white transition-all"><Icon size={14} /></a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-base font-display font-bold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              {['Home', 'Plans', 'Benefits', 'Blog'].map((item) => (
                <li key={item}><a href="#" className="text-slate-400 hover:text-brand-orange transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-base font-display font-bold mb-4 text-white">Our Courses</h4>
            <ul className="space-y-2 text-xs">
              {['Foundation', 'Intermediate', 'Final'].map((item) => (
                <li key={item}><a href="#" className="text-slate-400 hover:text-brand-orange transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-base font-display font-bold mb-4 text-white">Stay Updated</h4>
            <div className="flex gap-1 mb-4">
              <input type="email" placeholder="Email" className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-brand-orange w-full" />
              <button className="bg-brand-orange p-1.5 rounded-lg text-white"><ArrowRight size={16} /></button>
            </div>
            <div className="space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2"><Phone size={12} className="text-brand-primary" /> +91 98765 43210</div>
              <div className="flex items-center gap-2"><Mail size={12} className="text-brand-primary" /> support@caexam.online</div>
            </div>
          </div>
        </div>
        <div className="h-px bg-white/10 my-6"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-[10px] text-slate-500 text-center">
          <p>&copy; 2024 CA Exam Online. All rights reserved.</p>
          <div className="flex gap-4"><a href="#">Privacy</a><a href="#">Terms</a></div>
        </div>
      </div>
    </footer>
  );
};