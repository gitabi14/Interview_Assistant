'use client';

import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { FileText, CheckCircle2, AlertTriangle, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

export const WrittenCommunicationView: React.FC = () => {
  const [inputText, setInputText] = useState(
    "Basically in our Traffix system we used YOLOv8 because like everyone knows Faster R-CNN is super slow and we needed real time. So we just hooked it up with FastAPI and MongoDB to store all the car locations. It was pretty fast and worked well on 1080p."
  );

  const [analyzed, setAnalyzed] = useState(false);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="sm">
              WRITTEN SYNTAX & RHETORICAL RIGOR
            </Badge>
            <Badge variant="indigo" size="sm">
              Text Only
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Written Technical Communication Evaluator
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Evaluates clarity, conciseness, technical precision, and eliminates rambling or conversational filler.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Sparkles className="w-4 h-4" />}
          onClick={() => setAnalyzed(true)}
        >
          Analyze Written Structure
        </Button>
      </div>

      {/* Input Text Card */}
      <Card title="Candidate Written Input" subtitle="Paste or type any technical explanation to analyze rhetorical rigor">
        <div className="space-y-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={5}
            className="w-full bg-[#0b0e21] border border-slate-800 focus:border-purple-500 rounded-xl p-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none leading-relaxed font-sans"
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Word count: <strong className="text-white font-mono">{inputText.split(' ').filter(Boolean).length}</strong></span>
              <span>•</span>
              <span>Reading level: <strong className="text-purple-300 font-mono">Conversational</strong></span>
            </div>

            <Button
              variant="primary"
              size="sm"
              onClick={() => setAnalyzed(true)}
            >
              Run Diagnostic
            </Button>
          </div>
        </div>
      </Card>

      {/* Recommended 4-Part Structure */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-[#12152b] p-3 rounded-xl border border-purple-500/20">
          <span className="font-bold text-purple-300 block mb-1">1. Direct Answer</span>
          <p className="text-slate-400">Clear 1-sentence thesis answering the exact question asked.</p>
        </div>
        <div className="bg-[#12152b] p-3 rounded-xl border border-purple-500/20">
          <span className="font-bold text-purple-300 block mb-1">2. Technical Reason</span>
          <p className="text-slate-400">Architectural justification or algorithmic principle.</p>
        </div>
        <div className="bg-[#12152b] p-3 rounded-xl border border-purple-500/20">
          <span className="font-bold text-purple-300 block mb-1">3. Concrete Example</span>
          <p className="text-slate-400">Quantified benchmark, metric (% latency, RPS), or constraint.</p>
        </div>
        <div className="bg-[#12152b] p-3 rounded-xl border border-purple-500/20">
          <span className="font-bold text-purple-300 block mb-1">4. Trade-off Conclusion</span>
          <p className="text-slate-400">Acknowledges trade-offs and explains boundary conditions.</p>
        </div>
      </div>

      {/* Analysis Results Card */}
      {analyzed && (
        <div className="bg-[#12152b] rounded-2xl p-6 border border-purple-500/40 shadow-glow space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold text-purple-300">Communication Diagnosis</span>
              <h4 className="text-base font-bold text-white">Diagnostic Score: 62/100 (Needs Improvement)</h4>
            </div>
            <Badge variant="amber" size="sm">
              Conversational Tone Detected
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-rose-950/20 p-3.5 rounded-xl border border-rose-500/30 space-y-1.5">
              <span className="font-bold text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Detected Deficiencies:
              </span>
              <ul className="space-y-1 text-slate-300 list-disc pl-4">
                <li>Contains conversational filler ("basically", "like everyone knows", "pretty fast").</li>
                <li>Lacks quantitative metrics (e.g. state 42ms per frame instead of "pretty fast").</li>
                <li>Missing comparison of anchor-free architecture vs two-stage RPN mechanism.</li>
              </ul>
            </div>

            <div className="bg-emerald-950/20 p-3.5 rounded-xl border border-emerald-500/30 space-y-1.5">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Recommended Professional Rephrase:
              </span>
              <p className="text-slate-200 leading-relaxed font-sans italic">
                "We selected YOLOv8 for vehicle detection because its single-stage anchor-free architecture delivers 45+ FPS with sub-50ms inference latency, satisfying our real-time 1080p video pipeline requirements where Faster R-CNN introduced prohibitive 120ms latencies."
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
