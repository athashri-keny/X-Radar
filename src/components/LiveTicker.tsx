'use client'

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Zap, ExternalLink, Copy, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

const leads = [
  {
    quality: 92,
    premium: true,
    text: "Hiring a senior React developer to lead our frontend team. Must have 5+ years experience with TypeScript and have shipped SaaS products.",
    suggestion: "I noticed this hiring opportunity and would love to help. I think I could be a great fit for what you're looking for. Let me know if you'd like to discuss further!",
    status: "New",
  },
  {
    quality: 88,
    premium: true,
    text: "Seeking a full-stack developer. Project involves Next.js, PostgreSQL, and AWS. Contract work, 6-month project.",
    suggestion: "I noticed this hiring opportunity and would love to help. I think I could be a great fit for what you're looking for. Let me know if you'd like to discuss further!",
    status: "New",
  },
  {
    quality: 65,
    premium: false,
    text: "Need a freelance designer for a startup project. Looking for someone who can do UI/UX and some branding work.",
    suggestion: "I noticed this hiring opportunity and would love to help. I think I could be a great fit for what you're looking for. Let me know if you'd like to discuss further!",
    status: "New",
  },
  {
    quality: 78,
    premium: false,
    text: "Looking for a freelance copywriter who knows SaaS. Need landing pages, emails, and blog posts. Ongoing work available.",
    suggestion: "I noticed this hiring opportunity and would love to help. I think I could be a great fit for what you're looking for. Let me know if you'd like to discuss further!",
    status: "New",
  },
];

const LeadCard = ({ quality, premium, text, suggestion, status }: typeof leads[0]) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
    className="glass-card p-5 w-full flex flex-col gap-4"
  >
    {/* Premium badge */}
    {premium && (
      <div className="flex items-center gap-3 bg-muted/50 rounded-lg px-4 py-3 border border-border/50">
        <Star size={20} className="text-yellow-500 fill-yellow-500 flex-shrink-0" />
        <div>
          <p className="text-sm font-bold text-foreground tracking-wide">PREMIUM LEAD</p>
          <p className="text-xs text-muted-foreground">High quality match</p>
        </div>
      </div>
    )}

    {/* Lead Quality */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Zap size={16} className="text-primary" />
        <span className="text-xs font-medium uppercase tracking-wider">Lead Quality</span>
      </div>
      <span className={`text-3xl font-bold ${quality >= 80 ? 'text-foreground' : 'text-muted-foreground'}`}>
        {quality}
      </span>
    </div>

    {/* Tweet text */}
    <p className="text-sm text-foreground/90 leading-relaxed">{text}</p>

    {/* View Source button */}
    <button className="self-start flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
      <ExternalLink size={12} />
      View Source
    </button>

    {/* Suggested message */}
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-primary" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Suggested Message</span>
      </div>
      <div className="border border-border/50 rounded-lg p-3">
        <p className="text-sm text-muted-foreground leading-relaxed">{suggestion}</p>
      </div>
    </div>

    {/* Copy Message button */}
    <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted/50 transition-colors">
      <Copy size={16} />
      Copy Message
    </button>

    {/* Status */}
    <div className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-muted/30 border border-border/50">
      <span className="text-sm text-muted-foreground">{status}</span>
      <ChevronDown size={16} className="text-muted-foreground" />
    </div>
  </motion.div>
);

const LiveTicker = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 2 >= leads.length ? 0 : prev + 2));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 2 < 0 ? leads.length - 2 : c - 2));
  const next = () => setCurrent((c) => (c + 2 >= leads.length ? 0 : c + 2));
  const pair = [leads[current], leads[(current + 1) % leads.length]];

  return (
    <section className="py-12 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-destructive" />
            </span>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Live Results Preview</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={prev} className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button onClick={next} className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/40 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={current} className="grid md:grid-cols-2 gap-4">
            {pair.map((lead, i) => (
              <LeadCard key={`${current}-${i}`} {...lead} />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-center gap-1.5 mt-5">
          {Array.from({ length: Math.ceil(leads.length / 2) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i * 2)}
              className={`w-1.5 h-1.5 rounded-full transition-all ${current / 2 === i ? "bg-primary w-4" : "bg-muted-foreground/30"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveTicker;
