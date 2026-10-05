import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  variant?: 'default' | 'purple' | 'emerald' | 'rose' | 'amber';
  className?: string;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subValue,
  trend,
  trendDirection = 'neutral',
  icon,
  badge,
  variant = 'default',
  className = '',
  onClick,
}) => {
  const borderStyles = {
    default: 'border-surface-border/50 hover:border-purple-500/30',
    purple: 'border-purple-500/30 bg-purple-500/5 hover:border-purple-500/50',
    emerald: 'border-emerald-500/30 bg-emerald-500/5 hover:border-emerald-500/50',
    rose: 'border-rose-500/30 bg-rose-500/5 hover:border-rose-500/50',
    amber: 'border-amber-500/30 bg-amber-500/5 hover:border-amber-500/50',
  };

  return (
    <div
      onClick={onClick}
      className={`relative bg-surface-card rounded-xl p-4 border transition-all duration-200 ${
        borderStyles[variant]
      } ${onClick ? 'cursor-pointer hover:translate-y-[-1px]' : ''} ${className}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="text-2xl font-bold font-mono tracking-tight text-white">{value}</span>
            {subValue && <span className="text-xs text-slate-400">{subValue}</span>}
          </div>
        </div>

        {icon && (
          <div className="p-2 rounded-lg bg-surface-subtle border border-surface-border text-purple-400">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-3 pt-2 border-t border-surface-border/40">
        {trend && (
          <span
            className={`text-[11px] font-medium flex items-center gap-1 ${
              trendDirection === 'up'
                ? 'text-emerald-400'
                : trendDirection === 'down'
                ? 'text-rose-400'
                : 'text-slate-400'
            }`}
          >
            {trendDirection === 'up' && '↑'}
            {trendDirection === 'down' && '↓'}
            {trend}
          </span>
        )}
        {badge && <div>{badge}</div>}
      </div>
    </div>
  );
};
