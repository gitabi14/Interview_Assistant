'use client';

import React, { useState } from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { useAuth } from '../../store/AuthContext';
import { Building2, ChevronRight, Sparkles, User, Settings, Activity, LogOut } from 'lucide-react';
import { Badge } from '../ui/Badge';

export const Topbar: React.FC = () => {
  const { candidate, target, readiness, setActiveView, isCoachOpen, setIsCoachOpen } = usePrepForge();
  const { logout, apiKeyConfigured } = useAuth();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <header className="h-16 bg-[#0a0d1a]/95 backdrop-blur-md border-b border-[#1e2342] px-6 flex items-center justify-between sticky top-0 z-20 select-none">
      {/* Left: Breadcrumbs & Target Company */}
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-bold text-white tracking-wide">
          Candidate Intelligence Dashboard
        </h1>
        <ChevronRight className="w-4 h-4 text-slate-500" />
        <div
          onClick={() => setActiveView('interview-setup')}
          className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#141830] border border-purple-500/20 hover:border-purple-500/50 cursor-pointer transition-all"
        >
          <Building2 className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-xs font-semibold text-purple-200">
            {target.company} — {target.role}
          </span>
          <Badge variant="purple" size="sm">
            {target.companyType}
          </Badge>
        </div>
      </div>

      {/* Right: AI Coach trigger, Readiness, AI status, Candidate profile */}
      <div className="flex items-center gap-3.5">
        {/* Interactive AI Career Coach Launch Button */}
        <button
          onClick={() => setIsCoachOpen(!isCoachOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-purple-600/30 to-indigo-600/30 border border-purple-500/50 hover:border-purple-400 text-purple-200 hover:text-white transition-all shadow-glow cursor-pointer group"
          title="Open AI Career & Interview Coach"
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-400 group-hover:rotate-12 transition-transform" />
          <span className="text-xs font-bold">Talk to AI Coach</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </button>

        {/* Global AI Status Indicator */}
        <button
          onClick={() => setActiveView('system-status')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold font-mono border transition-all ${
            apiKeyConfigured
              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40 hover:bg-emerald-950/60 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
              : 'bg-amber-950/40 text-amber-300 border-amber-500/40 hover:bg-amber-950/60'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${apiKeyConfigured ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
          <span>{apiKeyConfigured ? 'LIVE AI' : 'DEMO MODE'}</span>
        </button>

        {/* Readiness Pill */}
        <button
          onClick={() => setActiveView('readiness-report')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 hover:border-purple-500/60 transition-all cursor-pointer"
        >
          <span className="text-xs font-semibold text-slate-300">Readiness:</span>
          <span className="text-xs font-mono font-bold text-emerald-400">{readiness.overallScore}% Ready</span>
        </button>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-[#141830] border border-[#23294f] hover:border-purple-500/40 transition-all cursor-pointer"
          >
            <img
              src={candidate.avatarUrl}
              alt={candidate.name}
              className="w-7 h-7 rounded-lg object-cover ring-1 ring-purple-500/40"
            />
            <div className="text-left hidden sm:block">
              <p className="text-xs font-semibold text-white leading-tight">{candidate.name}</p>
              <p className="text-[10px] text-slate-400 leading-tight">Candidate</p>
            </div>
          </button>

          {/* Profile Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-[#12152d] border border-purple-500/40 rounded-2xl p-2 shadow-glow-lg z-50 text-xs space-y-1">
              <div className="px-3 py-2 border-b border-slate-800 text-slate-300">
                <p className="font-bold text-white truncate">{candidate.name}</p>
                <p className="text-[10px] text-slate-400 truncate">{candidate.email}</p>
              </div>

              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  setActiveView('my-profile');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#1a1f40] transition-colors text-left"
              >
                <User className="w-3.5 h-3.5 text-purple-400" />
                <span>My Profile</span>
              </button>

              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  setActiveView('system-status');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#1a1f40] transition-colors text-left"
              >
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>System Status</span>
              </button>

              <button
                onClick={() => {
                  setProfileDropdownOpen(false);
                  setActiveView('settings');
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-[#1a1f40] transition-colors text-left"
              >
                <Settings className="w-3.5 h-3.5 text-cyan-400" />
                <span>API & Settings</span>
              </button>

              <div className="border-t border-slate-800 pt-1">
                <button
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    logout();
                    setActiveView('login');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-300 hover:text-rose-200 hover:bg-rose-950/30 transition-colors text-left"
                >
                  <LogOut className="w-3.5 h-3.5 text-rose-400" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
