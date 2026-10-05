import React from 'react';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  label?: string;
  showValue?: boolean;
  color?: 'purple' | 'emerald' | 'amber' | 'rose' | 'cyan';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showValue = true,
  color = 'purple',
  size = 'md',
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  const gradientColors = {
    purple: 'from-purple-600 to-indigo-500 shadow-[0_0_12px_rgba(139,92,246,0.5)]',
    emerald: 'from-emerald-500 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]',
    amber: 'from-amber-500 to-yellow-400 shadow-[0_0_12px_rgba(245,158,11,0.5)]',
    rose: 'from-rose-500 to-pink-500 shadow-[0_0_12px_rgba(244,63,94,0.5)]',
    cyan: 'from-cyan-500 to-blue-500 shadow-[0_0_12px_rgba(6,182,212,0.5)]',
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="flex justify-between items-center mb-1.5 text-xs font-medium text-slate-300">
          {label && <span>{label}</span>}
          {showValue && <span className="font-mono text-slate-400">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-surface-border/60 rounded-full overflow-hidden p-0.5 ${heightClasses[size]}`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradientColors[color]} transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
