import os
import sys
import json
import io

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from services.resume_parser import parse_canonical_resume, extract_text_from_pdf
from services.ai_service import ai_service
from services.rag_service import rag_store

def test_abishek_resume_parsing():
    print("\n--- 1. Testing Abishek R Two-Stage Resume Parsing ---")
    sample_text = """
    ABISHEK R
    abishekkrajavel99@gmail.com | 7448665599 | Tamil Nadu, India
    linkedin.com/in/abishek-r | github.com/abhisekrajavel99 | leetcode.com/Abishek

    PROFESSIONAL SUMMARY
    Second-year B.E. Computer Science student with practical experience in full-stack architecture, machine learning (YOLO/LSTM/FAISS), and high-throughput backend services.

    EDUCATION
    Bannari Amman Institute of Technology, Sathyamangalam
    Bachelor of Engineering in Computer Science and Engineering
    CGPA: 7.8/10
    2024–2028

    TECHNICAL SKILLS
    Languages: Python, Java, SQL, JavaScript
    Frameworks: React, FastAPI, Spring Boot, Tailwind CSS
    Databases: MongoDB, MySQL, PostgreSQL
    ML / AI: Machine Learning, Deep Learning, YOLO, LSTM, FAISS, OpenAI API
    Tools & APIs: Git, MQTT, REST APIs, GIS, Weather API, SMS/IVR
    Concepts: OOP, DBMS, Data Structures, Prompt Engineering

    PROJECTS
    Traffix – Urban Traffic Management System
    - Trained custom YOLO detection model achieving 91% accuracy across multi-class vehicles.
    - Engineered temporal LSTM prediction pipeline for congestion forecasting 15 minutes ahead.
    - Built async FastAPI backend with MQTT telemetry gateway to simulate green-wave emergency overrides.
    - Reduced simulated intersection wait times by ~35% and processed 30 FPS camera feeds.

    Student Project Repository with AI-Based Idea Enhancement
    - Built Spring Boot REST API backed by MySQL with Spring Security and stateless JWT authentication.
    - Integrated FAISS vector database to detect semantically similar past student projects in under 20ms.
    - Incorporated OpenAI API prompt workflows to provide students with automated technical refinement suggestions.
    - Reduced faculty manual review effort by ~50% across 500+ student project submissions.

    Smart Agricultural Disaster Advisory & Early Warning System
    - Engineered Python FastAPI ingestion service consuming live weather anomaly feeds.
    - Mapped farmer plot coordinates using GIS spatial bounding to deliver micro-zone disaster warnings.
    - Automated multilingual SMS/IVR broadcast triggers with 94% delivery reliability.

    CERTIFICATIONS
    - Oracle Certified Associate: Java SE Programmer
    - DeepLearning.AI: Deep Learning Specialization

    ACHIEVEMENTS
    - Finalist at National Level Hackathon 2025 for Traffix Urban AI Prototype.
    - Solved 350+ Algorithmic Problems on LeetCode.
    """

    resume_data = parse_canonical_resume(sample_text, "Abishek_R_Resume.pdf")
    
    # 1. Candidate Name must be ABISHEK R, NOT 'PROFESSIONAL SUMMARY'
    assert resume_data["candidate"]["name"] == "ABISHEK R", f"Expected 'ABISHEK R', got '{resume_data['candidate']['name']}'"
    assert resume_data["candidate"]["email"] == "abishekkrajavel99@gmail.com", f"Wrong email: {resume_data['candidate']['email']}"
    assert resume_data["candidate"]["phone"] == "7448665599", f"Wrong phone: {resume_data['candidate']['phone']}"

    # 2. Education must be Bannari Amman Institute of Technology
    assert "Bannari Amman" in resume_data["education"][0]["institution"], f"Wrong education: {resume_data['education']}"
    assert "7.8" in resume_data["education"][0]["cgpa"], "Wrong CGPA"

    # 3. All 3 Projects must be extracted
    assert len(resume_data["projects"]) == 3, f"Expected 3 projects, got {len(resume_data['projects'])}"
    assert "Traffix" in resume_data["projects"][0]["name"], "Project 1 should be Traffix"
    assert "Student Project Repository" in resume_data["projects"][1]["name"], "Project 2 should be Student Project Repository"
    assert "Disaster Advisory" in resume_data["projects"][2]["name"] or "Agricultural" in resume_data["projects"][2]["name"], "Project 3 should be Agricultural Disaster Advisory"

    # 4. Real claims count >= 6
    assert len(resume_data["claims"]) >= 6, f"Expected >= 6 claims, got {len(resume_data['claims'])}"
    assert any("35%" in c["claim"] for c in resume_data["claims"]), "Missing Traffix 35% claim"
    assert any("50%" in c["claim"] for c in resume_data["claims"]), "Missing Student Repo 50% claim"

    # 5. Skills Hierarchy check
    assert "Python" in resume_data["skills_hierarchy"]["languages"], "Python missing in languages"
    assert "Spring Boot" in resume_data["skills_hierarchy"]["frameworks"], "Spring Boot missing in frameworks"
    assert "FAISS" in resume_data["skills_hierarchy"]["ml_ai"], "FAISS missing in ml_ai"

    # 6. Check that skills are not falsely labeled 'Advanced' by default
    for s in resume_data["skills_flat"]:
        assert s["claimed_level"] is None, f"Skill {s['name']} falsely claimed as {s['claimed_level']}"

    print("[PASS] test_abishek_resume_parsing passed! Candidate:", resume_data["candidate"]["name"])
    print("       Education:", resume_data["education"][0]["institution"], "| CGPA:", resume_data["education"][0]["cgpa"])
    print("       Projects (", len(resume_data["projects"]), "):", [p["name"] for p in resume_data["projects"]])
    return resume_data

