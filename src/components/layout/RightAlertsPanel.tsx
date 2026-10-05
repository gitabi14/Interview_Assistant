'use client';

import React from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { AlertTriangle, Sparkles, CheckCircle2, BookOpen, BellRing, X, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const RightAlertsPanel: React.FC = () => {
  const { alerts, dismissAlert, setActiveView } = usePrepForge();

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'CRITICAL SKILL GAP':
        return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      case 'FOLLOW-UP PREDICTED':
        return <Sparkles className="w-4 h-4 text-purple-400" />;
      case 'RESUME CLAIM VERIFIED':
        return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'LEARNING RECOMMENDATION':
        return <BookOpen className="w-4 h-4 text-cyan-400" />;
      default:
        return <BellRing className="w-4 h-4 text-indigo-400" />;
    }
  };

  const getAlertBadgeVariant = (type: string) => {
    switch (type) {
      case 'CRITICAL SKILL GAP':
        return 'rose';
      case 'FOLLOW-UP PREDICTED':
        return 'purple';
      case 'RESUME CLAIM VERIFIED':
        return 'emerald';
      case 'LEARNING RECOMMENDATION':
        return 'cyan';
      default:
        return 'indigo';
    }
  };

  return (
    <div className="w-80 bg-[#0d1024] border-l border-[#1e2342] flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#1e2342] flex items-center justify-between bg-[#0f132a]">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-white">AI Insights & Alerts</h2>
        </div>
        <span className="text-[10px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/30">
          Live Feed ({alerts.length})
        </span>
      </div>

      {/* Alert items list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        {alerts.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-400/50 mx-auto mb-2" />
            No new alerts. All systems calibrated.
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={alert.id}
              className="bg-[#131735] hover:bg-[#171c42] rounded-xl p-3.5 border border-[#23294f] hover:border-purple-500/40 transition-all group relative"
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-1.5">
                  {getAlertIcon(alert.type)}
                  <Badge variant={getAlertBadgeVariant(alert.type) as any} size="sm">
                    {alert.type}
                  </Badge>
                </div>
                <button
                  onClick={() => dismissAlert(alert.id)}
                  className="text-slate-400 hover:text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <h4 className="text-xs font-semibold text-white leading-snug mb-1">{alert.title}</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">{alert.description}</p>

              <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
                <span className="text-slate-400 font-mono">{alert.timestamp}</span>
                {alert.actionLabel && alert.actionTarget && (
                  <button
                    onClick={() => setActiveView(alert.actionTarget!)}
                    className="text-purple-300 hover:text-purple-200 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <span>{alert.actionLabel}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer summary */}
      <div className="p-3 bg-[#0a0d1a] border-t border-[#1e2342] text-[11px] text-slate-400 flex items-center justify-between">
        <span>Continuous Profile Sync</span>
        <span className="flex items-center gap-1 text-emerald-400 font-mono font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          Active
        </span>
      </div>
    </div>
  );
};
