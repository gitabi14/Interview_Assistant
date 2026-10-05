'use client';

import React, { useState } from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ProgressBar } from '../ui/ProgressBar';
import {
  MessageSquareQuote,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Briefcase,
  Cpu,
  Award,
  BookOpen,
  FolderGit2,
  ChevronRight,
  Code2,
  Lightbulb,
} from 'lucide-react';

export const ResumeInterviewView: React.FC = () => {
  const {
    claims,
    projects,
    questions,
    candidate,
    target,
    setActiveView,
    jumpToQuestion,
    updateClaimVerification,
  } = usePrepForge();

  const [activeCategory, setActiveCategory] = useState<'plan' | 'projects' | 'tech' | 'intro' | 'claims'>('plan');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('proj-1');
  const [selectedTech, setSelectedTech] = useState<string>('YOLOv8');
  const [practiceAnswer, setPracticeAnswer] = useState<string>('');
  const [verificationFeedback, setVerificationFeedback] = useState<any | null>(null);
  const [idealAnswers, setIdealAnswers] = useState<Record<string, { answer: string; loading: boolean }>>({});

  // Fetch Ideal Sample Answer from Backend
  const handleFetchIdealAnswer = async (qId: string, qText: string, projName: string, claimText: string) => {
    setIdealAnswers((prev) => ({ ...prev, [qId]: { answer: '', loading: true } }));
    try {
      const res = await fetch('http://127.0.0.1:8000/api/interview/sample-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question_id: qId,
          question_text: qText,
          source_project: projName,
          source_claim: claimText,
          target_role: target.role,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setIdealAnswers((prev) => ({ ...prev, [qId]: { answer: data.ideal_answer, loading: false } }));
        return;
      }
    } catch (err) {
      console.warn('Backend ideal answer fetch error, using fallback:', err);
    }
    // Fallback ideal answer
    setIdealAnswers((prev) => ({
      ...prev,
      [qId]: {
        answer: `In ${projName}, when addressing "${claimText}", I established clear constraints around latency SLAs and memory utilization. By architecting an asynchronous decoupled pipeline and applying quantitative profiling (monitoring p99 latency), we achieved optimal performance while maintaining robust error boundaries.`,
        loading: false,
      },
    }));
  };

  // Resume Introduction Questions
  const introQuestions = [
    { q: 'Tell me about yourself and your technical journey.', purpose: 'Evaluates concise communication and professional narrative.' },
    { q: 'Walk me through your resume highlighting your core engineering strengths.', purpose: 'Tests ability to summarize achievements without reciting line-by-line.' },
    { q: 'Which project on your resume are you most proud of and why?', purpose: 'Probes passion, ownership, and deep technical conviction.' },
    { q: 'What is your strongest technical skill and what is one area you are actively improving?', purpose: 'Tests self-awareness, intellectual honesty, and growth mindset.' },
  ];

  // Multi-Project Questions Breakdown
  const projectQuestionsMap: Record<string, { title: string; tech: string; questions: { q: string; focus: string }[] }> = {
    'proj-1': {
      title: 'TRAFFIX — Real-Time Edge Traffic Flow Optimization',
      tech: 'Python, YOLOv8, FastAPI, OpenCV, Docker',
      questions: [
        { q: 'Explain the end-to-end architecture of your Traffix urban traffic management system.', focus: 'Edge Video Ingestion -> YOLOv8 Detection -> Async Queue -> Spatial Analysis -> FastAPI Broadcast' },
        { q: 'How did you achieve a 35% reduction in traffic signal wait time?', focus: 'Dynamic cycle timing algorithm adjusting green light duration based on vehicle density' },
        { q: 'What was your individual contribution vs open-source pre-trained components?', focus: 'Trained YOLOv8 on 12,000 custom annotated frames, engineered async FastAPI backend' },
        { q: 'How did you handle camera stream backpressure and GPU VRAM saturation at 30 FPS?', focus: 'Decoupled ring-buffer queues, zero-copy frame tensors, and FP16 quantization' },
      ],
    },
    'proj-2': {
      title: 'STUDENT PROJECT REPOSITORY & CODE EVALUATION',
      tech: 'FastAPI, FAISS, PyTorch, LangChain, React, Docker',
      questions: [
        { q: 'How did you design the semantic search and similarity index with FAISS?', focus: 'Embedding code AST and docstrings into dense vector space with IVF-Flat indexing under 20ms' },
        { q: 'How does your plagiarism and AST structural comparison engine work?', focus: 'Combines tree-sitter AST diffing with normalized token cosine similarity' },
        { q: 'How did you validate the 50% faculty review effort reduction metric?', focus: 'Automated test suite execution, rubric linting, and automated similarity flagging before manual grading' },
      ],
    },
    'proj-3': {
      title: 'SMART AGRICULTURAL DISASTER ADVISORY PLATFORM',
      tech: 'Python, Gemini API, Leaflet, OpenWeatherMap, FastAPI',
      questions: [
        { q: 'How does your disaster advisory engine synthesize multi-source telemetry and weather data?', focus: 'Telemetry ingestion, weather threshold alerts, and localized multilingual LLM prompting' },
        { q: 'How did you ensure 94% delivery reliability for time-sensitive SMS/push alerts?', focus: 'Exponential backoff retries, multi-carrier webhook fallbacks, and transactional delivery state logging' },
        { q: 'How did you mitigate LLM hallucinations when generating agricultural treatment advice?', focus: 'Strict RAG grounding on certified agricultural extension manuals with temperature set to 0.1' },
      ],
    },
  };

  // Technology Questions dictionary
  const techQuestionsMap: Record<string, { q: string; probe: string }[]> = {
    'YOLOv8': [
      { q: 'Why did you choose YOLOv8 over Faster R-CNN or SSD for real-time edge processing?', probe: 'Single-stage anchor-free vs two-stage RPN latency SLA' },
      { q: 'How does YOLOv8 work internally (backbone, neck, decoupled head)?', probe: 'CSPDarknet, PANet feature pyramid, and loss calculation' },
      { q: 'How did you evaluate detection accuracy and what was your mAP@0.5 score?', probe: 'Validation on custom annotated dataset with 91% precision' },
      { q: 'How did you optimize inference latency when streaming 4 concurrent 1080p feeds?', probe: 'TensorRT / ONNX Runtime FP16 quantization & zero-copy frame queues' },
    ],
    'FastAPI': [
      { q: 'Why choose FastAPI over Flask or Django for this real-time telemetry service?', probe: 'AsyncIO native event loop, Pydantic data validation, high RPS' },
      { q: 'How did you structure your API endpoints and WebSocket broadcast connections?', probe: 'Connection manager, streaming generators, and backpressure handling' },
      { q: 'How does the ASGI worker model (Uvicorn/Gunicorn) scale under heavy traffic?', probe: 'Event loop concurrency vs multi-process OS worker pools' },
    ],
    'FAISS': [
      { q: 'What vector index type did you choose in FAISS (FlatL2, IndexIVFFlat, HNSW) and why?', probe: 'IndexIVFFlat trade-off between sub-20ms search speed and recall accuracy' },
      { q: 'How did you handle vector index persistence and updates as new student projects were submitted?', probe: 'Incremental index writing and periodic background rebuilds' },
    ],
    'PyTorch': [
      { q: 'How did you manage GPU tensor allocations and prevent out-of-memory errors during batch inference?', probe: 'torch.no_grad(), explicit cache clearance, and dynamic batch size throttling' },
      { q: 'Explain your model evaluation methodology and loss function selection.', probe: 'Cross-entropy with focal loss for handling class imbalance' },
    ],
    'Gemini API': [
      { q: 'How did you structure system prompts and context caching with the Gemini API for agronomic advice?', probe: 'Role definition, few-shot grounding with extension data, schema validation' },
      { q: 'How did you handle rate limits and API fallback gracefully?', probe: 'Token bucket rate limiter with local cached guidance database' },
    ],
  };

  const handleTestClaim = () => {
    if (!practiceAnswer.trim()) {
      setPracticeAnswer(
        "I chose YOLOv8 because it is an anchor-free single-stage detector delivering 45+ FPS with sub-50ms latency. In contrast, Faster R-CNN relies on a two-stage Region Proposal Network (RPN) which introduces ~120ms latency, violating our 30 FPS camera ingest SLA."
      );
    }

    setVerificationFeedback({
      technology: 'YOLOv8',
      claimedLevel: 'Advanced',
      demonstratedLevel: 'Intermediate',
      confidence: 72,
      pros: ['Accurately distinguished single-stage vs two-stage detector latency', 'Cites real-time 30 FPS SLA'],
      gaps: ['Did not explain ONNX Runtime quantization', 'Vague on GPU memory contention under 4 concurrent streams'],
      feedback: 'Your answer is technically sound on architecture trade-offs, demonstrating strong competence with minor gaps in memory buffer optimization.',
    });

    updateClaimVerification(
      'claim-1',
      'Intermediate',
      72,
      ['Accurately distinguished single-stage vs two-stage detector latency', 'Cites real-time 30 FPS SLA'],
      ['Did not explain ONNX Runtime quantization']
    );
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="sm">
              RESUME CLAIM DEFENSE ENGINE
            </Badge>
            <Badge variant="emerald" size="sm">
              3/3 PROJECTS BALANCED
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Balanced 10-Round Interview Coverage & Project Defense
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Equal question distribution across Traffix, Student Project Repository, Smart Agricultural Advisory, and Cross-Project Synthesis.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<Play className="w-4 h-4 fill-white" />}
          onClick={() => {
            jumpToQuestion(0);
            setActiveView('adaptive-interview');
          }}
        >
          Start Live Defense Simulation
        </Button>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveCategory('plan')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeCategory === 'plan'
              ? 'bg-purple-600 text-white shadow-glow border border-purple-400/40'
              : 'bg-[#12152b] text-slate-400 border border-[#21264b] hover:text-white'
          }`}
        >
          10-Round Balanced Plan ({questions.length} Rounds)
        </button>

        <button
          onClick={() => setActiveCategory('projects')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeCategory === 'projects'
              ? 'bg-purple-600 text-white shadow-glow border border-purple-400/40'
              : 'bg-[#12152b] text-slate-400 border border-[#21264b] hover:text-white'
          }`}
        >
          Project Defense (All 3 Projects)
        </button>

        <button
          onClick={() => setActiveCategory('tech')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeCategory === 'tech'
              ? 'bg-purple-600 text-white shadow-glow border border-purple-400/40'
              : 'bg-[#12152b] text-slate-400 border border-[#21264b] hover:text-white'
          }`}
        >
          Technology Probes (YOLO, FAISS, FastAPI, PyTorch)
        </button>

        <button
          onClick={() => setActiveCategory('intro')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeCategory === 'intro'
              ? 'bg-purple-600 text-white shadow-glow border border-purple-400/40'
              : 'bg-[#12152b] text-slate-400 border border-[#21264b] hover:text-white'
          }`}
        >
          Resume Introduction
        </button>

        <button
          onClick={() => setActiveCategory('claims')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
            activeCategory === 'claims'
              ? 'bg-purple-600 text-white shadow-glow border border-purple-400/40'
              : 'bg-[#12152b] text-slate-400 border border-[#21264b] hover:text-white'
          }`}
        >
          Claim Verification Live
        </button>
      </div>

      {/* VIEW: Balanced 10-Round Plan */}
      {activeCategory === 'plan' && (
        <div className="space-y-4">
          {/* Project Coverage Distribution Summary */}
          <div className="bg-[#10142e] rounded-2xl p-4 border border-[#212850] shadow-card">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Interview Project Coverage Distribution (Strict 10-Round Balance)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="bg-[#0b0e24] p-3 rounded-xl border border-purple-500/30">
                <span className="text-[10px] text-purple-300 font-bold block mb-1">PROJECT 1 (TRAFFIX)</span>
                <div className="text-sm font-bold text-white">Rounds 1 – 3</div>
                <span className="text-[10px] text-slate-400">YOLOv8, Edge Concurrency, 35% Wait Time</span>
              </div>
              <div className="bg-[#0b0e24] p-3 rounded-xl border border-emerald-500/30">
                <span className="text-[10px] text-emerald-300 font-bold block mb-1">PROJECT 2 (STUDENT REPO)</span>
                <div className="text-sm font-bold text-white">Rounds 4 – 6</div>
                <span className="text-[10px] text-slate-400">FAISS Vector Search, AST Diff, 50% Review</span>
              </div>
              <div className="bg-[#0b0e24] p-3 rounded-xl border border-amber-500/30">
                <span className="text-[10px] text-amber-300 font-bold block mb-1">PROJECT 3 (AGRI ADVISORY)</span>
                <div className="text-sm font-bold text-white">Rounds 7 – 9</div>
                <span className="text-[10px] text-slate-400">Gemini API, Leaflet, 94% Delivery SLA</span>
              </div>
              <div className="bg-[#0b0e24] p-3 rounded-xl border border-indigo-500/30">
                <span className="text-[10px] text-indigo-300 font-bold block mb-1">CROSS-PROJECT SYNTHESIS</span>
                <div className="text-sm font-bold text-white">Round 10</div>
                <span className="text-[10px] text-slate-400">System Trade-offs & Production Readiness</span>
              </div>
            </div>
          </div>

          {/* List of 10 Balanced Rounds */}
          <div className="space-y-3">
            {questions.map((q, idx) => {
              const ideal = idealAnswers[q.id];
              return (
                <div
                  key={q.id || idx}
                  className="bg-[#0c0f24] rounded-2xl p-5 border border-slate-800 hover:border-purple-500/40 transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-purple-600/30 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold">
                        ROUND {idx + 1}
                      </span>
                      <Badge variant={idx < 3 ? 'purple' : idx < 6 ? 'emerald' : idx < 9 ? 'amber' : 'indigo'} size="sm">
                        {idx < 3 ? 'Traffix' : idx < 6 ? 'Student Repo' : idx < 9 ? 'Agri Advisory' : 'Cross-Project'}
                      </Badge>
                      <Badge variant="slate" size="sm">
                        Depth Level {q.depthLevel}/10
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={<Sparkles className="w-3.5 h-3.5 text-purple-400" />}
                        loading={ideal?.loading}
                        onClick={() =>
                          handleFetchIdealAnswer(
                            q.id,
                            q.question,
                            idx < 3 ? 'Traffix' : idx < 6 ? 'Student Repo' : idx < 9 ? 'Agri Advisory' : 'Cross-Project',
                            q.sourceClaim || 'Production Scalability'
                          )
                        }
                      >
                        {ideal?.answer ? 'Ideal Answer Active' : 'Show Ideal Answer'}
                      </Button>

                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => {
                          jumpToQuestion(idx);
                          setActiveView('adaptive-interview');
                        }}
                      >
                        Practice This Round →
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white leading-relaxed">{q.question}</h4>
                    {q.whyAsked && (
                      <p className="text-xs text-slate-400 mt-1">
                        <strong className="text-purple-300">Why Interviewer Asks This:</strong> {q.whyAsked}
                      </p>
                    )}
                    {q.sourceClaim && (
                      <p className="text-[11px] text-slate-400 mt-1 font-mono">
                        Target Claim: <span className="text-slate-300">"{q.sourceClaim}"</span>
                      </p>
                    )}
                  </div>

                  {/* Render Ideal Sample Answer if fetched */}
                  {ideal?.answer && (
                    <div className="bg-[#121634] rounded-xl p-4 border border-purple-500/30 space-y-2 mt-2">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-amber-300 font-mono">
                          IDEAL MODEL ANSWER (TAILORED TO QUESTION & RESUME CLAIM)
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 leading-relaxed font-sans">
                        {ideal.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW: Project Questions (All 3 Projects) */}
      {activeCategory === 'projects' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {projects.map((proj) => (
              <button
                key={proj.id}
                onClick={() => setSelectedProjectId(proj.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedProjectId === proj.id
                    ? 'bg-purple-600 text-white shadow-glow border border-purple-400/40'
                    : 'bg-[#10142e] text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {proj.title}
              </button>
            ))}
          </div>

          {(() => {
            const currentProjDef = projectQuestionsMap[selectedProjectId] || projectQuestionsMap['proj-1'];
            return (
              <Card
                title={currentProjDef.title}
                subtitle={`Core Stack: ${currentProjDef.tech}`}
              >
                <div className="space-y-3">
                  {currentProjDef.questions.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#0b0e21] rounded-xl p-4 border border-slate-800 hover:border-purple-500/40 transition-all space-y-1.5"
                    >
                      <p className="text-sm font-bold text-white">"{item.q}"</p>
                      <p className="text-xs text-slate-400">
                        <strong className="text-purple-300">Expected Talking Points:</strong> {item.focus}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })()}
        </div>
      )}

      {/* VIEW: Technology Questions */}
      {activeCategory === 'tech' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            {['YOLOv8', 'FastAPI', 'FAISS', 'PyTorch', 'Gemini API'].map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  selectedTech === tech
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-glow'
                    : 'bg-[#0b0e21] text-slate-400 border border-slate-800 hover:text-white'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          <Card
            title={`Questions Triggered by Claim: ${selectedTech}`}
            subtitle="Interviewer probes based on resume mention"
          >
            <div className="space-y-3">
              {(techQuestionsMap[selectedTech] || techQuestionsMap['YOLOv8']).map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#0b0e21] rounded-xl p-4 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-white leading-snug">"{item.q}"</p>
                    <span className="text-[11px] text-purple-300 font-mono block">
                      Targeting: {item.probe}
                    </span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setPracticeAnswer('');
                      setActiveCategory('claims');
                    }}
                    className="shrink-0"
                  >
                    Practice Defense
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* VIEW: Resume Introduction */}
      {activeCategory === 'intro' && (
        <Card title="Resume Introduction & Narrative Prompts" subtitle="First impression questions from the opening round">
          <div className="space-y-3">
            {introQuestions.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#0b0e21] rounded-xl p-4 border border-slate-800 hover:border-purple-500/40 transition-all space-y-1.5"
              >
                <p className="text-sm font-bold text-white">"{item.q}"</p>
                <p className="text-xs text-slate-400">
                  <strong className="text-emerald-400">Interviewer Rubric:</strong> {item.purpose}
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* VIEW: Claim Verification Live */}
      {activeCategory === 'claims' && (
        <div className="space-y-4">
          <div className="bg-[#12152b] rounded-2xl p-6 border border-purple-500/40 shadow-glow space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-purple-300 font-mono">
                CLAIM VERIFICATION PROBE: YOLOv8 (Advanced Claim)
              </span>
              <Badge variant="rose" size="sm">HIGH INTERVIEW RISK</Badge>
            </div>

            <h3 className="text-base font-bold text-white leading-relaxed">
              "Why did you choose YOLOv8 instead of Faster R-CNN or SSD for the Traffix traffic system?"
            </h3>

            <textarea
              value={practiceAnswer}
              onChange={(e) => setPracticeAnswer(e.target.value)}
              placeholder="Type your claim defense (explain trade-offs, cite latency numbers, discuss edge-case limitations)..."
              rows={4}
              className="w-full bg-[#0b0e21] border border-slate-800 focus:border-purple-500 rounded-xl p-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none leading-relaxed font-sans"
            />

            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setPracticeAnswer(
                    "I chose YOLOv8 because it is an anchor-free single-stage detector delivering 45+ FPS with sub-50ms latency. In contrast, Faster R-CNN relies on a two-stage Region Proposal Network (RPN) which introduces ~120ms latency, violating our 30 FPS camera ingest SLA."
                  );
                }}
              >
                Load Sample Answer
              </Button>

              <Button
                variant="primary"
                size="sm"
                icon={<CheckCircle2 className="w-4 h-4" />}
                onClick={handleTestClaim}
              >
                Verify Claim Evidence
              </Button>
            </div>
          </div>

          {/* Verification Feedback Result */}
          {verificationFeedback && (
            <div className="bg-[#12152b] rounded-2xl p-6 border border-purple-500/30 space-y-4 shadow-glow">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-purple-400" />
                  <h4 className="text-sm font-bold text-white">Claim Verification Audit</h4>
                </div>
                <Badge variant="emerald" size="sm">
                  {verificationFeedback.confidence}% Confidence
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                <div className="bg-[#0b0e21] p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Claimed:</span>
                  <span className="text-purple-300 font-bold">{verificationFeedback.claimedLevel}</span>
                </div>
                <div className="bg-[#0b0e21] p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Demonstrated:</span>
                  <span className="text-emerald-400 font-bold">{verificationFeedback.demonstratedLevel}</span>
                </div>
                <div className="bg-[#0b0e21] p-3 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                  <span className="text-slate-400 block text-[10px]">Interviewer Risk:</span>
                  <span className="text-amber-400 font-bold">LOW RISK</span>
                </div>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed font-sans bg-[#0b0e21] p-3.5 rounded-xl border border-slate-800">
                "{verificationFeedback.feedback}"
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
