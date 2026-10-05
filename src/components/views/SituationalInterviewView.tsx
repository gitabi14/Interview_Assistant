'use client';

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ShieldAlert, AlertTriangle, CheckCircle2, ArrowRight, Zap, Target } from 'lucide-react';

export const SituationalInterviewView: React.FC = () => {
  const scenarios = [
    {
      id: 'prod-crash',
      title: '1. Production Failure During Peak Traffic',
      situation: 'Your primary web service crashes during Black Friday peak traffic. Alerts are firing, CPU is pegged at 100%, and incoming requests are dropping.',
      goodResponse: '1) Acknowledge outage and initiate P1 incident response; 2) Roll back recent canary deployment or scale replicas immediately; 3) Divert non-critical traffic to maintenance page; 4) Inspect APM traces for thread lock/DB contention; 5) Post-mortem within 24h with blameless root cause analysis.',
    },
    {
      id: 'deadline-triage',
      title: '2. Two Days Left & Feature Broken',
      situation: 'You have 48 hours left before the client release and your core telemetry analytics feature is crashing on edge inputs.',
      goodResponse: '1) Triage severity vs core user flow; 2) Propose feature flag to disable the analytics sub-module safely without blocking primary release; 3) Transparently communicate scope adjustment to PM and engineering leads; 4) Deliver patched version in follow-up hotfix.',
    },
    {
      id: 'bug-pre-release',
      title: '3. Critical Bug Discovered 2 Hours Before Release',
      situation: 'You discover a silent race condition bug in the billing service 2 hours before the scheduled production release.',
      goodResponse: '1) Stop the release deployment pipeline immediately; 2) Notify release manager and stakeholder group with factual risk statement; 3) Assess fix complexity vs rollback risk; 4) Never gamble with customer data integrity or financial transactions.',
    },
  ];

  const [selectedScenario, setSelectedScenario] = useState(scenarios[0]);
  const [candidateResponse, setCandidateResponse] = useState('');
  const [evaluated, setEvaluated] = useState(false);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="sm">
              HYPOTHETICAL & CRISIS ENGINEERING
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Situational & Hypothetical Interview Scenarios
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Evaluate high-stakes decision making, risk awareness, ownership, and composure under engineering crises.
          </p>
        </div>
      </div>

      {/* Scenario Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {scenarios.map((sc) => {
          const isSelected = selectedScenario.id === sc.id;
          return (
            <button
              key={sc.id}
              onClick={() => {
                setSelectedScenario(sc);
                setEvaluated(false);
                setCandidateResponse('');
              }}
              className={`p-4 rounded-xl text-left border transition-all ${
                isSelected
                  ? 'bg-purple-600/15 border-purple-500 shadow-glow'
                  : 'bg-[#12152b] border-[#21264b] hover:border-slate-600'
              }`}
            >
              <h4 className="text-xs font-bold text-white mb-1">{sc.title}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">{sc.situation}</p>
            </button>
          );
        })}
      </div>

      {/* Active Scenario Prompt */}
      <div className="bg-[#12152b] rounded-2xl p-6 border border-purple-500/30 shadow-glow space-y-4">
        <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300">
          SITUATIONAL SCENARIO
        </span>
        <h3 className="text-base font-bold text-white leading-relaxed">
          "{selectedScenario.situation}"
        </h3>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-300">Your Structured Action Plan:</label>
          <textarea
            value={candidateResponse}
            onChange={(e) => setCandidateResponse(e.target.value)}
            placeholder="Outline your immediate crisis containment steps, stakeholder communication, and long-term prevention..."
            rows={5}
            className="w-full bg-[#0b0e21] border border-slate-800 focus:border-purple-500 rounded-xl p-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none leading-relaxed font-sans"
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-800">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCandidateResponse(selectedScenario.goodResponse)}
          >
            Load Exemplary Response
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={<CheckCircle2 className="w-4 h-4" />}
            onClick={() => setEvaluated(true)}
          >
            Evaluate Composure & Decision Making
          </Button>
        </div>

        {evaluated && (
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 space-y-2 text-xs">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Evaluator Assessment: Excellent Risk Awareness
            </span>
            <p className="text-slate-200 leading-relaxed font-sans">
              Candidate prioritizes system stability, rollback mitigation, and transparent communication over rushed hot-patching. Demonstrates senior engineering ownership.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
