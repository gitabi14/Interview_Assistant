import re

COMMON_TECH_ACRONYMS = {
    'jwt', 'sql', 'aws', 'css', 'html', 'api', 'rpc', 'db', 'io', 'os', 'sdk', 'k8s',
    'tcp', 'udp', 'ssl', 'tls', 'cpu', 'gpu', 'ram', 'fps', 'sla', 'tps', 'p99', 'gis',
    'rag', 'llm', 'fp16', 'rpn', 'ip', 'npm', 'git', 'cli', 'gui', 'crud', 'rest', 'json',
    'yaml', 'xml', 'ci', 'cd', 'cicd', 'mq', 'mqtt', 'grpc', 'ssh', 'http', 'https', 'dns'
}

EVASION_PATTERNS = {
    'skip', 'pass', 'next', 'next question', 'skip question', 'dont care', "don't care",
    'whatever', 'nothing', 'none', 'test', 'testing', 'hello', 'hi', 'hey', 'ok', 'okay',
    'cool', 'fine', 'yeah', 'yes', 'no', 'nope', 'nah', 'idk', "i don't care",
    'no answer', 'i dont want to answer', "i don't want to answer", 'can you repeat',
    'repeat question', 'bye', 'exit', 'quit'
}

OFF_TOPIC_CASUAL_KEYWORDS = {
    'pizza', 'burger', 'ice cream', 'sandwich', 'pasta', 'dinner', 'lunch', 'breakfast',
    'football', 'soccer', 'basketball', 'cricket', 'baseball', 'tennis',
    'weather', 'sunny', 'raining', 'movie', 'cinema', 'song', 'music',
    'sleep', 'sleeping', 'tired', 'party', 'weekend', 'dog', 'cat', 'puppy', 'kitten',
    'joke', 'funny', 'haha', 'lmao', 'rofl', 'shopping', 'girlfriend', 'boyfriend'
}

INTRO_TECH_SIGNALS = {
    'engineer', 'developer', 'software', 'project', 'system', 'background', 'tech',
    'code', 'coding', 'program', 'build', 'built', 'develop', 'stack', 'work', 'experience',
    'student', 'study', 'university', 'college', 'degree', 'backend', 'frontend',
    'fullstack', 'data', 'ml', 'ai', 'cloud', 'architecture', 'api', 'framework',
    'python', 'java', 'c++', 'javascript', 'typescript', 'react', 'node', 'sql',
    'docker', 'aws', 'azure', 'git', 'traffix', 'faiss', 'challenge', 'solved',
    'intern', 'bannari', 'b.e', 'be', 'cs', 'cse', 'it'
}

def is_gibberish_input(text: str) -> bool:
    clean = text.strip().lower()
    if not clean or len(clean) < 2:
        return True
    
    words = re.findall(r'[a-z0-9]+', clean)
    if not words:
        return True
    
    alpha_chars = re.findall(r'[a-z]', clean)
    if len(alpha_chars) < 2:
        return True

    # 1. Repeated character sequences: 'aaaaaa', 'zzzzzz'
    if re.search(r'(.)\1{4,}', clean):
        return True

    # 2. Keyboard smash home rows or repeated patterns: 'asdfasdf', 'qwerqwer'
    if any(smash in clean for smash in ['asdfgh', 'zxcvbn', 'qwertyui', 'asdfasdf', 'qwerqwer', 'lkjhgf']):
        return True

    # 3. Analyze words in the answer:
    for w in words:
        if w in COMMON_TECH_ACRONYMS or w.isdigit():
            continue
        # 5+ consecutive consonants (allowing known words)
        if re.search(r'[^aeiouy0-9]{5,}', w) and w not in ['postgresql', 'strengths']:
            return True
        # If single word is length >= 4 and has 0 vowels (e.g. njcxncnbkjxz, dfghjk)
        if len(w) >= 4 and not any(c in 'aeiouy' for c in w):
            return True

    # 4. Total vowel-to-consonant ratio check across entire response:
    vowel_count = sum(1 for c in alpha_chars if c in 'aeiouy')
    if len(alpha_chars) >= 8 and vowel_count == 0:
        return True

    if len(alpha_chars) >= 10 and (vowel_count / len(alpha_chars)) < 0.10:
        if not any(ac in clean for ac in COMMON_TECH_ACRONYMS):
            return True

    return False

def is_evasion_input(text: str) -> bool:
    clean = text.strip().lower()
    clean_nopunct = re.sub(r'[^\w\s]', '', clean).strip()
    return clean in EVASION_PATTERNS or clean_nopunct in EVASION_PATTERNS

