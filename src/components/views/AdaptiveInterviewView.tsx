'use client';

import React, { useState, useEffect } from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { AnswerIntelligenceModal } from './AnswerIntelligenceModal';
import {
  Bot,
  Clock,
  Send,
  HelpCircle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  RotateCcw,
  Eye,
  Layers,
  ShieldCheck,
  User,
} from 'lucide-react';

export const AdaptiveInterviewView: React.FC = () => {
  const {
    target,
    currentQuestion,
    currentQuestionIndex,
    questions,
    currentAnswerText,
    setCurrentAnswerText,
    isEvaluatingAnswer,
    submitAnswer,
    lastAnswerEvaluation,
    nextQuestion,
    setActiveView,
  } = usePrepForge();

  const [timerSeconds, setTimerSeconds] = useState(currentQuestion?.timeLimitSeconds || 180);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [hasSubmittedCurrent, setHasSubmittedCurrent] = useState(false);
  const [showIdealAnswer, setShowIdealAnswer] = useState(false);
  const [idealAnswerData, setIdealAnswerData] = useState<any>(null);
  const [isLoadingIdeal, setIsLoadingIdeal] = useState(false);

  // Timer countdown
  useEffect(() => {
    setTimerSeconds(currentQuestion?.timeLimitSeconds || 180);
    setIsTimerRunning(true);
    setHasSubmittedCurrent(false);
    setShowIdealAnswer(false);
    setIdealAnswerData(null);
  }, [currentQuestionIndex, currentQuestion]);

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0 && !hasSubmittedCurrent) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds, hasSubmittedCurrent]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleApplyIDontKnow = () => {
    setCurrentAnswerText(
      "I don't know the exact internal implementation details for this specific low-level optimization in production. I understand the high-level concepts, but I haven't benchmarked this directly."
    );
  };

  const handleFetchIdealAnswer = async () => {
    if (idealAnswerData) {
      setShowIdealAnswer(!showIdealAnswer);
      return;
    }
    setIsLoadingIdeal(true);
    try {
      const res = await fetch('http://127.0.0.1:8000/api/interview/sample-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: currentQuestion?.question || '',
          role: target.role,
          company: target.company,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setIdealAnswerData(data);
        setShowIdealAnswer(true);
      }
    } catch (e) {
      console.warn('Failed to fetch ideal answer:', e);
    }
    setIsLoadingIdeal(false);
  };

  const handleSubmit = async () => {
    const textToSubmit =
      currentAnswerText.trim() ||
      "I chose YOLOv8 for vehicle detection in Traffix because it is a single-stage anchor-free object detector that balances high mAP with sub-50ms inference latency. In contrast, Faster R-CNN uses a two-stage architecture with a Region Proposal Network (RPN), which provides high accuracy but introduces significant latency (~120ms), making it unsuitable for our 30 FPS multi-camera real-time requirement.";

    if (!currentAnswerText.trim()) {
      setCurrentAnswerText(textToSubmit);
    }

    await submitAnswer(textToSubmit);
    setHasSubmittedCurrent(true);
  };

  const handleContinueNext = () => {
    setHasSubmittedCurrent(false);
    setCurrentAnswerText('');
    nextQuestion();
  };

  const topFollowUp = lastAnswerEvaluation?.predictedFollowUps?.[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Top Header: Clean metadata only */}
      <div className="bg-[#12152b] rounded-2xl p-5 border border-purple-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-glow">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300">
              AI TECHNICAL INTERVIEW SESSION
            </span>
            <span className="text-slate-500">•</span>
            <Badge variant="purple" size="sm" dot>
              {target.company} {target.role}
            </Badge>
            <Badge variant="indigo" size="sm">
              Difficulty: {currentQuestion?.depthLevel >= 6 ? 'Advanced' : 'Intermediate'}
            </Badge>
          </div>
          <h2 className="text-lg font-extrabold text-white tracking-tight">
            Round {currentQuestionIndex + 1} of {questions.length}
          </h2>
        </div>

        {/* Live Timer */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#0b0e21] px-3.5 py-1.5 rounded-xl border border-slate-800 font-mono text-xs">
            <Clock className={`w-4 h-4 ${timerSeconds < 30 ? 'text-rose-400 animate-pulse' : 'text-purple-400'}`} />
            <span className={timerSeconds < 30 ? 'text-rose-400 font-bold' : 'text-slate-200'}>
              {formatTimer(timerSeconds)}
            </span>
          </div>
        </div>
      </div>

      {/* Main AI Interviewer Question Card: Clean, readable, no internal rubrics */}
      <div className="bg-gradient-to-br from-[#161a38] via-[#12152e] to-[#0d1024] rounded-2xl p-6 md:p-8 border border-purple-500/40 shadow-glow space-y-4">
        <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-300">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">AI Technical Interviewer</div>
              <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Active • Listening</span>
              </div>
            </div>
          </div>
          <Badge variant="purple" size="sm">
            {currentQuestion?.category || 'Technical Deep Dive'}
          </Badge>
        </div>

        {/* The Question */}
        <div className="pt-2">
          <h3 className="text-xl md:text-2xl font-bold text-white leading-relaxed font-sans">
            "{currentQuestion?.question}"
          </h3>
        </div>
      </div>

      {/* BEFORE SUBMISSION: Answer Workspace */}
      {!hasSubmittedCurrent && (
        <div className="bg-[#12152b] rounded-2xl p-6 border border-[#21264b] space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <User className="w-4 h-4 text-purple-400" />
              <span>Your Answer</span>
            </label>

            <button
              onClick={handleApplyIDontKnow}
              className="text-[11px] text-purple-300 hover:text-purple-200 font-medium flex items-center gap-1.5 bg-purple-500/10 hover:bg-purple-500/20 px-2.5 py-1 rounded-lg border border-purple-500/30 transition-all"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>"I Don't Know / Need Coaching"</span>
            </button>
          </div>

          {/* Text Area */}
          <textarea
            value={currentAnswerText}
            onChange={(e) => setCurrentAnswerText(e.target.value)}
            placeholder="Structure your answer with your direct architectural decision, technical justification, quantitative trade-offs, and failure handling..."
            rows={7}
            className="w-full bg-[#0b0e21] border border-slate-800 focus:border-purple-500 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 leading-relaxed font-sans"
          />

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCurrentAnswerText(
                  "I chose YOLOv8 for vehicle detection in Traffix because it is a single-stage anchor-free object detector that balances high mAP with sub-50ms inference latency. In contrast, Faster R-CNN uses a two-stage architecture with a Region Proposal Network (RPN), which provides high accuracy but introduces significant latency (~120ms), making it unsuitable for our 30 FPS multi-camera real-time requirement."
                );
              }}
            >
              Load Demo Answer
            </Button>

            <Button
              variant="primary"
              size="md"
              icon={<Send className="w-4 h-4" />}
              loading={isEvaluatingAnswer}
              onClick={handleSubmit}
            >
              Submit Answer
            </Button>
          </div>
        </div>
      )}

      {/* AFTER SUBMISSION: Inline Conversational AI Feedback + Next Question */}
      {hasSubmittedCurrent && lastAnswerEvaluation && (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
          {/* Candidate's Submitted Answer */}
          <div className="bg-[#10132b] rounded-2xl p-5 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <User className="w-4 h-4 text-purple-400" />
              <span>Your Submitted Response</span>
            </div>
            <p className="text-sm text-slate-200 font-sans leading-relaxed bg-[#0a0d20] p-4 rounded-xl border border-slate-800/80">
              "{lastAnswerEvaluation.answerText}"
            </p>
          </div>

          {/* Special Coaching Card for 'I Don't Know' */}
          {lastAnswerEvaluation.isUnknown && (
            <div className="bg-indigo-950/40 border-2 border-indigo-500/50 rounded-2xl p-6 space-y-4 shadow-glow">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                <span>AI KNOWLEDGE COACHING: CORE CONCEPT BREAKDOWN</span>
              </div>
              {lastAnswerEvaluation.conceptExplanation && (
                <p className="text-xs text-slate-200 leading-relaxed font-sans bg-[#0c0f24] p-4 rounded-xl border border-indigo-500/30">
                  {lastAnswerEvaluation.conceptExplanation}
                </p>
              )}
              {lastAnswerEvaluation.conceptExample && (
                <div className="text-xs text-indigo-200 font-mono bg-[#090b1a] p-3 rounded-lg border border-indigo-500/20">
                  <strong>Production Example:</strong> {lastAnswerEvaluation.conceptExample}
                </div>
              )}
            </div>
          )}

          {/* AI Evaluation Card */}
          <div className="bg-[#12152d] rounded-2xl p-6 border border-purple-500/40 shadow-glow space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">AI Interviewer Feedback</h4>
                  <p className="text-xs text-slate-400">Grounded in candidate response accuracy and trade-off depth.</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-slate-400">Score</div>
                  <div className="text-xl font-mono font-extrabold text-white">
                    {(lastAnswerEvaluation.evaluation.completenessScore / 10).toFixed(1)} / 10
                  </div>
                </div>
                {lastAnswerEvaluation.answerType && (
                  <Badge
                    variant={
                      lastAnswerEvaluation.answerType === 'STRONG'
                        ? 'emerald'
                        : lastAnswerEvaluation.answerType === 'PARTIAL'
                        ? 'amber'
                        : lastAnswerEvaluation.answerType === 'UNKNOWN'
                        ? 'indigo'
                        : 'rose'
                    }
                    size="md"
                  >
                    {lastAnswerEvaluation.answerType}
                  </Badge>
                )}
                <Badge
                  variant={
                    lastAnswerEvaluation.evaluation.interviewerRisk === 'LOW'
                      ? 'emerald'
                      : lastAnswerEvaluation.evaluation.interviewerRisk === 'MEDIUM'
                      ? 'amber'
                      : 'rose'
                  }
                  size="md"
                >
                  {lastAnswerEvaluation.evaluation.interviewerRisk} RISK
                </Badge>
              </div>
            </div>

            {/* Disqualifying Alert Banner for Irrelevant / Gibberish / Off-Topic Answers */}
            {(lastAnswerEvaluation.answerType === 'GIBBERISH' ||
              lastAnswerEvaluation.answerType === 'OFF_TOPIC' ||
              lastAnswerEvaluation.answerType === 'EVASION' ||
              lastAnswerEvaluation.evaluation.completenessScore <= 10) && (
              <div className="bg-rose-950/40 border-2 border-rose-500/60 rounded-xl p-4 flex items-start gap-3 text-rose-300 animate-in fade-in">
                <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <div className="font-bold text-sm text-rose-200 uppercase tracking-wider flex items-center gap-2">
                    <span>Disqualifying Interview Response ({lastAnswerEvaluation.answerType})</span>
                    <span className="text-xs bg-rose-500/20 text-rose-300 px-2 py-0.5 rounded border border-rose-500/40 font-mono">
                      Score: 0.0 / 10
                    </span>
                  </div>
                  <p className="text-xs text-rose-300/90 leading-relaxed font-sans">
                    In a real FAANG or top-tier technical interview, submitting unparseable characters, random keyboard mashing, or completely off-topic commentary results in an immediate failing evaluation and disqualification.
                  </p>
                </div>
              </div>
            )}

            {/* Frank Feedback Text */}
            <div className="text-sm text-slate-200 leading-relaxed font-sans bg-[#0b0e21] p-4 rounded-xl border border-slate-800">
              "{lastAnswerEvaluation.evaluation.frankFeedback}"
            </div>

            {/* Strengths & Missing Points Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* What you did well */}
              <div
                className={`rounded-xl p-4 space-y-2 border ${
                  lastAnswerEvaluation.evaluation.strengths && lastAnswerEvaluation.evaluation.strengths.length > 0
                    ? 'bg-emerald-950/20 border-emerald-500/30'
                    : 'bg-slate-900/40 border-slate-800'
                }`}
              >
                <div
                  className={`font-bold flex items-center gap-1.5 ${
                    lastAnswerEvaluation.evaluation.strengths && lastAnswerEvaluation.evaluation.strengths.length > 0
                      ? 'text-emerald-400'
                      : 'text-slate-400'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>What you did well:</span>
                </div>
                {lastAnswerEvaluation.evaluation.strengths && lastAnswerEvaluation.evaluation.strengths.length > 0 ? (
                  <ul className="space-y-1 text-slate-300 list-disc pl-4">
                    {lastAnswerEvaluation.evaluation.strengths.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-400 italic">
                    None — No valid or coherent technical content provided.
                  </p>
                )}
              </div>

              {/* What was missing */}
              <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-4 space-y-2">
                <div className="font-bold text-rose-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>What was missing / Needs improvement:</span>
                </div>
                <ul className="space-y-1 text-slate-300 list-disc pl-4">
                  {lastAnswerEvaluation.evaluation.missingPoints.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Optional Ideal Answer Accordion */}
            <div className="border border-slate-800 rounded-xl p-4 bg-[#0b0e21]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-slate-200">Exemplary Reference Answer</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Eye className="w-3.5 h-3.5" />}
                  loading={isLoadingIdeal}
                  onClick={handleFetchIdealAnswer}
                >
                  {showIdealAnswer ? 'Hide Reference' : 'Show Ideal Answer'}
                </Button>
              </div>

              {showIdealAnswer && idealAnswerData && (
                <div className="mt-3 pt-3 border-t border-slate-800 space-y-3 text-xs animate-in fade-in">
                  <div className="bg-[#10142e] p-3.5 rounded-lg border border-purple-500/30 text-slate-200 leading-relaxed font-sans">
                    {idealAnswerData.sample_answer}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* NEXT QUESTION HERO SECTION */}
          {topFollowUp && (
            <div className="bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-[#12152e] border-2 border-purple-500/50 rounded-2xl p-6 shadow-glow space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-purple-400" />
                  <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                    NEXT QUESTION (Generated From Your Answer)
                  </span>
                </div>
                <Badge variant="purple" size="sm">
                  Interviewer Follow-Up
                </Badge>
              </div>

              <h4 className="text-lg font-bold text-white leading-relaxed">
                "{topFollowUp.question}"
              </h4>

              <div className="flex items-center justify-between pt-2 border-t border-purple-500/20">
                <div className="text-xs text-slate-400">
                  Ready to continue with the follow-up round.
                </div>
                <Button
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  onClick={handleContinueNext}
                >
                  Continue Interview
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Answer Intelligence Modal (available if opened explicitly) */}
      {showModal && lastAnswerEvaluation && (
        <AnswerIntelligenceModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          evaluation={lastAnswerEvaluation}
          onContinue={() => {
            setShowModal(false);
            handleContinueNext();
          }}
        />
      )}
    </div>
  );
};
