'use client';

import React from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { Network, CheckCircle2, AlertTriangle, ArrowRight, Zap, Target, BookOpen } from 'lucide-react';

export const ResumeRoleFitView: React.FC = () => {
  const { target, readiness, setActiveView } = usePrepForge();

  const competencyMatrix = [
    {
      competency: 'Data Structures & Algorithms',
      roleImportance: 'Critical',
      resumeEvidence: 'Strong',
      evidenceDetails: 'Extracted coursework, competitive programming, and LeetCode graph/tree patterns.',
      status: 'Aligned',
    },
    {
      competency: 'OOP & Software Architecture',
      roleImportance: 'High',
      resumeEvidence: 'Strong',
      evidenceDetails: 'Traffix modular service design and clean encapsulation in Python/React.',
      status: 'Aligned',
    },
    {
      competency: 'Operating Systems & Concurrency',
      roleImportance: 'Critical',
      resumeEvidence: 'Weak',
      evidenceDetails: 'Resume mentions multiprocessing, but lacks evidence on mutexes, deadlocks, and IPC.',
      status: 'Gap',
    },
    {
      competency: 'Distributed System Design',
      roleImportance: 'High',
      resumeEvidence: 'Missing / Weak',
      evidenceDetails: 'Projects are single-node deployments; lacks distributed caching, message queues (Kafka), or sharding.',
      status: 'Gap',
    },
    {
      competency: 'DBMS & Query Optimization',
      roleImportance: 'Moderate',
      resumeEvidence: 'Moderate',
      evidenceDetails: 'MongoDB geospatial 2dsphere indexing present; SQL transaction isolation unverified.',
      status: 'Partial',
    },
    {
      competency: 'Python Core & Async IO',
      roleImportance: 'Moderate',
      resumeEvidence: 'Strong',
      evidenceDetails: 'Strong async event loop comprehension in FastAPI gateway.',
      status: 'Aligned',
    },
    {
      competency: 'Computer Vision & Deep Learning (YOLO/LSTM)',
      roleImportance: 'Low / Moderate for SDE',
      resumeEvidence: 'Strong',
      evidenceDetails: 'Heavy resume real estate dedicated to ML models rather than backend engineering scalability.',
      status: 'Over-indexed',
    },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="sm">
              ROLE COMPETENCY BENCHMARK
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Resume → Role Fit Matrix
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Comparing candidate resume evidence against the expected hiring rubric for{' '}
            <strong className="text-purple-300">{target.company} {target.role}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            onClick={() => setActiveView('project-transformation')}
          >
            Reframe Projects for SDE
          </Button>
        </div>
      </div>

      {/* Role Fit Score Hero Card */}
      <div className="bg-gradient-to-r from-[#141838] via-[#10132b] to-[#0c0f24] rounded-2xl p-6 border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-glow">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
              OVERALL ROLE FIT
            </span>
            <Badge variant="emerald" size="sm">
              High Competency Alignment
            </Badge>
          </div>
          <h3 className="text-3xl font-extrabold text-white font-mono">
            {readiness.resumeFitScore}% Match
          </h3>
          <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
            Your technical foundation in Problem Solving and Architecture matches the Microsoft SDE bar well. However, your resume is currently <strong>over-indexed on Machine Learning theory</strong> and lacks explicit evidence for <strong>Operating Systems & High-Scale System Design</strong>.
          </p>
        </div>

        <div className="bg-[#090c1c] rounded-xl p-4 border border-purple-500/40 min-w-[240px] space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Core CS Alignment:</span>
            <span className="font-mono font-bold text-emerald-400">78%</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Engineering Breadth:</span>
            <span className="font-mono font-bold text-purple-300">86%</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Distributed Systems Gap:</span>
            <span className="font-mono font-bold text-rose-400">-18%</span>
          </div>
        </div>
      </div>

      {/* Competency Mapping Table */}
      <Card title="Competency Alignment Matrix" subtitle="Detailed breakdown of role importance vs detected candidate evidence">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                <th className="py-2.5 px-3">Competency</th>
                <th className="py-2.5 px-3">Role Importance</th>
                <th className="py-2.5 px-3">Resume Evidence</th>
                <th className="py-2.5 px-3">Evidence Findings</th>
                <th className="py-2.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {competencyMatrix.map((item) => (
                <tr key={item.competency} className="hover:bg-[#141832] transition-colors">
                  <td className="py-3 px-3 font-semibold text-white">{item.competency}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`font-mono font-semibold ${
                        item.roleImportance === 'Critical'
                          ? 'text-rose-400'
                          : item.roleImportance === 'High'
                          ? 'text-amber-400'
                          : 'text-slate-400'
                      }`}
                    >
                      {item.roleImportance}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`font-semibold ${
                        item.resumeEvidence === 'Strong'
                          ? 'text-emerald-400'
                          : item.resumeEvidence === 'Moderate'
                          ? 'text-indigo-300'
                          : 'text-rose-400'
                      }`}
                    >
                      {item.resumeEvidence}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300 max-w-xs leading-relaxed">{item.evidenceDetails}</td>
                  <td className="py-3 px-3 text-right">
                    <Badge
                      variant={
                        item.status === 'Aligned'
                          ? 'emerald'
                          : item.status === 'Gap'
                          ? 'rose'
                          : item.status === 'Over-indexed'
                          ? 'purple'
                          : 'amber'
                      }
                      size="sm"
                    >
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Strategic Reframing Advice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Missing Competencies" subtitle="High-risk gaps for Microsoft SDE interviewers">
          <div className="space-y-3 text-xs">
            <div className="bg-[#0b0e21] p-3 rounded-xl border border-rose-500/20">
              <span className="font-bold text-rose-400">1. Operating Systems Concurrency</span>
              <p className="text-slate-400 mt-0.5">
                Lack of demonstrated experience in thread synchronization, mutex lock contention, and process isolation.
              </p>
            </div>
            <div className="bg-[#0b0e21] p-3 rounded-xl border border-rose-500/20">
              <span className="font-bold text-rose-400">2. High-Throughput Distributed Caching</span>
              <p className="text-slate-400 mt-0.5">
                Need evidence on Redis LRU caching, token bucket rate limiting, and partitioned storage architecture.
              </p>
            </div>
          </div>
        </Card>

        <Card title="Recommended Resume Transformations" subtitle="Convert ML bullet points into Software Engineering impact">
          <div className="space-y-3 text-xs">
            <div className="bg-[#0b0e21] p-3 rounded-xl border border-purple-500/20">
              <span className="font-bold text-purple-300">Reframe Traffix Project</span>
              <p className="text-slate-400 mt-0.5">
                Shift emphasis from "YOLOv8 & LSTM loss curves" to "FastAPI async event loops, WebSocket broadcasting, and sub-50ms latency SLAs."
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
              onClick={() => setActiveView('project-transformation')}
              className="w-full justify-between"
            >
              <span>Launch Project Transformation Engine</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
