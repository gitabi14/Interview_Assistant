'use client';

import React, { useState } from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Code2,
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  Zap,
  Terminal,
  RotateCcw,
  ArrowRight,
} from 'lucide-react';

export const CodingChallengeView: React.FC = () => {
  const {
    codingChallenge,
    userCode,
    setUserCode,
    selectedCodeLanguage,
    setSelectedCodeLanguage,
    codingEvaluationResult,
    evaluateCodeSubmission,
    setActiveView,
  } = usePrepForge();

  const [activeTab, setActiveTab] = useState<'problem' | 'testcases' | 'solution'>('problem');

  const optimalPythonSolution = `def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []
`;

  const bruteForcePythonSolution = `def two_sum(nums: list[int], target: int) -> list[int]:
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == target:
                return [i, j]
    return []
`;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="sm">
              TECHNICAL CODING INTELLIGENCE
            </Badge>
            <Badge variant="indigo" size="sm">
              Judge0 Execution Engine
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Live Coding & Algorithmic Complexity Challenge
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Evaluate code correctness, time & space complexity, edge cases, and algorithmic optimality.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="md"
            icon={<Play className="w-4 h-4 fill-white" />}
            onClick={evaluateCodeSubmission}
          >
            Run & Evaluate Complexity
          </Button>
        </div>
      </div>

      {/* Main Split: Problem Description vs Code Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Problem & Requirements (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h3 className="text-base font-bold text-white">{codingChallenge.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="emerald" size="sm">
                      {codingChallenge.difficulty}
                    </Badge>
                    <span className="text-xs text-slate-400 font-mono">{codingChallenge.category}</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-300 space-y-3 leading-relaxed">
                <p>
                  Given an array of integers <code className="text-purple-300 font-mono bg-purple-950/60 px-1 py-0.5 rounded">nums</code> and an integer <code className="text-purple-300 font-mono bg-purple-950/60 px-1 py-0.5 rounded">target</code>, return <em>indices of the two numbers such that they add up to target</em>.
                </p>
                <p>
                  You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.
                </p>
              </div>

              {/* Target Interview Standards */}
              <div className="bg-[#0b0e21] rounded-xl p-3.5 border border-purple-500/20 space-y-1.5 text-xs">
                <span className="font-bold text-purple-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Microsoft SDE Rubric:
                </span>
                <p className="text-slate-300">
                  • <strong>Optimal:</strong> $O(n)$ time using a Hash Map single-pass.
                </p>
                <p className="text-slate-400">
                  • <strong>Suboptimal:</strong> $O(n^2)$ brute-force loops will trigger immediate optimization challenge.
                </p>
              </div>

              {/* Test Cases Preview */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Sample Test Cases:
                </span>
                {codingChallenge.testCases.slice(0, 2).map((tc, idx) => (
                  <div key={idx} className="bg-[#0b0e21] p-2.5 rounded-lg border border-slate-800 text-[11px] font-mono">
                    <div className="text-slate-400">Input: <span className="text-slate-200">{tc.input}</span></div>
                    <div className="text-slate-400">Expected: <span className="text-emerald-400">{tc.expectedOutput}</span></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Demo Preloaders */}
            <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
              <span className="text-[10px] text-slate-400">Load Template:</span>
              <button
                onClick={() => setUserCode(bruteForcePythonSolution)}
                className="text-[10px] bg-[#141832] hover:bg-[#1a2044] text-rose-300 px-2 py-1 rounded border border-rose-500/30 font-mono"
              >
                Brute Force O(n²)
              </button>
              <button
                onClick={() => setUserCode(optimalPythonSolution)}
                className="text-[10px] bg-[#141832] hover:bg-[#1a2044] text-emerald-300 px-2 py-1 rounded border border-emerald-500/30 font-mono"
              >
                Optimal O(n) HashMap
              </button>
            </div>
          </Card>
        </div>

        {/* Right Column: Code Editor & Execution Results (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Editor Container */}
          <div className="bg-[#12152b] rounded-2xl border border-[#21264b] overflow-hidden shadow-glow">
            {/* Editor Toolbar */}
            <div className="bg-[#0b0e21] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-white font-mono">solution.py</span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedCodeLanguage}
                  onChange={(e) => setSelectedCodeLanguage(e.target.value)}
                  className="bg-[#141830] text-xs text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1 font-mono focus:outline-none focus:border-purple-500"
                >
                  <option value="python">Python 3.11</option>
                  <option value="javascript">JavaScript (Node 20)</option>
                  <option value="cpp">C++ 20</option>
                  <option value="java">Java 17</option>
                </select>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setUserCode(optimalPythonSolution)}
                  className="p-1 h-7"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                </Button>
              </div>
            </div>

            {/* Code Textarea with line styling */}
            <div className="p-4 bg-[#080a14]">
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                rows={12}
                spellCheck={false}
                className="w-full bg-transparent text-emerald-300 font-mono text-xs leading-relaxed focus:outline-none resize-none"
              />
            </div>

            {/* Bottom Execute Action */}
            <div className="bg-[#0b0e21] px-4 py-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">
                Judge0 Sandbox • Submissions analyzed for Time & Space Complexity
              </span>

              <Button
                variant="primary"
                size="sm"
                icon={<Play className="w-4 h-4 fill-white" />}
                onClick={evaluateCodeSubmission}
              >
                Run Code
              </Button>
            </div>
          </div>

          {/* Execution & Complexity Evaluation Result Card */}
          {codingEvaluationResult && (
            <div
              className={`rounded-2xl p-5 border shadow-glow transition-all ${
                codingEvaluationResult.isOptimal
                  ? 'bg-emerald-950/20 border-emerald-500/40'
                  : 'bg-amber-950/20 border-amber-500/40'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {codingEvaluationResult.isOptimal ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Zap className="w-5 h-5 text-amber-400" />
                  )}
                  <h4 className="text-sm font-bold text-white">
                    {codingEvaluationResult.isOptimal
                      ? 'Optimal Algorithmic Solution Accepted'
                      : 'Suboptimal Complexity Detected — Optimization Challenge'}
                  </h4>
                </div>

                <Badge variant={codingEvaluationResult.isOptimal ? 'emerald' : 'amber'} size="sm">
                  {codingEvaluationResult.passedTestCases} / {codingEvaluationResult.totalTestCases} Tests Passed
                </Badge>
              </div>

              {/* Complexity Metrics */}
              <div className="grid grid-cols-2 gap-3 bg-[#0b0e21] rounded-xl p-3 border border-slate-800 mb-3 font-mono text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Time Complexity:</span>
                  <span className={codingEvaluationResult.isOptimal ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                    {codingEvaluationResult.timeComplexity}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Space Complexity:</span>
                  <span className="text-purple-300 font-bold">{codingEvaluationResult.spaceComplexity}</span>
                </div>
              </div>

              {/* Frank Feedback */}
              <p className="text-xs text-slate-200 mb-4 leading-relaxed">
                {codingEvaluationResult.feedback}
              </p>

              {/* Test Cases Table */}
              <div className="space-y-1.5 text-xs font-mono">
                {codingEvaluationResult.testResults.map((tr, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#0b0e21] border border-slate-800/80"
                  >
                    <span className="text-slate-300 truncate max-w-[240px]">{tr.input}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Exp: {tr.expected}</span>
                      {tr.passed ? (
                        <span className="text-emerald-400 font-bold">✓ PASS</span>
                      ) : (
                        <span className="text-rose-400 font-bold">✕ FAIL</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
