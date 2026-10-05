'use client';

import React, { useState } from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { CompanyType } from '../../types';
import { Building2, Briefcase, Sparkles, Check, ArrowRight, Layers } from 'lucide-react';

export const CompanyRoleSelector: React.FC = () => {
  const { target, updateTarget, setActiveView } = usePrepForge();

  const [selectedCompany, setSelectedCompany] = useState(target.company);
  const [selectedRole, setSelectedRole] = useState(target.role);
  const [selectedType, setSelectedType] = useState<CompanyType>(target.companyType);

  const companies = [
    { name: 'Microsoft', type: 'PRODUCT-BASED' as CompanyType, icon: '🪟', color: 'purple' },
    { name: 'Google', type: 'PRODUCT-BASED' as CompanyType, icon: '🌐', color: 'cyan' },
    { name: 'Amazon', type: 'PRODUCT-BASED' as CompanyType, icon: '📦', color: 'amber' },
    { name: 'TCS', type: 'SERVICE-BASED MNC' as CompanyType, icon: '🏢', color: 'indigo' },
    { name: 'Infosys', type: 'SERVICE-BASED MNC' as CompanyType, icon: '💼', color: 'indigo' },
    { name: 'Accenture', type: 'SERVICE-BASED MNC' as CompanyType, icon: '🔺', color: 'indigo' },
    { name: 'Zoho', type: 'PRODUCT-BASED' as CompanyType, icon: '⚡', color: 'rose' },
    { name: 'OpenAI / Anthropic', type: 'AI/ML COMPANY' as CompanyType, icon: '🧠', color: 'emerald' },
    { name: 'Early-Stage Startup', type: 'STARTUP' as CompanyType, icon: '🚀', color: 'amber' },
  ];

  const roles = [
    'Software Engineer',
    'Backend Developer',
    'Frontend Developer',
    'Full Stack Developer',
    'ML Engineer',
    'Data Scientist',
    'Data Analyst',
    'DevOps Engineer',
    'Cloud Engineer',
  ];

  const companyTypeCategories = [
    {
      type: 'PRODUCT-BASED' as CompanyType,
      title: 'Product-Based Tech (Tier 1)',
      description: 'Focuses heavily on DSA depth, System Design, Concurrency/OS, OOP, and architectural defense.',
      focusList: ['DSA & Algorithms', 'Coding Depth', 'OOP & Design Patterns', 'Operating Systems', 'System Design', 'Behavioral STAR'],
    },
    {
      type: 'SERVICE-BASED MNC' as CompanyType,
      title: 'Service-Based MNC',
      description: 'Focuses on foundational CS concepts, aptitude, logical reasoning, core programming, and communication.',
      focusList: ['Aptitude & Logic', 'Basic Coding & Syntax', 'Core CS Fundamentals', 'Communication & HR', 'Project Overview'],
    },
    {
      type: 'STARTUP' as CompanyType,
      title: 'High-Growth Startup',
      description: 'Focuses on fast-paced practical execution, full-stack debugging, rapid prototyping, and extreme ownership.',
      focusList: ['Practical Development', 'Debugging & Triage', 'API & Architecture', 'Product Thinking', 'Adaptability & Ownership'],
    },
    {
      type: 'AI/ML COMPANY' as CompanyType,
      title: 'AI / ML Organization',
      description: 'Focuses on statistical modeling, deep learning architectures, inference latency, MLOps, and model evaluation.',
      focusList: ['Python & PyTorch', 'Machine Learning Theory', 'Computer Vision / NLP', 'Model Evaluation & Loss', 'Deployment & ONNX'],
    },
  ];

  const handleSave = () => {
    updateTarget(selectedCompany, selectedRole, selectedType);
    setActiveView('dashboard');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="sm">
              INTERVIEW CALIBRATION ENGINE
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Target Company & Role Configuration
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Configure your target destination. PrepForge AI dynamically adjusts interview difficulty, question priorities, and hiring bars.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={<Check className="w-4 h-4" />}
          onClick={handleSave}
        >
          Apply Configuration
        </Button>
      </div>

      {/* Step 1: Select Target Company */}
      <Card title="1. Select Target Company" subtitle="Choose from top tech firms or configure a custom enterprise">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {companies.map((comp) => {
            const isSelected = selectedCompany === comp.name;
            return (
              <div
                key={comp.name}
                onClick={() => {
                  setSelectedCompany(comp.name);
                  setSelectedType(comp.type);
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-purple-600/15 border-purple-500 shadow-glow'
                    : 'bg-[#0b0e21] border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{comp.icon}</span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{comp.name}</h4>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">{comp.type}</span>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
                    ✓
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Step 2: Select Target Role */}
      <Card title="2. Select Target Role" subtitle="Determines expected competencies, project reframing, and evaluation rubrics">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {roles.map((role) => {
            const isSelected = selectedRole === role;
            return (
              <div
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-purple-600/15 border-purple-500 shadow-glow'
                    : 'bg-[#0b0e21] border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className={`w-4 h-4 ${isSelected ? 'text-purple-300' : 'text-slate-400'}`} />
                  <span className="text-xs font-semibold text-white">{role}</span>
                </div>
                {isSelected && <span className="text-purple-400 font-bold text-xs">✓</span>}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Step 3: Company Category & Focus Matrix */}
      <Card title="3. Company Category Matrix" subtitle="How PrepForge AI calibrates question depth and topic weights">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {companyTypeCategories.map((cat) => {
            const isSelected = selectedType === cat.type;
            return (
              <div
                key={cat.type}
                onClick={() => setSelectedType(cat.type)}
                className={`p-5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-900/20 border-purple-500 shadow-glow'
                    : 'bg-[#0b0e21] border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={isSelected ? 'purple' : 'slate'} size="sm">
                    {cat.type}
                  </Badge>
                  {isSelected && <span className="text-xs font-bold text-purple-300 font-mono">ACTIVE TARGET</span>}
                </div>

                <h4 className="text-sm font-bold text-white mb-1">{cat.title}</h4>
                <p className="text-xs text-slate-400 mb-3">{cat.description}</p>

                <div className="space-y-1.5 pt-2 border-t border-slate-800/60">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Core Evaluation Pillars:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.focusList.map((f) => (
                      <span
                        key={f}
                        className="text-[11px] bg-[#141832] text-slate-300 px-2 py-0.5 rounded border border-slate-700/60"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Action footer */}
      <div className="bg-[#12152b] rounded-2xl p-6 border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-glow">
        <div>
          <h4 className="text-sm font-bold text-white">Ready to calibrate your preparation?</h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Configured: <strong className="text-purple-300">{selectedCompany}</strong> — <strong className="text-purple-300">{selectedRole}</strong> ({selectedType})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="md" onClick={() => setActiveView('dashboard')}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
            onClick={handleSave}
          >
            Save & Continue to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};
