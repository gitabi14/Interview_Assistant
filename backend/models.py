from typing import List, Dict, Optional, Any, Union
from pydantic import BaseModel, Field

# --- Candidate Profile & Contact ---
class CandidateContact(BaseModel):
    name: str = "ABISHEK R"
    email: str = "abishekkrajavel99@gmail.com"
    phone: Optional[str] = "7448665599"
    location: Optional[str] = "Tamil Nadu, India"
    linkedin: Optional[str] = "linkedin.com/in/abishek-r"
    github: Optional[str] = "github.com/abhisekrajavel99"
    leetcode: Optional[str] = "leetcode.com/Abishek"

class EducationItem(BaseModel):
    institution: str = "Bannari Amman Institute of Technology"
    location: Optional[str] = "Sathyamangalam"
    degree: str = "Bachelor of Engineering"
    field: str = "Computer Science"
    cgpa: Optional[str] = "7.8/10"
    start_year: Optional[int] = 2024
    end_year: Optional[int] = 2028

# --- Skills Hierarchy (No fake 'Advanced' defaults) ---
class SkillItem(BaseModel):
    name: str
    mentioned: bool = True
    claimed_level: Optional[str] = None  # None unless explicitly stated in resume
    demonstrated_level: Optional[str] = None
    verification_confidence: Optional[int] = None
    category: str = "Languages"

class SkillsHierarchy(BaseModel):
    languages: List[str] = []
    frameworks: List[str] = []
    databases: List[str] = []
    ml_ai: List[str] = []
    tools_apis: List[str] = []
    concepts: List[str] = []

# --- Real Resume Claims ---
class RealResumeClaim(BaseModel):
    id: str
    claim: str
    source_project: str
    source_text: str
    type: str = "PERFORMANCE"  # TECHNOLOGY | ARCHITECTURE | PERFORMANCE | METRIC | OWNERSHIP | IMPLEMENTATION | DECISION | RESULT
    technology: Optional[str] = None
    verification_question: str
    expected_evidence: List[str] = []
    risk_level: str = "MEDIUM"

# --- Extracted Project ---
class ExtractedProject(BaseModel):
    id: str
    name: str
    description: str
    bullet_points: List[str] = []
    technologies: List[str] = []
    candidate_contribution: str = ""
    architecture: str = ""
    metrics: List[str] = []
    impact: str = ""
    github_url: Optional[str] = None
    claims: List[RealResumeClaim] = []
    interview_topics: List[str] = []
    risk_areas: List[str] = []

# --- Section Detection Metadata ---
class SectionDetectionMetadata(BaseModel):
    sections_detected: List[str] = []
    project_count: int = 0
    skills_count: int = 0
    claims_count: int = 0
    confidence_score: float = 0.98
    warnings: List[str] = []

# --- Complete Canonical Resume Object ---
class CanonicalResumeObject(BaseModel):
    candidate: CandidateContact
    summary: str = ""
    education: List[EducationItem] = []
    skills_hierarchy: SkillsHierarchy
    skills_flat: List[SkillItem] = []
    projects: List[ExtractedProject] = []
    certifications: List[str] = []
    achievements: List[str] = []
    claims: List[RealResumeClaim] = []
    section_metadata: SectionDetectionMetadata
    raw_text_length: int = 0
    text_preview: str = ""

class ResumeExtractionResponse(BaseModel):
    success: bool = True
    filename: str
    pages: int = 1
    text_length: int = 0
    text_preview: str = ""
    is_scanned: bool = False
    message: str = "Resume parsed successfully."
    resume: CanonicalResumeObject

# --- Project Coverage Tracker ---
class ProjectCoverageItem(BaseModel):
    name: str
    questions_planned: int = 3
    questions_asked: int = 0
    topics_covered: List[str] = []
    claims_verified: List[str] = []

