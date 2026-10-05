'use client';

import React, { useState } from 'react';
import { useAuth } from '../../store/AuthContext';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';

export const SignupView: React.FC = () => {
  const { signup } = useAuth();
  const { setActiveView } = usePrepForge();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    signup(fullName || 'Kabilan K A', email || 'candidate@prepforge.ai', password);
    setActiveView('company-role');
  };

  return (
    <div className="min-h-screen bg-[#080a12] text-slate-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#11142c] rounded-3xl p-8 border border-purple-500/30 shadow-glow-lg space-y-6">
        <div className="text-center space-y-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center mx-auto mb-3 shadow-glow">
            <span className="font-mono font-black text-white text-lg">PF</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Create your candidate profile</h2>
          <p className="text-xs text-slate-400">Start your company-specific interview intelligence loop.</p>
        </div>

        {error && (
          <div className="bg-rose-950/40 border border-rose-500/40 rounded-xl p-3 text-xs text-rose-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4 text-xs">
          <div>
            <label className="text-slate-300 font-semibold block mb-1">Full Name</label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Kabilan K A"
                className="w-full bg-[#0b0e21] border border-slate-800 focus:border-purple-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-sans"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kabilan@example.com"
                className="w-full bg-[#0b0e21] border border-slate-800 focus:border-purple-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-sans"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Password</label>
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

          <div>
            <label className="text-slate-300 font-semibold block mb-1">Confirm Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Create Account & Calibrate Target
          </Button>
        </form>

        <div className="text-center text-xs text-slate-400">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => setActiveView('login' as any)}
            className="text-purple-300 font-bold hover:underline ml-1"
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};
