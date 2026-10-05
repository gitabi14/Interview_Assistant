'use client';

import React, { useState } from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { Brain, Sparkles, TrendingUp, TrendingDown, ArrowRight, ShieldCheck, Cpu } from 'lucide-react';

export const SkillIntelligenceView: React.FC = () => {
  const { skills, target, setActiveView } = usePrepForge();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Core CS', 'Engineering', 'Specialized', 'Soft Skills'];

  const filteredSkills =
    selectedCategory === 'All' ? skills : skills.filter((s) => s.category === selectedCategory);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'emerald';
    if (score >= 70) return 'cyan';
    if (score >= 60) return 'amber';
    return 'rose';
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="sm">
              CANDIDATE INTELLIGENCE MATRIX
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Overall Skill Intelligence
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Measures what you actually know independent of the resume, continuously updated by demonstrated answer evidence.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
          onClick={() => setActiveView('skill-gap-analysis')}
        >
          View Skill Gap Analysis
        </Button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 ${
                isSelected
                  ? 'bg-purple-600 text-white shadow-glow border border-purple-400/40'
                  : 'bg-[#12152b] text-slate-400 border border-[#21264b] hover:text-white'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Skills Matrix Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSkills.map((skill) => (
          <div
            key={skill.name}
            className="bg-[#12152b] rounded-2xl p-5 border border-[#21264b] hover:border-purple-500/40 transition-all flex flex-col justify-between group shadow-glow-sm"
          >
            <div>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                    {skill.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">{skill.category}</span>
                </div>

                <div className="text-right">
                  <span className="text-xl font-bold font-mono text-white">{skill.score}%</span>
                  <div className="text-[10px] text-slate-400 font-mono">Bar: {skill.benchmark}%</div>
                </div>
              </div>

              <div className="my-3">
                <ProgressBar
                  value={skill.score}
                  showValue={false}
                  color={getScoreColor(skill.score)}
                  size="sm"
                />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-3">{skill.notes}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">
                Evidence Count: <strong className="text-purple-300 font-mono">{skill.evidenceCount}</strong>
              </span>

              <Badge
                variant={
                  skill.status === 'Strong'
                    ? 'emerald'
                    : skill.status === 'Adequate'
                    ? 'indigo'
                    : skill.status === 'Needs Improvement'
                    ? 'amber'
                    : 'rose'
                }
                size="sm"
              >
                {skill.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
