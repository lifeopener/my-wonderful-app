import { ReactNode } from 'react';

interface IconContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  colorTheme?: 'dark' | 'success' | 'primary' | 'purple';
  className?: string;
}

export function IconContainer({ children, size = 'md', colorTheme = 'dark', className = '' }: IconContainerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const themeClasses = {
    dark: 'bg-[#1A1A2E] border border-white/10',
    success: 'bg-green-500/20 text-green-400',
    primary: 'bg-[#F5A623]/20 text-[#F5A623]',
    purple: 'bg-[#7B61FF]/20 text-[#7B61FF]',
  };

  return (
    <div className={`${sizeClasses[size]} ${themeClasses[colorTheme]} rounded-full flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
}
