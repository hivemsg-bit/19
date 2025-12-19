import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  onOpenAuth: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onOpenAuth }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenAuth={onOpenAuth} />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};