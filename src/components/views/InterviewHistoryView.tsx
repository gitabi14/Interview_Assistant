'use client';

import React from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { History, Calendar, Award, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';

export const InterviewHistoryView: React.FC = () => {
  const { interviewHistory, setActiveView } = usePrepForge();

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="sm">
              SESSION LOGS & TRAJECTORY
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Interview History</h2>
          <p className="text-xs text-slate-400 mt-1">
            Chronological audit of previous technical rounds, question depths, identified weaknesses, and score trajectories.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setActiveView('adaptive-interview')}
        >
          Start New Technical Round
        </Button>
      </div>

      {/* History Cards */}
      <div className="space-y-4">
        {interviewHistory.map((item) => (
          <div
            key={item.id}
            className="bg-[#12152b] rounded-2xl p-6 border border-[#21264b] hover:border-purple-500/40 transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-white">{item.company}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-xs text-purple-300 font-medium">{item.role}</span>
                  <Badge variant="purple" size="sm">
                    {item.round}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{item.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-2xl font-bold font-mono text-purple-300">{item.score}%</span>
                  <span className="text-[10px] text-slate-400 block font-mono">Session Score</span>
                </div>
              </div>
            </div>

            {/* Questions & Max Depth */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="bg-[#0b0e21] p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Questions Answered:</span>
                <span className="text-white font-bold">{item.questionsAnswered}</span>
              </div>
              <div className="bg-[#0b0e21] p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[10px]">Max Probe Depth:</span>
                <span className="text-purple-300 font-bold">Level {item.maxDepthReached} / 7</span>
              </div>
              <div className="bg-[#0b0e21] p-2.5 rounded-lg border border-slate-800 col-span-2">
                <span className="text-slate-400 block text-[10px]">Critical Topics Covered:</span>
                <span className="text-slate-200 truncate block">{item.criticalTopics.join(', ')}</span>
              </div>
            </div>

            {/* Strengths & Weaknesses Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-emerald-950/20 p-3 rounded-xl border border-emerald-500/20">
                <span className="font-bold text-emerald-400 block mb-1">Demonstrated Strengths:</span>
                <p className="text-slate-300">{item.strengths.join(' • ')}</p>
              </div>

              <div className="bg-rose-950/20 p-3 rounded-xl border border-rose-500/20">
                <span className="font-bold text-rose-400 block mb-1">Identified Weaknesses:</span>
                <p className="text-slate-300">{item.weaknesses.join(' • ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
