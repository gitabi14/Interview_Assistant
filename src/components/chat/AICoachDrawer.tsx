'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  Bot,
  Send,
  Sparkles,
  X,
  Mic,
  MicOff,
  CornerDownLeft,
  ArrowRight,
  Brain,
  Code2,
  BookOpen,
  Target,
  FileText,
  HelpCircle,
  Minimize2,
  Maximize2
} from 'lucide-react';

export const AICoachDrawer: React.FC = () => {
  const {
    isCoachOpen,
    setIsCoachOpen,
    coachMessages,
    isCoachThinking,
    sendCoachMessage,
    executeCoachAction,
    target,
    candidate,
  } = usePrepForge();

  const [inputVal, setInputVal] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isCoachOpen) {
      scrollToBottom();
    }
  }, [coachMessages, isCoachOpen]);

  const handleSend = async () => {
    if (!inputVal.trim() || isCoachThinking) return;
    const text = inputVal.trim();
    setInputVal('');
    await sendCoachMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceToggle = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser. Please type your message.');
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      if (!isListening) {
        setIsListening(true);
        recognition.start();

        recognition.onresult = (event: any) => {
          const speechResult = event.results[0][0].transcript;
          setInputVal(speechResult);
          setIsListening(false);
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };
      } else {
        recognition.stop();
        setIsListening(false);
      }
    } catch (err) {
      console.warn('Voice API error:', err);
      setIsListening(false);
    }
  };

  const quickPrompts = [
    'Analyze my resume.',
    'Test me on my Traffix project.',
    'Test me on DBMS.',
    'Test me on OS.',
    'Ask me a harder question.',
    'Why am I weak in OS?',
    'Give me a coding problem.',
    'How ready am I for Microsoft?',
  ];

  if (!isCoachOpen) {
    return (
      <button
        onClick={() => setIsCoachOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-4 py-3 rounded-full shadow-glow-lg flex items-center gap-2.5 transition-all transform hover:scale-105 group border border-purple-400/40"
      >
        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
          <Bot className="w-5 h-5 text-white animate-bounce" />
        </div>
        <div className="text-left pr-1">
          <div className="text-xs font-extrabold tracking-tight">Talk to PrepForge AI</div>
          <div className="text-[10px] text-purple-200 font-mono">Live Career & Interview Coach</div>
        </div>
      </button>
    );
  }

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 bg-[#0f1228]/95 backdrop-blur-xl border border-purple-500/40 rounded-3xl shadow-glow-xl flex flex-col transition-all duration-200 overflow-hidden ${
        isExpanded ? 'w-[750px] h-[85vh]' : 'w-[420px] h-[600px]'
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#161a3d] to-[#12152e] p-4 border-b border-purple-500/30 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-tight">PrepForge AI Coach</h3>
              <Badge variant="purple" size="sm">
                GPT-5.6
              </Badge>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              Target: {target.company} • {target.role}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-all"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsCoachOpen(false)}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs">
        {coachMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none shadow-md'
                  : 'bg-[#15193b] text-slate-200 border border-purple-500/30 rounded-bl-none shadow-sm'
              }`}
            >
              <div className="font-sans leading-relaxed whitespace-pre-wrap">{msg.content}</div>

              {/* Action Button inside AI Message */}
              {msg.action && msg.actionLabel && (
                <div className="mt-3 pt-2.5 border-t border-purple-500/20">
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<ArrowRight className="w-3.5 h-3.5" />}
                    iconPosition="right"
                    onClick={() => executeCoachAction(msg.action!, msg.actionPayload)}
                  >
                    {msg.actionLabel}
                  </Button>
                </div>
              )}
            </div>
            <span className="text-[9px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}

        {isCoachThinking && (
          <div className="flex items-center gap-2 text-purple-300 text-xs bg-[#15193b] p-3 rounded-2xl border border-purple-500/20 w-fit">
            <Sparkles className="w-4 h-4 animate-spin text-purple-400" />
            <span className="animate-pulse font-mono text-[11px]">PrepForge is thinking & adapting...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts Carousel */}
      <div className="px-4 py-2 border-t border-slate-800 bg-[#0c0e21]/90 shrink-0">
        <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>Interactive Commands:</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => sendCoachMessage(p)}
              className="text-[11px] font-medium bg-[#161a38] hover:bg-purple-600/30 text-purple-200 hover:text-white px-2.5 py-1 rounded-lg border border-purple-500/20 transition-all shrink-0 whitespace-nowrap"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="p-3 bg-[#0a0c1b] border-t border-slate-800 flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={handleVoiceToggle}
          className={`p-2.5 rounded-xl border transition-all ${
            isListening
              ? 'bg-rose-500/20 border-rose-500 text-rose-400 animate-pulse'
              : 'bg-[#151938] border-slate-700 text-slate-400 hover:text-white'
          }`}
          title={isListening ? 'Stop Listening' : 'Speak to AI'}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything or say: 'Test me on Traffix', 'Test me on OS', 'How ready am I?'..."
          className="flex-1 bg-[#12152d] border border-slate-700 focus:border-purple-500 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        />

        <Button
          variant="primary"
          size="sm"
          icon={<Send className="w-3.5 h-3.5" />}
          onClick={handleSend}
          disabled={!inputVal.trim() || isCoachThinking}
        >
          Send
        </Button>
      </div>
    </div>
  );
};
