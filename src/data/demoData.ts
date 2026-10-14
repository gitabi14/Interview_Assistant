import {
  CandidateProfile,
  TargetConfig,
  ResumeClaim,
  CandidateProject,
  SkillScore,
  AlertNotification,
  InterviewQuestion,
  CandidateAnswer,
  CodingChallenge,
  LearningDayModule,
  KnowledgeDocument,
  ReadinessBreakdown,
  InterviewHistoryItem,
} from '../types';

export const INITIAL_CANDIDATE: CandidateProfile = {
  name: 'ABISHEK R',
  email: 'abishekkrajavel99@gmail.com',
  phone: '7448665599',
  location: 'Tamil Nadu, India',
  education: 'Bannari Amman Institute of Technology',
  degree: 'Bachelor of Engineering in Computer Science and Engineering',
  graduationYear: '2028',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
};

export const INITIAL_TARGET: TargetConfig = {
  company: 'Microsoft',
  role: 'Software Engineer',
  companyType: 'PRODUCT-BASED',
  round: 'Technical Interview',
  difficulty: 'Advanced',
  focusAreas: ['DSA', 'Operating Systems', 'System Design', 'Backend Architecture', 'OOP'],
};

export const INITIAL_SKILLS: SkillScore[] = [
  {
    name: 'DSA',
    category: 'Core CS',
    score: 84,
    benchmark: 85,
    status: 'Strong',
    evidenceCount: 14,
    recentDelta: +2,
    notes: 'Solid understanding of Trees, Graphs, Dynamic Programming and Hash Tables.',
  },
  {
    name: 'OOP',
    category: 'Core CS',
    score: 91,
    benchmark: 80,
    status: 'Strong',
    evidenceCount: 18,
    recentDelta: +4,
    notes: 'Exceptional application of SOLID principles, polymorphic design, and design patterns.',
  },
  {
    name: 'DBMS',
    category: 'Core CS',
    score: 74,
    benchmark: 75,
    status: 'Adequate',
    evidenceCount: 11,
    recentDelta: 0,
    notes: 'Good SQL, MongoDB, and MySQL schema design; needs deeper indexing and ACID transaction isolation evidence.',
  },
  {
    name: 'Operating Systems',
    category: 'Core CS',
    score: 62,
    benchmark: 80,
    status: 'Needs Improvement',
    evidenceCount: 9,
    recentDelta: -2,
    notes: 'Weaknesses in low-level mutex ownership semantics, deadlock avoidance, and memory paging.',
  },
  {
    name: 'Python',
    category: 'Engineering',
    score: 88,
    benchmark: 75,
    status: 'Strong',
    evidenceCount: 22,
    recentDelta: +3,
    notes: 'Strong idiomatic Python, FastAPI async routes, and machine learning pipelines.',
  },
  {
    name: 'Java & Spring Boot',
    category: 'Engineering',
    score: 85,
    benchmark: 80,
    status: 'Strong',
    evidenceCount: 16,
    recentDelta: +4,
    notes: 'Spring Boot REST microservices, Spring Security JWT filter chains, and MySQL persistence.',
  },
  {
    name: 'Machine Learning & CV',
    category: 'Specialized',
    score: 89,
    benchmark: 65,
    status: 'Strong',
    evidenceCount: 19,
    recentDelta: +5,
    notes: 'YOLO object detection, LSTM temporal forecasting, and FAISS vector embeddings.',
  },
  {
    name: 'System Design',
    category: 'Engineering',
    score: 68,
    benchmark: 75,
    status: 'Needs Improvement',
    evidenceCount: 8,
    recentDelta: -2,
    notes: 'Struggles with high-scale distributed data partitioning, cache invalidation, and rate limiting.',
  },
  {
    name: 'Problem Solving',
    category: 'Core CS',
    score: 84,
    benchmark: 80,
    status: 'Strong',
    evidenceCount: 16,
    recentDelta: +3,
    notes: 'Clean problem decomposition, proactive edge case handling, and 350+ LeetCode problems solved.',
  },
  {
    name: 'Communication',
    category: 'Soft Skills',
    score: 78,
    benchmark: 75,
    status: 'Adequate',
    evidenceCount: 12,
    recentDelta: +1,
    notes: 'Articulates technical concepts clearly; provides structured trade-off reasoning.',
  },
  {
    name: 'Behavioral',
    category: 'Soft Skills',
    score: 72,
    benchmark: 75,
    status: 'Adequate',
    evidenceCount: 7,
    recentDelta: 0,
    notes: 'STAR responses improved with empirical metrics and quantifiable results.',
  },
  {
    name: 'Projects',
    category: 'Engineering',
    score: 93,
    benchmark: 80,
    status: 'Strong',
    evidenceCount: 26,
    recentDelta: +6,
    notes: 'Comprehensive 3-project portfolio across Traffix (Urban AI), Student Repo (FAISS/Spring Boot), and Disaster Advisory (GIS/SMS).',
  },
];

export const INITIAL_CLAIMS: ResumeClaim[] = [
  {
    id: 'claim-1',
    technology: 'YOLO & Python',
    claimedLevel: 'Advanced',
    demonstratedLevel: 'Intermediate',
    evidenceConfidence: 68,
    evidenceStatus: 'Partial',
    riskLevel: 'HIGH',
    contextSnippet: 'Trained custom YOLO model achieving 91% accuracy and processed live CCTV video at 30 fps in Traffix.',
    verificationQuestion: 'Why did you choose YOLO over Faster R-CNN for Traffix, and how did you measure the 30 FPS inference latency under multi-camera load?',
    likelyFollowUps: [
        'What anchor box optimizations or NMS thresholds did you tune?',
        'How did you measure latency under multiple concurrent 1080p feeds?',
        'What were the false-positive edge cases in inclement weather/night conditions?',
    ],
    findings: {
      pros: ['Understands single-stage detection workflow', 'Cites sub-50ms frame time requirement'],
      gaps: ['Requires deeper ONNX Runtime FP16 quantization benchmarks under concurrent camera load'],
    },
  },
  {
    id: 'claim-2',
    technology: 'FAISS & OpenAI API',
    claimedLevel: 'Advanced',
    demonstratedLevel: 'Advanced',
    evidenceConfidence: 86,
    evidenceStatus: 'Strong',
    riskLevel: 'LOW',
    contextSnippet: 'Integrated FAISS vector embeddings to detect semantically similar past student projects in under 20ms.',
    verificationQuestion: 'Which FAISS index type did you select, and how did you calibrate the similarity threshold to avoid false duplicate rejections?',
    likelyFollowUps: [
      'How does IndexFlatIP compare with IndexIVFFlat for memory overhead?',
      'How did you handle embedding cost and latency under bulk uploads?',
    ],
    findings: {
      pros: ['Deep knowledge of vector similarity and L2 normalization', 'Clean integration with OpenAI embeddings'],
      gaps: ['Minor hesitation on vector re-indexing during live database updates'],
    },
  },
  {
    id: 'claim-3',
    technology: 'Spring Boot & JWT',
    claimedLevel: 'Advanced',
    demonstratedLevel: 'Intermediate',
    evidenceConfidence: 62,
    evidenceStatus: 'Partial',
    riskLevel: 'HIGH',
    contextSnippet: 'Built Spring Boot REST API backed by MySQL with Spring Security and stateless JWT role-based authentication.',
    verificationQuestion: 'How did you manage token expiration and prevent unauthorized privilege escalation between Student and Reviewer roles in Spring Security?',
    likelyFollowUps: [
      'How did you implement the OncePerRequestFilter?',
      'How did you handle token revocation in a stateless architecture?',
    ],
    findings: {
      pros: ['Understands Spring Security filter chain and SecurityContextHolder'],
      gaps: ['Struggles to detail token revocation mechanics without a Redis blacklist'],
    },
  },
  {
    id: 'claim-4',
    technology: 'GIS & SMS/IVR',
    claimedLevel: 'Intermediate',
    demonstratedLevel: 'Intermediate',
    evidenceConfidence: 78,
    evidenceStatus: 'Moderate',
    riskLevel: 'MEDIUM',
    contextSnippet: 'Automated multilingual SMS/IVR early warnings with 94% delivery reliability and GIS spatial bounding in Disaster Advisory.',
    verificationQuestion: 'How did your GIS spatial bounding algorithm map affected farmer coordinates without incurring high computational latency?',
    likelyFollowUps: [
      'How did you handle telecom gateway backpressure during disaster alerts?',
      'What PostGIS spatial indexing strategies did you apply?',
    ],
    findings: {
      pros: ['Solid spatial indexing and async queue comprehension'],
      gaps: ['Could expand on telecom gateway failover under extreme network congestion'],
    },
  },
];

