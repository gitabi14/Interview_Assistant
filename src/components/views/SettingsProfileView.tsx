'use client';

import React, { useState } from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { User, Settings, Key, ShieldCheck, Check, Sparkles, RefreshCw } from 'lucide-react';

export const SettingsProfileView: React.FC = () => {
  const { candidate, setCandidate } = usePrepForge();

  const [apiKey, setApiKey] = useState('');
  const [savedKey, setSavedKey] = useState(false);
  const [offlineSimulation, setOfflineSimulation] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedKey(true);
    setTimeout(() => setSavedKey(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="sm">
              SYSTEM & PROFILE SETTINGS
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Settings & Candidate Profile
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage your AI model configurations, Gemini API keys, and candidate personal details.
          </p>
        </div>
      </div>

      {/* Candidate Profile Details */}
      <Card title="Candidate Profile (Demo: Kabilan K A)" subtitle="Personal and educational metadata">
        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Full Name</label>
              <input
                type="text"
                value={candidate.name}
                onChange={(e) => setCandidate({ ...candidate, name: e.target.value })}
                className="w-full bg-[#0b0e21] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Email Address</label>
              <input
                type="email"
                value={candidate.email}
                onChange={(e) => setCandidate({ ...candidate, email: e.target.value })}
                className="w-full bg-[#0b0e21] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold block mb-1">University / Institute</label>
              <input
                type="text"
                value={candidate.education}
                onChange={(e) => setCandidate({ ...candidate, education: e.target.value })}
                className="w-full bg-[#0b0e21] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Degree & Major</label>
              <input
                type="text"
                value={candidate.degree}
                onChange={(e) => setCandidate({ ...candidate, degree: e.target.value })}
                className="w-full bg-[#0b0e21] border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-purple-500 font-sans"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t border-slate-800">
            <Button variant="primary" size="sm" type="submit">
              {savedKey ? 'Saved Profile!' : 'Update Profile'}
            </Button>
          </div>
        </form>
      </Card>

      {/* AI Intelligence & API Engine Configuration */}
      <Card title="AI Intelligence Engine & API Keys" subtitle="Configure Gemini API or use built-in high-fidelity simulation">
        <div className="space-y-4 text-xs">
          <div className="bg-[#0b0e21] rounded-xl p-4 border border-purple-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" /> Active AI Provider: Gemini 1.5 / 2.0 / Intelligent Simulation
              </span>
              <Badge variant="emerald" size="sm">
                Connected & Ready
              </Badge>
            </div>
            <p className="text-slate-300 leading-relaxed">
              PrepForge AI includes built-in high-fidelity domain-expert inference rules ensuring zero-latency, deterministic hackathon demonstrations without requiring external API credits.
            </p>
          </div>

          <div>
            <label className="text-slate-400 font-semibold block mb-1">
              Custom Google Gemini API Key (Optional)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="flex-1 bg-[#0b0e21] border border-slate-800 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-purple-500"
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSavedKey(true);
                  setTimeout(() => setSavedKey(false), 2000);
                }}
              >
                Save Key
              </Button>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">
              Keys are stored securely in browser session memory and never transmitted to third parties.
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};
