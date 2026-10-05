'use client';

import React, { useState } from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Compass, Sparkles, Copy, Check, ArrowRight, Layers, Code2, Brain, BarChart3 } from 'lucide-react';

export const ProjectTransformationView: React.FC = () => {
  const { selectedProject, selectedRoleReframe, setSelectedRoleReframe, setActiveView } = usePrepForge();

  const [copied, setCopied] = useState(false);

  const reframeOptions = selectedProject.reframeOptions || [];
  const currentReframe =
    reframeOptions.find((r) => r.role === selectedRoleReframe) || reframeOptions[0];

  const handleCopy = () => {
    if (currentReframe) {
      const textToCopy = currentReframe.bulletPoints.join('\n');
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="sm">
              ROLE REFRAMING & RESUME SYNTHESIS
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Project Transformation Engine
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            The same project must be reframed based on role. Convert research-heavy descriptions into software engineering rigor.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          onClick={handleCopy}
        >
          {copied ? 'Copied to Clipboard!' : 'Copy Tailored Bullet Points'}
        </Button>
      </div>

      {/* Role Selection Switcher */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {reframeOptions.map((opt) => {
          const isSelected = opt.role === currentReframe?.role;
          const getIcon = (roleName: string) => {
            if (roleName.includes('Software')) return <Code2 className="w-4 h-4" />;
            if (roleName.includes('Machine')) return <Brain className="w-4 h-4" />;
            return <BarChart3 className="w-4 h-4" />;
          };

          return (
            <button
              key={opt.role}
              onClick={() => setSelectedRoleReframe(opt.role)}
              className={`p-4 rounded-xl text-left border transition-all flex items-center justify-between ${
                isSelected
                  ? 'bg-purple-600/15 border-purple-500 shadow-glow'
                  : 'bg-[#12152b] border-[#21264b] hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-purple-500 text-white' : 'bg-[#181d3d] text-purple-400'}`}>
                  {getIcon(opt.role)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{opt.role}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {isSelected ? 'ACTIVE VIEW' : 'Click to Switch'}
                  </span>
                </div>
              </div>
              {isSelected && <span className="text-purple-400 font-bold text-sm">✓</span>}
            </button>
          );
        })}
      </div>

      {currentReframe && (
        <>
          {/* Architectural Focus Summary */}
          <div className="bg-[#12152b] rounded-2xl p-5 border border-purple-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-purple-300">
                Recommended Architectural Focus for {currentReframe.role}
              </h3>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              {currentReframe.architectureFocus}
            </p>
          </div>

          {/* Side-by-Side: What to Emphasize vs De-Emphasize */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Emphasize */}
            <Card
              title="What to Emphasize in Interviews & Resume"
              subtitle="Highlight these technical dimensions for maximum hiring bar impact"
              className="border-emerald-500/20"
            >
              <ul className="space-y-2 text-xs">
                {currentReframe.emphasis.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-200">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* De-Emphasize */}
            <Card
              title="What to De-Emphasize"
              subtitle="Avoid getting bogged down in low-relevance theoretical tangents"
              className="border-rose-500/20"
            >
              <ul className="space-y-2 text-xs">
                {currentReframe.deEmphasize.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-400">
                    <span className="text-rose-400 font-bold shrink-0">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Generated Resume Bullets */}
          <Card
            title={`Generated Tailored Resume Bullets (${currentReframe.role})`}
            subtitle="Optimized with quantified impact, metrics, and hiring-manager keywords"
            headerAction={
              <Button
                variant="secondary"
                size="sm"
                icon={copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                onClick={handleCopy}
              >
                {copied ? 'Copied' : 'Copy Bullets'}
              </Button>
            }
          >
            <div className="space-y-3 bg-[#0b0e21] p-4 rounded-xl border border-slate-800 font-mono text-xs">
              {currentReframe.bulletPoints.map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2 text-slate-200 leading-relaxed">
                  <span className="text-purple-400 font-bold shrink-0">•</span>
                  <span>{bullet}</span>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {/* CTA to test claims */}
      <div className="bg-[#12152b] rounded-2xl p-6 border border-[#21264b] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Ready to defend these claims in mock interviews?</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Test whether you can defend YOLOv8, FastAPI, and MongoDB against aggressive technical probes.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
          onClick={() => setActiveView('claim-verification')}
        >
          Verify Resume Claims Live
        </Button>
      </div>
    </div>
  );
};