export const INITIAL_PROJECTS: CandidateProject[] = [
  {
    id: 'traffix',
    title: 'Traffix – Urban Traffic Management System',
    subtitle: 'Urban AI Traffic Optimization & Congestion Forecaster',
    description: 'Smart urban traffic controller that combines real-time computer vision (YOLO) with temporal forecasting (LSTM) to dynamically allocate traffic signal greens and prioritize emergency vehicles.',
    technologies: ['React', 'FastAPI', 'MongoDB', 'YOLO', 'LSTM', 'MQTT', 'Python'],
    architecture: 'RTSP Video Feed → YOLO Detector → Redis Queue → LSTM Congestion Predictor → FastAPI Gateway → MQTT Traffic Signals → React Dashboard',
    candidateContribution: 'Designed end-to-end architecture, trained YOLO model, authored FastAPI async websocket routes, and built React frontend.',
    complexity: 'High (Combines computer vision inference, asynchronous stream processing, temporal deep learning, and sub-second WebSocket updates).',
    scalabilityNotes: 'Tested with 4 simultaneous 1080p 30fps RTSP camera streams; optimized with ONNX Runtime.',
    deploymentDetails: 'Docker containerized with NVIDIA Container Toolkit for GPU acceleration on edge servers.',
    testingDetails: 'Unit tests using pytest; mAP@0.5 evaluation on custom annotated road dataset.',
    impactMetrics: 'Reduced simulated intersection wait times by ~35% and processed 30 FPS camera feeds with 91% detection accuracy.',
    interviewRisk: 'HIGH',
    riskExplanation: 'High risk of interviewer probing: candidate claims 35% wait time reduction and 30 FPS multi-camera processing; must defend latency benchmarks.',
    reframeOptions: [
      {
        role: 'Software Engineer (Product SDE)',
        emphasis: [
          'FastAPI asynchronous event loop and WebSocket stream management',
          'Database indexing, geospatial querying, and data serialization efficiency',
          'Decoupled microservice architecture with MQTT telemetry broker',
        ],
        deEmphasize: ['Model hyperparameter tuning details', 'Academic validation splits'],
        bulletPoints: [
          'Architected high-throughput async video processing pipeline in FastAPI, processing 30 FPS camera feeds with sub-50ms latency.',
          'Engineered non-blocking MQTT telemetry gateway enabling instantaneous emergency vehicle priority signal preemption.',
          'Designed MongoDB geospatial compound indices, reducing vehicle spatial trajectory lookup time by 45%.',
        ],
        architectureFocus: 'Focus on distributed telemetry, event-driven decoupling, async concurrency, and low-latency API contracts.',
      },
    ],
  },
  {
    id: 'student-repo',
    title: 'Student Project Repository with AI-Based Idea Enhancement',
    subtitle: 'Academic Project Management & Vector Search Platform',
    description: 'Centralized academic project repository platform featuring FAISS vector search for automated duplication detection and LLM-guided project proposal refinement for engineering students.',
    technologies: ['Spring Boot', 'MySQL', 'React', 'FAISS', 'OpenAI API', 'JWT', 'Java'],
    architecture: 'React UI → Spring Boot REST API (JWT Security) → MySQL (Metadata) + FAISS (Embedding Vectors) → OpenAI API Gateway',
    candidateContribution: 'Implemented Spring Boot microservice, FAISS vector indexing pipeline, and OpenAI prompt chains.',
    complexity: 'High (Combines Spring Security, dense vector embeddings, vector similarity search, and LLM integrations).',
    scalabilityNotes: 'Sub-20ms FAISS similarity search across 500+ project submissions.',
    deploymentDetails: 'Containerized Spring Boot and MySQL with Docker Compose.',
    testingDetails: 'JUnit test suite with mock MVC and vector cosine similarity validation.',
    impactMetrics: 'Reduced faculty manual review effort by ~50% across 500+ student project submissions.',
    interviewRisk: 'HIGH',
    riskExplanation: 'High risk of interviewer probing: must explain FAISS index type, vector normalization, and stateless Spring Security JWT filter chains.',
    reframeOptions: [
      {
        role: 'Software Engineer (Product SDE)',
        emphasis: [
          'Spring Boot microservices, Spring Security JWT filter chains',
          'FAISS dense vector similarity search and index optimization',
          'Relational database indexing and connection pool management',
        ],
        deEmphasize: ['Basic frontend styling', 'Prompt text wording'],
        bulletPoints: [
          'Built scalable Spring Boot REST APIs with stateless JWT authentication, serving 500+ concurrent student project submissions.',
          'Integrated FAISS vector database to perform sub-20ms semantic similarity queries across dense text embeddings.',
          'Reduced manual faculty review overhead by ~50% via automated similarity scoring and proposal refinement workflows.',
        ],
        architectureFocus: 'Focus on enterprise backend security, vector search architecture, and microservice decoupling.',
      },
    ],
  },
  {
    id: 'agri-disaster',
    title: 'Smart Agricultural Disaster Advisory & Early Warning System',
    subtitle: 'IoT & GIS Disaster Alert Platform',
    description: 'IoT and GIS-enabled disaster early warning platform that continuously analyzes localized weather telemetry to deliver automated regional crop safety advisories to rural farmers via SMS and interactive voice response (IVR).',
    technologies: ['Python', 'FastAPI', 'GIS', 'Weather API', 'SMS/IVR', 'PostgreSQL'],
    architecture: 'Weather API Stream → Anomaly Detector → GIS Spatial Bounding → PostgreSQL → Async Celery/Redis Queue → SMS/IVR Gateway',
    candidateContribution: 'Engineered spatial mapping algorithms, integrated weather API triggers, and built async SMS/IVR broadcast queue.',
    complexity: 'Medium-High',
    scalabilityNotes: 'Achieved 94% delivery reliability with sub-10s automated broadcast dispatch.',
    deploymentDetails: 'FastAPI microservice deployed with Celery background worker.',
    testingDetails: 'Simulated cyclone alerts testing point-in-polygon queries and broadcast throughput.',
    impactMetrics: 'Automated multilingual SMS/IVR early warning advisories with 94% delivery reliability during simulated cyclone alerts.',
    interviewRisk: 'MEDIUM',
    riskExplanation: 'Prepare for questions on spatial query indexing (PostGIS) and handling telecom gateway throttling during emergency bursts.',
    reframeOptions: [],
  },
];

