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
        // Manual smooth scroll with offset calculation
        const headerOffset = 90;
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
          ? 'bg-brand-cream/95 backdrop-blur-sm shadow-sm border-b border-brand-secondary/20 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between lg:justify-start">
          
          {/* Logo Section - NEW MODERN DESIGN */}
          <div 
             className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            {/* Custom Logo SVG: Checkmark on Document */}
            <div className="w-10 h-10 relative transition-transform duration-300 group-hover:scale-105">
               <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
                  {/* Rounded Square Container */}
                  <rect x="10" y="10" width="80" height="80" rx="20" fill="#2D3A26" />
                  
                  {/* Paper Icon */}
                  <path d="M35 30H65C67.7614 30 70 32.2386 70 35V70C70 72.7614 67.7614 75 65 75H35C32.2386 75 30 72.7614 30 70V35C30 32.2386 32.2386 30 35 30Z" fill="#FFFFFF" opacity="0.9"/>
                  
                  {/* Checkmark (Orange) */}
                  <path d="M40 52L48 60L65 40" stroke="#FFA239" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
               </svg>
            </div>
            
            {/* Styled Brand Name */}
            <span className="text-2xl font-display font-bold tracking-tight text-slate-800 flex items-baseline">
              ca<span className="text-brand-primary">exam</span>
              <span className="text-brand-orange font-hand text-3xl ml-0.5 transform -rotate-2 origin-bottom-left">.online</span>
            </span>
          </div>

          {/* Desktop Navigation (Visible on Large Screens Only) */}
          <nav className="hidden lg:flex items-center gap-8 ml-16">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className={`text-[17px] font-semibold tracking-tight transition-all duration-200 font-sans whitespace-nowrap relative py-2
                  ${activeLink === link.name 
                    ? 'text-brand-dark' 
                    : 'text-slate-600 hover:text-brand-primary'
                  }`}
              >
                {link.name}
                {/* Active Line Indicator */}
                <span className={`absolute bottom-0 left-0 w-full h-[3px] rounded-full bg-brand-orange transform transition-transform duration-300 origin-left ${
                  activeLink === link.name ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></span>
              </a>
            ))}
          </nav>

          {/* Desktop CTA Button (Visible on Large Screens Only) */}
          <div className="hidden lg:flex items-center gap-6 ml-auto">
            <span 
              onClick={onOpenAuth}
              className="text-base font-semibold text-slate-500 hover:text-brand-primary cursor-pointer font-sans transition-colors"
            >
              Log in
            </span>
            <Button variant="primary" size="md" onClick={onOpenAuth}>
              Get Started <ChevronRight size={18} className="ml-1.5" strokeWidth={2.5} />
            </Button>
          </div>

          {/* Mobile/Tablet Menu Button (Visible on Screens < 1024px) */}
          <button
            className="lg:hidden p-2 text-slate-600 hover:text-brand-primary transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Menu Dropdown */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-brand-cream border-b border-brand-secondary/20 shadow-xl transition-all duration-300 ease-in-out origin-top ${
          isMobileMenuOpen ? 'opacity-100 scale-y-100 visible' : 'opacity-0 scale-y-0 invisible'
        }`}
      >
        <div className="p-6 space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`block text-lg font-semibold px-4 py-3 rounded-xl transition-colors font-sans
                ${activeLink === link.name 
                  ? 'bg-brand-primary/10 text-brand-dark' 
                  : 'text-slate-600 hover:text-brand-primary hover:bg-white'
                }`}
              onClick={(e) => handleNavClick(e, link)}
            >
              {link.name}
            </a>
          ))}
          <div className="pt-6 border-t border-brand-secondary/20 flex flex-col gap-4">
            <Button variant="outline" fullWidth onClick={() => { setIsMobileMenuOpen(false); onOpenAuth(); }}>
              Log in
            </Button>
            <Button variant="primary" fullWidth onClick={() => { setIsMobileMenuOpen(false); onOpenAuth(); }}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};