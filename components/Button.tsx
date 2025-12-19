
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl active:scale-95";
  
  const variants = {
    // Primary is Blaze Orange
    primary: "bg-brand-orange text-white hover:bg-[#E65000] focus:ring-brand-orange shadow-lg shadow-brand-orange/20 hover:shadow-xl",
    // Secondary is Electric Blue
    secondary: "bg-brand-primary text-white hover:bg-[#0055DD] focus:ring-brand-primary shadow-lg shadow-brand-primary/20",
    // Outline uses Brand Primary (Blue)
    outline: "border-2 border-brand-primary text-brand-primary bg-transparent hover:bg-brand-primary hover:text-white focus:ring-brand-primary",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-brand-dark",
  };

  const sizes = {
    sm: "text-xs px-5 py-2.5",
    md: "text-sm px-6 py-3",
    lg: "text-base px-8 py-4",
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
      // Fixed: wrapped props spread in curly braces to fix JSX syntax error
      {...props}
    >
      {children}
    </button>
  );
};