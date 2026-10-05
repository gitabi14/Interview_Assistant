'use client';

import React, { useState } from 'react';
import { CandidateAnswer } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { usePrepForge } from '../../store/PrepForgeContext';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Brain,
  ArrowRight,
  X,
  BookOpen,
  RotateCcw,
  Eye,
  Layers,
  User,
} from 'lucide-react';

interface AnswerIntelligenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  evaluation: CandidateAnswer;
  onContinue: () => void;
}

export const AnswerIntelligenceModal: React.FC<AnswerIntelligenceModalProps> = ({
  isOpen,
  onClose,
  evaluation,
  onContinue,
}) => {
  const { target, setCurrentAnswerText } = usePrepForge();
  const [showIdealAnswer, setShowIdealAnswer] = useState(false);
  const [idealAnswerData, setIdealAnswerData] = useState<any>(null);
  const [isLoadingIdeal, setIsLoadingIdeal] = useState(false);

  if (!isOpen) return null;

  const topFollowUp = evaluation.predictedFollowUps?.[0];

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
          question: evaluation.questionText,
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

  const handleRetryQuestion = (retryQ: string) => {
    setCurrentAnswerText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#12152d] border border-purple-500/40 rounded-2xl max-w-2xl w-full p-6 shadow-glow-lg text-left relative space-y-5 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#21264b] pb-4 sticky top-0 bg-[#12152d] z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">AI Interviewer Evaluation</h3>
                <Badge
                  variant={
                    evaluation.evaluation.interviewerRisk === 'LOW'
                      ? 'emerald'
                      : evaluation.evaluation.interviewerRisk === 'MEDIUM'
                      ? 'amber'
                      : 'rose'
                  }
                  size="sm"
                >
                  {evaluation.evaluation.interviewerRisk} RISK
                </Badge>
              </div>
              <p className="text-xs text-slate-400">
                Performance score: {(evaluation.evaluation.completenessScore / 10).toFixed(1)} / 10
              </p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Candidate's Submitted Response */}
        <div className="bg-[#0b0e21] rounded-xl p-3.5 border border-slate-800 space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-purple-400" /> Your Answer:
          </span>
          <p className="text-xs text-slate-300 italic font-sans leading-relaxed">
            "{evaluation.answerText}"
          </p>
        </div>

        {/* SPECIAL: "I Don't Know" Knowledge Coaching Card */}
        {evaluation.isUnknown && (
          <div className="bg-indigo-950/40 border-2 border-indigo-500/50 rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs">
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>AI KNOWLEDGE COACHING: CORE CONCEPT BREAKDOWN</span>
            </div>
            {evaluation.conceptExplanation && (
              <p className="text-xs text-slate-200 leading-relaxed font-sans bg-[#0c0f24] p-3 rounded-lg border border-indigo-500/30">
                {evaluation.conceptExplanation}
              </p>
            )}
            {evaluation.conceptExample && (
              <div className="text-[11px] text-indigo-200 font-mono bg-[#090b1a] p-2.5 rounded-lg border border-indigo-500/20">
                <strong>Example:</strong> {evaluation.conceptExample}
              </div>
            )}
            {evaluation.retryQuestion && (
              <div className="pt-2 border-t border-indigo-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div className="text-xs text-indigo-300 font-medium">
                  <strong>Try Again:</strong> "{evaluation.retryQuestion}"
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  icon={<RotateCcw className="w-3.5 h-3.5" />}
                  onClick={() => handleRetryQuestion(evaluation.retryQuestion!)}
                >
                  Attempt Retry
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Frank Technical Feedback */}
        <div className="bg-[#0b0e21] rounded-xl p-4 border border-slate-800 space-y-2">
          <span className="text-xs font-bold text-white uppercase tracking-wider block">
            Assessment Feedback
          </span>
          <p className="text-xs text-slate-300 leading-relaxed font-sans">
            "{evaluation.evaluation.frankFeedback}"
          </p>
        </div>

        {/* Strengths and Missing Points Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-3.5 space-y-2">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> What you did well:
            </span>
            <ul className="space-y-1 text-slate-300 list-disc pl-4">
              {evaluation.evaluation.strengths.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          </div>

          <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-3.5 space-y-2">
            <span className="font-bold text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" /> What was missing / Needs improvement:
            </span>
            <ul className="space-y-1 text-slate-300 list-disc pl-4">
              {evaluation.evaluation.missingPoints.map((pt, i) => (
                <li key={i}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Predicted Interviewer Follow-Up Question */}
        {topFollowUp && (
          <div className="bg-gradient-to-r from-purple-950/40 to-indigo-950/40 border border-purple-500/40 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-purple-400" /> NEXT QUESTION (From Your Answer)
              </span>
            </div>
            <p className="text-sm font-bold text-white leading-relaxed">
              "{topFollowUp.question}"
            </p>
          </div>
        )}

        {/* IDEAL ANSWER (Optional / Post-submission view) */}
        <div className="border border-slate-800 rounded-xl p-3.5 bg-[#0b0e21]">
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
              <div className="bg-[#10142e] p-3 rounded-lg border border-purple-500/30 text-slate-200 leading-relaxed font-sans">
                {idealAnswerData.sample_answer}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-2 border-t border-[#21264b]">
          <Button variant="secondary" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            onClick={onContinue}
          >
            Continue Interview
          </Button>
        </div>
      </div>
    </div>
  );
};
