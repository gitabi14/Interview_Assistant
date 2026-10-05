'use client';

import React from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import { Cpu, ShieldCheck, AlertTriangle, CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react';

export const ResumeIntelligenceView: React.FC = () => {
  const { readiness, claims, target, setActiveView } = usePrepForge();

  const detectedSkills = [
    { name: 'Python', claimed: 'Advanced', evidence: 'Strong', confidence: 89, category: 'Core Language' },
    { name: 'Machine Learning', claimed: 'Advanced', evidence: 'Strong', confidence: 91, category: 'Specialization' },
    { name: 'YOLOv8', claimed: 'Advanced', evidence: 'Partial', confidence: 62, category: 'Framework' },
    { name: 'FastAPI', claimed: 'Advanced', evidence: 'Weak', confidence: 54, category: 'Backend' },
    { name: 'MongoDB', claimed: 'Intermediate', evidence: 'Moderate', confidence: 76, category: 'Database' },
    { name: 'React', claimed: 'Intermediate', evidence: 'Moderate', confidence: 72, category: 'Frontend' },
    { name: 'LSTM', claimed: 'Advanced', evidence: 'Strong', confidence: 90, category: 'Deep Learning' },
    { name: 'OpenCV', claimed: 'Intermediate', evidence: 'Moderate', confidence: 78, category: 'Computer Vision' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="sm">
              RESUME AUDIT & CLAIM EXTRACTION
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Resume Intelligence</h2>
          <p className="text-xs text-slate-400 mt-1">
            Resumes are treated as hypotheses to verify. PrepForge parses claimed competencies and measures evidence confidence.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
          onClick={() => setActiveView('claim-verification')}
        >
          Verify Claims Live
        </Button>
      </div>

      {/* Top 4 Metric Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#12152b] rounded-xl p-4 border border-[#21264b]">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Resume Fit</span>
          <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">{readiness.resumeFitScore}%</p>
          <span className="text-[10px] text-slate-400">Match against {target.company}</span>
        </div>

        <div className="bg-[#12152b] rounded-xl p-4 border border-[#21264b]">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Claim Credibility</span>
          <p className="text-2xl font-bold font-mono text-amber-400 mt-1">{readiness.claimCredibilityScore}%</p>
          <span className="text-[10px] text-slate-400">Demonstrated vs Claimed</span>
        </div>

        <div className="bg-[#12152b] rounded-xl p-4 border border-[#21264b]">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Projects Analyzed</span>
          <p className="text-2xl font-bold font-mono text-purple-300 mt-1">3</p>
          <span className="text-[10px] text-slate-400">Traffix primary demo</span>
        </div>

        <div className="bg-[#12152b] rounded-xl p-4 border border-[#21264b]">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Skills Detected</span>
          <p className="text-2xl font-bold font-mono text-cyan-400 mt-1">14</p>
          <span className="text-[10px] text-slate-400">5 High-Priority Vectors</span>
        </div>
      </div>

      {/* Philosophy banner: Resumes are not ground truth */}
      <div className="bg-purple-950/30 border border-purple-500/30 rounded-2xl p-4 flex items-start gap-3">
        <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 shrink-0">
          <HelpCircle className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Core Evaluation Principle: Resumes Are Hypotheses, Not Ground Truth
          </h4>
          <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
            PrepForge AI does not assume a candidate is an expert simply because "Advanced" is written on a resume. Every technical claim is indexed, paired with high-risk probe questions, and validated through adaptive technical defense.
          </p>
        </div>
      </div>

      {/* Detected Skills & Evidence Table */}
      <Card title="Detected Skills & Evidence Status" subtitle="Comparing self-reported claim level with demonstrated interview evidence">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                <th className="py-2.5 px-3">Technology / Skill</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Claimed Level</th>
                <th className="py-2.5 px-3">Demonstrated Evidence</th>
                <th className="py-2.5 px-3">Confidence</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {detectedSkills.map((skill) => (
                <tr key={skill.name} className="hover:bg-[#141832] transition-colors">
                  <td className="py-3 px-3 font-semibold text-white">{skill.name}</td>
                  <td className="py-3 px-3 text-slate-400">{skill.category}</td>
                  <td className="py-3 px-3">
                    <span className="font-mono text-purple-300">{skill.claimed}</span>
                  </td>
                  <td className="py-3 px-3">
                    <Badge
                      variant={
                        skill.evidence === 'Strong'
                          ? 'emerald'
                          : skill.evidence === 'Moderate'
                          ? 'indigo'
                          : skill.evidence === 'Partial'
                          ? 'amber'
                          : 'rose'
                      }
                      size="sm"
                    >
                      {skill.evidence} Evidence
                    </Badge>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2 max-w-[120px]">
                      <ProgressBar
                        value={skill.confidence}
                        showValue={false}
                        size="sm"
                        color={skill.confidence >= 80 ? 'emerald' : skill.confidence >= 65 ? 'cyan' : 'amber'}
                      />
                      <span className="font-mono text-[11px] text-slate-300">{skill.confidence}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setActiveView('claim-verification')}
                      className="text-purple-400 hover:text-purple-300 font-semibold hover:underline"
                    >
                      Inspect →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Extracted Claim Risk Matrix */}
      <Card
        title="High-Priority Claim Verification Vectors"
        subtitle="Identified from Traffix & Full-Stack architecture descriptions"
        headerAction={
          <Button variant="outline" size="sm" onClick={() => setActiveView('claim-verification')}>
            Verify All Claims Live
          </Button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {claims.map((claim) => (
            <div
              key={claim.id}
              className="bg-[#0c0f24] rounded-xl p-4 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white">{claim.technology}</span>
                  <Badge variant={claim.riskLevel === 'HIGH' ? 'rose' : 'emerald'} size="sm">
                    {claim.riskLevel} Risk
                  </Badge>
                </div>

                <p className="text-xs text-slate-300 italic mb-3">"{claim.contextSnippet}"</p>

                <div className="bg-[#141830] p-2.5 rounded-lg border border-slate-800 mb-3">
                  <span className="text-[10px] uppercase font-bold text-purple-300">Verification Question:</span>
                  <p className="text-xs text-slate-200 mt-0.5">{claim.verificationQuestion}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                <span className="text-slate-400">
                  Confidence: <strong className="font-mono text-amber-400">{claim.evidenceConfidence}%</strong>
                </span>
                <button
                  onClick={() => setActiveView('claim-verification')}
                  className="text-purple-300 hover:text-purple-200 font-semibold flex items-center gap-1"
                >
                  <span>Test Claim</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
