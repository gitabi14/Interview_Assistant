'use client';

import React from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Users, Sparkles, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export const BehavioralInterviewView: React.FC = () => {
  const { starForm, setStarForm, starEvaluation, evaluateStarAnswer, setActiveView } = usePrepForge();

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="sm">
              TEXT-BASED STAR EVALUATOR
            </Badge>
            <Badge variant="indigo" size="sm">
              No Audio / Text Only
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Behavioral Interview & STAR Framework
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Evaluate responses against Situation, Task, Action, and Quantified Result, measuring Ownership, Decision Making, and Leadership.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={evaluateStarAnswer}>
          Evaluate STAR Response
        </Button>
      </div>

      {/* Behavioral Question Hero */}
      <div className="bg-gradient-to-br from-[#161a38] via-[#12152e] to-[#0d1024] rounded-2xl p-6 border border-purple-500/30 shadow-glow">
        <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300 block mb-1">
          BEHAVIORAL COMPETENCY: TECHNICAL CONFLICT & LEADERSHIP
        </span>
        <h3 className="text-lg font-bold text-white leading-relaxed">
          "Tell me about a time when you had a strong technical disagreement with a peer or teammate regarding architecture or technology choice. How did you resolve it and what was the outcome?"
        </h3>
      </div>

      {/* STAR Structured Editor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Situation */}
        <Card title="1. Situation (10%)" subtitle="Context, project scope, and initial constraint">
          <textarea
            value={starForm.situation}
            onChange={(e) => setStarForm({ ...starForm, situation: e.target.value })}
            rows={3}
            className="w-full bg-[#0b0e21] border border-slate-800 focus:border-purple-500 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
          />
        </Card>

        {/* Task */}
        <Card title="2. Task (15%)" subtitle="Your explicit responsibility and deadline">
          <textarea
            value={starForm.task}
            onChange={(e) => setStarForm({ ...starForm, task: e.target.value })}
            rows={3}
            className="w-full bg-[#0b0e21] border border-slate-800 focus:border-purple-500 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
          />
        </Card>

        {/* Action */}
        <Card title="3. Action (50%)" subtitle="Technical decisions you personally made with data">
          <textarea
            value={starForm.action}
            onChange={(e) => setStarForm({ ...starForm, action: e.target.value })}
            rows={4}
            className="w-full bg-[#0b0e21] border border-slate-800 focus:border-purple-500 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
          />
        </Card>

        {/* Result */}
        <Card title="4. Result (25%)" subtitle="Quantified impact (e.g. 4x latency, 2 days ahead, % metrics)">
          <textarea
            value={starForm.result}
            onChange={(e) => setStarForm({ ...starForm, result: e.target.value })}
            rows={4}
            className="w-full bg-[#0b0e21] border border-slate-800 focus:border-purple-500 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
          />
        </Card>
      </div>

      {/* Evaluation Results Card */}
      {starEvaluation && (
        <div className="bg-[#12152b] rounded-2xl p-6 border border-purple-500/30 shadow-glow space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-purple-300">STAR Scoring Engine</span>
              <h4 className="text-base font-bold text-white">Behavioral Evaluation Analysis</h4>
            </div>
            <span className="text-2xl font-bold font-mono text-emerald-400">
              {starEvaluation.overallScore}%
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
            <div className="bg-[#0b0e21] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Ownership Score:</span>
              <span className="text-emerald-400 font-bold">{starEvaluation.ownershipScore}%</span>
            </div>
            <div className="bg-[#0b0e21] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Decision Making:</span>
              <span className="text-purple-300 font-bold">{starEvaluation.decisionMakingScore}%</span>
            </div>
            <div className="bg-[#0b0e21] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Quantified Result:</span>
              <span className={starEvaluation.quantifiedImpact ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {starEvaluation.quantifiedImpact ? '✓ Present (4x latency, 2 days)' : '✕ Missing Numbers'}
              </span>
            </div>
          </div>

          <div className="bg-[#0b0e21] p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
            <p className="text-slate-200 leading-relaxed font-sans">{starEvaluation.feedback}</p>
            <p className="text-purple-300 font-medium font-sans">{starEvaluation.interviewerPerspective}</p>
          </div>
        </div>
      )}
    </div>
  );
};
