import urllib.request
import json
import time

BASE_URL = "http://127.0.0.1:8000"

def post_json(endpoint: str, data: dict) -> dict:
    req = urllib.request.Request(
        f"{BASE_URL}{endpoint}",
        data=json.dumps(data).encode("utf-8"),
        headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode("utf-8"))

def test_multiturn_adaptive_flow():
    print("=" * 70)
    print("PREPFORGE AI - MULTI-TURN ADAPTIVE INTERVIEW CHAIN VERIFICATION")
    print("=" * 70)

    conversation_history = []

    # --- TURN 1: Process vs Thread ---
    q1 = "What is the difference between a process and a thread?"
    a1 = "A process has its own memory space, while threads within the same process share memory."
    print("\n[TURN 1]")
    print(f"  Q1: '{q1}'")
    print(f"  A1: '{a1}'")

    res1 = post_json("/api/interview/answer", {
        "question_id": "q-1",
        "question_text": q1,
        "answer_text": a1,
        "current_topic": "Operating Systems",
        "current_depth": 3,
        "conversation_history": conversation_history
    })

    print(f"  -> Classification:  {res1['answer_type']}")
    print(f"  -> Score:           {res1['score']} / 100")
    print(f"  -> Detected:        {res1['detected_concepts']}")
    print(f"  -> Next Action:     {res1['next_action']}")
    followup1 = res1['predicted_followups'][0]['question']
    print(f"  -> Next Question:   '{followup1}'")

    assert res1['answer_type'] == "STRONG", f"Expected STRONG, got {res1['answer_type']}"
    assert any(k in followup1.lower() for k in ["shared memory", "concurrent", "problem", "race"]), f"Unexpected follow-up: {followup1}"
    print("  [PASS] Turn 1 PASSED: Correctly identified memory isolation and probed shared-memory concurrency hazards.")

    conversation_history.append({
        "round": 1,
        "question": q1,
        "answer": a1,
        "evaluation": res1,
        "topic": "Operating Systems",
        "difficulty": 3
    })

    # --- TURN 2: Concurrency Hazard (Race Condition) ---
    q2 = followup1
    a2 = "A race condition."
    print("\n[TURN 2]")
    print(f"  Q2: '{q2}'")
    print(f"  A2: '{a2}'")

    res2 = post_json("/api/interview/answer", {
        "question_id": "q-2",
        "question_text": q2,
        "answer_text": a2,
        "current_topic": "Operating Systems",
        "current_depth": 4,
        "conversation_history": conversation_history
    })

    print(f"  -> Classification:  {res2['answer_type']}")
    print(f"  -> Score:           {res2['score']} / 100")
    print(f"  -> Detected:        {res2['detected_concepts']}")
    print(f"  -> Next Action:     {res2['next_action']}")
    followup2 = res2['predicted_followups'][0]['question']
    print(f"  -> Next Question:   '{followup2}'")

    assert res2['answer_type'] == "STRONG", f"Expected STRONG, got {res2['answer_type']}"
    assert any(k in followup2.lower() for k in ["prevent", "synchronization", "lock", "protect"]), f"Unexpected follow-up: {followup2}"
    print("  [PASS] Turn 2 PASSED: Correctly recognized race condition and probed prevention / synchronization.")

    conversation_history.append({
        "round": 2,
        "question": q2,
        "answer": a2,
        "evaluation": res2,
        "topic": "Operating Systems",
        "difficulty": 4
    })

    # --- TURN 3: Race Condition Prevention (Locks & Synchronization) ---
    q3 = followup2
    a3 = "Using locks or synchronization."
    print("\n[TURN 3]")
    print(f"  Q3: '{q3}'")
    print(f"  A3: '{a3}'")

    res3 = post_json("/api/interview/answer", {
        "question_id": "q-3",
        "question_text": q3,
        "answer_text": a3,
        "current_topic": "Operating Systems",
        "current_depth": 5,
        "conversation_history": conversation_history
    })

    print(f"  -> Classification:  {res3['answer_type']}")
    print(f"  -> Score:           {res3['score']} / 100")
    print(f"  -> Detected:        {res3['detected_concepts']}")
    print(f"  -> Next Action:     {res3['next_action']}")
    followup3 = res3['predicted_followups'][0]['question']
    print(f"  -> Next Question:   '{followup3}'")

    assert res3['answer_type'] == "STRONG", f"Expected STRONG, got {res3['answer_type']}"
    assert any(k in followup3.lower() for k in ["excessive", "trade-off", "tradeoff", "overhead", "deadlock", "contention"]), f"Unexpected follow-up: {followup3}"
    print("  [PASS] Turn 3 PASSED: Advanced to locking trade-offs and contention overhead.")

    # --- TEST 4: 'I Don't Know' Flow ---
    print("\n[TEST 4: 'I Don't Know' Handling]")
    q_idk = "How does TensorRT perform FP16 quantization on edge hardware?"
    a_idk = "I don't know."
    print(f"  Q: '{q_idk}'")
    print(f"  A: '{a_idk}'")

    res_idk = post_json("/api/interview/answer", {
        "question_id": "q-idk",
        "question_text": q_idk,
        "answer_text": a_idk,
        "current_topic": "Edge Machine Learning",
        "current_depth": 4,
        "conversation_history": conversation_history
    })

    print(f"  -> Classification:  {res_idk['answer_type']}")
    print(f"  -> Is Unknown:      {res_idk['is_unknown']}")
    print(f"  -> Detected:        {res_idk['detected_concepts']}")
    print(f"  -> Next Action:     {res_idk['next_action']}")
    print(f"  -> Explanation:     '{res_idk.get('concept_explanation')}'")
    print(f"  -> Retry Question:  '{res_idk.get('retry_question')}'")

    assert res_idk['answer_type'] == "UNKNOWN", f"Expected UNKNOWN, got {res_idk['answer_type']}"
    assert res_idk['detected_concepts'] == [], f"Expected empty detected_concepts, got {res_idk['detected_concepts']}"
    assert res_idk['next_action'] == "TEACH_RETEST", f"Expected TEACH_RETEST, got {res_idk['next_action']}"
    assert res_idk.get('concept_explanation') is not None, "Expected concept explanation"
    assert res_idk.get('retry_question') is not None, "Expected retry question"
    print("  [PASS] Test 4 PASSED: Classified as UNKNOWN, zero fake concepts, triggered TEACH_RETEST.")

    # --- TEST 5: Off-Topic Flow ---
    print("\n[TEST 5: Off-Topic Answer Handling]")
    q_off = "What is the difference between a process and a thread?"
    a_off = "TCP uses a three-way handshake with SYN, SYN-ACK, and ACK to establish a reliable connection."
    print(f"  Q: '{q_off}'")
    print(f"  A: '{a_off}'")

    res_off = post_json("/api/interview/answer", {
        "question_id": "q-off",
        "question_text": q_off,
        "answer_text": a_off,
        "current_topic": "Operating Systems",
        "current_depth": 3,
        "conversation_history": conversation_history
    })

    print(f"  -> Classification:  {res_off['answer_type']}")
    print(f"  -> Next Action:     {res_off['next_action']}")
    print(f"  -> Feedback:        '{res_off['frank_feedback']}'")
    print(f"  -> Redirect Q:      '{res_off['predicted_followups'][0]['question']}'")

    assert res_off['answer_type'] == "OFF_TOPIC", f"Expected OFF_TOPIC, got {res_off['answer_type']}"
    assert res_off['next_action'] == "REDIRECT", f"Expected REDIRECT, got {res_off['next_action']}"
    assert "refocus" in res_off['predicted_followups'][0]['question'].lower() or "original" in res_off['predicted_followups'][0]['question'].lower(), f"Expected redirect prompt, got {res_off['predicted_followups'][0]['question']}"
    print("  [PASS] Test 5 PASSED: Classified as OFF_TOPIC, triggered REDIRECT back to target subject.")

    # --- TEST 6: Answer-Dependency Proof (Different Answers produce Different Next Questions) ---
    print("\n[TEST 6: Answer-Dependency Proof]")
    test_q = "Why did you choose YOLOv8 for vehicle detection in Traffix?"
    
    ans_opt_a = "Because YOLO was faster."
    ans_opt_b = "I chose YOLOv8 because it is an anchor-free single-stage detector delivering 45 FPS with sub-40ms latency, whereas Faster R-CNN uses a two-stage RPN requiring ~120ms."

    res_a = post_json("/api/interview/answer", {
        "question_id": "q-test-a",
        "question_text": test_q,
        "answer_text": ans_opt_a,
        "current_topic": "Computer Vision / Edge ML",
        "current_depth": 3
    })
    next_q_a = res_a['predicted_followups'][0]['question']

    res_b = post_json("/api/interview/answer", {
        "question_id": "q-test-b",
        "question_text": test_q,
        "answer_text": ans_opt_b,
        "current_topic": "Computer Vision / Edge ML",
        "current_depth": 3
    })
    next_q_b = res_b['predicted_followups'][0]['question']

    print(f"  Base Question: '{test_q}'")
    print(f"  Answer A (Brief): '{ans_opt_a}'")
    print(f"  -> Next Question A (Clarification): '{next_q_a}'")
    print(f"  Answer B (Strong): '{ans_opt_b}'")
    print(f"  -> Next Question B (Deep Multi-camera SLA): '{next_q_b}'")

    assert next_q_a != next_q_b, "CRITICAL: Changing candidate answer did NOT change next question!"
    print("  [PASS] Test 6 PASSED: Candidate's answer strictly and directly determined the next question.")

    # --- TEST 7: Agent Chat Natural Language Action Dispatching ---
    print("\n[TEST 7: Natural Language Interactive Agent Commands]")
    commands_to_test = [
        ("Analyze my resume.", "NAVIGATE", "resume-intelligence"),
        ("Test me on my Traffix project.", "TEST_PROJECT", "resume-interview"),
        ("Test me on DBMS.", "TEST_TOPIC", "adaptive-interview"),
        ("Ask me a harder question.", "INCREASE_DIFFICULTY", "adaptive-interview"),
        ("Why am I weak in OS?", "NAVIGATE", "skill-intelligence"),
        ("How ready am I for Microsoft?", "NAVIGATE", "readiness-report"),
        ("What should I study today?", "NAVIGATE", "learning-plan"),
        ("Give me a coding problem.", "NAVIGATE", "coding-dsa")
    ]

    for user_cmd, expected_action, expected_view in commands_to_test:
        agent_res = post_json("/api/chat/agent", {
            "message": user_cmd,
            "target": {"company": "Microsoft", "role": "Software Engineer"}
        })
        print(f"  Cmd: '{user_cmd}' -> Action: {agent_res.get('action')} | Reply: '{agent_res.get('reply')[:60]}...'")
        assert agent_res.get("action") == expected_action, f"Expected {expected_action}, got {agent_res.get('action')}"
        if expected_view and agent_res.get("action_payload"):
            assert agent_res["action_payload"].get("view") == expected_view, f"Expected view {expected_view}"
    print("  [PASS] Test 7 PASSED: Natural language agent commands successfully trigger real application actions.")

    print("\n" + "=" * 70)
    print("ALL ADAPTIVE TECHNICAL INTERVIEW & AGENT CHAIN TESTS PASSED 100%!")
    print("=" * 70)

if __name__ == "__main__":
    test_multiturn_adaptive_flow()
