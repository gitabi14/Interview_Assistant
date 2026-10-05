'use client';

import React from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const StrengthsGapsCard: React.FC = () => {
  const { setActiveView } = usePrepForge();

  const strongestAreas = [
    { title: 'Project Knowledge', score: '92%', note: 'Traffix end-to-end full-stack integration & CV' },
    { title: 'OOP Design', score: '91%', note: 'SOLID principles, polymorphism, design patterns' },
    { title: 'Python 3.11+', score: '88%', note: 'Async programming, memory model, generator streams' },
    { title: 'Machine Learning', score: '90%', note: 'YOLOv8, LSTM sequence models, evaluation metrics' },
    { title: 'Problem Solving', score: '84%', note: 'Clean algorithmic decomposition & structured logic' },
  ];

  const criticalGaps = [
    { title: 'Operating Systems', score: '58%', note: 'Process synchronization, mutex vs semaphore, deadlocks' },
    { title: 'System Design', score: '61%', note: 'Distributed caching, sharding, high-scale rate limiting' },
    { title: 'Behavioral / STAR', score: '67%', note: 'Answers lack quantified business/performance Results' },
    { title: 'Complexity Analysis', score: 'Suboptimal', note: 'Two Sum brute-force O(n²) instead of O(n) Hash Map' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Strongest Areas */}
      <div className="bg-[#12152b] rounded-2xl p-5 border border-[#21264b]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
              Strongest Areas (5)
            </h4>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Above Bar</span>
        </div>

        <div className="space-y-2.5">
          {strongestAreas.map((area) => (
            <div
              key={area.title}
              className="bg-[#0b0e21] rounded-xl p-3 border border-emerald-500/20 hover:border-emerald-500/40 transition-all flex items-start justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 text-xs">✓</span>
                  <span className="text-xs font-bold text-white">{area.title}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 pl-4 leading-snug">{area.note}</p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-400">{area.score}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Gaps */}
      <div className="bg-[#12152b] rounded-2xl p-5 border border-rose-500/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
            <h4 className="text-sm font-bold uppercase tracking-wider text-rose-400">
              Critical Gaps (4)
            </h4>
          </div>
          <span className="text-[11px] text-rose-400 font-mono">Action Required</span>
        </div>

        <div className="space-y-2.5 mb-4">
          {criticalGaps.map((gap) => (
            <div
              key={gap.title}
              className="bg-[#0b0e21] rounded-xl p-3 border border-rose-500/20 hover:border-rose-500/40 transition-all flex items-start justify-between"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-rose-400 text-xs">⚠</span>
                  <span className="text-xs font-bold text-white">{gap.title}</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5 pl-4 leading-snug">{gap.note}</p>
              </div>
              <span className="text-xs font-mono font-bold text-rose-400">{gap.score}</span>
            </div>
          ))}
        </div>

        <Button
          variant="danger"
          size="sm"
          icon={<ArrowRight className="w-3.5 h-3.5" />}
          iconPosition="right"
          onClick={() => setActiveView('skill-gap-analysis')}
          className="w-full justify-between"
        >
          <span>Open Skill Gap Breakdown</span>
        </Button>
      </div>
    </div>
  );
};
