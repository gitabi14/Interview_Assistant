'use client';

import React from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { FileText, Bot, Brain, ArrowRight } from 'lucide-react';

export const ActiveModules: React.FC = () => {
  const { readiness, setActiveView, currentQuestionIndex, questions } = usePrepForge();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
          <span>Active Preparation Modules</span>
        </h3>
        <button
          onClick={() => setActiveView('learning-plan')}
          className="text-xs text-purple-300 hover:text-purple-200 font-semibold flex items-center gap-1 hover:underline"
        >
          <span>View all</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Resume Intelligence */}
        <div className="bg-[#12152b] rounded-2xl p-5 border border-[#21264b] hover:border-purple-500/40 transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <Badge variant="purple" size="sm">
                RESUME AI ANALYSIS
              </Badge>
              <FileText className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>

            <h4 className="text-base font-bold text-white mb-1">Resume Intelligence</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Your resume has been analyzed against the Microsoft Software Engineer role competencies.
            </p>

            <div className="bg-[#0b0e21] rounded-xl p-3 border border-slate-800 space-y-2 mb-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Resume Fit:</span>
                <span className="font-mono font-bold text-emerald-400">{readiness.resumeFitScore}%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Claim Credibility:</span>
                <span className="font-mono font-bold text-amber-400">{readiness.claimCredibilityScore}%</span>
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
            onClick={() => setActiveView('resume-intelligence')}
            className="w-full justify-between"
          >
            <span>View Analysis</span>
          </Button>
        </div>

        {/* Card 2: Adaptive Interview */}
        <div className="bg-[#12152b] rounded-2xl p-5 border border-purple-500/30 hover:border-purple-500/60 shadow-glow transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <Badge variant="purple" size="sm" dot>
                ACTIVE TECHNICAL ROUND
              </Badge>
              <Bot className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
            </div>

            <h4 className="text-base font-bold text-white mb-1">Adaptive Interview</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Continue your personalized interview with dynamically generated follow-ups based on your previous answers.
            </p>

            <div className="bg-[#0b0e21] rounded-xl p-3 border border-slate-800 space-y-2 mb-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Progress:</span>
                <span className="font-mono font-bold text-purple-300">
                  Question {currentQuestionIndex + 1} / {questions.length}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Difficulty:</span>
                <span className="font-mono font-bold text-rose-400">Advanced (L4)</span>
              </div>
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
            onClick={() => setActiveView('adaptive-interview')}
            className="w-full justify-between"
          >
            <span>Continue Interview</span>
          </Button>
        </div>

        {/* Card 3: Skill Intelligence */}
        <div className="bg-[#12152b] rounded-2xl p-5 border border-[#21264b] hover:border-purple-500/40 transition-all flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between mb-3">
              <Badge variant="cyan" size="sm">
                LIVE CANDIDATE PROFILE
              </Badge>
              <Brain className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>

            <h4 className="text-base font-bold text-white mb-1">Skill Intelligence</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Your strengths and weaknesses are continuously updated from interview performance and answer evidence.
            </p>

            <div className="bg-[#0b0e21] rounded-xl p-3 border border-slate-800 space-y-2 mb-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Strongest:</span>
                <span className="font-mono font-bold text-emerald-400">Projects (92%)</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">Critical Gap:</span>
                <span className="font-mono font-bold text-rose-400">Operating Systems (58%)</span>
              </div>
            </div>
          </div>

          <Button
            variant="secondary"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
            onClick={() => setActiveView('skill-intelligence')}
            className="w-full justify-between"
          >
            <span>View Skills</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
