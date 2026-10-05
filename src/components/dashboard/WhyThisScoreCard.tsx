'use client';

import React from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Button } from '../ui/Button';
import { HelpCircle, ArrowRight, Zap, Target } from 'lucide-react';

export const WhyThisScoreCard: React.FC = () => {
  const { readiness, setActiveView } = usePrepForge();

  return (
    <div className="bg-gradient-to-br from-[#131733] to-[#0f1226] rounded-2xl p-6 border border-purple-500/30">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white tracking-tight">
              Why is your readiness {readiness.overallScore}%?
            </h4>
            <p className="text-xs text-slate-400">
              Evidence-based factor contribution breakdown against Microsoft SDE baseline hiring model.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-purple-300 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30">
            Delta Score Engine
          </span>
        </div>
      </div>

      {/* Positive & Negative Delta Factors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        {/* Positive Factors */}
        <div className="bg-[#0b0e21] rounded-xl p-4 border border-emerald-500/20 space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5" /> Positive Evidence Contributions
          </span>
          {readiness.positiveFactors.map((f, i) => (
            <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/40 last:border-0">
              <span className="text-slate-300">{f.label}</span>
              <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                +{f.delta}
              </span>
            </div>
          ))}
        </div>

        {/* Negative Factors */}
        <div className="bg-[#0b0e21] rounded-xl p-4 border border-rose-500/20 space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" /> Critical Penalty Deductions
          </span>
          {readiness.negativeFactors.map((f, i) => (
            <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-slate-800/40 last:border-0">
              <span className="text-slate-300">{f.label}</span>
              <span className="font-mono font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                {f.delta}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Recommendation & Direct Action */}
      <div className="bg-[#181d42] rounded-xl p-4 border border-purple-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="text-xl">💡</span>
          <div>
            <p className="text-xs font-semibold text-purple-200">Actionable AI Recommendation</p>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              {readiness.recommendedAction}
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
          onClick={() => setActiveView('learning-plan')}
          className="shrink-0"
        >
          Start OS Training
        </Button>
      </div>
    </div>
  );
};