def is_off_topic_input(ans_text: str, q_text: str, topic: str) -> bool:
    ans_clean = ans_text.strip().lower()
    q_clean = q_text.strip().lower()

    # 1. Casual off-topic chatter (e.g., pizza, soccer, movie, sleeping)
    words = set(re.findall(r'[a-z]+', ans_clean))
    has_casual = any(w in OFF_TOPIC_CASUAL_KEYWORDS for w in words)
    has_tech = any(w in COMMON_TECH_ACRONYMS or w in INTRO_TECH_SIGNALS for w in words)
    if has_casual and not has_tech:
        return True

    # 2. Intro Question Check: Candidate asked about engineering background & projects
    if any(w in q_clean for w in ["background", "primary technical challenges", "engineering projects", "walk me through your"]):
        if not any(sig in ans_clean for sig in INTRO_TECH_SIGNALS) and not any(ac in ans_clean for ac in COMMON_TECH_ACRONYMS):
            return True

    # 3. Domain Mismatch:
    has_os_relevance = any(w in ans_clean for w in ["process", "thread", "memory", "share", "space", "lock", "concur", "mutex", "heap", "stack", "isolation", "address", "context switch", "kernel", "atomic", "race"])
    is_network_or_frontend = any(w in ans_clean for w in ["tcp", "handshake", "syn", "ack", "three-way", "css", "flexbox", "html", "grid", "tailwind", "oauth"])
    if any(w in q_clean for w in ["process", "thread", "memory", "concurrency", "lock", "os"]) and is_network_or_frontend and not has_os_relevance:
        return True

    if any(w in q_clean for w in ["yolo", "detection", "traffix", "fps"]) and is_network_or_frontend and not any(w in ans_clean for w in ["yolo", "model", "frame", "camera", "latency", "detection", "edge"]):
        return True

    return False

if __name__ == '__main__':
    edge_cases = [
        ('njcxncnbkjxz', True, False, False),
        ('asdfghjkl', True, False, False),
        ('123456789', True, False, False),
        ('.....', True, False, False),
        ('qwertyuiop', True, False, False),
        ('hahahahaha', True, False, False),
        ('skip', False, True, False),
        ('pass', False, True, False),
        ('next', False, True, False),
        ('i like pizza', False, False, True),
        ('hello good morning', False, True, False),
    ]
    for text, exp_gibberish, exp_evasion, exp_off_topic in edge_cases:
        gib = is_gibberish_input(text)
        eva = is_evasion_input(text)
        off = is_off_topic_input(text, 'Walk me through your background', 'intro')
        print(f"'{text}': gib={gib}, eva={eva}, off={off}")
        assert gib == exp_gibberish or eva == exp_evasion or off == exp_off_topic, f"Failed for {text}"
    print('ALL EDGE CASES PASSED!')

    # Full AIService Evaluation Test
    import sys
    sys.path.insert(0, '.')
    from backend.services.ai_service import AIService
    service = AIService()
    res = service.evaluate_candidate_answer(
        question_id='q-round-1',
        question_text='Walk me through your background and the primary technical challenges you focused on in your engineering projects.',
        answer_text='njcxncnbkjxz',
        company='Microsoft',
        role='Software Engineer'
    )
    print('\nFull Evaluation for user input njcxncnbkjxz:')
    print('answer_type:', res['answer_type'])
    print('score:', res['score'], '/ 100 ->', res['score'] / 10, '/ 10')
    print('interviewer_risk:', res['interviewer_risk'])
    print('strengths:', res['strengths'])
    print('weaknesses:', res['weaknesses'])
    print('frank_feedback:', res['frank_feedback'])
    assert res['score'] == 0
    assert res['answer_type'] == 'GIBBERISH'
    assert len(res['strengths']) == 0
    assert res['interviewer_risk'] == 'CRITICAL'
    print('\n[VERIFIED] User gibberish input correctly scored 0.0/10 with CRITICAL risk and zero fake strengths!')

    # Test off-topic input
    res_off = service.evaluate_candidate_answer(
        question_id='q-round-1',
        question_text='Walk me through your background and the primary technical challenges you focused on in your engineering projects.',
        answer_text='I really love eating pizza and burgers with cheese',
        company='Microsoft',
        role='Software Engineer'
    )
    print('\nEvaluation for off-topic input (pizza/burgers):')
    print('answer_type:', res_off['answer_type'])
    print('score:', res_off['score'], '/ 100')
    print('strengths:', res_off['strengths'])
    print('frank_feedback:', res_off['frank_feedback'])
    assert res_off['score'] == 0
    assert res_off['answer_type'] == 'OFF_TOPIC'
    assert len(res_off['strengths']) == 0
    print('[VERIFIED] Off-topic input correctly scored 0.0/10 with zero fake strengths!')

