'use client';

import React from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { BookOpen, Search, Layers, Database, Sparkles, FileText, ExternalLink } from 'lucide-react';

export const KnowledgeSourcesRAGView: React.FC = () => {
  const { ragSearchQuery, ragSearchResults, performRagSearch } = usePrepForge();

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="sm">
              TWO-LAYER VECTOR RAG ARCHITECTURE
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Knowledge Sources & Vector Space
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Combines Layer 1 (Public Company Rubrics & Technical References) with Layer 2 (Candidate Resume & Project Context).
          </p>
        </div>
      </div>

      {/* Two-Layer Architecture Explainer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-[#161a38] to-[#0f1228] p-5 rounded-2xl border border-purple-500/30 space-y-2">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-purple-300">
              LAYER 1: External Public Knowledge RAG
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Public company job descriptions, Microsoft SDE hiring rubrics, published interview debriefs, and system architecture benchmark references.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <Badge variant="purple" size="sm">Microsoft SDE Rubric</Badge>
            <Badge variant="purple" size="sm">Azure Concurrency Docs</Badge>
            <Badge variant="purple" size="sm">FastAPI Benchmarks</Badge>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#161a38] to-[#0f1228] p-5 rounded-2xl border border-emerald-500/30 space-y-2">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              LAYER 2: Candidate Intelligence Vector Space
            </span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Parsed resume claims, candidate Traffix architecture schemas, past answer history, identified weaknesses, and demonstrated competency scores.
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            <Badge variant="emerald" size="sm">Kabilan_K_A_Resume.pdf</Badge>
            <Badge variant="emerald" size="sm">Traffix YOLOv8 Vector</Badge>
            <Badge variant="emerald" size="sm">Past Mistakes Log</Badge>
          </div>
        </div>
      </div>

      {/* Semantic Search Input */}
      <Card title="Semantic Vector Query Explorer" subtitle="Search across candidate embeddings and company interview rubrics">
        <div className="relative">
          <input
            type="text"
            value={ragSearchQuery}
            onChange={(e) => performRagSearch(e.target.value)}
            placeholder="Search embeddings (e.g., 'YOLOv8 latency', 'Microsoft Concurrency', 'FastAPI WebSockets')..."
            className="w-full bg-[#0b0e21] border border-slate-800 focus:border-purple-500 rounded-xl px-4 py-3 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-sans"
          />
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
        </div>
      </Card>

      {/* Search Results / Knowledge Chunks */}
      <div className="space-y-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Retrieved Context Chunks ({ragSearchResults.length}):
        </span>

        {ragSearchResults.map((doc) => (
          <div
            key={doc.id}
            className="bg-[#12152b] rounded-xl p-4 border border-[#21264b] hover:border-purple-500/40 transition-all space-y-2"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    variant={doc.type === 'Candidate Vector Context' ? 'emerald' : 'purple'}
                    size="sm"
                  >
                    {doc.type}
                  </Badge>
                  <span className="text-[10px] text-slate-400 font-mono">DEMO SOURCE</span>
                </div>
                <h4 className="text-sm font-bold text-white">{doc.title}</h4>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  {doc.relevanceScore}% Similarity
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans bg-[#0b0e21] p-3 rounded-lg border border-slate-800">
              "{doc.snippet}"
            </p>

            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {doc.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] bg-[#141830] text-purple-300 px-2 py-0.5 rounded font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
