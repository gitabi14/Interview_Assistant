'use client';

import React from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Badge } from '../ui/Badge';
import { ProgressBar } from '../ui/ProgressBar';
import { Brain, Code, Network, Users } from 'lucide-react';

export const CandidateIntelligenceOverview: React.FC = () => {
  const { skills, setActiveView } = usePrepForge();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Strong':
        return <Badge variant="emerald" size="sm">Strong</Badge>;
      case 'Adequate':
        return <Badge variant="indigo" size="sm">Adequate</Badge>;
      case 'Needs Improvement':
        return <Badge variant="amber" size="sm">Needs Improvement</Badge>;
      case 'Critical Gap':
        return <Badge variant="rose" size="sm">Critical Gap</Badge>;
      default:
        return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'emerald';
    if (score >= 70) return 'cyan';
    if (score >= 60) return 'amber';
    return 'rose';
  };

  const topMetrics = [
    {
      name: 'DSA',
      score: skills.find((s) => s.name === 'DSA')?.score || 84,
      status: 'Strong',
      icon: <Code className="w-4 h-4 text-purple-400" />,
      benchmark: 85,
    },
    {
      name: 'Problem Solving',
      score: skills.find((s) => s.name === 'Problem Solving')?.score || 84,
      status: 'Strong',
      icon: <Brain className="w-4 h-4 text-emerald-400" />,
      benchmark: 80,
    },
    {
      name: 'System Design',
      score: skills.find((s) => s.name === 'System Design')?.score || 61,
      status: 'Critical Gap',
      icon: <Network className="w-4 h-4 text-rose-400" />,
      benchmark: 75,
    },
    {
      name: 'Behavioral',
      score: skills.find((s) => s.name === 'Behavioral')?.score || 67,
      status: 'Needs Improvement',
      icon: <Users className="w-4 h-4 text-amber-400" />,
      benchmark: 75,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top 4 Quick Metric Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <span>Candidate Intelligence</span>
          </h3>
          <span className="text-xs text-slate-400">Target benchmark: Microsoft SDE</span>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {topMetrics.map((metric) => (
            <div
              key={metric.name}
              onClick={() => setActiveView('skill-intelligence')}
              className="bg-[#12152b] hover:bg-[#161a36] rounded-xl p-4 border border-[#21264b] hover:border-purple-500/40 transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-slate-300">{metric.name}</span>
                {metric.icon}
              </div>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-2xl font-bold font-mono text-white">{metric.score}%</span>
                <span className="text-[10px] text-slate-400 font-mono">Bar: {metric.benchmark}%</span>
              </div>
              <div>{getStatusBadge(metric.status)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 12 Core Competencies Breakdown Heatmap/Progress */}
      <div className="bg-[#12152b] rounded-2xl p-6 border border-[#21264b]">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h4 className="text-base font-bold text-white tracking-tight">Skill Intelligence Overview</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Live proficiency matrix dynamically updated across technical, architectural, and behavioral rounds.
            </p>
          </div>
          <button
            onClick={() => setActiveView('skill-intelligence')}
            className="text-xs text-purple-300 hover:text-purple-200 font-semibold hover:underline"
          >
            Detailed Matrix →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="bg-[#0c0f24] rounded-xl p-3 border border-slate-800/80 hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-slate-200">{skill.name}</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-bold text-white">{skill.score}%</span>
                  <span
                    className={`text-[10px] font-mono ${
                      skill.recentDelta > 0
                        ? 'text-emerald-400'
                        : skill.recentDelta < 0
                        ? 'text-rose-400'
                        : 'text-slate-400'
                    }`}
                  >
                    {skill.recentDelta > 0 && `+${skill.recentDelta}`}
                    {skill.recentDelta < 0 && `${skill.recentDelta}`}
                  </span>
                </div>
              </div>

              <ProgressBar
                value={skill.score}
                showValue={false}
                color={getScoreColor(skill.score)}
                size="sm"
              />

              <div className="flex items-center justify-between mt-2 pt-1 text-[10px] text-slate-400 border-t border-slate-800/40">
                <span className="truncate max-w-[120px]">{skill.category}</span>
                <span>{getStatusBadge(skill.status)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
