'use client';

import React, { useState } from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { CircularScore } from '../ui/CircularScore';
import { ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle2, ArrowRight, Play, HelpCircle, Sparkles } from 'lucide-react';

export const ClaimVerificationView: React.FC = () => {
  const { claims, updateClaimVerification, setActiveView, jumpToQuestion } = usePrepForge();

  const [selectedClaimId, setSelectedClaimId] = useState<string>(claims[0]?.id || 'claim-1');

  const selectedClaim = claims.find((c) => c.id === selectedClaimId) || claims[0];

  const handleLaunchInterviewQuestion = () => {
    if (selectedClaim.id === 'claim-1') {
      jumpToQuestion(0); // YOLO question
    } else {
      jumpToQuestion(1); // YOLO followup
    }
    setActiveView('adaptive-interview');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="sm">
              CLAIM CREDIBILITY ENGINE
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Resume Claim Verification Workspace
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Testing candidate defense of claimed skills. Measures Claimed Proficiency vs Demonstrated Evidence.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Play className="w-4 h-4 fill-white" />}
          onClick={handleLaunchInterviewQuestion}
        >
          Test Selected Claim in Interview
        </Button>
      </div>

      {/* Philosophy Banner */}
      <div className="bg-[#121633] border border-purple-500/30 rounded-2xl p-4 flex items-start gap-3">
        <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Objective Claim Defense Calibration
          </h4>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
            <strong className="text-purple-300">"This is not a lie detector.</strong> Your demonstrated evidence currently reflects how thoroughly you can explain architectural trade-offs, edge cases, and failure modes under live technical probing."
          </p>
        </div>
      </div>

      {/* Claim Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {claims.map((claim) => {
          const isSelected = claim.id === selectedClaim.id;
          return (
            <div
              key={claim.id}
              onClick={() => setSelectedClaimId(claim.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-purple-600/15 border-purple-500 shadow-glow'
                  : 'bg-[#12152b] border-[#21264b] hover:border-slate-600'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white">{claim.technology}</span>
                  <Badge variant={claim.riskLevel === 'HIGH' ? 'rose' : claim.riskLevel === 'MEDIUM' ? 'amber' : 'emerald'} size="sm">
                    {claim.riskLevel} RISK
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">"{claim.contextSnippet}"</p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Claim: <strong className="text-purple-300">{claim.claimedLevel}</strong>
                </span>
                <span className="text-slate-400">
                  Demonstrated: <strong className="text-emerald-400">{claim.demonstratedLevel || 'Unverified'}</strong>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Claim Deep Inspection Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Claim Score Gauge */}
        <div className="bg-[#12152b] rounded-2xl p-6 border border-purple-500/30 flex flex-col items-center justify-center text-center space-y-4">
          <Badge variant="purple" size="sm">
            CLAIM AUDIT: {selectedClaim.technology}
          </Badge>

          <CircularScore
            score={selectedClaim.evidenceConfidence}
            size={140}
            strokeWidth={12}
            color={selectedClaim.evidenceConfidence >= 80 ? 'emerald' : selectedClaim.evidenceConfidence >= 60 ? 'amber' : 'rose'}
            label="CONFIDENCE"
            subtitle="Demonstrated Evidence Support"
          />

          <div className="w-full bg-[#0b0e21] rounded-xl p-3.5 border border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Claimed Level:</span>
              <span className="font-mono font-bold text-purple-300">{selectedClaim.claimedLevel}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Demonstrated Level:</span>
              <span className="font-mono font-bold text-emerald-400">{selectedClaim.demonstratedLevel || 'Intermediate'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Evidence Status:</span>
              <Badge variant={selectedClaim.evidenceStatus === 'Strong' ? 'emerald' : 'amber'} size="sm">
                {selectedClaim.evidenceStatus} Evidence
              </Badge>
            </div>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={<Play className="w-4 h-4 fill-white" />}
            onClick={handleLaunchInterviewQuestion}
            className="w-full"
          >
            Launch Claim Question
          </Button>
        </div>

        {/* Right 2 Columns: Evidence Analysis & Likely Follow-ups */}
        <div className="lg:col-span-2 space-y-4">
          {/* Evidence Pros & Gaps */}
          <Card title="Demonstrated Evidence Analysis" subtitle="Strengths validated vs missing architectural proof">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Pros */}
              <div className="bg-[#0b0e21] p-3.5 rounded-xl border border-emerald-500/20 space-y-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Validated Competencies
                </span>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  {selectedClaim.findings.pros.map((pro, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gaps */}
              <div className="bg-[#0b0e21] p-3.5 rounded-xl border border-rose-500/20 space-y-2">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Missing Proof / Gaps
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedClaim.findings.gaps.map((gap, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-400">⚠</span>
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>

          {/* Likely Interviewer Probes */}
          <Card title="Predicted Interviewer Follow-Up Probes" subtitle="What interviewers will ask next when probing this claim">
            <div className="space-y-2.5">
              {selectedClaim.likelyFollowUps.map((fu, idx) => (
                <div
                  key={idx}
                  className="bg-[#0b0e21] p-3 rounded-xl border border-slate-800 hover:border-purple-500/30 transition-all flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 font-mono text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div className="text-xs">
                    <p className="text-slate-200 font-medium">"{fu}"</p>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">
                      Targeting: Hardware constraints, edge-case robustness, and concurrency bottlenecks.
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