export const INITIAL_ALERTS: AlertNotification[] = [
  {
    id: 'alert-1',
    type: 'RESUME CLAIM VERIFIED',
    title: 'Two-Stage Parser Verified: ABISHEK R',
    description: 'Successfully extracted 3 projects (Traffix, Student Repo, Disaster Advisory) and 10 verifiable claims without fake advanced defaults.',
    timestamp: 'Just now',
    severity: 'success',
  },
  {
    id: 'alert-2',
    type: 'FOLLOW-UP PREDICTED',
    title: '10-Round Balanced Coverage Plan Active',
    description: 'Interview plan configured to probe all 3 projects equally across architecture, concurrency, and metrics.',
    timestamp: '1 min ago',
    severity: 'info',
  },
];

export const INITIAL_READINESS: ReadinessBreakdown = {
  overallScore: 78,
  resumeFitScore: 84,
  claimCredibilityScore: 74,
  technicalScore: 81,
  problemSolvingScore: 84,
  communicationScore: 78,
  behavioralScore: 72,
  projectScore: 93,
  positiveFactors: [
    { label: 'Strong Multi-Project Depth (Traffix, FAISS, GIS)', delta: +8 },
    { label: 'Solid Algorithmic Rigor (350+ LeetCode problems)', delta: +6 },
    { label: 'Enterprise Java & Spring Boot Architecture', delta: +5 },
    { label: 'Applied Machine Learning & Vector Search', delta: +4 },
  ],
  negativeFactors: [
    { label: 'Operating Systems Mutex & Concurrency Depth', delta: -6 },
    { label: 'System Design Distributed Sharding Gaps', delta: -5 },
    { label: 'Unverified Multi-Camera GPU Quantization Claims', delta: -3 },
  ],
  recommendedAction: 'Focus on defending YOLO ONNX FP16 quantization benchmarks, FAISS IndexFlatIP vector normalization, and Operating Systems concurrency before final Microsoft SDE rounds.',
};

