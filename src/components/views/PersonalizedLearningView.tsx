'use client';

import React, { useState } from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { GraduationCap, CheckCircle2, Circle, Clock, BookOpen, Sparkles, ArrowRight, Play } from 'lucide-react';

export const PersonalizedLearningView: React.FC = () => {
  const { learningPlan, toggleLearningDayComplete, target, setActiveView, jumpToQuestion } = usePrepForge();

  const [activeDay, setActiveDay] = useState<number>(2); // Day 2 active by default

  const currentModule = learningPlan.find((m) => m.day === activeDay) || learningPlan[0];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="sm">
              ADAPTIVE CURRICULUM ENGINE
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Personalized 5-Day Preparation Plan
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Targeted curriculum generated from your demonstrated gaps: Operating Systems, Distributed Caching & Behavioral STAR.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Play className="w-4 h-4 fill-white" />}
          onClick={() => {
            jumpToQuestion(2);
            setActiveView('adaptive-interview');
          }}
        >
          Practice Day 2 OS Questions
        </Button>
      </div>

      {/* 5-Day Navigation Timeline Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {learningPlan.map((mod) => {
          const isSelected = activeDay === mod.day;
          return (
            <div
              key={mod.day}
              onClick={() => setActiveDay(mod.day)}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between h-32 ${
                isSelected
                  ? 'bg-purple-600/20 border-purple-500 shadow-glow'
                  : 'bg-[#12152b] border-[#21264b] hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-300">DAY {mod.day}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLearningDayComplete(mod.day);
                  }}
                  className="p-0.5"
                >
                  {mod.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-400 hover:text-purple-400" />
                  )}
                </button>
              </div>

              <div>
                <h4 className="text-xs font-bold text-white line-clamp-2 leading-tight">{mod.topic}</h4>
                <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400">
                  <Clock className="w-3 h-3 text-purple-400" />
                  <span>{mod.estimatedMinutes} mins</span>
                </div>
              </div>

              <span className="text-[9px] font-mono text-rose-300 uppercase truncate">
                {mod.targetGap}
              </span>
            </div>
          );
        })}
      </div>

      {/* Active Day Deep Dive Workspace */}
      <div className="bg-gradient-to-br from-[#161a38] via-[#12152e] to-[#0d1024] rounded-2xl p-6 border border-purple-500/40 shadow-glow space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-purple-300">
                DAY {currentModule.day} CURRICULUM
              </span>
              <Badge variant={currentModule.completed ? 'emerald' : 'purple'} size="sm">
                {currentModule.completed ? 'Completed' : 'In Progress'}
              </Badge>
            </div>
            <h3 className="text-xl font-bold text-white">{currentModule.topic}</h3>
          </div>

          <Button
            variant={currentModule.completed ? 'secondary' : 'success'}
            size="sm"
            icon={<CheckCircle2 className="w-4 h-4" />}
            onClick={() => toggleLearningDayComplete(currentModule.day)}
          >
            {currentModule.completed ? 'Mark Incomplete' : 'Mark Day Completed'}
          </Button>
        </div>

        {/* Subtopics Checklist */}
        <div>
          <span className="text-[10px] uppercase font-bold text-purple-300 block mb-2">
            Key Syllabus Modules for {target.company} SDE Bar:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {currentModule.subtopics.map((sub, i) => (
              <div key={i} className="bg-[#0b0e21] p-2.5 rounded-lg border border-slate-800 flex items-center gap-2 text-slate-200">
                <span className="text-purple-400 font-bold">•</span>
                <span>{sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Core Concepts Explanations */}
        <div className="space-y-3">
          <span className="text-[10px] uppercase font-bold text-slate-400 block">
            Core Conceptual Explanations:
          </span>
          {currentModule.coreConcepts.map((concept, idx) => (
            <div key={idx} className="bg-[#0b0e21] rounded-xl p-4 border border-slate-800 space-y-1">
              <h4 className="text-xs font-bold text-white">{concept.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{concept.explanation}</p>
            </div>
          ))}
        </div>

        {/* Practice Questions & Drill */}
        <div className="bg-[#0c0f24] rounded-xl p-4 border border-purple-500/20 space-y-3">
          <span className="text-[10px] uppercase font-bold text-emerald-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Recommended Mock Drill Questions:
          </span>
          <ul className="space-y-1.5 text-xs text-slate-300 list-disc pl-5">
            {currentModule.practiceQuestions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