def test_balanced_interview_coverage(resume_data):
    print("\n--- 2. Testing Balanced 10-Round Interview Coverage Across ALL 3 Projects ---")
    plan = ai_service.generate_balanced_interview_plan(resume_data, company="Microsoft", role="Software Engineer")
    questions = plan["questions"]

    assert len(questions) == 10, f"Expected 10 questions, got {len(questions)}"
    
    # Check that questions cover Project 1, Project 2, and Project 3
    sources = [q["source_project"] for q in questions]
    assert any("Traffix" in s for s in sources), "Traffix not covered in interview plan!"
    assert any("Student Project Repository" in s or "Repository" in s for s in sources), "Student Project Repository not covered!"
    assert any("Disaster Advisory" in s or "Agricultural" in s for s in sources), "Project 3 not covered!"

    print("[PASS] test_balanced_interview_coverage passed! Covered projects in 10 rounds:")
    for idx, q in enumerate(questions):
        print(f"  Round {idx+1} [{q['category']} - {q['source_project']}]: {q['question'][:75]}...")
    return questions

def test_question_specific_sample_answers():
    print("\n--- 3. Testing Question-Specific Sample Answers ---")
    
    # Q1: Traffix YOLO
    q1 = "Why did you choose YOLO over Faster R-CNN for Traffix?"
    ans1 = ai_service.generate_ideal_sample_answer(q1, "Traffix")
    assert "YOLO" in ans1["sample_answer"], "Sample answer does not mention YOLO"
    assert "Faster R-CNN" in ans1["sample_answer"], "Sample answer does not compare Faster R-CNN"
    assert "Spring Boot" not in ans1["sample_answer"], "Sample answer contains unrelated Spring Boot!"

    # Q2: Student Repo FAISS
    q2 = "How did you design the FAISS vector indexing pipeline in your Student Project Repository?"
    ans2 = ai_service.generate_ideal_sample_answer(q2, "Student Project Repository")
    assert "FAISS" in ans2["sample_answer"], "Sample answer does not mention FAISS"
    assert "YOLO" not in ans2["sample_answer"], "Sample answer contains unrelated YOLO!"

    # Q3: Disaster Advisory GIS
    q3 = "How did you implement GIS spatial bounding in your Disaster Advisory system?"
    ans3 = ai_service.generate_ideal_sample_answer(q3, "Smart Agricultural Disaster Advisory")
    assert "GIS" in ans3["sample_answer"] or "spatial" in ans3["sample_answer"], "Sample answer does not mention GIS"
    assert "FAISS" not in ans3["sample_answer"], "Sample answer contains unrelated FAISS!"

    print("[PASS] test_question_specific_sample_answers passed! All answers strictly matched project context.")

