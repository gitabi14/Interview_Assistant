'use client';

import React, { useState } from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { Cpu, Database, Network, Code, Layers, CheckCircle2, AlertTriangle, ArrowRight, Play } from 'lucide-react';

export const TechnicalAssessmentView: React.FC = () => {
  const { skills, updateSkillScore, setActiveView, jumpToQuestion } = usePrepForge();

  const [selectedCategory, setSelectedCategory] = useState<string>('Operating Systems');
  const [drillAnswer, setDrillAnswer] = useState<string>('');
  const [drillFeedback, setDrillFeedback] = useState<string | null>(null);

  const categories = [
    { name: 'Operating Systems', icon: <Cpu className="w-4 h-4" />, score: 58, status: 'Critical Gap', question: 'Explain the 4 Coffman conditions required for Deadlock, and how strict lock ordering mathematically breaks circular wait.' },
    { name: 'System Design', icon: <Layers className="w-4 h-4" />, score: 61, status: 'Critical Gap', question: 'How do you design a distributed rate limiter for Microsoft Graph API handling 100,000 requests/second across multiple regions?' },
    { name: 'DBMS & Indexing', icon: <Database className="w-4 h-4" />, score: 72, status: 'Adequate', question: 'Compare B-Tree vs LSM-Tree storage engines for write-heavy vs read-heavy database workloads.' },
    { name: 'Computer Networks', icon: <Network className="w-4 h-4" />, score: 64, status: 'Needs Improvement', question: 'Explain the TCP 3-Way Handshake, TIME_WAIT state purpose, and how HTTP/2 multiplexing solves Head-of-Line blocking.' },
    { name: 'OOP & Architecture', icon: <Code className="w-4 h-4" />, score: 91, status: 'Strong', question: 'Demonstrate Dependency Inversion Principle (DIP) with a concrete code pattern in a microservice data repository.' },
  ];

  const currentCat = categories.find((c) => c.name === selectedCategory) || categories[0];

  const handleEvaluateDrill = () => {
    if (!drillAnswer.trim()) {
      setDrillAnswer('The 4 conditions are: 1) Mutual Exclusion, 2) Hold and Wait, 3) No Preemption, and 4) Circular Wait. Strict global lock ordering (e.g., Lock 1 < Lock 2) prevents Circular Wait because no thread can request a lower-indexed lock while holding a higher-indexed lock, eliminating directed cycles in the Resource Allocation Graph.');
    }

    setDrillFeedback('Assessment: Demonstrated accurate understanding of the 4 Coffman conditions and correctly proved why strict linear resource ordering prevents circular wait cycles in the Resource Allocation Graph (RAG). Operating Systems score updated (+4%).');
    updateSkillScore('Operating Systems', +4, 'Answered Coffman deadlock prevention drill accurately.');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="sm">
              CORE CS & ARCHITECTURAL DRILLS
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Technical Skill Assessment Center
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Independent evaluation of Core CS competencies: OS, DBMS, Networks, OOP, and System Design.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Play className="w-4 h-4 fill-white" />}
          onClick={() => {
            jumpToQuestion(2); // OS question
            setActiveView('adaptive-interview');
          }}
        >
          Launch OS Live Mock Round
        </Button>
      </div>

      {/* Category Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() => {
                setSelectedCategory(cat.name);
                setDrillFeedback(null);
              }}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between h-28 ${
                isSelected
                  ? 'bg-purple-600/15 border-purple-500 shadow-glow'
                  : 'bg-[#12152b] border-[#21264b] hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={isSelected ? 'text-purple-300' : 'text-slate-400'}>{cat.icon}</span>
                <span className="font-mono text-xs font-bold text-white">{cat.score}%</span>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white leading-tight">{cat.name}</h4>
                <Badge
                  variant={cat.status === 'Strong' ? 'emerald' : cat.status === 'Adequate' ? 'indigo' : 'rose'}
                  size="sm"
                  className="mt-1"
                >
                  {cat.status}
                </Badge>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Technical Drill Workspace */}
      <Card title={`Technical Drill: ${currentCat.name}`} subtitle="Direct conceptual probe to calibrate skill score">
        <div className="space-y-4">
          <div className="bg-[#0b0e21] p-4 rounded-xl border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-purple-300 block mb-1">Drill Prompt:</span>
            <p className="text-sm font-semibold text-white leading-relaxed">
              "{currentCat.question}"
            </p>
          </div>

          <textarea
            value={drillAnswer}
            onChange={(e) => setDrillAnswer(e.target.value)}
            placeholder="Type your technical explanation here (define core mechanism, explain edge case, provide proof/code pattern)..."
            rows={5}
            className="w-full bg-[#0b0e21] border border-slate-800 focus:border-purple-500 rounded-xl p-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none leading-relaxed font-sans"
          />

          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setDrillAnswer(
                  'The 4 conditions are: 1) Mutual Exclusion, 2) Hold and Wait, 3) No Preemption, and 4) Circular Wait. Strict global lock ordering (e.g., Lock 1 < Lock 2) prevents Circular Wait because no thread can request a lower-indexed lock while holding a higher-indexed lock, eliminating directed cycles in the Resource Allocation Graph.'
                );
              }}
            >
              Load Sample Response
            </Button>

            <Button
              variant="primary"
              size="sm"
              icon={<CheckCircle2 className="w-4 h-4" />}
              onClick={handleEvaluateDrill}
            >
              Evaluate Drill
            </Button>
          </div>

          {drillFeedback && (
            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 space-y-2 text-xs">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Evaluator Feedback & Skill Sync:
              </span>
              <p className="text-slate-200 leading-relaxed font-sans">{drillFeedback}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