export const SAMPLE_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'q-round-1',
    depthLevel: 1,
    category: 'Introduction & Background',
    title: 'Technical Background & Project Motivation',
    question: 'Walk me through your background and the primary technical challenges you focused on across your engineering projects.',
    context: 'ABISHEK R — B.E. Computer Science candidate at Bannari Amman Institute of Technology.',
    timeLimitSeconds: 180,
    hints: [
      'Briefly introduce your B.E. Computer Science foundation at Bannari Amman Institute of Technology.',
      'Highlight your 3 primary projects: Traffix (Urban AI), Student Project Repository (FAISS/Spring Boot), and Disaster Advisory (GIS/SMS).',
      'Articulate your core interest in high-performance backend systems and applied machine learning.',
    ],
    sampleAnswerGuide: 'Provide a structured 90-second technical summary touching on education, Traffix, FAISS repository, and backend engineering interests.',
    whyAsked: 'Evaluates candidate communication structure and technical breadth across full-stack and machine learning domains.',
    sourceClaim: 'Candidate Profile: ABISHEK R — B.E. Computer Science',
    expectedTopics: ['Academic foundation', 'Core tech stack preferences', 'Project motivations'],
  },
  {
    id: 'q-round-2',
    depthLevel: 2,
    category: 'Project Architecture',
    title: 'Traffix End-to-End Architecture',
    question: 'In Traffix – Urban Traffic Management System, can you walk me through your end-to-end data pipeline from RTSP video capture to MQTT signal dispatch?',
    context: 'Traffix Project: Video Ingestion → YOLO → LSTM → FastAPI → MQTT Signals',
    relatedClaimId: 'claim-1',
    timeLimitSeconds: 180,
    hints: [
      'Describe how raw video frames are ingested and batched for YOLO detection.',
      'Explain the queue decoupling between the detector and the LSTM temporal forecaster.',
      'Detail how FastAPI routes signal timing decisions to connected MQTT traffic light brokers.',
    ],
    sampleAnswerGuide: 'Explain the pipeline: RTSP feeds are decoded by OpenCV, processed by YOLOv8 for vehicle counts, queued in Redis, evaluated by LSTM for 15-min congestion forecasting, and dispatched via MQTT to traffic lights.',
    whyAsked: 'Tests architectural ownership and subsystem boundaries in Traffix.',
    sourceClaim: 'Traffix Architecture: RTSP Video -> YOLO -> LSTM -> FastAPI -> MQTT',
    expectedTopics: ['Video ingestion', 'YOLO detection', 'Async queue buffering', 'MQTT dispatch'],
  },
  {
    id: 'q-round-3',
    depthLevel: 4,
    category: 'Technical Defense & Metrics',
    title: 'YOLO Model Selection & 30 FPS Latency',
    question: 'In Traffix, why did you choose YOLO over alternative object detectors like Faster R-CNN, and how did you measure the 30 FPS inference latency under multi-camera load?',
    context: 'Traffix Claim: 91% vehicle detection accuracy and 30 FPS live video processing.',
    relatedClaimId: 'claim-1',
    timeLimitSeconds: 180,
    hints: [
      'Contrast single-stage anchor-free regression in YOLO vs two-stage RPN in Faster R-CNN.',
      'Cite sub-50ms latency target needed for 30 FPS stream processing.',
      'Explain how ONNX Runtime FP16 quantization was used to prevent GPU memory saturation.',
    ],
    sampleAnswerGuide: 'Explain that Faster R-CNN uses a two-stage Region Proposal Network (RPN) adding ~120ms latency per frame. YOLO performs single-stage regression directly to bounding boxes, achieving 30 FPS at 91% mAP on an NVIDIA GPU with ONNX FP16 quantization.',
    whyAsked: 'Directly verifies claimed 30 FPS performance and model trade-off rationale in Traffix.',
    sourceClaim: 'Claim: Achieved 91% vehicle detection accuracy and processed live video at 30 fps',
    expectedTopics: ['Single-stage vs Two-stage RPN', 'Inference latency benchmarks', 'ONNX FP16 quantization'],
  },
  {
    id: 'q-round-4',
    depthLevel: 4,
    category: 'Project Defense',
    title: 'Student Repository FAISS Vector Indexing',
    question: 'In your Student Project Repository, how did you design the FAISS vector indexing pipeline to perform semantic duplication search in under 20ms?',
    context: 'Student Project Repository: Sub-20ms FAISS vector similarity search across 500+ submissions.',
    relatedClaimId: 'claim-2',
    timeLimitSeconds: 180,
    hints: [
      'Explain how text embeddings were generated (e.g. OpenAI embeddings).',
      'Describe vector normalization (L2 norm) and FAISS index selection (IndexFlatIP vs IndexIVFFlat).',
      'Explain how the cosine similarity threshold was calibrated to prevent false duplicate flags.',
    ],
    sampleAnswerGuide: 'We generated 384-dimensional dense vectors, normalized them with L2 norm, and indexed them using FAISS IndexFlatIP to compute cosine similarity in sub-20ms across past student abstracts.',
    whyAsked: 'Verifies vector similarity search depth in Student Project Repository.',
    sourceClaim: 'Claim: Implemented FAISS vector embeddings for semantic duplicate detection',
    expectedTopics: ['FAISS index selection', 'Vector normalization', 'Similarity threshold calibration'],
  },
  {
    id: 'q-round-5',
    depthLevel: 3,
    category: 'Backend Security & Metrics',
    title: 'Spring Boot JWT & 50% Review Reduction',
    question: 'How did you implement JWT role-based security in your Spring Boot backend, and how did you quantify the ~50% reduction in faculty review effort?',
    context: 'Student Project Repository: Spring Security JWT + 50% review effort reduction.',
    relatedClaimId: 'claim-3',
    timeLimitSeconds: 180,
    hints: [
      'Describe the custom OncePerRequestFilter in Spring Security.',
      'Explain stateless authentication and token expiration handling.',
      'Explain the metric: tracking faculty grading hours before and after automated similarity scoring.',
    ],
    sampleAnswerGuide: 'We implemented a custom OncePerRequestFilter extracting Bearer tokens, validating HMAC-SHA256 signatures, and loading UserDetails into SecurityContextHolder. Faculty review hours decreased from ~10h/week to ~5h/week by filtering out duplicate submissions automatically.',
    whyAsked: 'Tests Spring Security implementation and verifies quantitative productivity impact claim.',
    sourceClaim: 'Claim: Reduced faculty review effort by ~50% with JWT-secured Spring Boot backend',
    expectedTopics: ['Spring Security filter chain', 'Stateless JWT validation', 'Review time reduction metrics'],
  },
  {
    id: 'q-round-6',
    depthLevel: 5,
    category: 'Project Defense',
    title: 'Disaster Advisory GIS & 94% Delivery Reliability',
    question: 'In Smart Agricultural Disaster Advisory, how did your GIS spatial bounding algorithm map affected farmer coordinates, and how did you maintain 94% SMS/IVR delivery reliability during cyclone simulations?',
    context: 'Disaster Advisory Project: GIS spatial mapping + 94% delivery reliability.',
    relatedClaimId: 'claim-4',
    timeLimitSeconds: 180,
    hints: [
      'Explain spatial point-in-polygon queries using PostGIS R-Tree indexing.',
      'Describe the asynchronous Celery and Redis message broker with exponential backoff.',
      'Explain telecom gateway retry mechanics during network congestion.',
    ],
    sampleAnswerGuide: 'We used PostGIS spatial indices to perform micro-zone point-in-polygon queries for farmer coordinates. To achieve 94% delivery, we decoupled dispatch using Celery and Redis retry queues with exponential backoff to handle telecom throttling.',
    whyAsked: 'Ensures equal coverage for third resume project (Disaster Advisory) and verifies 94% delivery claim.',
    sourceClaim: 'Claim: Automated multilingual SMS/IVR early warnings with 94% delivery reliability and GIS spatial bounding',
    expectedTopics: ['PostGIS spatial indexing', 'Async Celery/Redis queue', 'Telecom gateway retry failover'],
  },
  {
    id: 'q-round-7',
    depthLevel: 5,
    category: 'Cross-Project Database Architecture',
    title: 'Database Architecture & Schema Discernment',
    question: 'You used MongoDB in Traffix, MySQL in your Project Repository, and PostgreSQL in your Disaster Advisory. What technical criteria dictated your database choice for each system?',
    context: 'Cross-project evaluation: MongoDB vs MySQL vs PostgreSQL.',
    timeLimitSeconds: 180,
    hints: [
      'Traffix: MongoDB for schema flexibility with telemetry JSON and 2dsphere indexing.',
      'Project Repository: MySQL for ACID relational integrity across Students, Submissions, and Reviews.',
      'Disaster Advisory: PostgreSQL with PostGIS for spatial geometric queries.',
    ],
    sampleAnswerGuide: 'MongoDB was chosen for Traffix to ingest polymorphic telemetry coordinates without schema migrations. MySQL was selected for Student Repository to enforce strict relational FK constraints across students and grades. PostgreSQL was chosen for Disaster Advisory for robust PostGIS spatial indexing.',
    whyAsked: 'Evaluates candidate cross-project architectural discernment across relational and NoSQL databases.',
    sourceClaim: 'Technical Skills: MongoDB, MySQL, PostgreSQL',
    expectedTopics: ['ACID vs Document flexibility', 'PostGIS spatial indexing', 'Schema validation'],
  },
  {
    id: 'q-round-8',
    depthLevel: 6,
    category: 'Distributed Protocols',
    title: 'MQTT Telemetry & IoT Fault Tolerance',
    question: 'In Traffix, you used MQTT for traffic light telemetry. What MQTT QoS level did you configure, and how did the system handle broker disconnections during an emergency vehicle override?',
    context: 'Traffix Claim: MQTT Emergency vehicle priority signal preemption.',
    timeLimitSeconds: 180,
    hints: [
      'Compare QoS 0 (At most once), QoS 1 (At least once), and QoS 2 (Exactly once).',
      'Explain broker reconnection with persistent sessions and retain flags.',
      'Describe signal state reconciliation to prevent contradictory green states.',
    ],
    sampleAnswerGuide: 'We used QoS 1 for standard traffic telemetry and QoS 2 for emergency overrides to guarantee exactly-once delivery without duplicate signal switches. We enabled client keep-alive pings and persistent sessions to resume state immediately upon reconnection.',
    whyAsked: 'Tests deep protocol internals and edge-case failure mitigation in IoT telemetry.',
    sourceClaim: 'Claim: Implemented emergency vehicle priority routing via MQTT protocol',
    expectedTopics: ['MQTT QoS 0/1/2 semantics', 'Broker reconnection & retain flags', 'Signal state reconciliation'],
  },
  {
    id: 'q-round-9',
    depthLevel: 6,
    category: 'Debugging & Resilience',
    title: 'Complex Bug Isolation & Root Cause Analysis',
    question: 'Describe the single hardest bug, race condition, or memory leak you encountered across your three projects. How did you isolate the root cause and verify the fix?',
    context: 'Engineering Rigor: Debugging, profiling, and root cause analysis.',
    timeLimitSeconds: 180,
    hints: [
      'State the symptom clearly (e.g. GPU memory leak, thread pool starvation, or unindexed slow query).',
      'Explain the debugging tools used (e.g. Py-Spy, Valgrind, Postman, JProfiler, or EXPLAIN ANALYZE).',
      'Describe the fix and the regression test implemented to prevent recurrence.',
    ],
    sampleAnswerGuide: 'In Traffix, we encountered GPU memory exhaustion after 30 minutes of continuous streaming due to unreleased PyTorch tensor references in the queue. We isolated it using PyTorch memory profilers and fixed it by calling tensor.detach().cpu().numpy() before queuing.',
    whyAsked: 'Evaluates candidate resilience, debugging rigor, and root cause analysis capabilities.',
    sourceClaim: 'Engineering Experience: 3 full-stack and ML projects',
    expectedTopics: ['Systematic isolation methodology', 'Profiling tools used', 'Regression testing'],
  },
  {
    id: 'q-round-10',
    depthLevel: 7,
    category: 'System Design Scalability',
    title: '100x Scale & Distributed Re-Architecture',
    question: 'If Microsoft deployed your Traffix or Student Repository system across an entire state with 100x traffic volume, what architectural component would fail first, and how would you redesign it for horizontal scale?',
    context: 'System Design: Scaling from single-node to distributed state-wide deployment.',
    timeLimitSeconds: 180,
    hints: [
      'Identify single points of failure (e.g. single-node GPU inference or monolithic SQL database).',
      'Propose distributed streaming (Apache Kafka) with load-balanced GPU worker pools.',
      'Introduce distributed caching (Redis Cluster) and database sharding with read replicas.',
    ],
    sampleAnswerGuide: 'The single-node video ingestion worker would fail first. To scale 100x, we would introduce an Apache Kafka event backbone partitioning camera feeds across autoscaling GPU Kubernetes pods, with Redis Cluster for caching and database sharding.',
    whyAsked: 'Assesses senior engineering foresight, bottleneck identification, and high-scale distributed system design.',
    sourceClaim: 'System Design: Scalability & High-Throughput Architecture',
    expectedTopics: ['Kafka event streaming', 'Autoscaling Kubernetes GPU pods', 'Redis caching & DB sharding'],
  },
];

