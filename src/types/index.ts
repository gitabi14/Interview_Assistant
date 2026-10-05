export type CompanyType = 'PRODUCT-BASED' | 'SERVICE-BASED MNC' | 'STARTUP' | 'AI/ML COMPANY';

export type NavigationItem =
  | 'dashboard'
  // PART 1 — RESUME INTELLIGENCE
  | 'resume-intelligence'
  | 'resume-upload'
  | 'resume-analysis'
  | 'resume-role-fit'
  | 'projects-claims'
  | 'project-reframe'
  | 'resume-interview'
  // PART 2 — TECHNICAL INTERVIEW
  | 'interview-setup'
  | 'adaptive-interview'
  | 'coding-dsa'
  | 'cs-fundamentals'
  | 'system-design'
  | 'behavioral-situational'
  // PROGRESS
  | 'skill-intelligence'
  | 'learning-plan'
  | 'readiness-report'
  // SETTINGS & SYSTEM
  | 'settings'
  | 'my-profile'
  | 'system-status'
  | 'login'
  | 'signup'
  // Aliases for backward compatibility
  | 'claim-verification'
  | 'project-transformation'
  | 'project-intelligence'
  | 'skill-gap-analysis'
  | 'followup-intelligence'
  | 'company-role';

export interface CandidateProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  education: string;
  degree: string;
  graduationYear: string;
  avatarUrl: string;
}

export interface TargetConfig {
  company: string;
  role: string;
  companyType: CompanyType;
  round: string;
  difficulty: 'Entry' | 'Intermediate' | 'Advanced' | 'Staff/Principal';
  focusAreas: string[];
}

export interface ResumeClaim {
  id: string;
  technology: string;
  claimedLevel: 'Basic' | 'Intermediate' | 'Advanced' | 'Expert';
  demonstratedLevel?: 'Basic' | 'Intermediate' | 'Advanced' | 'Expert' | 'Unverified';
  evidenceConfidence: number; // 0-100
  evidenceStatus: 'Strong' | 'Moderate' | 'Partial' | 'Weak' | 'Unverified';
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  contextSnippet: string;
  verificationQuestion: string;
  likelyFollowUps: string[];
  findings: {
    pros: string[];
    gaps: string[];
  };
}

export interface CandidateProject {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  architecture: string;
  candidateContribution: string;
  complexity: string;
  scalabilityNotes: string;
  deploymentDetails: string;
  testingDetails: string;
  impactMetrics: string;
  interviewRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  riskExplanation: string;
  reframeOptions: {
    role: string;
    emphasis: string[];
    deEmphasize: string[];
    bulletPoints: string[];
    architectureFocus: string;
  }[];
}

export interface SkillScore {
  name: string;
  category: 'Core CS' | 'Engineering' | 'Specialized' | 'Soft Skills';
  score: number; // 0-100
  benchmark: number; // 0-100 (company bar)
  status: 'Strong' | 'Adequate' | 'Needs Improvement' | 'Critical Gap';
  evidenceCount: number;
  recentDelta: number;
  notes: string;
}

export interface AlertNotification {
  id: string;
  type: 'CRITICAL SKILL GAP' | 'FOLLOW-UP PREDICTED' | 'RESUME CLAIM VERIFIED' | 'LEARNING RECOMMENDATION' | 'SYSTEM UPDATE';
  title: string;
  description: string;
  timestamp: string;
  severity: 'critical' | 'warning' | 'info' | 'success';
  actionLabel?: string;
  actionTarget?: NavigationItem;
}

export interface InterviewQuestion {
  id: string;
  depthLevel: number; // 1 to 7
  category: string;
  title: string;
  question: string;
  context: string;
  relatedClaimId?: string;
  timeLimitSeconds: number;
  hints: string[];
  sampleAnswerGuide: string;
  whyAsked?: string;
  sourceClaim?: string;
  expectedTopics?: string[];
}

export interface CandidateAnswer {
  questionId: string;
  questionText: string;
  answerText: string;
  timestamp: string;
  answerType?: 'STRONG' | 'PARTIAL' | 'WEAK' | 'UNKNOWN' | 'OFF_TOPIC';
  nextAction?: 'FOLLOW_UP' | 'DEEP_PROBE' | 'CLARIFY' | 'TEACH_RETEST' | 'REDIRECT' | 'NEW_TOPIC';
  currentTopic?: string;
  currentDifficulty?: number;
  extractedClaims: string[];
  detectedConcepts: string[];
  missingConcepts?: string[];
  isUnknown?: boolean;
  conceptExplanation?: string;
  conceptExample?: string;
  retryQuestion?: string;
  evaluation: {
    assessment: string;
    completenessScore: number; // 0-100
    technicalAccuracy: number; // 0-100
    depthDemonstrated: any;
    missingPoints: string[];
    strengths: string[];
    interviewerRisk: 'LOW' | 'MEDIUM' | 'HIGH';
    frankFeedback: string;
  };
  predictedFollowUps: {
    question: string;
    rationale: string;
    depthLevel: number;
    probability: number;
  }[];
  skillImpact: {
    skillName: string;
    delta: number;
    reason: string;
  }[];
}

export interface CodingChallenge {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  starterCode: { [lang: string]: string };
  testCases: {
    input: string;
    expectedOutput: string;
    explanation?: string;
    isHidden?: boolean;
  }[];
  expectedComplexity: {
    time: string;
    space: string;
  };
}

export interface LearningDayModule {
  day: number;
  topic: string;
  subtopics: string[];
  targetGap: string;
  estimatedMinutes: number;
  completed: boolean;
  coreConcepts: {
    title: string;
    explanation: string;
    codeOrDiagramSnippet?: string;
  }[];
  practiceQuestions: string[];
  drillPrompt: string;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  type: 'Job Description' | 'Interview Knowledge' | 'Role Knowledge' | 'Candidate Vector Context' | 'Engineering Blog';
  relevanceScore: number; // 0-100
  snippet: string;
  tags: string[];
  sourceUrl?: string;
}

export interface ReadinessBreakdown {
  overallScore: number; // e.g. 76%
  resumeFitScore: number; // e.g. 82%
  claimCredibilityScore: number; // e.g. 71%
  technicalScore: number; // 79%
  problemSolvingScore: number; // 84%
  communicationScore: number; // 78%
  behavioralScore: number; // 67%
  projectScore: number; // 92%
  positiveFactors: { label: string; delta: number }[];
  negativeFactors: { label: string; delta: number }[];
  recommendedAction: string;
}

export interface InterviewHistoryItem {
  id: string;
  date: string;
  company: string;
  role: string;
  round: string;
  score: number;
  questionsAnswered: number;
  maxDepthReached: number;
  criticalTopics: string[];
  strengths: string[];
  weaknesses: string[];
}
