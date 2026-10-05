import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'purple' | 'emerald' | 'amber' | 'rose' | 'indigo' | 'cyan' | 'slate';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'purple',
  size = 'md',
  dot = false,
  className = '',
}) => {
  const variantStyles = {
    purple: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    rose: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    indigo: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
    cyan: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    slate: 'bg-slate-800 text-slate-300 border-slate-700',
  };

  const dotColors = {
    purple: 'bg-purple-400 shadow-[0_0_8px_#a855f7]',
    emerald: 'bg-emerald-400 shadow-[0_0_8px_#34d399]',
    amber: 'bg-amber-400 shadow-[0_0_8px_#fbbf24]',
    rose: 'bg-rose-400 shadow-[0_0_8px_#f43f5e]',
    indigo: 'bg-indigo-400 shadow-[0_0_8px_#818cf8]',
    cyan: 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]',
    slate: 'bg-slate-400',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5 font-medium',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium border rounded-full tracking-wide ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
};
