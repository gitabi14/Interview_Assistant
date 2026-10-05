'use client';

import React from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { Building2, Sparkles, ArrowRight, Play, FileText, Cpu } from 'lucide-react';

export const HeroTargetCard: React.FC = () => {
  const { target, readiness, setActiveView } = usePrepForge();

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#161a38] via-[#12152e] to-[#0d1024] border border-purple-500/30 p-7 shadow-glow">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        {/* Top badges & metadata */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-widest uppercase text-purple-300">
              TARGET ROLE
            </span>
            <span className="text-slate-400">•</span>
            <Badge variant="purple" size="sm" dot>
              {target.companyType}
            </Badge>
            <Badge variant="indigo" size="sm">
              Level: {target.difficulty}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5 bg-[#141832] px-2.5 py-1 rounded-lg border border-slate-800">
              <FileText className="w-3.5 h-3.5 text-purple-400" />
              Resume: <strong className="text-slate-200">Kabilan_K_A.pdf</strong>
            </span>
          </div>
        </div>

        {/* Main Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <span>{target.company}</span>
              <span className="text-purple-400">—</span>
              <span className="text-gradient-purple">{target.role}</span>
            </h2>
            <p className="text-xs md:text-sm text-slate-300 mt-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Adaptive Interview Intelligence & Live Claim Defense</span>
            </p>
          </div>

          {/* Primary Readiness Score Callout */}
          <div className="bg-[#121633]/90 border border-purple-500/40 rounded-xl px-5 py-3.5 min-w-[200px] shadow-glow">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300">
                INTERVIEW READINESS
              </span>
              <span className="text-2xl font-black font-mono text-white tracking-tight">
                {readiness.overallScore}%
              </span>
            </div>
            <ProgressBar value={readiness.overallScore} showValue={false} color="purple" size="md" />
          </div>
        </div>

        {/* Secondary Metric Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#0c0f24]/80 rounded-xl p-3.5 border border-slate-800/80 mb-6">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Resume Fit</span>
            <p className="text-lg font-bold font-mono text-emerald-400">{readiness.resumeFitScore}%</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Claim Credibility</span>
            <p className="text-lg font-bold font-mono text-amber-400">{readiness.claimCredibilityScore}%</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Round</span>
            <p className="text-sm font-semibold text-purple-300 mt-0.5">{target.round}</p>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Next Focus Area</span>
            <p className="text-xs font-semibold text-rose-300 mt-0.5 truncate">OS & System Design</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="primary"
            size="md"
            icon={<Play className="w-4 h-4 fill-white" />}
            onClick={() => setActiveView('adaptive-interview')}
          >
            Continue Adaptive Interview
          </Button>

          <Button
            variant="secondary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            onClick={() => setActiveView('readiness-report')}
          >
            View Full Readiness Report
          </Button>

          <Button
            variant="ghost"
            size="md"
            icon={<Cpu className="w-4 h-4 text-purple-400" />}
            onClick={() => setActiveView('claim-verification')}
          >
            Inspect Resume Claims (5)
          </Button>
        </div>
      </div>
    </div>
  );
};
