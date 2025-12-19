import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';
import { Button } from './Button';

interface NavbarProps {
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  // Handle scroll effect for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Test Series', href: '#test-series' },
    { name: 'Benefits', href: '#benefits' },
    { name: 'Features', href: '#features' },
    { name: 'Copy Checker', href: '#copy-checker' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: { name: string, href: string }) => {
    e.preventDefault();
    const element = document.querySelector(link.href);
    if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
    setActiveLink(link.name);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-brand-cream/95 backdrop-blur-sm shadow-sm border-b border-brand-secondary/20 py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between lg:justify-start">
          
          <div 
             className="flex items-center gap-2 cursor-pointer group flex-shrink-0"
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <div className="w-8 h-8 relative transition-transform duration-300 group-hover:scale-105">
               <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                  <rect x="10" y="10" width="80" height="80" rx="20" fill="#2D3A26" />
                  <path d="M35 30H65C67.7614 30 70 32.2386 70 35V70C70 72.7614 67.7614 75 65 75H35C32.2386 75 30 72.7614 30 70V35C30 32.2386 32.2386 30 35 30Z" fill="#FFFFFF" opacity="0.9"/>
                  <path d="M40 52L48 60L65 40" stroke="#FFA239" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
            
            <span className="text-xl font-display font-bold tracking-tight text-slate-800 flex items-baseline">
              ca<span className="text-brand-primary">exam</span>
              <span className="text-brand-orange font-hand text-2xl ml-0.5 transform -rotate-2 origin-bottom-left">.online</span>
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-6 ml-12">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`text-[15px] font-semibold tracking-tight transition-all duration-200 font-sans whitespace-nowrap relative py-1
                  ${activeLink === link.name 
                    ? 'text-brand-dark' 
                    : 'text-slate-600 hover:text-brand-primary'
                  }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] rounded-full bg-brand-orange transform transition-transform duration-300 origin-left ${
                  activeLink === link.name ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-4 ml-auto">
            <span 
              onClick={onOpenAuth}
              className="text-sm font-semibold text-slate-500 hover:text-brand-primary cursor-pointer font-sans transition-colors"
            >
              Log in
            </span>
            <Button variant="primary" size="sm" onClick={onOpenAuth} className="px-5 py-2 text-xs">
              Get Started <ChevronRight size={14} className="ml-1" strokeWidth={2.5} />
            </Button>
          </div>

          <button
            className="lg:hidden p-2 text-slate-600 hover:text-brand-primary transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-brand-cream border-b border-brand-secondary/20 shadow-xl transition-all duration-300 ease-in-out origin-top ${
          isMobileMenuOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible'
        }`}
      >
        <div className="p-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`block text-base font-semibold px-4 py-2.5 rounded-xl transition-colors font-sans
                ${activeLink === link.name 
                  ? 'bg-brand-primary/10 text-brand-dark' 
                  : 'text-slate-600 hover:text-brand-primary hover:bg-white'
                }`}
              onClick={(e) => handleNavClick(e, link)}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-brand-secondary/20 flex flex-col gap-2">
            <Button variant="outline" fullWidth size="sm" onClick={() => { setIsMobileMenuOpen(false); onOpenAuth(); }}>
              Log in
            </Button>
            <Button variant="primary" fullWidth size="sm" onClick={() => { setIsMobileMenuOpen(false); onOpenAuth(); }}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};