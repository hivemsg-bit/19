
import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  onOpenAuth: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onOpenAuth }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar onOpenAuth={onOpenAuth} />
      <main className="flex-grow pt-20 lg:pt-24">
        {children}
      </main>
      <Footer />
    </div>
  );
};