export const COMPANY_CODING_CHALLENGES: CodingChallenge[] = [
  {
    id: 'two-sum',
    title: 'Two Sum & Subarray Target Search',
    difficulty: 'Easy',
    category: 'Arrays & Hash Maps',
    primaryCompany: 'Microsoft',
    companies: [
      { name: 'Microsoft', frequency: 88, tier: 'Tier 1' },
      { name: 'Amazon', frequency: 85, tier: 'Tier 1' },
      { name: 'Google', frequency: 80, tier: 'Tier 1' },
      { name: 'Meta', frequency: 75, tier: 'Tier 1' },
    ],
    description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`. You may assume that each input would have exactly one solution, and you may not use the same element twice. An optimal solution must run in **O(n)** time complexity.',
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    starterCode: {
      python: `def twoSum(nums: list[int], target: int) -> list[int]:
    # Write your optimal O(n) solution here
    seen = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in seen:
            return [seen[diff], i]
        seen[num] = i
    return []
`,
      javascript: `function twoSum(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const diff = target - nums[i];
        if (seen.has(diff)) {
            return [seen.get(diff), i];
        }
        seen.set(nums[i], i);
    }
    return [];
}`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (seen.find(complement) != seen.end()) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
      java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement), i };
            }
            seen.put(nums[i], i);
        }
        return new int[0];
    }
}`,
    },
    testCases: [
      { input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0, 1]', explanation: 'nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3,2,4], target = 6', expectedOutput: '[1, 2]', explanation: 'nums[1] + nums[2] == 6, we return [1, 2].' },
      { input: 'nums = [3,3], target = 6', expectedOutput: '[0, 1]', explanation: 'nums[0] + nums[1] == 6, we return [0, 1].' },
      { input: 'nums = [-1,-2,-3,-4,-5], target = -8', expectedOutput: '[2, 4]', explanation: 'Negative numbers correctly handled.' },
      { input: 'nums = [1000000, 500, 2000000, 500], target = 1000', expectedOutput: '[1, 3]', explanation: 'Large inputs tested for O(n) hash map optimality.', isHidden: true },
    ],
    expectedComplexity: {
      time: 'O(n) — Single pass with hash map lookup',
      space: 'O(n) — Hash table storage of seen elements',
    },
    companyRubric: {
      Microsoft: 'Evaluates clean edge validation, single-pass hash map lookup, and avoiding O(N^2) brute force.',
      Amazon: 'Probes memory utilization and handling of duplicate integer values.',
      Google: 'Expects instant recognition of complement math and zero unnecessary allocations.',
    },
  },
  {
    id: 'lru-cache',
    title: 'Design LRU Cache with O(1) Get & Put',
    difficulty: 'Medium',
    category: 'Design & Data Structures',
    primaryCompany: 'Microsoft',
    companies: [
      { name: 'Microsoft', frequency: 92, tier: 'Tier 1' },
      { name: 'Amazon', frequency: 90, tier: 'Tier 1' },
      { name: 'Meta', frequency: 85, tier: 'Tier 1' },
      { name: 'Apple', frequency: 80, tier: 'Tier 1' },
    ],
    description: 'Design a data structure that follows the constraints of a **Least Recently Used (LRU) Cache**. Implement the `LRUCache` class with `get(key)` and `put(key, value)` in **O(1)** average time complexity.',
    constraints: [
      '1 <= capacity <= 3000',
      '0 <= key <= 10^4',
      '0 <= value <= 10^5',
      'At most 2 * 10^5 calls will be made to get and put.',
    ],
    starterCode: {
      python: `class Node:
    def __init__(self, key=0, val=0):
        self.key, self.val = key, val
        self.prev = self.next = None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = {}
        self.head, self.tail = Node(), Node()
        self.head.next, self.tail.prev = self.tail, self.head

    def get(self, key: int) -> int:
        if key in self.cache:
            node = self.cache[key]
            self._remove(node)
            self._insert(node)
            return node.val
        return -1

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self._remove(self.cache[key])
        node = Node(key, value)
        self.cache[key] = node
        self._insert(node)
        if len(self.cache) > self.cap:
            lru = self.head.next
            self._remove(lru)
            del self.cache[lru.key]

    def _remove(self, node):
        prev, nxt = node.prev, node.next
        prev.next, nxt.prev = nxt, prev

    def _insert(self, node):
        prev, nxt = self.tail.prev, self.tail
        prev.next = node
        node.prev, node.next = prev, nxt
        nxt.prev = node
`,
      javascript: `class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.map = new Map();
    }
    get(key) {
        if (!this.map.has(key)) return -1;
        const val = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, val);
        return val;
    }
    put(key, value) {
        if (this.map.has(key)) this.map.delete(key);
        this.map.set(key, value);
        if (this.map.size > this.capacity) {
            const oldestKey = this.map.keys().next().value;
            this.map.delete(oldestKey);
        }
    }
}`,
      cpp: `#include <unordered_map>
#include <list>
using namespace std;

class LRUCache {
    int cap;
    list<pair<int, int>> lru;
    unordered_map<int, list<pair<int, int>>::iterator> mp;
public:
    LRUCache(int capacity) : cap(capacity) {}
    int get(int key) {
        if (mp.find(key) == mp.end()) return -1;
        lru.splice(lru.begin(), lru, mp[key]);
        return mp[key]->second;
    }
    void put(int key, int value) {
        if (mp.find(key) != mp.end()) {
            lru.splice(lru.begin(), lru, mp[key]);
            mp[key]->second = value;
            return;
        }
        if (lru.size() == cap) {
            mp.erase(lru.back().first);
            lru.pop_back();
        }
        lru.emplace_front(key, value);
        mp[key] = lru.begin();
    }
};`,
      java: `import java.util.LinkedHashMap;
import java.util.Map;

class LRUCache extends LinkedHashMap<Integer, Integer> {
    private final int capacity;
    public LRUCache(int capacity) {
        super(capacity, 0.75f, true);
        this.capacity = capacity;
    }
    public int get(int key) {
        return super.getOrDefault(key, -1);
    }
    public void put(int key, int value) {
        super.put(key, value);
    }
    @Override
    protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
        return size() > capacity;
    }
}`,
    },
    testCases: [
      { input: 'capacity=2, put(1,1), put(2,2), get(1), put(3,3), get(2)', expectedOutput: '[-1, 1]', explanation: 'Key 2 evicted because key 1 was accessed.' },
      { input: 'capacity=1, put(2,1), get(2), put(3,2), get(2), get(3)', expectedOutput: '[1, -1, 2]', explanation: 'Capacity 1 evicts correctly on insert.' },
    ],
    expectedComplexity: {
      time: 'O(1) average for get and put',
      space: 'O(capacity) auxiliary memory for Hash Map and Doubly Linked List',
    },
    companyRubric: {
      Microsoft: 'Tests Doubly Linked List + Hash Map pointer manipulation without memory leaks or race conditions.',
      Amazon: 'Focuses on thread safety and eviction race conditions under concurrent traffic.',
    },
  },
  {
    id: 'trapping-rain-water',
    title: 'Trapping Rain Water Elevation Calculation',
    difficulty: 'Hard',
    category: 'Two Pointers & Monotonic Stack',
    primaryCompany: 'Google',
    companies: [
      { name: 'Google', frequency: 94, tier: 'Tier 1' },
      { name: 'Amazon', frequency: 88, tier: 'Tier 1' },
      { name: 'Microsoft', frequency: 78, tier: 'Tier 1' },
    ],
    description: 'Given `n` non-negative integers representing an elevation map where the width of each bar is `1`, compute how much water it can trap after raining.',
    constraints: [
      'n == height.length',
      '1 <= n <= 2 * 10^4',
      '0 <= height[i] <= 10^5',
    ],
    starterCode: {
      python: `def trap(height: list[int]) -> int:
    if not height:
        return 0
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0
    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]
    return water
`,
      javascript: `function trap(height) {
    let left = 0, right = height.length - 1;
    let leftMax = 0, rightMax = 0, water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else water += rightMax - height[right];
            right--;
        }
    }
    return water;
}`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int trap(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int left_max = 0, right_max = 0, water = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= left_max) left_max = height[left];
                else water += left_max - height[left];
                left++;
            } else {
                if (height[right] >= right_max) right_max = height[right];
                else water += right_max - height[right];
                right--;
            }
        }
        return water;
    }
};`,
      java: `class Solution {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0, water = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else water += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else water += rightMax - height[right];
                right--;
            }
        }
        return water;
    }
}`,
    },
    testCases: [
      { input: '[0,1,0,2,1,0,1,3,2,1,2,1]', expectedOutput: '6', explanation: 'Traps 6 units of rain water.' },
      { input: '[4,2,0,3,2,5]', expectedOutput: '9', explanation: 'Traps 9 units of rain water.' },
    ],
    expectedComplexity: {
      time: 'O(N) — Single pass two pointer convergence',
      space: 'O(1) — Constant extra space',
    },
    companyRubric: {
      Google: 'Demands two-pointer convergence with O(1) memory. Storing prefix/suffix arrays receives Lean Hire.',
    },
  },
  {
    id: 'number-of-islands',
    title: 'Number of Islands & Grid Traversal',
    difficulty: 'Medium',
    category: 'Trees & Graphs',
    primaryCompany: 'Amazon',
    companies: [
      { name: 'Amazon', frequency: 95, tier: 'Tier 1' },
      { name: 'Microsoft', frequency: 86, tier: 'Tier 1' },
      { name: 'Google', frequency: 82, tier: 'Tier 1' },
    ],
    description: 'Given an `m x n` 2D binary grid which represents a map of `1`s (land) and `0`s (water), return the number of islands. An island is formed by connecting adjacent lands horizontally or vertically.',
    constraints: [
      'm == grid.length',
      'n == grid[i].length',
      '1 <= m, n <= 300',
    ],
    starterCode: {
      python: `def numIslands(grid: list[list[str]]) -> int:
    if not grid:
        return 0
    m, n = len(grid), len(grid[0])
    count = 0
    def dfs(r, c):
        if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] != '1':
            return
        grid[r][c] = '0'
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    for r in range(m):
        for c in range(n):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    return count
