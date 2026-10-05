'use client';

import React from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { CircularScore } from '../ui/CircularScore';
import { Award, CheckCircle2, AlertTriangle, Printer, Sparkles, Building2, ShieldCheck, ArrowRight } from 'lucide-react';

export const ReadinessReportView: React.FC = () => {
  const { readiness, target, candidate, setActiveView } = usePrepForge();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="sm">
              EXECUTIVE HIRING AUDIT
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Comprehensive Readiness Report
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Final synthesis of candidate credibility, demonstrated competency scores, and company-specific hiring probability.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            icon={<Printer className="w-4 h-4" />}
            onClick={handlePrint}
          >
            Export / Print PDF
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            onClick={() => setActiveView('learning-plan')}
          >
            Execute Prep Plan
          </Button>
        </div>
      </div>

      {/* Hero Audit Card */}
      <div className="bg-gradient-to-br from-[#161a38] via-[#12152e] to-[#0d1024] rounded-2xl p-7 border border-purple-500/40 shadow-glow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-mono font-bold text-purple-300">
              TARGET: {target.company.toUpperCase()} — {target.role.toUpperCase()}
            </span>
          </div>

          <h3 className="text-3xl font-extrabold text-white">
            Overall Interview Readiness: <span className="text-purple-400 font-mono">{readiness.overallScore}%</span>
          </h3>

          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Candidate <strong className="text-white">{candidate.name}</strong> demonstrates high project capability and solid algorithmic problem solving. Reaching the top hiring quartile requires closing deficits in <strong>Operating Systems Concurrency (58%)</strong> and <strong>High-Scale System Design (61%)</strong>.
          </p>
        </div>

        <CircularScore
          score={readiness.overallScore}
          size={140}
          strokeWidth={12}
          color="purple"
          label="READINESS"
          subtitle={`${target.company} SDE Bar`}
        />
      </div>

      {/* 6 Dimension Score Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-[#12152b] rounded-xl p-3.5 border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Resume Fit</span>
          <span className="text-xl font-bold font-mono text-emerald-400 mt-1 block">{readiness.resumeFitScore}%</span>
        </div>
        <div className="bg-[#12152b] rounded-xl p-3.5 border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Claim Credibility</span>
          <span className="text-xl font-bold font-mono text-amber-400 mt-1 block">{readiness.claimCredibilityScore}%</span>
        </div>
        <div className="bg-[#12152b] rounded-xl p-3.5 border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Technical CS</span>
          <span className="text-xl font-bold font-mono text-purple-300 mt-1 block">{readiness.technicalScore}%</span>
        </div>
        <div className="bg-[#12152b] rounded-xl p-3.5 border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Problem Solving</span>
          <span className="text-xl font-bold font-mono text-emerald-400 mt-1 block">{readiness.problemSolvingScore}%</span>
        </div>
        <div className="bg-[#12152b] rounded-xl p-3.5 border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Communication</span>
          <span className="text-xl font-bold font-mono text-cyan-400 mt-1 block">{readiness.communicationScore}%</span>
        </div>
        <div className="bg-[#12152b] rounded-xl p-3.5 border border-slate-800 text-center">
          <span className="text-[10px] text-slate-400 uppercase font-bold block">Behavioral STAR</span>
          <span className="text-xl font-bold font-mono text-rose-400 mt-1 block">{readiness.behavioralScore}%</span>
        </div>
      </div>

      {/* Strengths vs Gaps vs Risks Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Core Strengths */}
        <Card title="Core Strengths (Pass)" subtitle="High evidence confidence" className="border-emerald-500/20">
          <ul className="space-y-2 text-xs">
            <li className="flex items-start gap-2 text-slate-200">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Project Depth (Traffix full-stack scope: 92%)</span>
            </li>
            <li className="flex items-start gap-2 text-slate-200">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>OOP & Polymorphic Design (91%)</span>
            </li>
            <li className="flex items-start gap-2 text-slate-200">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Python Core & Async IO (88%)</span>
            </li>
            <li className="flex items-start gap-2 text-slate-200">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>Problem Solving & Logic (84%)</span>
            </li>
          </ul>
        </Card>

        {/* Critical Gaps */}
        <Card title="Critical Gaps (Fail Risk)" subtitle="Below Microsoft baseline" className="border-rose-500/20">
          <ul className="space-y-2 text-xs">
            <li className="flex items-start gap-2 text-slate-200">
              <span className="text-rose-400 font-bold">⚠</span>
              <span>Operating Systems (Process Sync & Locks: 58%)</span>
            </li>
            <li className="flex items-start gap-2 text-slate-200">
              <span className="text-rose-400 font-bold">⚠</span>
              <span>System Design (Distributed Caching: 61%)</span>
            </li>
            <li className="flex items-start gap-2 text-slate-200">
              <span className="text-rose-400 font-bold">⚠</span>
              <span>Behavioral STAR Quantification (67%)</span>
            </li>
          </ul>
        </Card>

        {/* Claim Risks */}
        <Card title="Claim Defense Risks" subtitle="High interviewer probe likelihood" className="border-amber-500/20">
          <ul className="space-y-2 text-xs">
            <li className="flex items-start gap-2 text-slate-200">
              <span className="text-amber-400 font-bold">!</span>
              <span>FastAPI Concurrency Claims (Partial evidence)</span>
            </li>
            <li className="flex items-start gap-2 text-slate-200">
              <span className="text-amber-400 font-bold">!</span>
              <span>YOLOv8 Edge Inference Latency Proof</span>
            </li>
            <li className="flex items-start gap-2 text-slate-200">
              <span className="text-amber-400 font-bold">!</span>
              <span>MongoDB Time-Series Storage Justification</span>
            </li>
          </ul>
        </Card>
      </div>

      {/* Strategic Recommendation Callout */}
      <div className="bg-[#181d42] rounded-2xl p-6 border border-purple-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-glow">
        <div>
          <span className="text-[10px] uppercase font-bold text-purple-300 block mb-1">
            EXECUTIVE HIRING RECOMMENDATION
          </span>
          <p className="text-xs text-slate-200 max-w-2xl leading-relaxed">
            "{readiness.recommendedAction}"
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
          onClick={() => setActiveView('learning-plan')}
        >
          Start Targeted OS Modules
        </Button>
      </div>
    </div>
  );
};
