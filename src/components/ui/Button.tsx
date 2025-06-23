import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-[#FF6B35] text-white hover:bg-[#e55a2b] focus:ring-[#FF6B35] active:bg-[#d14d24]",
    secondary: "bg-[#00C896] text-white hover:bg-[#00b085] focus:ring-[#00C896] active:bg-[#009970]",
    outline: "border-2 border-[#FF6B35] text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white focus:ring-[#FF6B35] active:bg-[#e55a2b]",
    ghost: "text-[#2C3E50] hover:bg-gray-100 focus:ring-gray-200 active:bg-gray-200"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm h-9",
    md: "px-6 py-3 text-base h-11",
    lg: "px-8 py-4 text-lg h-12"
  };

  return (
    <button
      className={cn(
        baseStyles, 
        variants[variant], 
        sizes[size], 
        disabled && "opacity-50 cursor-not-allowed pointer-events-none",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}; 