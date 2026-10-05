'use client';

import React, { useState } from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Cpu,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Layers,
  GraduationCap,
  FolderGit2,
  Code2,
  ExternalLink,
  Target,
  Sparkle,
} from 'lucide-react';

export const ResumeUploadView: React.FC = () => {
  const {
    candidate,
    claims,
    projects,
    skills,
    isResumeUploading,
    resumeUploadProgress,
    resumeExtractionStep,
    uploadResumeSimulated,
    setActiveView,
    jumpToQuestion,
  } = usePrepForge();

  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>('Abishek_R_Resume.pdf');

  const handleFileUpload = async (e?: React.ChangeEvent<HTMLInputElement>) => {
    const file = e?.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
    } else {
      setUploadedFile('Abishek_R_Resume.pdf');
    }
    await uploadResumeSimulated(file);
  };

  // Group skills by category for hierarchy display
  const skillCategories = [
    { name: 'Languages', items: ['Python', 'C++', 'Java', 'JavaScript'] },
    { name: 'Frameworks', items: ['FastAPI', 'React', 'Node.js', 'Express'] },
    { name: 'Developer Tools', items: ['Git', 'GitHub', 'Docker', 'Postman', 'VS Code'] },
    { name: 'Libraries & AI', items: ['PyTorch', 'Pandas', 'NumPy', 'OpenCV', 'FAISS', 'LangChain'] },
    { name: 'Concepts', items: ['Object Oriented Programming', 'Data Structures & Algorithms'] },
  ];

  // Detected Sections list
  const detectedSections = [
    { name: 'Contact Info', detected: true, count: '4 links' },
    { name: 'Summary', detected: true, count: 'Objective' },
    { name: 'Education', detected: true, count: 'B.E. CSE' },
    { name: 'Technical Skills', detected: true, count: '20 skills' },
    { name: 'Projects', detected: true, count: '3 / 3 Verified' },
    { name: 'Certifications', detected: true, count: '5 certs' },
    { name: 'Achievements', detected: true, count: 'LeetCode & Hackathons' },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="sm">
              TWO-STAGE RESUME UNDERSTANDING PIPELINE
            </Badge>
            <Badge variant="emerald" size="sm">
              CANONICAL PARSER ACTIVE
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Resume Ingestion & Structured Intelligence Review
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Parses sections, extracts real candidate entities, detects all 3 projects, and isolates verifiable quantitative claims.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={<Sparkles className="w-4 h-4 text-purple-400" />}
          onClick={() => handleFileUpload()}
          loading={isResumeUploading}
        >
          Parse Resume (Abishek R)
        </Button>
      </div>

      {/* Upload Box / Processing State */}
      <Card className="border-dashed border-2 border-purple-500/30 hover:border-purple-500/60 transition-all bg-[#0d1024]">
        {isResumeUploading ? (
          <div className="py-12 px-6 flex flex-col items-center justify-center text-center space-y-4 max-w-md mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center animate-pulse shadow-glow">
              <Cpu className="w-7 h-7 text-purple-400" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Analyzing Candidate Resume...</h3>
              <p className="text-xs text-purple-300 font-mono">{resumeExtractionStep}</p>
            </div>

            <div className="w-full">
              <ProgressBar value={resumeUploadProgress} showValue color="purple" size="md" />
            </div>

            <div className="text-[11px] text-slate-400">
              Isolating section boundaries, validating quantitative metrics, and assembling 10-round balanced defense plan.
            </div>
          </div>
        ) : (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFileUpload();
            }}
            className={`py-8 px-6 flex flex-col items-center justify-center text-center transition-all ${
              dragOver ? 'bg-purple-900/20' : ''
            }`}
          >
            <div className="w-14 h-14 rounded-2xl bg-surface-subtle border border-surface-border flex items-center justify-center text-purple-400 mb-3 shadow-glow">
              <UploadCloud className="w-7 h-7" />
            </div>

            <h3 className="text-base font-bold text-white mb-1">
              Upload Resume (PDF, DOCX, or Text)
            </h3>
            <p className="text-xs text-slate-400 mb-4 max-w-md">
              PrepForge extracts skills, 3 projects, and generates targeted claim-verification questions. Resumes are treated as hypothesis documents.
            </p>

            <div className="flex items-center gap-3">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.docx,.doc,.txt"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs shadow-glow transition-all">
                  <FileText className="w-4 h-4" /> Browse Local Resume
                </span>
              </label>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFileUpload()}
              >
                Re-Parse Sample (Abishek R)
              </Button>
            </div>

            {uploadedFile && (
              <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#141832] border border-emerald-500/30 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Active File: <strong className="text-white">{uploadedFile}</strong></span>
                <span className="text-[10px] text-emerald-400 font-mono font-bold ml-1">STAGE-2 PARSED & VERIFIED</span>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Detected Section Boundaries */}
      <div className="bg-[#10142e] rounded-2xl p-4 border border-[#212850] shadow-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Detected Resume Section Segmentation
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            7/7 Core Sections Segmented
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {detectedSections.map((sec) => (
            <div
              key={sec.name}
              className="bg-[#0b0e24] p-2.5 rounded-xl border border-slate-800 flex flex-col justify-between text-center"
            >
              <div className="flex items-center justify-center gap-1 mb-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span className="text-[11px] font-bold text-white">{sec.name}</span>
              </div>
              <span className="text-[10px] text-purple-300 font-mono">{sec.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Candidate Profile Details & Skills Hierarchy */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidate Profile Details */}
        <Card
          title="Candidate Profile"
          subtitle="Extracted contact, education & credentials"
          className="lg:col-span-1"
        >
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Full Name:</span>
              <span className="font-bold text-white">{candidate.name}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Email:</span>
              <span className="font-mono text-slate-300 truncate max-w-[170px]">{candidate.email}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Phone / Location:</span>
              <span className="text-slate-300">{candidate.phone || '7448665599'} • {candidate.location || 'Tamil Nadu'}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Institution:</span>
              <span className="font-semibold text-white truncate max-w-[180px]">{candidate.education}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800">
              <span className="text-slate-400">Degree & CGPA:</span>
              <span className="text-purple-300 font-mono font-medium">B.E. CSE • 7.8 / 10 CGPA</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-400">Batch Timeline:</span>
              <span className="font-mono text-emerald-400 font-bold">2024 – {candidate.graduationYear || '2028'}</span>
            </div>
          </div>
        </Card>

        {/* Skills Hierarchy Matrix */}
        <Card
          title="Extracted Skills Hierarchy"
          subtitle="Honest categorizations without artificial 'Advanced' inflation"
          className="lg:col-span-2"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skillCategories.map((cat) => (
              <div key={cat.name} className="bg-[#0c0f24] rounded-xl p-3 border border-slate-800/80">
                <div className="flex items-center gap-1.5 mb-2">
                  <Code2 className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-xs font-bold text-white">{cat.name}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="text-[11px] bg-[#141832] text-slate-300 px-2 py-0.5 rounded-lg border border-slate-700/60 font-mono"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Extracted Projects (ALL 3 PROJECTS) */}
      <Card
        title={`Verified Projects Breakdown (${projects.length}/3 Extracted)`}
        subtitle="Full architectural scope, candidate contributions, and quantitative impact metrics"
        headerAction={
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setActiveView('project-intelligence')}
          >
            Deep Project Defense →
          </Button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((proj, idx) => (
            <div
              key={proj.id}
              className="bg-[#0c0f24] rounded-xl p-4 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-400 text-[10px] font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-bold text-white font-mono">{proj.title}</span>
                  </div>
                  <Badge variant={proj.interviewRisk === 'HIGH' ? 'rose' : 'amber'} size="sm">
                    {proj.interviewRisk} Risk
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-300 leading-snug mb-2">{proj.description}</p>
                
                {proj.impactMetrics && (
                  <div className="bg-[#121634] p-2 rounded-lg border border-purple-500/20 text-[10px] text-purple-300 font-mono mb-2">
                    ⚡ <strong>Claimed Impact:</strong> {proj.impactMetrics}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-800/60">
                {proj.technologies.slice(0, 5).map((tech) => (
                  <span key={tech} className="text-[10px] bg-[#141830] text-purple-300 px-2 py-0.5 rounded">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* High-Risk Real Claims Detected */}
      <Card
        title="Classified Verifiable Claims (6 Claims Detected)"
        subtitle="Quantitative and architectural statements isolated for deep interview probing"
        headerAction={
          <Button
            variant="ghost"
            size="sm"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
            onClick={() => setActiveView('claim-verification')}
          >
            Verify All Claims
          </Button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {claims.map((claim) => (
            <div
              key={claim.id}
              className="bg-[#0c0f24] rounded-xl p-3.5 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between gap-2"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{claim.technology}</span>
                    <Badge variant="purple" size="sm">
                      {claim.claimedLevel}
                    </Badge>
                  </div>
                  <Badge
                    variant={claim.riskLevel === 'HIGH' ? 'rose' : claim.riskLevel === 'MEDIUM' ? 'amber' : 'emerald'}
                    size="sm"
                  >
                    {claim.riskLevel} RISK
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">
                  "{claim.contextSnippet}"
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
                <span className="text-[10px] text-purple-300 font-mono truncate max-w-[240px]">
                  Target: {claim.verificationQuestion}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveView('claim-verification')}
                >
                  Verify
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Primary CTA: Confirm Resume & Start Balanced Defense */}
      <div className="bg-gradient-to-r from-purple-900/40 via-[#121636] to-indigo-900/40 rounded-2xl p-6 border border-purple-500/40 shadow-glow flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="text-base font-bold text-white">
              Resume Ingestion & Entity Verification Complete
            </h3>
          </div>
          <p className="text-xs text-slate-300 max-w-xl">
            PrepForge has calibrated 10 interview rounds with equal coverage across Traffix, Student Project Repository, and Smart Agricultural Advisory.
          </p>
        </div>

        <Button
          variant="primary"
          size="lg"
          icon={<ArrowRight className="w-5 h-5" />}
          iconPosition="right"
          onClick={() => {
            jumpToQuestion(0);
            setActiveView('resume-interview');
          }}
          className="shadow-glow"
        >
          Confirm Resume & Start Balanced Defense
        </Button>
      </div>
    </div>
  );
};
