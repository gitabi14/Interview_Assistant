'use client';

import React from 'react';
import { usePrepForge } from '../store/PrepForgeContext';
import { useAuth } from '../store/AuthContext';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';

// Auth Views
import { LoginView } from '../components/auth/LoginView';
import { SignupView } from '../components/auth/SignupView';

// Refactored Dashboard (No notifications, 2 primary pillar cards)
import { RefactoredDashboard } from '../components/dashboard/RefactoredDashboard';

// Part 1 — Resume Intelligence Views
import { ResumeUploadView } from '../components/views/ResumeUploadView';
import { ResumeIntelligenceView } from '../components/views/ResumeIntelligenceView';
import { ResumeRoleFitView } from '../components/views/ResumeRoleFitView';
import { ProjectIntelligenceView } from '../components/views/ProjectIntelligenceView';
import { ProjectTransformationView } from '../components/views/ProjectTransformationView';
import { ResumeInterviewView } from '../components/views/ResumeInterviewView';

// Part 2 — Technical Interview Views
import { CompanyRoleSelector } from '../components/views/CompanyRoleSelector';
import { AdaptiveInterviewView } from '../components/views/AdaptiveInterviewView';
import { CodingChallengeView } from '../components/views/CodingChallengeView';
import { TechnicalAssessmentView } from '../components/views/TechnicalAssessmentView';
import { SystemDesignView } from '../components/views/SystemDesignView';
import { BehavioralInterviewView } from '../components/views/BehavioralInterviewView';

// Progress Views
import { SkillIntelligenceView } from '../components/views/SkillIntelligenceView';
import { PersonalizedLearningView } from '../components/views/PersonalizedLearningView';
import { ReadinessReportView } from '../components/views/ReadinessReportView';

// Settings & System Views
import { SettingsProfileView } from '../components/views/SettingsProfileView';
import { SystemStatusView } from '../components/views/SystemStatusView';

import { AICoachDrawer } from '../components/chat/AICoachDrawer';

export default function Home() {
  const { activeView } = usePrepForge();
  const { isAuthenticated } = useAuth();

  // Route auth views - Login is the first screen if unauthenticated
  if (!isAuthenticated || activeView === 'login') {
    return <LoginView />;
  }

  if (activeView === 'signup') {
    return <SignupView />;
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <RefactoredDashboard />;

      // PART 1 — RESUME INTELLIGENCE
      case 'resume-upload':
        return <ResumeUploadView />;
      case 'resume-analysis':
      case 'resume-intelligence':
        return <ResumeIntelligenceView />;
      case 'resume-role-fit':
        return <ResumeRoleFitView />;
      case 'projects-claims':
      case 'project-intelligence':
      case 'claim-verification':
        return <ProjectIntelligenceView />;
      case 'project-reframe':
      case 'project-transformation':
        return <ProjectTransformationView />;
      case 'resume-interview':
        return <ResumeInterviewView />;

      // PART 2 — TECHNICAL INTERVIEW
      case 'interview-setup':
      case 'company-role':
        return <CompanyRoleSelector />;
      case 'adaptive-interview':
      case 'followup-intelligence':
        return <AdaptiveInterviewView />;
      case 'coding-dsa':
        return <CodingChallengeView />;
      case 'cs-fundamentals':
        return <TechnicalAssessmentView />;
      case 'system-design':
        return <SystemDesignView />;
      case 'behavioral-situational':
        return <BehavioralInterviewView />;

      // PROGRESS
      case 'skill-intelligence':
      case 'skill-gap-analysis':
        return <SkillIntelligenceView />;
      case 'learning-plan':
        return <PersonalizedLearningView />;
      case 'readiness-report':
        return <ReadinessReportView />;

      // SETTINGS & SYSTEM
      case 'settings':
      case 'my-profile':
        return <SettingsProfileView />;
      case 'system-status':
        return <SystemStatusView />;

      default:
        return <RefactoredDashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#080a12] text-slate-100 relative">
      {/* Fixed Left Sidebar with exact new Information Architecture */}
      <Sidebar />

      {/* Main Layout Area with Margin for Fixed Sidebar */}
      <div className="flex-1 flex flex-col pl-64 min-w-0">
        {/* Top Navigation Header */}
        <Topbar />

        {/* Spacious Main Workspace */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-full">
          {renderActiveView()}
        </main>
      </div>

      {/* Interactive AI Career Coach Agent Drawer */}
      <AICoachDrawer />
    </div>
  );
}