# --- Question & Interview Engine ---
class ResumeQuestionItem(BaseModel):
    id: str
    question: str
    category: str = "project_technical"  # intro | project_technical | architecture | metric | challenge | cross_project
    source: str = "resume_claim"
    source_project: str
    source_claim: str
    target_skill: str
    difficulty: str = "medium"  # entry | medium | hard | staff
    expected_topics: List[str] = []
    why_this_question: str
    depth_level: int = 3

class ResumeQuestionsRequest(BaseModel):
    company: str = "Microsoft"
    role: str = "Software Engineer"
    company_type: str = "PRODUCT-BASED"
    resume_data: Optional[Dict[str, Any]] = None

class ResumeQuestionsResponse(BaseModel):
    success: bool = True
    company: str
    role: str
    total_questions: int
    project_coverage: Dict[str, ProjectCoverageItem]
    questions: List[ResumeQuestionItem]

# --- Sample / Ideal Answer ---
class SampleAnswerRequest(BaseModel):
    question_id: Optional[str] = "q-1"
    question: str
    source_project: Optional[str] = ""
    source_claim: Optional[str] = ""
    role: Optional[str] = "Software Engineer"
    company: Optional[str] = "Microsoft"

class SampleAnswerResponse(BaseModel):
    success: bool = True
    question: str
    source_project: str
    sample_answer: str
    answer_structure: List[str] = []
    key_points: List[str] = []
    common_mistakes: List[str] = []
    how_to_improve: str = ""

# --- Answer Submission & Progressive Evaluation ---
class InterviewAnswerRequest(BaseModel):
    session_id: Optional[str] = "session-1"
    question_id: str
    question_text: str
    answer_text: str
    source_project: Optional[str] = ""
    source_claim: Optional[str] = ""
    company: str = "Microsoft"
    role: str = "Software Engineer"
    current_depth: int = 3
    current_topic: Optional[str] = "System Architecture"
    current_subtopic: Optional[str] = None
    current_difficulty: Optional[int] = 3
    conversation_history: Optional[List[Dict[str, Any]]] = []
    previous_answers: Optional[List[Dict[str, Any]]] = []
    candidate_skills: Optional[List[Dict[str, Any]]] = []

class InterviewAnswerResponse(BaseModel):
    success: bool = True
    question_id: str
    source_project: str = "General Technical"
    answer_type: str = "STRONG"  # STRONG | PARTIAL | WEAK | UNKNOWN | OFF_TOPIC
    score: int = 75
    overall_score: int = 75
    completeness_score: int = 75
    technical_accuracy: int = 75
    technical_correctness: int = 75
    depth: int = 3
    depth_demonstrated: Any = "Intermediate"
    specificity: int = 70
    relevance: int = 80
    evidence: int = 70
    reasoning: int = 75
    communication: int = 75
    ownership: int = 80
    is_unknown: bool = False
    concept_explanation: Optional[str] = None
    concept_example: Optional[str] = None
    retry_question: Optional[str] = None
    current_topic: Optional[str] = "Operating Systems"
    current_subtopic: Optional[str] = None
    current_difficulty: int = 3
    next_action: str = "FOLLOW_UP"  # FOLLOW_UP | DEEP_PROBE | CLARIFY | TEACH_RETEST | REDIRECT | NEW_TOPIC
    reason: Optional[str] = ""
    strengths: List[str] = []
    weaknesses: List[str] = []
    missing_points: List[str] = []
    missing_concepts: List[str] = []
    detected_claims: List[str] = []
    detected_concepts: List[str] = []
    interviewer_risk: str = "MEDIUM"
    frank_feedback: str
    predicted_followups: List[Dict[str, Any]] = []
    skill_impacts: List[Dict[str, Any]] = []

# --- Follow-Up Probing ---
class FollowUpRequest(BaseModel):
    original_question: str
    candidate_answer: str
    source_project: Optional[str] = ""
    detected_concepts: List[str] = []
    current_depth: int = 3
    company: Optional[str] = "Microsoft"
    role: Optional[str] = "Software Engineer"

class FollowUpResponse(BaseModel):
    success: bool = True
    source_project: str
    follow_up_question: str
    reason: str
    target_concept: str
    difficulty: str = "advanced"
    traceability: Dict[str, Any] = {}

