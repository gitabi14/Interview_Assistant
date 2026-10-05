'use client';

import React, { useState } from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Bug, AlertOctagon, Terminal, CheckCircle2, Zap, ArrowRight } from 'lucide-react';

export const DebuggingChallengeView: React.FC = () => {
  const { updateSkillScore, setActiveView } = usePrepForge();

  const [diagnosisText, setDiagnosisText] = useState('');
  const [evaluated, setEvaluated] = useState(false);

  const incidentLogs = `[2026-10-05 10:14:02] INFO [Worker-3] Incoming RTSP stream batch: 60 frames
[2026-10-05 10:14:03] WARN [Worker-3] DB connection pool: 98/100 connections in use
[2026-10-05 10:14:04] ERROR [Worker-1] Thread-14 acquired Lock_B, waiting for Lock_A...
[2026-10-05 10:14:04] ERROR [Worker-2] Thread-19 acquired Lock_A, waiting for Lock_B...
[2026-10-05 10:14:06] CRITICAL [Server] Process latency spiked from 42ms to 12,400ms. CPU: 100%. Connections dropping (HTTP 504 Gateway Timeout).`;

  const handleEvaluate = () => {
    setEvaluated(true);
    updateSkillScore('Problem Solving', +3, 'Correctly diagnosed deadlock & connection pool starvation in production logs.');
    updateSkillScore('Operating Systems', +2, 'Identified circular lock dependency.');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="rose" size="sm">
              PRODUCTION OUTAGE SIMULATION
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Debugging & Production Triage Challenge
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Analyze production logs, pinpoint the root cause (Deadlock / Connection Leak), formulate the fix, and evaluate operational trade-offs.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<CheckCircle2 className="w-4 h-4" />}
          onClick={handleEvaluate}
        >
          Submit Root Cause Analysis
        </Button>
      </div>

      {/* Incident Scenario Card */}
      <Card title="Incident P1: Application Crashes Under Concurrent Spike" subtitle="FastAPI Telemetry Ingestion Node Failure">
        <div className="space-y-4">
          <div className="bg-[#0b0e21] rounded-xl p-4 border border-rose-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-rose-400 flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4" /> Production Incident Telemetry Logs:
              </span>
              <Badge variant="rose" size="sm">
                Severity 1 Outage
              </Badge>
            </div>
            <pre className="text-xs font-mono text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
              {incidentLogs}
            </pre>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="bg-[#0c0f24] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block font-bold mb-1">1. Identify Root Cause:</span>
              <p className="text-slate-300">Detect the circular lock acquisition between Thread-14 and Thread-19, compounded by DB connection exhaustion.</p>
            </div>
            <div className="bg-[#0c0f24] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block font-bold mb-1">2. Short-Term Mitigation:</span>
              <p className="text-slate-300">Restart worker processes, apply lock acquisition timeouts, and drain queue backlog.</p>
            </div>
            <div className="bg-[#0c0f24] p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400 block font-bold mb-1">3. Long-Term Architecture Fix:</span>
              <p className="text-slate-300">Enforce strict lock ordering across all worker threads and implement async DB connection pooling with backpressure.</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Candidate Diagnosis Workspace */}
      <Card title="Your Root Cause Analysis & Mitigation Plan" subtitle="Evaluated on debugging methodology and risk awareness">
        <div className="space-y-4">
          <textarea
            value={diagnosisText}
            onChange={(e) => setDiagnosisText(e.target.value)}
            placeholder="Explain: 1) What caused the crash? 2) How would you prove it in logs/profiler? 3) Code-level fix to prevent circular wait..."
            rows={6}
            className="w-full bg-[#0b0e21] border border-slate-800 focus:border-purple-500 rounded-xl p-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none leading-relaxed font-sans"
          />

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setDiagnosisText(
                  "Root Cause: Classical Deadlock due to inverted lock acquisition order. Thread-14 acquired Lock_B and requested Lock_A, while Thread-19 acquired Lock_A and requested Lock_B. As incoming RTSP frames continued streaming in, threads blocked on the deadlock without releasing DB connections, leading to complete pool starvation (98/100) and HTTP 504 timeouts.\n\nFix: 1) Enforce strict lock ordering: always acquire Lock_A before Lock_B globally. 2) Implement acquiring locks with non-blocking timeouts (e.g., acquire(timeout=5s)). 3) Use async connection checkout with explicit try/finally context managers to guarantee socket release."
                );
              }}
            >
              Load Candidate Diagnosis
            </Button>

            <Button variant="primary" size="sm" onClick={handleEvaluate}>
              Evaluate Diagnosis
            </Button>
          </div>

          {evaluated && (
            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 space-y-2 text-xs">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Evaluator Assessment:
              </span>
              <p className="text-slate-200 leading-relaxed font-sans">
                Outstanding debugging diagnosis. Correctly correlated the circular lock deadlock with downstream database connection pool exhaustion and proposed strict lock hierarchy as the permanent architectural resolution.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
