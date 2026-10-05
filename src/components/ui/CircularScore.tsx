import React from 'react';

interface CircularScoreProps {
  score: number; // 0-100
  size?: number;
  strokeWidth?: number;
  label?: string;
  subtitle?: string;
  color?: 'purple' | 'emerald' | 'amber' | 'rose' | 'cyan';
  className?: string;
}

export const CircularScore: React.FC<CircularScoreProps> = ({
  score,
  size = 120,
  strokeWidth = 10,
  label,
  subtitle,
  color = 'purple',
  className = '',
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const colorMap = {
    purple: { stroke: '#8b5cf6', shadow: 'rgba(139, 92, 246, 0.4)' },
    emerald: { stroke: '#10b981', shadow: 'rgba(16, 185, 129, 0.4)' },
    amber: { stroke: '#f59e0b', shadow: 'rgba(245, 158, 11, 0.4)' },
    rose: { stroke: '#f43f5e', shadow: 'rgba(244, 63, 94, 0.4)' },
    cyan: { stroke: '#06b6d4', shadow: 'rgba(6, 182, 212, 0.4)' },
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="w-full h-full transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#1b1f3d"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={colorMap[color].stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
            style={{
              filter: `drop-shadow(0 0 6px ${colorMap[color].shadow})`,
            }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-2xl font-bold font-mono tracking-tight text-white">{score}%</span>
          {label && <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider mt-0.5">{label}</span>}
        </div>
      </div>
      {subtitle && <span className="text-xs text-slate-400 mt-2 text-center">{subtitle}</span>}
    </div>
  );
};
