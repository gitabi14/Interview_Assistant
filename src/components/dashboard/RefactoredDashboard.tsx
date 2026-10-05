'use client';

import React from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import {
  FileText,
  Bot,
  Brain,
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Target,
  Play,
  Zap,
} from 'lucide-react';

export const RefactoredDashboard: React.FC = () => {
  const {
    candidate,
    target,
    readiness,
    skills,
    setActiveView,
    jumpToQuestion,
    setIsCoachOpen,
    sendCoachMessage,
    isCoachThinking,
  } = usePrepForge();

  const [promptText, setPromptText] = React.useState('');

  const handlePromptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptText.trim() || isCoachThinking) return;
    const text = promptText.trim();
    setPromptText('');
    setIsCoachOpen(true);
    await sendCoachMessage(text);
  };

  const handleQuickCommand = async (cmd: string) => {
    setIsCoachOpen(true);
    await sendCoachMessage(cmd);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, {candidate.name.split(' ')[0]}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Your end-to-end AI career & interview coach: resume claim defense, adaptive technical drills, and real hiring calibration.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setActiveView('readiness-report')}
          >
            Readiness Report
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Play className="w-4 h-4 fill-white" />}
            onClick={() => setActiveView('adaptive-interview')}
          >
            Start Technical Interview
          </Button>
        </div>
      </div>

      {/* INTERACTIVE AI CAREER COACH HERO COMMAND BAR */}
      <div className="bg-gradient-to-r from-[#181d45] via-[#141838] to-[#10132b] rounded-2xl p-5 border border-purple-500/40 shadow-glow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            </div>
            <span className="text-xs font-bold text-white tracking-wide uppercase font-mono">
              Ask PrepForge AI Career Coach
            </span>
          </div>
          <Badge variant="purple" size="sm">
            Interactive Agent Active
          </Badge>
        </div>

        <form onSubmit={handlePromptSubmit} className="flex gap-2">
          <input
            type="text"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            placeholder="Tell PrepForge: 'Analyze my resume', 'Test me on Traffix', 'Test DBMS/OS', 'Give me a coding problem'..."
            className="flex-1 bg-[#0b0e21] border border-purple-500/30 focus:border-purple-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <Button
            type="submit"
            variant="primary"
            size="sm"
            icon={<Bot className="w-4 h-4" />}
            disabled={!promptText.trim() || isCoachThinking}
          >
            Ask Coach
          </Button>
        </form>

        <div className="flex items-center gap-2 overflow-x-auto pt-1 no-scrollbar">
          <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0 font-mono">
            Quick Actions:
          </span>
          {[
            { label: '📄 Audit Resume Claims', cmd: 'Analyze my resume and verify my project claims.' },
            { label: '🚀 Test Traffix Project', cmd: 'Test me on my Traffix project.' },
            { label: '⚡ Drill Operating Systems', cmd: 'Test me on Operating Systems.' },
            { label: '💾 Drill DBMS & SQL', cmd: 'Test me on DBMS and indexing.' },
            { label: '💻 Coding Challenge', cmd: 'Give me a coding challenge.' },
            { label: '🎯 Microsoft Readiness', cmd: 'How ready am I for Microsoft SDE?' },
          ].map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleQuickCommand(item.cmd)}
              className="text-[11px] bg-[#0d1024] hover:bg-purple-600/30 text-purple-200 hover:text-white px-2.5 py-1 rounded-lg border border-purple-500/20 transition-all shrink-0 whitespace-nowrap"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Target Hero Card */}
      <div className="bg-gradient-to-br from-[#161a38] via-[#12152e] to-[#0d1024] rounded-2xl p-6 border border-purple-500/30 shadow-glow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300">
                TARGET DESTINATION
              </span>
              <span className="text-slate-500">•</span>
              <Badge variant="purple" size="sm" dot>
                {target.companyType}
              </Badge>
              <Badge variant="indigo" size="sm">
                {target.difficulty} Level
              </Badge>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
              <span>{target.company}</span>
              <span className="text-purple-400">—</span>
              <span className="text-gradient-purple">{target.role}</span>
            </h2>

            <p className="text-xs text-slate-300 mt-1">
              Resume: <strong className="text-white">Kabilan_K_A.pdf</strong> • Round: <strong className="text-purple-300">{target.round}</strong>
            </p>
          </div>

          {/* Readiness Score Gauge */}
          <div className="bg-[#0b0e21] rounded-2xl p-4 border border-purple-500/40 min-w-[220px] shadow-glow">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300">
                INTERVIEW READINESS
              </span>
              <span className="text-2xl font-black font-mono text-emerald-400">
                {readiness.overallScore}%
              </span>
            </div>
            <ProgressBar value={readiness.overallScore} showValue={false} color="purple" size="md" />
            <span className="text-[10px] text-slate-400 mt-2 block text-center font-mono">
              Calibrated against {target.company} Hiring Bar
            </span>
          </div>
        </div>
      </div>

      {/* TWO PRIMARY PILLAR HERO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CARD 1 — RESUME INTELLIGENCE */}
        <div className="bg-[#12152d] rounded-2xl p-6 border border-purple-500/30 hover:border-purple-500/60 shadow-glow transition-all flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300 block font-mono">
                    PART 1 OF 2
                  </span>
                  <h3 className="text-lg font-bold text-white">Resume Intelligence</h3>
                </div>
              </div>
              <Badge variant="purple" size="sm">
                Can I Defend My Resume?
              </Badge>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Understand what your resume claims and prepare for the exact questions an interviewer can derive from your projects, technologies, and achievements.
            </p>

            <div className="grid grid-cols-2 gap-3 bg-[#0b0e21] rounded-xl p-3.5 border border-slate-800 font-mono text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Resume Fit:</span>
                <span className="text-emerald-400 font-bold text-base">{readiness.resumeFitScore}%</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Claim Credibility:</span>
                <span className="text-amber-400 font-bold text-base">{readiness.claimCredibilityScore}%</span>
              </div>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-slate-800">
            <Button
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              onClick={() => setActiveView('resume-interview')}
              className="w-full justify-between"
            >
              <span>Continue Resume Preparation</span>
            </Button>
          </div>
        </div>

        {/* CARD 2 — TECHNICAL INTERVIEW */}
        <div className="bg-[#12152d] rounded-2xl p-6 border border-cyan-500/30 hover:border-cyan-500/60 shadow-glow transition-all flex flex-col justify-between group">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 block font-mono">
                    PART 2 OF 2
                  </span>
                  <h3 className="text-lg font-bold text-white">Technical Interview</h3>
                </div>
              </div>
              <Badge variant="cyan" size="sm">
                What Do I Actually Know?
              </Badge>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Test what you actually know beyond your resume through adaptive technical interviews, live coding, CS fundamentals, and system design.
            </p>

            <div className="grid grid-cols-2 gap-3 bg-[#0b0e21] rounded-xl p-3.5 border border-slate-800 font-mono text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Technical Readiness:</span>
                <span className="text-purple-300 font-bold text-base">{readiness.technicalScore}%</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Current Priority:</span>
                <span className="text-rose-400 font-bold text-xs truncate block mt-0.5">Operating Systems</span>
              </div>
            </div>
          </div>

          <div className="pt-5 mt-4 border-t border-slate-800">
            <Button
              variant="primary"
              size="md"
              icon={<Play className="w-4 h-4 fill-white" />}
              onClick={() => setActiveView('adaptive-interview')}
              className="w-full justify-between bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500"
            >
              <span>Start Technical Interview</span>
            </Button>
          </div>
        </div>
      </div>

      {/* CURRENT FOCUS & SKILL GAPS SECTION */}
      <div className="bg-[#12152b] rounded-2xl p-6 border border-[#21264b] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-purple-400" /> Current Focus Areas
            </h3>
            <p className="text-xs text-slate-400">Targeted preparation areas to reach the top quartile for Microsoft SDE.</p>
          </div>

          <button
            onClick={() => setActiveView('learning-plan')}
            className="text-xs text-purple-300 hover:underline font-semibold"
          >
            Open 5-Day Plan →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => {
              jumpToQuestion(2);
              setActiveView('adaptive-interview');
            }}
            className="bg-[#0b0e21] p-4 rounded-xl border border-rose-500/30 hover:border-rose-500/60 cursor-pointer transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Operating Systems</span>
              <Badge variant="rose" size="sm">58% Critical Gap</Badge>
            </div>
            <p className="text-[11px] text-slate-400">Process synchronization, mutex vs semaphore, deadlocks.</p>
            <span className="text-[10px] text-rose-300 font-bold flex items-center gap-1 mt-2">
              Practice OS Drill →
            </span>
          </div>

          <div
            onClick={() => setActiveView('system-design')}
            className="bg-[#0b0e21] p-4 rounded-xl border border-rose-500/30 hover:border-rose-500/60 cursor-pointer transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">System Design</span>
              <Badge variant="rose" size="sm">61% Critical Gap</Badge>
            </div>
            <p className="text-[11px] text-slate-400">Distributed caching, database partitioning, rate limiting.</p>
            <span className="text-[10px] text-purple-300 font-bold flex items-center gap-1 mt-2">
              Practice System Design →
            </span>
          </div>

          <div
            onClick={() => setActiveView('behavioral-situational')}
            className="bg-[#0b0e21] p-4 rounded-xl border border-amber-500/30 hover:border-amber-500/60 cursor-pointer transition-all space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white">Behavioral & STAR</span>
              <Badge variant="amber" size="sm">67% Needs Polish</Badge>
            </div>
            <p className="text-[11px] text-slate-400">Quantifying technical conflict resolution metrics.</p>
            <span className="text-[10px] text-amber-300 font-bold flex items-center gap-1 mt-2">
              Practice STAR Response →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
