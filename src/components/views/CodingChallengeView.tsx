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
  Building2,
  Layers,
  ChevronDown,
  Cpu,
  ShieldCheck,
  AlertTriangle,
  Flame,
  HelpCircle,
  Check,
  Send,
} from 'lucide-react';

export const CodingChallengeView: React.FC = () => {
  const {
    codingChallenges,
    codingChallenge,
    selectCodingChallenge,
    suggestCompanyCodingChallenge,
    userCode,
    setUserCode,
    selectedCodeLanguage,
    setSelectedCodeLanguage,
    isExecutingCode,
    codingEvaluationResult,
    evaluateCodeSubmission,
    runCustomCode,
    target,
  } = usePrepForge();

  const [activeTab, setActiveTab] = useState<'problem' | 'rubric' | 'testcases' | 'custom'>('problem');
  const [customInputText, setCustomInputText] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [showSolutionAccordion, setShowSolutionAccordion] = useState(false);

  // Filter challenges
  const filteredChallenges = (codingChallenges || []).filter((c) => {
    if (difficultyFilter !== 'all' && c.difficulty.toLowerCase() !== difficultyFilter.toLowerCase()) {
      return false;
    }
    return true;
  });

  // Reset code to starter template
  const handleResetCode = () => {
    if (codingChallenge?.starterCode?.[selectedCodeLanguage]) {
      setUserCode(codingChallenge.starterCode[selectedCodeLanguage]);
    }
  };

  const handleCustomRun = async () => {
    if (!customInputText.trim() || isExecutingCode) return;
    await runCustomCode(customInputText.trim());
  };

  // Primary company tag for current challenge
  const primaryComp = codingChallenge.primaryCompany || target.company;
  const compTag = codingChallenge.companies?.find(
    (c) => c.name.toLowerCase() === target.company.toLowerCase()
  ) || codingChallenge.companies?.[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Target Company Banner & Quick AI Suggestion */}
      <div className="bg-gradient-to-r from-[#171b3e] via-[#131633] to-[#0d1024] rounded-2xl p-5 border border-purple-500/30 shadow-glow flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300 font-mono flex items-center gap-1">
              <Building2 className="w-3 h-3 text-purple-400" /> TARGET HIRING BAR:
            </span>
            <Badge variant="purple" size="sm">
              {target.company} — {target.role}
            </Badge>
            <Badge variant="indigo" size="sm">
              {target.difficulty} Level
            </Badge>
            {compTag && (
              <span className="text-[11px] font-mono font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Flame className="w-3 h-3 text-emerald-400" />
                Asked in ~{compTag.frequency}% of {compTag.name} loops
              </span>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Company-Calibrated Technical Coding Drills</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real sandbox execution with time/space complexity analysis and direct calibration against {target.company} hiring rubrics.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <Button
            variant="secondary"
            size="sm"
            icon={<Sparkles className="w-3.5 h-3.5 text-purple-400" />}
            onClick={suggestCompanyCodingChallenge}
            disabled={isExecutingCode}
          >
            AI Recommend for {target.company}
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={<Play className="w-4 h-4 fill-white" />}
            onClick={evaluateCodeSubmission}
            disabled={isExecutingCode}
          >
            {isExecutingCode ? 'Evaluating in Sandbox...' : 'Submit & Evaluate'}
          </Button>
        </div>
      </div>

      {/* Problem Switcher & Category Filter Bar */}
      <div className="bg-[#10132b] p-3 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          <span className="text-[11px] uppercase font-mono font-bold text-slate-400 shrink-0">
            Problems:
          </span>
          {filteredChallenges.map((ch) => {
            const isCurrent = ch.id === codingChallenge.id;
            return (
              <button
                key={ch.id}
                onClick={() => selectCodingChallenge(ch.id)}
                className={`text-xs px-3 py-1.5 rounded-xl border transition-all shrink-0 flex items-center gap-1.5 ${
                  isCurrent
                    ? 'bg-purple-600/30 border-purple-400 text-white font-bold shadow-glow'
                    : 'bg-[#151938] border-slate-800 text-slate-400 hover:text-white hover:border-purple-500/40'
                }`}
              >
                <span>{ch.title}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                    ch.difficulty === 'Easy'
                      ? 'bg-emerald-950 text-emerald-400'
                      : ch.difficulty === 'Medium'
                      ? 'bg-amber-950 text-amber-400'
                      : 'bg-rose-950 text-rose-400'
                  }`}
                >
                  {ch.difficulty}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] text-slate-400 font-mono">Filter:</span>
          {['all', 'easy', 'medium', 'hard'].map((d) => (
            <button
              key={d}
              onClick={() => setDifficultyFilter(d)}
              className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-lg border transition-all ${
                difficultyFilter === d
                  ? 'bg-purple-500/20 border-purple-500 text-purple-200 font-bold'
                  : 'bg-[#151938] border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split: Problem & Rubric (Left) vs Code Editor & Test Runner (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Problem, Rubrics, Testcases */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="h-full flex flex-col justify-between">
            <div className="space-y-4">
              {/* Challenge Header */}
              <div className="border-b border-slate-800 pb-3">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h3 className="text-lg font-bold text-white tracking-tight">
                    {codingChallenge.title}
                  </h3>
                  <Badge
                    variant={
                      codingChallenge.difficulty === 'Easy'
                        ? 'emerald'
                        : codingChallenge.difficulty === 'Medium'
                        ? 'amber'
                        : 'rose'
                    }
                    size="sm"
                  >
                    {codingChallenge.difficulty}
                  </Badge>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono flex-wrap">
                  <span className="bg-[#141830] px-2 py-0.5 rounded border border-slate-800">
                    {codingChallenge.category}
                  </span>
                  <span>•</span>
                  <span>Target: {codingChallenge.expectedComplexity?.time || 'O(N)'}</span>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-800 text-xs">
                <button
                  onClick={() => setActiveTab('problem')}
                  className={`px-3 py-1.5 font-semibold transition-all border-b-2 ${
                    activeTab === 'problem'
                      ? 'border-purple-500 text-purple-300'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('rubric')}
                  className={`px-3 py-1.5 font-semibold transition-all border-b-2 ${
                    activeTab === 'rubric'
                      ? 'border-purple-500 text-purple-300'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Company Rubric
                </button>
                <button
                  onClick={() => setActiveTab('testcases')}
                  className={`px-3 py-1.5 font-semibold transition-all border-b-2 ${
                    activeTab === 'testcases'
                      ? 'border-purple-500 text-purple-300'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Test Cases ({codingChallenge.testCases.length})
                </button>
                <button
                  onClick={() => setActiveTab('custom')}
                  className={`px-3 py-1.5 font-semibold transition-all border-b-2 ${
                    activeTab === 'custom'
                      ? 'border-purple-500 text-purple-300'
                      : 'border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  Custom Test
                </button>
              </div>

              {/* Tab 1: Description */}
              {activeTab === 'problem' && (
                <div className="space-y-4 text-xs text-slate-300 leading-relaxed max-h-[460px] overflow-y-auto pr-1">
                  <div className="whitespace-pre-wrap font-sans">{codingChallenge.description}</div>

                  {codingChallenge.constraints && codingChallenge.constraints.length > 0 && (
                    <div className="bg-[#0b0e21] rounded-xl p-3 border border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
                        Constraints:
                      </span>
                      <ul className="list-disc pl-4 space-y-0.5 text-slate-400 font-mono text-[11px]">
                        {codingChallenge.constraints.map((c, idx) => (
                          <li key={idx}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Company Rubric */}
              {activeTab === 'rubric' && (
                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="bg-purple-950/20 border border-purple-500/30 rounded-xl p-3.5 space-y-2">
                    <span className="font-bold text-purple-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-purple-400" />
                      {target.company} {target.role} Hiring Standard:
                    </span>
                    <p className="text-slate-300 text-xs">
                      {codingChallenge.companyRubric?.[target.company] ||
                        `${target.company} evaluates algorithm design, edge case defense, single-pass efficiency, and clean modular code under timed conditions.`}
                    </p>
                  </div>

                  <div className="space-y-2 text-slate-400 text-xs">
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Optimal Time:</strong> {codingChallenge.expectedComplexity?.time}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Space Bound:</strong> {codingChallenge.expectedComplexity?.space}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span><strong>Suboptimal Trap:</strong> High-order nested loops trigger immediate optimization challenges.</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Visible Test Cases */}
              {activeTab === 'testcases' && (
                <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                  {codingChallenge.testCases.map((tc, idx) => (
                    <div
                      key={idx}
                      className="bg-[#0b0e21] p-3 rounded-xl border border-slate-800 text-[11px] font-mono space-y-1"
                    >
                      <div className="flex items-center justify-between text-slate-400 text-[10px]">
                        <span>Test Case {idx + 1} {tc.isHidden ? '(Hidden Edge Test)' : ''}</span>
                        {tc.isHidden && <Badge variant="indigo" size="sm">Hidden Bound</Badge>}
                      </div>
                      <div className="text-slate-300">
                        Input: <span className="text-purple-300">{tc.input}</span>
                      </div>
                      <div className="text-slate-300">
                        Expected: <span className="text-emerald-400">{tc.expectedOutput}</span>
                      </div>
                      {tc.explanation && (
                        <p className="text-[10px] text-slate-500 font-sans">{tc.explanation}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 4: Custom Test Runner */}
              {activeTab === 'custom' && (
                <div className="space-y-3 text-xs">
                  <p className="text-slate-400">
                    Test your function with any custom input arguments before submitting:
                  </p>
                  <input
                    type="text"
                    value={customInputText}
                    onChange={(e) => setCustomInputText(e.target.value)}
                    placeholder="e.g. [10, 20, 30, 40], target = 70"
                    className="w-full bg-[#0b0e21] border border-slate-700 focus:border-purple-500 rounded-xl px-3 py-2 text-xs font-mono text-white placeholder-slate-600 focus:outline-none"
                  />
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<Send className="w-3.5 h-3.5" />}
                    onClick={handleCustomRun}
                    disabled={!customInputText.trim() || isExecutingCode}
                    className="w-full"
                  >
                    Run on Custom Input
                  </Button>
                </div>
              )}
            </div>

            {/* Quick Actions Footer */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <button
                onClick={handleResetCode}
                className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
                title="Reset editor to starter template"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Template</span>
              </button>

              <button
                onClick={() => setShowSolutionAccordion(!showSolutionAccordion)}
                className="text-purple-300 hover:text-purple-200 font-semibold"
              >
                {showSolutionAccordion ? 'Hide Solution' : 'View Reference Solution →'}
              </button>
            </div>
          </Card>
        </div>

        {/* Right Column: Code Editor & Execution Results */}
        <div className="lg:col-span-7 space-y-4">
          {/* Editor Card */}
          <div className="bg-[#12152b] rounded-2xl border border-[#21264b] overflow-hidden shadow-glow">
            {/* Toolbar */}
            <div className="bg-[#0b0e21] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-purple-400" />
                <span className="text-xs font-bold text-white font-mono">
                  solution.{selectedCodeLanguage === 'python' ? 'py' : selectedCodeLanguage === 'javascript' ? 'js' : selectedCodeLanguage === 'cpp' ? 'cpp' : 'java'}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  • {isExecutingCode ? 'Running in Sandbox...' : 'Ready'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedCodeLanguage}
                  onChange={(e) => setSelectedCodeLanguage(e.target.value)}
                  className="bg-[#141830] text-xs text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1 font-mono focus:outline-none focus:border-purple-500 cursor-pointer"
                >
                  <option value="python">Python 3.11</option>
                  <option value="javascript">JavaScript (Node 20)</option>
                  <option value="cpp">C++ 20</option>
                  <option value="java">Java 17</option>
                </select>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetCode}
                  className="p-1 h-7"
                  title="Reset to starter code"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                </Button>
              </div>
            </div>

            {/* Code Textarea */}
            <div className="p-4 bg-[#080a14]">
              <textarea
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                rows={13}
                spellCheck={false}
                className="w-full bg-transparent text-emerald-300 font-mono text-xs leading-relaxed focus:outline-none resize-none selection:bg-purple-900"
              />
            </div>

            {/* Execution Status Bar */}
            <div className="bg-[#0b0e21] px-4 py-3 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <Cpu className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>
                  Judge0 CE Engine • Real test runner with Big-O complexity detection
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  icon={<Play className="w-4 h-4 fill-white" />}
                  onClick={evaluateCodeSubmission}
                  disabled={isExecutingCode}
                >
                  {isExecutingCode ? 'Running Code...' : 'Run & Evaluate'}
                </Button>
              </div>
            </div>
          </div>

          {/* Reference Solution Accordion (if toggled) */}
          {showSolutionAccordion && (
            <div className="bg-[#0b0e21] rounded-2xl p-4 border border-purple-500/30 shadow-glow space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5 font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  Optimal Reference Solution ({selectedCodeLanguage.toUpperCase()}):
                </span>
                <Badge variant="purple" size="sm">
                  {codingChallenge.expectedComplexity?.time || 'O(N)'}
                </Badge>
              </div>
              <pre className="p-3 bg-[#080a14] rounded-xl text-emerald-300 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800">
                <code>
                  {codingChallenge.starterCode?.[selectedCodeLanguage] || codingChallenge.optimalSolution || '# Reference implementation'}
                </code>
              </pre>
            </div>
          )}

          {/* Comprehensive Evaluation Results Card */}
          {codingEvaluationResult && (
            <div
              className={`rounded-2xl p-5 border shadow-glow-lg transition-all space-y-4 ${
                codingEvaluationResult.passed
                  ? 'bg-emerald-950/20 border-emerald-500/40'
                  : 'bg-rose-950/20 border-rose-500/40'
              }`}
            >
              {/* Verdict Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  {codingEvaluationResult.passed ? (
                    <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
                      <XCircle className="w-5 h-5" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-white">
                        {codingEvaluationResult.passed
                          ? 'Algorithmic Solution Accepted'
                          : 'Test Execution Incomplete / Failed'}
                      </h4>
                      {codingEvaluationResult.companyVerdict && (
                        <Badge
                          variant={
                            codingEvaluationResult.companyVerdict === 'Strong Hire'
                              ? 'emerald'
                              : codingEvaluationResult.companyVerdict.includes('Lean')
                              ? 'amber'
                              : 'rose'
                          }
                          size="sm"
                        >
                          {target.company} Verdict: {codingEvaluationResult.companyVerdict}
                        </Badge>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {codingEvaluationResult.executionEngine || 'Judge0 Sandbox Engine'} • Latency:{' '}
                      <strong className="text-slate-300 font-mono">{codingEvaluationResult.executionTimeMs || 22}ms</strong>
                    </p>
                  </div>
                </div>

                <Badge
                  variant={codingEvaluationResult.passed ? 'emerald' : 'rose'}
                  size="sm"
                >
                  {codingEvaluationResult.passedTestCases} / {codingEvaluationResult.totalTestCases} Tests Passed
                </Badge>
              </div>

              {/* Company Calibration Quote */}
              {codingEvaluationResult.companyCalibration && (
                <div className="bg-[#0b0e21] rounded-xl p-3 border border-purple-500/30 text-xs text-purple-200 space-y-1">
                  <span className="font-bold text-white flex items-center gap-1.5 font-mono text-[11px]">
                    <Building2 className="w-3.5 h-3.5 text-purple-400" />
                    {target.company} Hiring Bar Calibration:
                  </span>
                  <p className="text-slate-300">{codingEvaluationResult.companyCalibration}</p>
                </div>
              )}

              {/* Complexity Metric Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono text-xs">
                <div className="bg-[#0b0e21] rounded-xl p-3 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Time:</span>
                  <span
                    className={`font-bold ${
                      codingEvaluationResult.isOptimal ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {codingEvaluationResult.timeComplexity}
                  </span>
                </div>

                <div className="bg-[#0b0e21] rounded-xl p-3 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Space:</span>
                  <span className="text-purple-300 font-bold">
                    {codingEvaluationResult.spaceComplexity}
                  </span>
                </div>

                <div className="bg-[#0b0e21] rounded-xl p-3 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Efficiency:</span>
                  <span className="text-cyan-400 font-bold">
                    {codingEvaluationResult.efficiencyScore || 90}%
                  </span>
                </div>

                <div className="bg-[#0b0e21] rounded-xl p-3 border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase">Code Quality:</span>
                  <span className="text-emerald-400 font-bold">
                    {codingEvaluationResult.codeQualityScore || 85}%
                  </span>
                </div>
              </div>

              {/* Frank Feedback */}
              <p className="text-xs text-slate-200 leading-relaxed font-sans">
                {codingEvaluationResult.feedback}
              </p>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {codingEvaluationResult.strengths && codingEvaluationResult.strengths.length > 0 && (
                  <div className="bg-[#0b0e21] p-3 rounded-xl border border-emerald-500/20 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 font-mono block">
                      ✓ What You Did Well:
                    </span>
                    <ul className="space-y-1 text-slate-300 text-[11px]">
                      {codingEvaluationResult.strengths.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {codingEvaluationResult.improvements && codingEvaluationResult.improvements.length > 0 && (
                  <div className="bg-[#0b0e21] p-3 rounded-xl border border-amber-500/20 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-amber-400 font-mono block">
                      ⚠ Areas for Improvement & Edge Cases:
                    </span>
                    <ul className="space-y-1 text-slate-300 text-[11px]">
                      {codingEvaluationResult.improvements.map((imp, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <AlertTriangle className="w-3 h-3 text-amber-400 shrink-0 mt-0.5" />
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Test Cases Results Table */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Test Case Breakdown:
                </span>
                <div className="space-y-1.5 max-h-[220px] overflow-y-auto pr-1">
                  {codingEvaluationResult.testResults.map((tr, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-xl bg-[#0b0e21] border border-slate-800/80 font-mono text-xs gap-2"
                    >
                      <div className="truncate max-w-sm">
                        <span className="text-slate-500">In: </span>
                        <span className="text-purple-300">{tr.input}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-slate-400 text-[11px]">Exp: {tr.expected}</span>
                        <span className="text-slate-400 text-[11px]">Act: {tr.actual}</span>
                        {tr.passed ? (
                          <span className="text-emerald-400 font-bold text-[11px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                            ✓ PASS
                          </span>
                        ) : (
                          <span className="text-rose-400 font-bold text-[11px] bg-rose-950/60 px-2 py-0.5 rounded border border-rose-500/30">
                            ✕ FAIL
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