`,
      javascript: `function numIslands(grid) {
    if (!grid || grid.length === 0) return 0;
    const m = grid.length, n = grid[0].length;
    let count = 0;
    function dfs(r, c) {
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== '1') return;
        grid[r][c] = '0';
        dfs(r + 1, c);
        dfs(r - 1, c);
        dfs(r, c + 1);
        dfs(r, c - 1);
    }
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === '1') {
                count++;
                dfs(r, c);
            }
        }
    }
    return count;
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) return 0;
        int m = grid.size(), n = grid[0].size(), count = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j, m, n);
                }
            }
        }
        return count;
    }
private:
    void dfs(vector<vector<char>>& g, int r, int c, int m, int n) {
        if (r < 0 || r >= m || c < 0 || c >= n || g[r][c] != '1') return;
        g[r][c] = '0';
        dfs(g, r+1, c, m, n);
        dfs(g, r-1, c, m, n);
        dfs(g, r, c+1, m, n);
        dfs(g, r, c-1, m, n);
    }
};`,
      java: `class Solution {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        int count = 0;
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c);
                }
            }
        }
        return count;
    }
    private void dfs(char[][] grid, int r, int c) {
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] != '1') return;
        grid[r][c] = '0';
        dfs(grid, r+1, c);
        dfs(grid, r-1, c);
        dfs(grid, r, c+1);
        dfs(grid, r, c-1);
    }
}`,
    },
    testCases: [
      { input: "[['1','1','1','1','0'],['1','1','0','1','0'],['1','1','0','0','0'],['0','0','0','0','0']]", expectedOutput: '1', explanation: 'One connected island.' },
      { input: "[['1','1','0','0','0'],['1','1','0','0','0'],['0','0','1','0','0'],['0','0','0','1','1']]", expectedOutput: '3', explanation: 'Three separate islands.' },
    ],
    expectedComplexity: {
      time: 'O(M * N) — Every cell visited at most constant times',
      space: 'O(M * N) — Recursion stack worst case',
    },
    companyRubric: {
      Amazon: 'Tests clean in-place grid sinking vs maintaining an unnecessary visited hash set.',
    },
  },
  {
    id: 'subarray-sum-equals-k',
    title: 'Subarray Sum Equals K & Prefix Map',
    difficulty: 'Medium',
    category: 'Arrays & Hash Maps',
    primaryCompany: 'Meta',
    companies: [
      { name: 'Meta', frequency: 92, tier: 'Tier 1' },
      { name: 'Google', frequency: 84, tier: 'Tier 1' },
      { name: 'Microsoft', frequency: 80, tier: 'Tier 1' },
    ],
    description: 'Given an array of integers `nums` and an integer `k`, return the total number of continuous subarrays whose sum equals to `k`. Optimal goal is **O(n)** time using a Prefix Sum Frequency Map initialized with `{0: 1}`.',
    constraints: [
      '1 <= nums.length <= 2 * 10^4',
      '-1000 <= nums[i] <= 1000',
      '-10^7 <= k <= 10^7',
    ],
    starterCode: {
      python: `def subarraySum(nums: list[int], k: int) -> int:
    prefix_map = {0: 1}
    curr_sum = 0
    count = 0
    for num in nums:
        curr_sum += num
        if (curr_sum - k) in prefix_map:
            count += prefix_map[curr_sum - k]
        prefix_map[curr_sum] = prefix_map.get(curr_sum, 0) + 1
    return count
