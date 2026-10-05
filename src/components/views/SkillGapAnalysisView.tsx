'use client';

import React from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { AlertTriangle, ShieldAlert, CheckCircle2, ArrowRight, Zap, Target, BookOpen } from 'lucide-react';

export const SkillGapAnalysisView: React.FC = () => {
  const { skills, target, setActiveView } = usePrepForge();

  const criticalGaps = skills.filter((s) => s.status === 'Critical Gap');
  const moderateGaps = skills.filter((s) => s.status === 'Needs Improvement' || s.status === 'Adequate');
  const strongSkills = skills.filter((s) => s.status === 'Strong');

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="rose" size="sm">
              HIRING BAR DEFICIT ENGINE
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Skill Gap Analysis & Hiring Risk Audit
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Pinpoints exact technical deficiencies blocking the hiring bar for <strong className="text-purple-300">{target.company} {target.role}</strong>.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
          onClick={() => setActiveView('learning-plan')}
        >
          Generate Personalized Learning Plan
        </Button>
      </div>

      {/* Critical Gaps Section */}
      <Card
        title="Critical Gaps (High Rejection Probability)"
        subtitle="Competencies significantly below Microsoft SDE baseline"
        className="border-rose-500/40"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {criticalGaps.map((gap) => (
            <div
              key={gap.name}
              className="bg-[#0b0e21] rounded-xl p-4 border border-rose-500/30 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span className="text-rose-400">⚠</span>
                    <span>{gap.name}</span>
                  </h4>
                  <span className="text-[10px] text-slate-400 font-mono uppercase">{gap.category}</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold font-mono text-rose-400">{gap.score}%</span>
                  <div className="text-[10px] text-slate-400 font-mono">Target: {gap.benchmark}%</div>
                </div>
              </div>

              <ProgressBar value={gap.score} showValue={false} color="rose" size="sm" />

              <p className="text-xs text-slate-300 leading-relaxed">{gap.notes}</p>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                <span className="text-rose-400 font-mono font-semibold">
                  Deficit: -{gap.benchmark - gap.score}%
                </span>
                <button
                  onClick={() => setActiveView('learning-plan')}
                  className="text-purple-300 hover:text-purple-200 font-semibold hover:underline"
                >
                  View Targeted Drills →
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Moderate Gaps & Strong Foundations Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Moderate Gaps */}
        <Card title="Moderate Gaps (Requires Polish)" subtitle="Close to benchmark; needs structured practice">
          <div className="space-y-3">
            {moderateGaps.map((gap) => (
              <div
                key={gap.name}
                className="bg-[#0b0e21] p-3 rounded-xl border border-amber-500/20 flex items-start justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 text-xs">●</span>
                    <span className="text-xs font-bold text-white">{gap.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{gap.notes}</p>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400 ml-2">{gap.score}%</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Strong Areas */}
        <Card title="Strong Foundations (Above Hiring Bar)" subtitle="Key leverage points in technical rounds">
          <div className="space-y-3">
            {strongSkills.slice(0, 5).map((skill) => (
              <div
                key={skill.name}
                className="bg-[#0b0e21] p-3 rounded-xl border border-emerald-500/20 flex items-start justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 text-xs">✓</span>
                    <span className="text-xs font-bold text-white">{skill.name}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">{skill.notes}</p>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400 ml-2">{skill.score}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Action Footer */}
      <div className="bg-[#12152b] rounded-2xl p-6 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-glow">
        <div>
          <h4 className="text-sm font-bold text-white">Turn your critical weaknesses into a structured learning plan</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Every weakness detected directly populates your 5-Day Preparation Plan.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<BookOpen className="w-4 h-4" />}
          onClick={() => setActiveView('learning-plan')}
        >
          Open 5-Day Learning Plan
        </Button>
      </div>
    </div>
  );
};
