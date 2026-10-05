'use client';

import React from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Briefcase,
  Layers,
  Cpu,
  ShieldAlert,
  ArrowRight,
  Server,
  Activity,
  Terminal,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const ProjectIntelligenceView: React.FC = () => {
  const { projects, selectedProject, setSelectedProject, setActiveView } = usePrepForge();

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="sm">
              DEEP ARCHITECTURAL AUDIT
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Project Intelligence</h2>
          <p className="text-xs text-slate-400 mt-1">
            Comprehensive breakdown of candidate projects: architecture, scalability bottlenecks, deployment, and interviewer risk points.
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
            Project Reframe Engine
          </Button>
        </div>
      </div>

      {/* Project Selector Tabs */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {projects.map((proj) => {
          const isSelected = selectedProject.id === proj.id;
          return (
            <button
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 border ${
                isSelected
                  ? 'bg-purple-600 text-white border-purple-400/50 shadow-glow'
                  : 'bg-[#12152b] text-slate-300 border-[#21264b] hover:border-slate-600 hover:text-white'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{proj.title}</span>
              <Badge variant={proj.interviewRisk === 'HIGH' ? 'rose' : 'emerald'} size="sm">
                {proj.interviewRisk} Risk
              </Badge>
            </button>
          );
        })}
      </div>

      {/* Primary Project Hero Details */}
      <div className="bg-gradient-to-br from-[#161a38] via-[#12152e] to-[#0d1024] rounded-2xl p-6 border border-purple-500/30 shadow-glow">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300">
                PRIMARY DEMO PROJECT
              </span>
              <Badge variant="purple" size="sm">
                Full-Stack & Computer Vision
              </Badge>
            </div>
            <h3 className="text-2xl font-extrabold text-white font-mono">{selectedProject.title}</h3>
            <p className="text-xs text-slate-300 mt-0.5">{selectedProject.subtitle}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#0b0e21] px-4 py-2.5 rounded-xl border border-rose-500/40 text-right">
              <span className="text-[10px] uppercase font-bold text-rose-400 block">Interviewer Risk</span>
              <span className="text-sm font-extrabold font-mono text-white">{selectedProject.interviewRisk} PROBE RISK</span>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-5 bg-[#0b0e21]/70 p-3.5 rounded-xl border border-slate-800">
          {selectedProject.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
          <span className="text-xs font-semibold text-slate-400 mr-2">Technologies:</span>
          {selectedProject.technologies.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono font-medium px-2.5 py-1 rounded-lg bg-purple-950/60 text-purple-300 border border-purple-800/50"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Deep Dive Architecture & Evaluation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Architecture & Flow */}
        <Card title="System Architecture & Data Flow" subtitle="End-to-end telemetry and inference pipeline">
          <div className="space-y-3 text-xs">
            <div className="bg-[#0b0e21] p-3.5 rounded-xl border border-slate-800 font-mono text-purple-200 text-[11px] leading-relaxed">
              {selectedProject.architecture}
            </div>

            <div className="pt-2">
              <span className="font-bold text-slate-300 block mb-1">Candidate Contribution:</span>
              <p className="text-slate-400 leading-relaxed">{selectedProject.candidateContribution}</p>
            </div>

            <div className="pt-2 border-t border-slate-800/60 flex justify-between">
              <span className="text-slate-400">Engineering Complexity:</span>
              <span className="font-semibold text-purple-300">{selectedProject.complexity}</span>
            </div>
          </div>
        </Card>

        {/* Scalability, Deployment & Impact */}
        <Card title="Scalability, Deployment & Testing" subtitle="Operational metrics and benchmarking">
          <div className="space-y-3 text-xs">
            <div>
              <span className="font-bold text-slate-300 block mb-0.5">Scalability & Bottlenecks:</span>
              <p className="text-slate-400 leading-relaxed">{selectedProject.scalabilityNotes}</p>
            </div>

            <div>
              <span className="font-bold text-slate-300 block mb-0.5">Deployment Environment:</span>
              <p className="text-slate-400 leading-relaxed">{selectedProject.deploymentDetails}</p>
            </div>

            <div>
              <span className="font-bold text-slate-300 block mb-0.5">Testing & Verification:</span>
              <p className="text-slate-400 leading-relaxed">{selectedProject.testingDetails}</p>
            </div>

            <div className="pt-2 border-t border-slate-800/60 bg-emerald-950/20 p-2.5 rounded-lg border border-emerald-500/20">
              <span className="font-bold text-emerald-400 block mb-0.5">Demonstrated Impact Metrics:</span>
              <p className="text-slate-200 font-mono text-[11px]">{selectedProject.impactMetrics}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Interviewer Risk Diagnosis */}
      <Card
        title="Interviewer Risk Diagnosis"
        subtitle="Where technical interviewers will aggressively challenge this project"
        className="border-rose-500/30"
      >
        <div className="bg-[#0b0e21] p-4 rounded-xl border border-rose-500/20 space-y-3 text-xs">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-rose-300">Why is this project High Risk for Microsoft SDE?</h4>
              <p className="text-slate-300 mt-1 leading-relaxed">
                {selectedProject.riskExplanation}
              </p>
            </div>
          </div>

          <div className="bg-[#141830] p-3 rounded-lg border border-slate-800 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-purple-300">Likely Probe Vectors:</span>
            <ul className="space-y-1 text-slate-300 list-disc pl-4">
              <li>"How did you handle WebSocket backpressure when vehicle detection lagged behind video stream ingress?"</li>
              <li>"Why did you choose MongoDB over a specialized Time-Series DB like TimescaleDB for traffic trajectory logs?"</li>
              <li>"How would you scale this architecture from 4 local CCTV streams to 10,000 city intersections?"</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};
