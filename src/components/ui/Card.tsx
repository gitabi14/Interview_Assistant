import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  headerAction,
  className = '',
  headerClassName = '',
  glow = false,
}) => {
  return (
    <div
      className={`relative bg-surface-card rounded-2xl border border-surface-border/70 p-5 ${
        glow ? 'shadow-glow border-purple-500/30' : ''
      } ${className}`}
    >
      {(title || subtitle || headerAction) && (
        <div className={`flex items-start justify-between mb-4 ${headerClassName}`}>
          <div>
            {title && <h3 className="text-base font-semibold text-white tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
