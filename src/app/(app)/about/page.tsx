import { Radar } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-slate-300 overflow-hidden">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-violet-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-24">

        {/* Hero */}
        <div className="mb-20">
          <p className="text-indigo-400 text-xs font-medium tracking-[0.3em] uppercase mb-4">
            About X-Radar
          </p>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
              <Radar className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              X-Radar
            </h1>
          </div>
          <p className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 mb-6">
            Find opportunities. Before anyone else does.
          </p>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl">
            X-Radar was born in 2026 from a simple frustration — finding
            clients on Twitter/X was a full-time job in itself. Endless
            scrolling, manual searching, zero signal. We built the tool we
            wished existed.
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-indigo-500/40 via-slate-700 to-transparent mb-20" />

        {/* Story */}
        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-white font-semibold text-xl mb-4">
              The Problem
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Twitter/X is one of the best places to find clients — people
              openly post about hiring developers, designers, and freelancers
              every single day. But finding those posts before they go cold?
              Nearly impossible without spending hours glued to a screen.
            </p>
          </div>
          <div>
            <h2 className="text-white font-semibold text-xl mb-4">
              The Solution
            </h2>
            <p className="text-slate-400 leading-relaxed">
              X-Radar uses AI to scan Twitter/X in real time, score every
              lead by relevance, and surface the ones worth your time — so
              you can focus on outreach, not research. No noise. Just
              signal.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-20">
          {[
            { value: "2026", label: "Founded" },
            { value: "86+", label: "Signups" },
            { value: "AI-first", label: "Lead Scoring" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border border-slate-800 rounded-xl p-6 bg-slate-900/30 hover:border-indigo-500/30 transition-colors"
            >
              <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-slate-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-white font-semibold text-xl mb-8">
            What we stand for
          </h2>
          <div className="space-y-4">
            {[
              {
                title: "Speed over perfection",
                desc: "Leads go cold fast. X-Radar gets you there first.",
              },
              {
                title: "Signal over noise",
                desc: "Every result is scored and ranked. No filler, no spam.",
              },
              {
                title: "Users first",
                desc: "We ship fast, listen to feedback, and iterate constantly.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="flex gap-4 p-5 rounded-xl border border-slate-800 bg-slate-900/20 hover:border-indigo-500/20 transition-colors group"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0 group-hover:bg-indigo-300 transition-colors" />
                <div>
                  <p className="text-white font-medium mb-1">{value.title}</p>
                  <p className="text-slate-500 text-sm">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-indigo-500/20 bg-indigo-950/20 p-10 text-center">
          <h2 className="text-white font-bold text-2xl mb-3">
            Ready to find your next opportunity?
          </h2>
          <p className="text-slate-400 mb-6">
            Join freelancers and job seekers already using X-Radar.
          </p>
          <a
            href="/signup"
            className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-8 py-3 rounded-lg transition-colors"
          >
            Get Started Free
          </a>
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-slate-800">
          <p className="text-slate-600 text-sm">
            © 2026 X-Radar · All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}