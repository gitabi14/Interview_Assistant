'use client';

import React, { useState } from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  MessageSquareCode,
  Brain,
  Sparkles,
  ArrowRight,
  GitBranch,
  Layers,
  ShieldAlert,
  Play,
} from 'lucide-react';

export const FollowUpIntelligenceView: React.FC = () => {
  const { setActiveView, jumpToQuestion } = usePrepForge();

  const [selectedDepth, setSelectedDepth] = useState<number>(4);

  const depthLevels = [
    {
      level: 1,
      title: 'Level 1: Definition & Purpose',
      question: 'What is YOLOv8 and how does single-stage object detection operate at a high level?',
      interviewerGoal: 'Tests basic theoretical knowledge and jargon awareness.',
      difficulty: 'Entry',
    },
    {
      level: 2,
      title: 'Level 2: Technology Choice',
      question: 'Why did you choose YOLOv8 for vehicle detection in your Traffix project?',
      interviewerGoal: 'Tests if candidate deliberately chose tools or simply followed an online tutorial.',
      difficulty: 'Basic',
    },
    {
      level: 3,
      title: 'Level 3: Trade-off Comparison',
      question: 'Why choose YOLOv8 over Faster R-CNN or SSD for real-time edge processing?',
      interviewerGoal: 'Probes two-stage RPN vs single-stage latency vs accuracy trade-offs.',
      difficulty: 'Intermediate',
    },
    {
      level: 4,
      title: 'Level 4: Implementation & Integration',
      question: 'How did you integrate YOLOv8 with your FastAPI backend and WebSocket broadcast loop?',
      interviewerGoal: 'Evaluates asynchronous worker loops, frame serialization, and queue bottlenecks.',
      difficulty: 'Advanced',
    },
    {
      level: 5,
      title: 'Level 5: Performance Optimization',
      question: 'How would you optimize inference latency if 4 concurrent 1080p RTSP camera streams cause GPU memory exhaustion?',
      interviewerGoal: 'Tests quantization (FP16/INT8), TensorRT/ONNX batching, and PCIe bus bandwidth awareness.',
      difficulty: 'Advanced / Senior',
    },
    {
      level: 6,
      title: 'Level 6: Failure Modes & Edge Cases',
      question: 'What happens to your LSTM traffic forecaster if the camera feed drops to 5 FPS due to network packet loss?',
      interviewerGoal: 'Evaluates resilience, irregular timestamp handling, and graceful degradation.',
      difficulty: 'Staff / Principal',
    },
    {
      level: 7,
      title: 'Level 7: Architectural Redesign at Scale',
      question: 'How would you redesign the entire Traffix system to ingest and analyze 10,000 city intersections in real-time with sub-second SLA?',
      interviewerGoal: 'Comprehensive distributed system design: Kafka partitioning, edge vs cloud inference, distributed Redis cache, and geo-sharded databases.',
      difficulty: 'Principal / Architect',
    },
  ];

  const currentLevelData = depthLevels.find((d) => d.level === selectedDepth) || depthLevels[3];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="sm">
              PREDICTIVE INTERVIEWER PROBE ENGINE
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Answer-to-Follow-Up Intelligence
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Every candidate answer triggers interviewer thought processes. PrepForge predicts and trains across 7 conceptual depth levels.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Play className="w-4 h-4 fill-white" />}
          onClick={() => {
            jumpToQuestion(1);
            setActiveView('adaptive-interview');
          }}
        >
          Practice Level 4 Follow-Up
        </Button>
      </div>

      {/* 7 Conceptual Depth Levels Progression Map */}
      <Card title="The 7 Conceptual Depth Levels" subtitle="Adaptive Question Engine difficulty hierarchy">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {depthLevels.map((d) => {
            const isSelected = selectedDepth === d.level;
            return (
              <button
                key={d.level}
                onClick={() => setSelectedDepth(d.level)}
                className={`p-3 rounded-xl text-left border transition-all flex flex-col justify-between h-28 ${
                  isSelected
                    ? 'bg-purple-600/20 border-purple-500 shadow-glow'
                    : 'bg-[#0c0f24] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-purple-300">L{d.level}</span>
                  <Badge variant={d.level >= 6 ? 'rose' : d.level >= 4 ? 'amber' : 'emerald'} size="sm">
                    {d.difficulty}
                  </Badge>
                </div>
                <p className="text-[11px] font-bold text-white leading-tight line-clamp-2">
                  {d.title.split(': ')[1]}
                </p>
                <span className="text-[9px] text-slate-400">
                  {isSelected ? '● Active' : 'Click to inspect'}
                </span>
              </button>
            );
          })}
        </div>
      </Card>

      {/* Selected Depth Deep Dive */}
      <div className="bg-gradient-to-br from-[#161a38] via-[#12152e] to-[#0d1024] rounded-2xl p-6 border border-purple-500/40 shadow-glow space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300 font-mono">
              DEPTH LEVEL {currentLevelData.level} / 7
            </span>
            <Badge variant="purple" size="sm">
              Difficulty: {currentLevelData.difficulty}
            </Badge>
          </div>

          <Button
            variant="outline"
            size="sm"
            icon={<Play className="w-3.5 h-3.5" />}
            onClick={() => {
              jumpToQuestion(1);
              setActiveView('adaptive-interview');
            }}
          >
            Launch in Adaptive Interview
          </Button>
        </div>

        <h3 className="text-xl font-bold text-white leading-relaxed">
          "{currentLevelData.question}"
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-800">
          <div className="bg-[#0b0e21] p-4 rounded-xl border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-purple-300 flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5" /> What the Interviewer is Testing:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {currentLevelData.interviewerGoal}
            </p>
          </div>

          <div className="bg-[#0b0e21] p-4 rounded-xl border border-emerald-500/20 space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Ideal Candidate Defense:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              State empirical benchmarks, outline hardware constraints, explain why alternative architectures failed, and present proactive trade-offs before the interviewer asks.
            </p>
          </div>
        </div>
      </div>

      {/* Adaptive Rules Summary */}
      <Card title="Adaptive Question Selection Rules" subtitle="The algorithmic logic governing question depth">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="bg-[#0b0e21] p-3 rounded-xl border border-slate-800">
            <span className="font-bold text-emerald-400 block mb-1">IF Candidate Answer is Strong:</span>
            <p className="text-slate-400">Increase difficulty to next depth level (+1) and probe architectural limits.</p>
          </div>
          <div className="bg-[#0b0e21] p-3 rounded-xl border border-slate-800">
            <span className="font-bold text-rose-400 block mb-1">IF Candidate Answer is Weak:</span>
            <p className="text-slate-400">Probe the identified weakness with a targeted conceptual drill.</p>
          </div>
          <div className="bg-[#0b0e21] p-3 rounded-xl border border-slate-800">
            <span className="font-bold text-amber-400 block mb-1">IF Candidate is Unknown:</span>
            <p className="text-slate-400">Provide structured teaching hint → example → easier question → retest.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
