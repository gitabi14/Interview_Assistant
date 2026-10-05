'use client';

import React, { useState } from 'react';
import { useAuth } from '../../store/AuthContext';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Bot,
  Brain,
  Award,
  Key,
  Mail,
  Lock,
  CheckCircle2,
} from 'lucide-react';

export const LoginView: React.FC = () => {
  const { login } = useAuth();
  const { setActiveView } = usePrepForge();

  const [email, setEmail] = useState('demo@prepforge.ai');
  const [password, setPassword] = useState('demo123');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        setActiveView('dashboard');
      } else {
        setError('Invalid credentials. Use demo@prepforge.ai / demo123');
      }
      setIsSubmitting(false);
    }, 400);
  };

  const handleDemoFill = () => {
    setEmail('demo@prepforge.ai');
    setPassword('demo123');
  };

  return (
    <div className="min-h-screen bg-[#080a12] text-slate-100 flex items-center justify-center p-4 sm:p-8">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Side: Brand Vision & Intelligence Flow (7 cols) */}
        <div className="lg:col-span-7 space-y-6 pr-0 lg:pr-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-glow border border-purple-400/40">
              <span className="font-mono font-black text-white text-xl tracking-tighter">PF</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-wider text-white font-mono">PREPFORGE</span>
                <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/40 text-purple-300 text-[10px] font-bold rounded">
                  AI 2.0
                </span>
              </div>
              <p className="text-[11px] uppercase tracking-widest text-purple-300 font-semibold mt-0.5">
                INTERVIEW INTELLIGENCE
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Prepare for the interview you{' '}
              <span className="text-gradient-purple">actually want.</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              Understand your resume. Defend your claims. Practice intelligently with predictive interviewer probing. Know exactly where you stand before interview day.
            </p>
          </div>

          {/* Connected Intelligence Flow Visual */}
          <div className="bg-[#0f132a]/90 rounded-2xl p-5 border border-purple-500/30 shadow-glow space-y-3 max-w-xl">
            <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300 block font-mono">
              THE CLOSED-LOOP INTELLIGENCE PIPELINE
            </span>

            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              <div className="bg-[#151a3a] p-2.5 rounded-xl border border-slate-800">
                <Cpu className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-white block">Resume Claim</span>
                <span className="text-[9px] text-slate-400">Hypothesis</span>
              </div>

              <div className="bg-[#151a3a] p-2.5 rounded-xl border border-purple-500/40">
                <Bot className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-white block">Adaptive Probe</span>
                <span className="text-[9px] text-purple-300">Level 1–7</span>
              </div>

              <div className="bg-[#151a3a] p-2.5 rounded-xl border border-slate-800">
                <Brain className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-white block">Skill Sync</span>
                <span className="text-[9px] text-slate-400">Weighted Delta</span>
              </div>

              <div className="bg-[#151a3a] p-2.5 rounded-xl border border-emerald-500/40">
                <Award className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-white block">Readiness</span>
                <span className="text-[9px] text-emerald-400">Company Bar</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Card (5 cols) */}
        <div className="lg:col-span-5">
          <div className="bg-[#11142c] rounded-3xl p-7 border border-purple-500/30 shadow-glow-lg space-y-6">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">Welcome back</h2>
                <Badge variant="purple" size="sm">
                  Hackathon Ready
                </Badge>
              </div>
              <p className="text-xs text-slate-400">Sign in to continue your preparation.</p>
            </div>

            {/* Quick Demo Credentials Autofill Banner */}
            <div
              onClick={handleDemoFill}
              className="bg-purple-950/40 hover:bg-purple-950/70 border border-purple-500/40 rounded-xl p-3 cursor-pointer transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Key className="w-4 h-4 text-purple-300 shrink-0" />
                <div>
                  <span className="text-[11px] font-bold text-white block">Demo Credentials</span>
                  <span className="text-[10px] text-purple-300 font-mono">
                    demo@prepforge.ai • demo123
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-purple-400 font-bold underline">1-Click Fill</span>
            </div>

            {error && (
              <div className="bg-rose-950/40 border border-rose-500/40 rounded-xl p-3 text-xs text-rose-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="candidate@example.com"
                    className="w-full bg-[#0b0e21] border border-slate-800 focus:border-purple-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-sans"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">Password</label>
                  <a href="#" className="text-[11px] text-purple-400 hover:underline">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0b0e21] border border-slate-800 focus:border-purple-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-sans"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full"
                loading={isSubmitting}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Sign In to Candidate Dashboard
              </Button>
            </form>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-3 text-[10px] uppercase font-mono text-slate-400">
                Or continue with
              </span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            <Button
              type="button"
              variant="secondary"
              size="md"
              className="w-full text-xs"
              onClick={() => {
                login('google.candidate@prepforge.ai');
                setActiveView('dashboard');
              }}
            >
              Continue with Google Account
            </Button>

            <div className="text-center text-xs text-slate-400 pt-2">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setActiveView('signup' as any)}
                className="text-purple-300 font-bold hover:underline ml-1"
              >
                Create an account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