`,
      javascript: `function subarraySum(nums, k) {
    const map = new Map([[0, 1]]);
    let sum = 0, count = 0;
    for (const num of nums) {
        sum += num;
        if (map.has(sum - k)) count += map.get(sum - k);
        map.set(sum, (map.get(sum) || 0) + 1);
    }
    return count;
}`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> prefix{{0, 1}};
        int sum = 0, count = 0;
        for (int n : nums) {
            sum += n;
            if (prefix.count(sum - k)) count += prefix[sum - k];
            prefix[sum]++;
        }
        return count;
    }
};`,
      java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1);
        int sum = 0, count = 0;
        for (int num : nums) {
            sum += num;
            if (map.containsKey(sum - k)) count += map.get(sum - k);
            map.put(sum, map.getOrDefault(sum, 0) + 1);
        }
        return count;
    }
}`,
    },
    testCases: [
      { input: '[1, 1, 1], k = 2', expectedOutput: '2', explanation: '[1,1] at 0..1 and 1..2.' },
      { input: '[1, 2, 3], k = 3', expectedOutput: '2', explanation: '[1,2] and [3].' },
      { input: '[1, -1, 0], k = 0', expectedOutput: '3', explanation: 'Negative numbers and zeroes handled.' },
    ],
    expectedComplexity: {
      time: 'O(N) — Single pass with hash table lookup',
      space: 'O(N) — Prefix sum frequency storage',
    },
    companyRubric: {
      Meta: 'Probes why sliding window fails on arrays containing negative numbers.',
    },
  },
  {
    id: 'product-of-array-except-self',
    title: 'Product of Array Except Self without Division',
    difficulty: 'Medium',
    category: 'Arrays & Hash Maps',
    primaryCompany: 'Apple',
    companies: [
      { name: 'Apple', frequency: 90, tier: 'Tier 1' },
      { name: 'Amazon', frequency: 86, tier: 'Tier 1' },
      { name: 'Meta', frequency: 84, tier: 'Tier 1' },
    ],
    description: 'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all elements of `nums` except `nums[i]`. You must write an algorithm that runs in **O(n)** time without using the division operation.',
    constraints: [
      '2 <= nums.length <= 10^5',
      '-30 <= nums[i] <= 30',
    ],
    starterCode: {
      python: `def productExceptSelf(nums: list[int]) -> list[int]:
    n = len(nums)
    res = [1] * n
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]
    postfix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= postfix
        postfix *= nums[i]
    return res
