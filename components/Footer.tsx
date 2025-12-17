import React from 'react';
import { Instagram, Facebook, Youtube, Twitter, Mail, Phone, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t border-brand-primary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 cursor-pointer group">
               {/* Custom Logo SVG (White/Dark Variant for Footer) */}
               <div className="w-10 h-10 relative transition-transform duration-300 group-hover:scale-105">
                  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                      {/* Rounded Square Container (Semi-transparent white) */}
                      <rect x="10" y="10" width="80" height="80" rx="20" fill="rgba(255,255,255,0.1)" stroke="#FFA239" strokeWidth="2" />
                      
                      {/* Paper Icon */}
                      <path d="M35 30H65C67.7614 30 70 32.2386 70 35V70C70 72.7614 67.7614 75 65 75H35C32.2386 75 30 72.7614 30 70V35C30 32.2386 32.2386 30 35 30Z" fill="#FFFFFF" opacity="0.9"/>
                      
                      {/* Checkmark (Orange) */}
                      <path d="M40 52L48 60L65 40" stroke="#FFA239" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
               </div>

              <span className="text-2xl font-display font-bold tracking-tight text-white flex items-baseline">
                ca<span className="text-brand-primary">exam</span>
                <span className="text-brand-orange font-hand text-3xl ml-0.5 transform -rotate-2">.online</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              India's most trusted platform for CA Test Series. We bridge the gap between preparation and presentation.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Youtube, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:bg-brand-orange hover:text-white transition-all duration-300">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-display font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Test Series Plans', 'Benefits', 'Toppers Sheet', 'Blog'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 text-sm hover:text-brand-orange transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Courses */}
          <div>
            <h4 className="text-lg font-display font-bold mb-6 text-white">Our Courses</h4>
            <ul className="space-y-3">
              {['CA Foundation', 'CA Intermediate', 'CA Final', 'Mentorship Program', 'Free Resources'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-slate-400 text-sm hover:text-brand-orange transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Contact */}
          <div>
            <h4 className="text-lg font-display font-bold mb-6 text-white">Stay Updated</h4>
            <p className="text-slate-400 text-sm mb-4">
              Get free study tips and amendments directly to your inbox.
            </p>
            <div className="flex gap-2 mb-8">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-orange w-full"
              />
              <button className="bg-brand-orange p-2 rounded-lg text-white hover:bg-brand-orange/80 transition-colors">
                <ArrowRight size={20} />
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone size={16} className="text-brand-primary" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Mail size={16} className="text-brand-primary" />
                <span>support@caexam.online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-white/10 my-8"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} CA Exam Online. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};