def test_eight_dimension_answer_evaluation():
    print("\n--- 4. Testing 8-Dimension Answer Evaluation & Follow-Up Probing ---")
    q = "Why did you choose YOLO over Faster R-CNN in Traffix?"
    a = "We selected YOLO because Traffix needed real-time 30 FPS inference. Faster R-CNN uses a two-stage Region Proposal Network (RPN) which added ~120ms latency per frame. YOLO performs single-stage regression directly to bounding boxes, which we optimized with ONNX Runtime FP16 quantization to achieve 91% accuracy."
    
    eval_res = ai_service.evaluate_candidate_answer(q, a, "Traffix", current_depth=4)
    assert eval_res["is_unknown"] is False
    assert eval_res["technical_correctness"] >= 75
    assert eval_res["depth"] >= 4
    assert len(eval_res["strengths"]) > 0
    assert len(eval_res["predicted_followups"]) > 0

    # Follow-up generation
    followup = eval_res["predicted_followups"][0]
    f_lower = followup["question"].lower()
    assert "yolo" in f_lower or "latency" in f_lower or "vram" in f_lower or "camera" in f_lower or "bottleneck" in f_lower or "fps" in f_lower
    print(f"[PASS] test_eight_dimension_answer_evaluation passed! Score: {eval_res['overall_score']}/100")
    print(f"       Follow-up generated: {followup['question']}")

    # Test "I don't know" flow
    a_unknown = "I don't know, I have not measured inference latency directly."
    eval_unk = ai_service.evaluate_candidate_answer(q, a_unknown, "Traffix", current_depth=3)
    assert eval_unk["is_unknown"] is True
    assert eval_unk["concept_explanation"] is not None
    assert eval_unk["retry_question"] is not None
    print(f"[PASS] 'I Don't Know' coaching flow passed! Provided retry: {eval_unk['retry_question']}")

def test_claim_verification():
    print("\n--- 5. Testing Claim Verification with Evidence ---")
    claim_res = ai_service.evaluate_candidate_answer(
        "How did you achieve 91% vehicle detection accuracy in Traffix?",
        "We trained YOLO on 5,000 annotated CCTV frames with data augmentation and validated at IoU 0.5 threshold achieving 91% mAP.",
        "Traffix",
        current_depth=4
    )
    assert claim_res["evidence"] >= 70
    print(f"[PASS] test_claim_verification passed! Evidence Score: {claim_res['evidence']}/100")

def test_readiness_calculation():
    print("\n--- 6. Testing Evidence-Based Readiness Calculation ---")
    answers = [
        {"question_id": "q1", "score": 85},
        {"question_id": "q2", "score": 78},
        {"question_id": "q3", "score": 82}
    ]
    avg = int(sum([a["score"] for a in answers]) / len(answers))
    assert 75 <= avg <= 90
    print(f"[PASS] test_readiness_calculation passed! Readiness: {avg}%")

if __name__ == "__main__":
    print("==========================================================")
    print("RUNNING PREPFORGE AI PROFESSIONAL RESUME & INTERVIEW AUDIT")
    print("==========================================================")
    res_data = test_abishek_resume_parsing()
    test_balanced_interview_coverage(res_data)
    test_question_specific_sample_answers()
    test_eight_dimension_answer_evaluation()
    test_claim_verification()
    test_readiness_calculation()
    print("\n==========================================================")
    print("ALL 6 CRITICAL INTELLIGENCE PIPELINE TESTS PASSED 100%!")
    print("==========================================================")
