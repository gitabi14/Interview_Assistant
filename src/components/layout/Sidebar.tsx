'use client';

import React from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { NavigationItem } from '../../types';
import {
  LayoutDashboard,
  UploadCloud,
  FileSearch,
  Network,
  Briefcase,
  Compass,
  MessageSquareQuote,
  SlidersHorizontal,
  Bot,
  Code2,
  Cpu,
  Layers,
  Users,
  Brain,
  GraduationCap,
  Award,
  Settings,
  User,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeView, setActiveView } = usePrepForge();

  return (
    <aside className="w-64 bg-[#0a0d1a] border-r border-[#1e2342] flex flex-col h-screen fixed left-0 top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#1e2342] bg-[#0c1022]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-glow border border-purple-400/40">
            <span className="font-mono font-black text-white text-lg tracking-tighter">PF</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm tracking-wider text-white font-mono">PREPFORGE</span>
              <span className="px-1.5 py-0.2 bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[9px] font-bold rounded">AI</span>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold mt-0.5">
              INTERVIEW INTELLIGENCE
            </p>
          </div>
        </div>
      </div>

      {/* Navigation section */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 custom-scrollbar">
        {/* CANDIDATE OPERATING SYSTEM */}
        <div>
          <div className="px-3 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              CANDIDATE OPERATING SYSTEM
            </span>
          </div>
          <button
            onClick={() => setActiveView('dashboard')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
              activeView === 'dashboard'
                ? 'bg-purple-600 text-white font-semibold shadow-glow border border-purple-400/40'
                : 'text-slate-300 hover:text-white hover:bg-[#141830]'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
        </div>

        {/* PART 1 — RESUME INTELLIGENCE */}
        <div className="space-y-1">
          <div className="px-3 mb-1 flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              RESUME INTELLIGENCE
            </span>
          </div>

          <button
            onClick={() => setActiveView('resume-upload')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeView === 'resume-upload'
                ? 'bg-purple-600 text-white font-semibold shadow-glow border border-purple-400/40'
                : 'text-slate-300 hover:text-white hover:bg-[#141830]'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5 text-slate-400" />
            <span>Resume Upload</span>
          </button>

          <button
            onClick={() => setActiveView('resume-analysis')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeView === 'resume-analysis' || activeView === 'resume-intelligence'
                ? 'bg-purple-600 text-white font-semibold shadow-glow border border-purple-400/40'
                : 'text-slate-300 hover:text-white hover:bg-[#141830]'
            }`}
          >
            <FileSearch className="w-3.5 h-3.5 text-slate-400" />
            <span>Resume Analysis</span>
          </button>

          <button
            onClick={() => setActiveView('resume-role-fit')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeView === 'resume-role-fit'
                ? 'bg-purple-600 text-white font-semibold shadow-glow border border-purple-400/40'
                : 'text-slate-300 hover:text-white hover:bg-[#141830]'
            }`}
          >
            <Network className="w-3.5 h-3.5 text-slate-400" />
            <span>Resume → Role Fit</span>
          </button>

          <button
            onClick={() => setActiveView('projects-claims')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeView === 'projects-claims'
                ? 'bg-purple-600 text-white font-semibold shadow-glow border border-purple-400/40'
                : 'text-slate-300 hover:text-white hover:bg-[#141830]'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-slate-400" />
            <span>Projects & Claims</span>
          </button>

          <button
            onClick={() => setActiveView('project-reframe')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeView === 'project-reframe'
                ? 'bg-purple-600 text-white font-semibold shadow-glow border border-purple-400/40'
                : 'text-slate-300 hover:text-white hover:bg-[#141830]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-slate-400" />
            <span>Project Reframe</span>
          </button>

          <button
            onClick={() => setActiveView('resume-interview')}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeView === 'resume-interview'
                ? 'bg-purple-600 text-white font-semibold shadow-glow border border-purple-400/40'
                : 'text-slate-300 hover:text-white hover:bg-[#141830]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MessageSquareQuote className="w-3.5 h-3.5 text-purple-400" />
              <span>Resume Interview</span>
            </div>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
              USP
            </span>
          </button>
        </div>

        {/* PART 2 — TECHNICAL INTERVIEW */}
        <div className="space-y-1">
          <div className="px-3 mb-1 flex items-center justify-between">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              TECHNICAL INTERVIEW
            </span>
          </div>

          <button
            onClick={() => setActiveView('interview-setup')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeView === 'interview-setup'
                ? 'bg-purple-600 text-white font-semibold shadow-glow border border-purple-400/40'
                : 'text-slate-300 hover:text-white hover:bg-[#141830]'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span>Interview Setup</span>
          </button>

          <button
            onClick={() => setActiveView('adaptive-interview')}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeView === 'adaptive-interview'
                ? 'bg-purple-600 text-white font-semibold shadow-glow border border-purple-400/40'
                : 'text-slate-300 hover:text-white hover:bg-[#141830]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Bot className="w-3.5 h-3.5 text-slate-400" />
              <span>Adaptive Interview</span>
            </div>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40">
              Live
            </span>
          </button>

          <button
            onClick={() => setActiveView('coding-dsa')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeView === 'coding-dsa'
                ? 'bg-purple-600 text-white font-semibold shadow-glow border border-purple-400/40'
                : 'text-slate-300 hover:text-white hover:bg-[#141830]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Coding & DSA</span>
          </button>

          <button
            onClick={() => setActiveView('cs-fundamentals')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeView === 'cs-fundamentals'
                ? 'bg-purple-600 text-white font-semibold shadow-glow border border-purple-400/40'
                : 'text-slate-300 hover:text-white hover:bg-[#141830]'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-slate-400" />
            <span>CS Fundamentals</span>
          </button>

          <button
            onClick={() => setActiveView('system-design')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeView === 'system-design'
                ? 'bg-purple-600 text-white font-semibold shadow-glow border border-purple-400/40'
                : 'text-slate-300 hover:text-white hover:bg-[#141830]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>System Design</span>
          </button>

          <button
            onClick={() => setActiveView('behavioral-situational')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeView === 'behavioral-situational'
                ? 'bg-purple-600 text-white font-semibold shadow-glow border border-purple-400/40'
                : 'text-slate-300 hover:text-white hover:bg-[#141830]'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <span>Behavioral & Situational</span>
          </button>
        </div>

        {/* PROGRESS SECTION */}
        <div className="space-y-1">
          <div className="px-3 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              PROGRESS
            </span>
          </div>

          <button
            onClick={() => setActiveView('skill-intelligence')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeView === 'skill-intelligence'
                ? 'bg-purple-600 text-white font-semibold shadow-glow border border-purple-400/40'
                : 'text-slate-300 hover:text-white hover:bg-[#141830]'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-slate-400" />
            <span>Skill Intelligence</span>
          </button>

          <button
            onClick={() => setActiveView('learning-plan')}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeView === 'learning-plan'
                ? 'bg-purple-600 text-white font-semibold shadow-glow border border-purple-400/40'
                : 'text-slate-300 hover:text-white hover:bg-[#141830]'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
            <span>Learning Plan</span>
          </button>

          <button
            onClick={() => setActiveView('readiness-report')}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeView === 'readiness-report'
                ? 'bg-purple-600 text-white font-semibold shadow-glow border border-purple-400/40'
                : 'text-slate-300 hover:text-white hover:bg-[#141830]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Award className="w-3.5 h-3.5 text-slate-400" />
              <span>Readiness Report</span>
            </div>
            <span className="text-[9px] font-mono font-bold text-emerald-400">76%</span>
          </button>
        </div>
      </div>

      {/* Bottom Settings & Profile */}
      <div className="p-3 border-t border-[#1e2342] bg-[#090c17] space-y-1">
        <button
          onClick={() => setActiveView('settings')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
            activeView === 'settings'
              ? 'bg-purple-600 text-white font-semibold shadow-glow'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#141830]'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>Settings</span>
        </button>

        <button
          onClick={() => setActiveView('my-profile')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
            activeView === 'my-profile'
              ? 'bg-purple-600 text-white font-semibold shadow-glow'
              : 'text-slate-400 hover:text-slate-200 hover:bg-[#141830]'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>My Profile</span>
        </button>
      </div>
    </aside>
  );
};