# --- Claim Verification ---
class ClaimVerificationRequest(BaseModel):
    claim_text: str
    technology: str
    source_project: str
    claimed_level: Optional[str] = None
    answer: str = ""

class ClaimVerificationResponse(BaseModel):
    success: bool = True
    technology: str
    source_project: str
    demonstrated_level: str
    evidence_confidence: int
    evidence_status: str
    findings_pros: List[str] = []
    findings_gaps: List[str] = []
    risk_level: str = "MEDIUM"

# --- Coding Evaluation & Challenges ---
class CodingEvaluationRequest(BaseModel):
    challenge_id: str
    language: str
    code: str
    target_company: Optional[str] = "Microsoft"
    target_role: Optional[str] = "Software Engineer"
    custom_input: Optional[str] = None

class CodingEvaluationResponse(BaseModel):
    success: bool = True
    passed: bool
    passed_test_cases: int
    total_test_cases: int
    time_complexity: str
    space_complexity: str
    is_optimal: bool
    correctness_score: int = 100
    efficiency_score: int = 90
    code_quality_score: int = 85
    company_verdict: str = "Strong Hire"
    company_calibration: str = ""
    feedback: str
    strengths: List[str] = []
    improvements: List[str] = []
    optimal_solution: Optional[str] = None
    test_results: List[Dict[str, Any]] = []
    execution_engine: str = "Judge0 Native Sandbox"
    execution_time_ms: float = 20.0

class CodingSuggestRequest(BaseModel):
    target_company: str = "Microsoft"
    target_role: str = "Software Engineer"
    difficulty: Optional[str] = None
    weak_topics: Optional[List[str]] = []

class CodingSuggestResponse(BaseModel):
    challenge: Dict[str, Any]
    recommendation_reason: str
    company_rubric: str

# --- Behavioral Evaluation ---
class BehavioralEvaluationRequest(BaseModel):
    situation: str
    task: str
    action: str
    result: str

class BehavioralEvaluationResponse(BaseModel):
    success: bool = True
    overall_score: int
    ownership_score: int
    decision_making_score: int
    quantified_impact: bool
    feedback: str
    interviewer_perspective: str

# --- RAG ---
class RagSearchRequest(BaseModel):
    query: str
    top_k: int = 4

class RagSearchResponse(BaseModel):
    success: bool = True
    query: str
    results: List[Dict[str, Any]] = []

# --- Readiness Calculation ---
class ReadinessCalculationRequest(BaseModel):
    skills: List[Dict[str, Any]] = []
    answers: List[Dict[str, Any]] = []
    claims: List[Dict[str, Any]] = []
    projects: List[Dict[str, Any]] = []
    role: str = "Software Engineer"
    company: str = "Microsoft"

class ReadinessCalculationResponse(BaseModel):
    success: bool = True
    overall_readiness: int
    project_knowledge_score: int
    technical_depth_score: int
    claim_credibility_score: int
    problem_solving_score: int
    communication_score: int
    hiring_bar_verdict: str
    strongest_areas: List[str] = []
    weakest_areas: List[str] = []
    claims_requiring_prep: List[Dict[str, Any]] = []
    learning_plan: List[Dict[str, Any]] = []

# --- Interactive AI Agent Chat ---
class AgentChatRequest(BaseModel):
    message: str
    conversation_history: List[Dict[str, Any]] = []
    candidate_context: Optional[Dict[str, Any]] = None
    target: Optional[Dict[str, Any]] = None
    active_view: Optional[str] = "dashboard"

class AgentChatResponse(BaseModel):
    success: bool = True
    reply: str
    action: Optional[str] = None  # NAVIGATE | START_INTERVIEW | TEST_PROJECT | TEST_TOPIC | INCREASE_DIFFICULTY | TEACH_CONCEPT | START_CODING | GENERATE_LEARNING_PLAN | VIEW_READINESS
    action_payload: Optional[Dict[str, Any]] = None
    action_label: Optional[str] = None

