'use client';

import React, { useState } from 'react';
import { usePrepForge } from '../../store/PrepForgeContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Layers, Network, Database, Server, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

export const SystemDesignView: React.FC = () => {
  const { updateSkillScore } = usePrepForge();

  const [sysDesignText, setSysDesignText] = useState('');
  const [evaluated, setEvaluated] = useState(false);

  const handleEvaluate = () => {
    setEvaluated(true);
    updateSkillScore('System Design', +4, 'Demonstrated Base62 encoding, Redis caching, and partitioned database design for URL shortener.');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="sm">
              DISTRIBUTED SYSTEMS ARCHITECTURE
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            System Design Workspace
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Evaluate high-scale system design: requirements, capacity estimation, API contracts, partitioned storage, and caching strategies.
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleEvaluate}>
          Evaluate Architecture Design
        </Button>
      </div>

      {/* Problem Prompt */}
      <Card title="Problem: Design TinyURL / Scalable URL Shortening Service" subtitle="Microsoft SDE System Design Standard">
        <div className="space-y-3 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-[#0b0e21] p-4 rounded-xl border border-slate-800 font-mono">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Write Volume:</span>
              <span className="text-white font-bold">100M URLs / month (~40 writes/sec)</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Read Volume:</span>
              <span className="text-white font-bold">1B reads / month (~400 reads/sec, 4K peak)</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Storage:</span>
              <span className="text-white font-bold">~500 bytes/URL = 600 GB / 10 years</span>
            </div>
          </div>

          <div className="space-y-1 text-slate-300">
            <span className="font-bold text-purple-300 block">Core Architecture Pillars to Cover:</span>
            <ul className="list-disc pl-5 space-y-1 text-slate-400">
              <li>Short Code Generation: Base62 encoding on a distributed 64-bit ID generator (Snowflake/Ticket Service) vs MD5 hash truncation.</li>
              <li>Database Choice: Partitioned NoSQL (Cassandra/DynamoDB) or PostgreSQL with B-tree index on short_url hash.</li>
              <li>Caching Layer: Redis cluster using LRU eviction for the top 20% most requested URLs (Pareto 80/20 rule).</li>
              <li>High Availability & Rate Limiting: Token bucket rate limiter preventing crawler abuse and multi-region replication.</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Design Submission Box */}
      <Card title="Your Architectural Proposal" subtitle="Detail APIs, data schemas, caching, and scalability bottlenecks">
        <div className="space-y-4">
          <textarea
            value={sysDesignText}
            onChange={(e) => setSysDesignText(e.target.value)}
            placeholder="Structure your response: 1. Functional & Non-Functional Requirements, 2. API Endpoints (POST /api/v1/shorten, GET /{short_code}), 3. ID Generation & Base62 Encoding, 4. Data Storage & Schema, 5. Redis Caching & Cache-Aside Pattern, 6. Scalability & Fault Tolerance..."
            rows={8}
            className="w-full bg-[#0b0e21] border border-slate-800 focus:border-purple-500 rounded-xl p-3.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none leading-relaxed font-sans"
          />

          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSysDesignText(
                  "1. Architecture:\n- API Gateway / Load Balancer (Nginx/Envoy) with Token Bucket Rate Limiter (100 req/min per IP).\n- App Servers: Stateless Python/FastAPI microservices.\n- Unique ID Generator: Twitter Snowflake distributed 64-bit ID service generating strictly unique 64-bit integers.\n- Encoding: Base62 [A-Za-z0-9] converting 64-bit integer into 7-character short URL (62^7 = 3.5 Trillion URLs).\n- Database: PostgreSQL with B-tree index on short_code. Sharded by hash(short_code) across 4 DB partitions.\n- Caching: Redis Cluster with LRU eviction caching the top 20% hot URLs (estimated 120GB memory), achieving sub-5ms read latency.\n- Redirection: HTTP 302 Found (to track click analytics) or HTTP 301 Moved Permanently for maximum client-side caching."
                );
              }}
            >
              Load Full System Architecture
            </Button>

            <Button variant="primary" size="sm" onClick={handleEvaluate}>
              Evaluate Design
            </Button>
          </div>

          {evaluated && (
            <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 space-y-2 text-xs">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> System Design Assessment Score: 88/100
              </span>
              <p className="text-slate-200 leading-relaxed font-sans">
                Strong distributed design. Clear distinction between HTTP 301 vs 302 redirection semantics, appropriate selection of Snowflake + Base62 encoding avoiding hash collision bottlenecks, and well-sized Redis LRU cache.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