`,
      javascript: `function productExceptSelf(nums) {
    const n = nums.length;
    const res = new Array(n).fill(1);
    let prefix = 1;
    for (let i = 0; i < n; i++) {
        res[i] = prefix;
        prefix *= nums[i];
    }
    let postfix = 1;
    for (let i = n - 1; i >= 0; i--) {
        res[i] *= postfix;
        postfix *= nums[i];
    }
    return res;
}`,
      cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 1);
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            res[i] = prefix;
            prefix *= nums[i];
        }
        int postfix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= postfix;
            postfix *= nums[i];
        }
        return res;
    }
};`,
      java: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            res[i] = prefix;
            prefix *= nums[i];
        }
        int postfix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= postfix;
            postfix *= nums[i];
        }
        return res;
    }
}`,
    },
    testCases: [
      { input: '[1, 2, 3, 4]', expectedOutput: '[24, 12, 8, 6]', explanation: 'Multiplication without self element.' },
      { input: '[-1, 1, 0, -3, 3]', expectedOutput: '[0, 0, 9, 0, 0]', explanation: 'Zero element handled without division.' },
    ],
    expectedComplexity: {
      time: 'O(N) — Two passes forward and backward',
      space: 'O(1) — Output array not counted toward space',
    },
    companyRubric: {
      Apple: 'Strict constraint: division is forbidden; demands O(1) auxiliary memory.',
    },
  },
];

export const SAMPLE_CODING_CHALLENGE: CodingChallenge = COMPANY_CODING_CHALLENGES[0];

export const INITIAL_LEARNING_PLAN: LearningDayModule[] = [
  {
    day: 1,
    topic: 'YOLO vs Faster R-CNN Latency Benchmarking & ONNX Export',
    subtopics: ['Single-stage vs Two-stage RPN', 'ONNX FP16 Quantization', 'mAP@0.5 vs Frame Latency'],
    targetGap: 'Traffix 30 FPS claim defense for Microsoft SDE hiring bar.',
    estimatedMinutes: 45,
    completed: false,
    coreConcepts: [
      {
        title: 'Region Proposal Network (RPN) Latency Penalty',
        explanation: 'Faster R-CNN generates candidate proposals in a first stage, creating high latency. YOLO regresses coordinates in a single forward pass, achieving 45+ FPS on edge GPUs.',
      },
    ],
    practiceQuestions: [
      'Why does YOLOv8 eliminate anchor boxes, and how does that reduce inference latency?',
      'How does FP16 half-precision quantization reduce GPU memory bandwidth contention?',
    ],
    drillPrompt: 'Explain how you would measure per-frame inference latency using PyTorch CUDA events.',
  },
  {
    day: 2,
    topic: 'FAISS Vector Indexing & Approximate Nearest Neighbors',
    subtopics: ['IndexFlatIP vs IndexIVFFlat', 'Vector Normalization', 'Cosine Similarity Calibration'],
    targetGap: 'Student Project Repository vector search defense.',
    estimatedMinutes: 60,
    completed: false,
    coreConcepts: [
      {
        title: 'FAISS Dense Index Search Optimization',
        explanation: 'IndexFlatIP computes exact inner product (cosine similarity if normalized). IndexIVFFlat clusters vectors for sub-linear search across millions of documents.',
      },
    ],
    practiceQuestions: [
      'When should you transition from IndexFlatIP to IndexIVFFlat in FAISS?',
      'How do you prevent false duplicate rejections when setting similarity thresholds?',
    ],
    drillPrompt: 'Walk through the code to normalize OpenAI embedding vectors and query a FAISS index in under 20ms.',
  },
  {
    day: 3,
    topic: 'Spring Security JWT Filter Chains & Stateless Authorization',
    subtopics: ['OncePerRequestFilter', 'SecurityContextHolder', 'Token Revocation'],
    targetGap: 'Spring Boot RBAC defense.',
    estimatedMinutes: 45,
    completed: false,
    coreConcepts: [
      {
        title: 'Spring Security Filter Chain Order',
        explanation: 'Custom JWT filter intercepts requests before UsernamePasswordAuthenticationFilter, validates signature, and populates SecurityContext.',
      },
    ],
    practiceQuestions: [
      'How do you handle JWT token expiration and refresh token rotation in Spring Boot?',
      'How do you enforce role-based access control with @PreAuthorize in Spring Security?',
    ],
    drillPrompt: 'Write the OncePerRequestFilter implementation in Spring Boot to validate JWT tokens.',
  },
  {
    day: 4,
    topic: 'GIS Spatial Indexing & PostGIS Point-in-Polygon Optimization',
    subtopics: ['PostGIS R-Tree Indexing', 'Point-in-Polygon Queries', 'Async Delivery Queues'],
    targetGap: 'Disaster Advisory spatial query defense.',
    estimatedMinutes: 40,
    completed: false,
    coreConcepts: [
      {
        title: 'Spatial Indexing Scalability',
        explanation: 'R-Tree indices in PostGIS bound coordinates into bounding boxes, avoiding O(N) linear distance calculations across large farmer databases.',
      },
    ],
    practiceQuestions: [
      'How does an R-Tree index optimize spatial queries compared to B-Tree indices?',
      'How did you achieve 94% delivery reliability using Celery retry queues?',
    ],
    drillPrompt: 'Explain the SQL query and spatial index structure for isolating coordinates within a disaster polygon.',
  },
  {
    day: 5,
    topic: 'Operating Systems Process Synchronization & Mutex vs Semaphore',
    subtopics: ['Mutex Ownership Semantics', 'Counting Semaphores', 'Deadlock Coffman Conditions'],
    targetGap: 'Core CS fundamentals evaluation.',
    estimatedMinutes: 50,
    completed: false,
    coreConcepts: [
      {
        title: 'Mutex Ownership vs Semaphore Signaling',
        explanation: 'A Mutex enforces thread ownership (only acquiring thread may release). A Semaphore is a non-owned signaling counter.',
      },
    ],
    practiceQuestions: [
      'What happens if Thread A acquires a Mutex and Thread B tries to release it vs a Semaphore?',
      'What are the 4 Coffman conditions required for a deadlock, and how do you break Circular Wait?',
    ],
    drillPrompt: 'Explain how to design a deadlock-free dining philosophers solution using resource hierarchy.',
  },
  {
    day: 6,
    topic: 'Comprehensive 3-Project Technical Mock Interview',
    subtopics: ['Traffix Defense', 'FAISS Repository Defense', 'Disaster Advisory Defense'],
    targetGap: 'End-to-end resume interview readiness.',
    estimatedMinutes: 60,
    completed: false,
    coreConcepts: [
      {
        title: 'Structured Technical Communication',
        explanation: 'Structure all project answers with Direct Trade-off -> Concrete Benchmark -> Edge Case Mitigation.',
      },
    ],
    practiceQuestions: [
      'Walk me through the database trade-offs between MongoDB, MySQL, and PostgreSQL across your 3 projects.',
      'How would you re-architect Traffix if traffic volume increased 100x?',
    ],
    drillPrompt: 'Conduct a full 10-round simulated defense mock interview.',
  },
  {
    day: 7,
    topic: 'Final Microsoft SDE Hiring Bar Assessment',
    subtopics: ['DSA Algorithmic Rigor', 'System Design Scalability', 'Behavioral STAR Leadership'],
    targetGap: 'Final hiring bar readiness.',
    estimatedMinutes: 45,
    completed: false,
    coreConcepts: [
      {
        title: 'Hiring Bar Calibration',
        explanation: 'Microsoft SDE-2 bar requires optimal time complexity, deep architectural ownership, and quantified behavioral STAR metrics.',
      },
    ],
    practiceQuestions: [
      'Describe a technical conflict where you used empirical data to drive team alignment.',
    ],
    drillPrompt: 'Generate your final readiness report and verified candidate portfolio.',
  },
];

export const INITIAL_KNOWLEDGE_DOCS: KnowledgeDocument[] = [
  {
    id: 'doc-1',
    title: 'Microsoft SDE Hiring Rubric & Architectural Depth Standards',
    type: 'Interview Knowledge',
    relevanceScore: 98,
    snippet: 'Microsoft Software Engineer technical interviews evaluate candidate proficiency across DSA optimality, low-level OS concurrency understanding, structured trade-off justification in system design, and deep ownership of claimed resume projects.',
    tags: ['Microsoft', 'SDE', 'Hiring Bar', 'Evaluation Rubric'],
  },
  {
    id: 'doc-2',
    title: 'Real-Time Edge Computer Vision: Single-Stage vs Two-Stage Detector Latency',
    type: 'Engineering Blog',
    relevanceScore: 95,
    snippet: 'Analysis of single-stage detectors (YOLOv8) vs two-stage architectures (Faster R-CNN). Eliminating the Region Proposal Network (RPN) allows YOLO to achieve 45+ FPS at sub-50ms latency, whereas Faster R-CNN incurs ~120ms frame latency.',
    tags: ['YOLO', 'Computer Vision', 'Latency', 'Traffix'],
  },
  {
    id: 'doc-3',
    title: 'FAISS Vector Similarity Search & Spring Security Microservice Architecture',
    type: 'Role Knowledge',
    relevanceScore: 94,
    snippet: 'Architectural blueprint for integrating FAISS IndexFlatIP dense vector indexing with Spring Boot REST APIs and stateless JWT OncePerRequestFilter authentication for high-concurrency academic repository search.',
    tags: ['FAISS', 'Spring Boot', 'JWT', 'Vector Search'],
  },
  {
    id: 'doc-4',
    title: 'GIS Spatial Indexing & Resilient Telemetry Messaging (MQTT / Celery)',
    type: 'Role Knowledge',
    relevanceScore: 92,
    snippet: 'PostGIS spatial bounding with R-Tree indexing for point-in-polygon querying. Decoupling emergency broadcast dispatches via MQTT QoS 2 and Celery retry queues with exponential backoff for 94%+ delivery reliability.',
    tags: ['GIS', 'MQTT', 'PostGIS', 'Disaster Advisory'],
  },
  {
    id: 'doc-5',
    title: 'Operating Systems Process Synchronization: Mutex vs Semaphore Semantics',
    type: 'Interview Knowledge',
    relevanceScore: 89,
    snippet: 'Rigorous comparison of mutual exclusion locks vs counting semaphores. Details thread ownership constraints, priority inversion mitigation, and deadlock Coffman condition prevention in concurrent server applications.',
    tags: ['Operating Systems', 'Concurrency', 'Mutex', 'Deadlocks'],
  },
];

export const INITIAL_INTERVIEW_HISTORY: InterviewHistoryItem[] = [
  {
    id: 'hist-1',
    date: 'Oct 4, 2026',
    company: 'Microsoft',
    role: 'Software Engineer',
    round: 'Resume Defense Round',
    score: 78,
    questionsAnswered: 10,
    maxDepthReached: 7,
    criticalTopics: ['Traffix YOLO', 'FAISS Vector Search', 'Spring Boot JWT', 'GIS Disaster Advisory'],
    strengths: ['Clear project ownership', 'Quantified latency and throughput metrics', 'Solid FAISS vector search depth'],
    weaknesses: ['Could deepen OS synchronization primitives', 'Needs more detail on distributed JWT token revocation'],
  },
];
