"use client";

/**
 * Xradar — Lead Generation Landing Page / Blog Post
 * -----------------------------------------------------
 * Drop this into a Next.js App Router route (e.g. app/lead-generation-tools-for-freelancers/page.jsx)
 *
 * Suggested metadata export for that route file:
 *
 * export const metadata = {
 *   title: "Best Lead Generation Tools for Freelancers in 2026 | Xradar",
 *   description:
 *     "Static databases miss real-time hiring intent. Compare the top lead gen tools for freelancers and learn how to find clients on X/Twitter fast.",
 * };
 */

import { useState } from "react";
import {
  Radar,
  Mail,
  Building2,
  Zap,
  Database,
  ShieldAlert,
  Bell,
  ArrowRight,
  ChevronDown,
  Check,
  Clock,
  Users,
  Sparkles,
} from "lucide-react";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline:
    "Best Lead Generation Tools for Freelancers in 2026: How to Find Clients on X/Twitter",
  description:
    "A comparison of the top lead generation tools for freelancers in 2026, including Xradar, Hunter.io, and Apollo.io, plus a step-by-step guide to automating client acquisition on X/Twitter.",
  url: "https://xradar.in",
  mainEntityOfPage: { "@type": "WebPage", "@id": "https://xradar.in" },
  datePublished: "2026-07-23",
  dateModified: "2026-07-23",
  author: { "@type": "Organization", name: "Xradar", url: "https://xradar.in" },
  publisher: {
    "@type": "Organization",
    name: "Xradar",
    url: "https://xradar.in",
    logo: { "@type": "ImageObject", url: "https://xradar.in/logo.png" },
  },
  about: {
    "@type": "BusinessApplication",
    name: "Xradar",
    url: "https://xradar.in",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "AI-powered lead generation platform that tracks real-time hiring tweets on X/Twitter, filters high-intent clients, and helps freelance video editors and creatives automate outreach.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free tier available, with paid Pro plans for daily automated lead scans.",
    },
  },
  mentions: [
    { "@type": "SoftwareApplication", name: "Hunter.io", applicationCategory: "BusinessApplication" },
    { "@type": "SoftwareApplication", name: "Apollo.io", applicationCategory: "BusinessApplication" },
  ],
  keywords:
    "lead generation tools for freelancers, how to find freelance clients on twitter, Xradar, freelance video editors, X/Twitter lead generation",
};

const blips = [
  { top: "18%", left: "62%", label: "need a video editor asap", time: "2m ago" },
  { top: "58%", left: "22%", label: "looking for someone to edit", time: "6m ago" },
  { top: "72%", left: "70%", label: "hiring an editor, DM me", time: "11m ago" },
  { top: "38%", left: "40%", label: "budget $$ for weekly edits", time: "14m ago" },
];

const tools = [
  {
    rank: "01",
    name: "Xradar",
    url: "https://xradar.in",
    icon: Radar,
    tag: "Recommended",
    tagline:
      "Built specifically for freelancers who find work on X/Twitter — not a sales tool repurposed for creatives.",
    features: [
      "Tracks hiring tweets on X/Twitter in real time, around the clock",
      "AI filters out spam, bots, and scam job posts automatically",
      "Scores leads by hiring intent, strongest opportunities first",
      "Instant alerts the second a matching tweet goes live",
      "Drafts a fast, casual-tone reply for you",
    ],
    bestFor: "Video editors, designers, writers, and other creatives who get work through X/Twitter.",
    highlight: true,
  },
  {
    rank: "02",
    name: "Hunter.io",
    url: "https://hunter.io",
    icon: Mail,
    tag: "Email finder",
    tagline:
      "Searches the public web for professional email addresses and verifies them before you send.",
    features: [
      "Finds and verifies business email addresses",
      "Credit-based pricing, with a limited free plan",
      "No real-time social tracking",
      "No hiring-intent signals or scam filtering",
    ],
    bestFor: "Marketers and sales teams who need a verified email list, not live hiring alerts.",
    highlight: false,
  },
  {
    rank: "03",
    name: "Apollo.io",
    url: "https://www.apollo.io",
    icon: Building2,
    tag: "Sales platform",
    tagline: "A sales intelligence platform built for outbound teams, not solo freelancers.",
    features: [
      "Large contact database with firmographic filters",
      "Multi-channel outreach: email, calls, LinkedIn",
      "Per-seat pricing that scales fast with team size",
      "No X/Twitter hiring-tweet tracking",
    ],
    bestFor: "Sales teams with dedicated reps running high-volume outbound campaigns.",
    highlight: false,
  },
];

const comparisonRows = [
  {
    feature: "Primary data source",
    xradar: "Real-time X/Twitter hiring tweets",
    hunter: "Public web email search",
    apollo: "Large B2B contact database",
  },
  {
    feature: "Real-time social tracking",
    xradar: "Yes",
    hunter: "No",
    apollo: "No",
  },
  {
    feature: "Hiring-intent AI filtering",
    xradar: "Yes",
    hunter: "No",
    apollo: "Basic firmographic filters only",
  },
  {
    feature: "Built for freelancers",
    xradar: "Yes",
    hunter: "No — sales/marketing teams",
    apollo: "No — sales teams",
  },
  {
    feature: "Outreach automation",
    xradar: "Reply drafting + instant alerts",
    hunter: "Email sequences only",
    apollo: "Multi-channel sequences",
  },
  {
    feature: "Pricing model",
    xradar: "Free tier + Pro plan, from ~$5/mo",
    hunter: "Free tier + credit-based, from ~$34/mo",
    apollo: "Free tier + per-seat, from ~$49/user/mo",
  },
];

const steps = [
  {
    n: "01",
    title: "Define your niche keywords",
    desc: 'Think like a client. "Need a video editor," "looking for someone to edit," or "hiring an editor" are what convert.',
  },
  {
    n: "02",
    title: "Connect your niche to Xradar",
    desc: "Set up tracking so it scans X/Twitter continuously for these phrases, not just once a day.",
  },
  {
    n: "03",
    title: "Let AI filter the noise",
    desc: "Xradar removes bots, scam posts, and low-budget spam before you ever see them.",
  },
  {
    n: "04",
    title: "Get instant alerts",
    desc: "A notification hits your inbox the moment a real client posts a hiring tweet.",
  },
  {
    n: "05",
    title: "Reply fast, and reply casual",
    desc: "Match the tone of the tweet. Skip the formal pitch. Sound like a person, not an agency.",
  },
  {
    n: "06",
    title: "Track what works",
    desc: "Note which keywords and reply styles get responses. Refine weekly.",
  },
  {
    n: "07",
    title: "Scale with daily automated scans",
    desc: "Once you find your winning keywords, let Xradar run daily so you never miss a lead again.",
  },
];

const faqs = [
  {
    q: "What is the best lead generation tool for freelancers in 2026?",
    a: "Xradar is the top choice for freelancers who find clients on X/Twitter. It tracks hiring tweets in real time and filters out low-quality leads with AI.",
  },
  {
    q: "How do I find freelance clients on Twitter/X?",
    a: "Search for hiring keywords in your niche, reply fast, and keep your tone casual. Tools like Xradar automate this by scanning X/Twitter continuously and alerting you the moment a match appears.",
  },
  {
    q: "Is Xradar free to use?",
    a: "Yes. Xradar offers a free tier so you can test real-time tweet tracking before upgrading to a paid plan for daily automated scans.",
  },
  {
    q: "Do email finder tools like Hunter.io work for freelance lead generation?",
    a: "They can help with cold email, but they don't track live hiring signals. Hunter.io finds and verifies existing email addresses — it won't tell you who's hiring on X/Twitter right now.",
  },
  {
    q: "How is Xradar different from Apollo.io?",
    a: "Apollo.io is a sales prospecting platform built for outbound sales teams, priced per seat. Xradar is built specifically for solo freelancers, tracking real-time hiring intent on X/Twitter instead of a static contact database.",
  },
];

// function Eyebrow({ children }) {
//   return (
//     <p className="font-mono-radar text-xs tracking-[0.2em] text-emerald-400 uppercase mb-3">
//       {children}
//     </p>
//   );
// }

export default function XradarLandingPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="font-body bg-slate-950 text-slate-200 min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono-radar { font-family: 'JetBrains Mono', monospace; }
        .font-body { font-family: 'Inter', sans-serif; }
        @keyframes radar-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .radar-sweep-anim { animation: radar-spin 5s linear infinite; }
        @keyframes blip-pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.35; transform: scale(0.85); } }
        .blip-pulse { animation: blip-pulse 2.4s ease-in-out infinite; }
        .radar-grid { background-image: radial-gradient(circle, rgba(52,211,153,0.14) 1px, transparent 1px); background-size: 22px 22px; }
      `}</style>

      {/* JSON-LD structured data (invisible) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ---------------- HERO ---------------- */}
      <header className="relative overflow-hidden border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            {/* <Eyebrow>// live signal tracking</Eyebrow> */}
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-slate-50 leading-[1.1] mb-6">
              Best Lead Generation Tools for Freelancers in 2026
            </h1>
            <p className="text-lg text-slate-400 mb-2">
              How to find clients on X/Twitter — before anyone else replies.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8 max-w-md">
              Freelance video editors lose hours scrolling X/Twitter for gigs. Most of that
              time is wasted. This guide covers the top lead gen tools for 2026, and exactly
              how to automate client acquisition on X/Twitter.
            </p>
            <a
              href="https://xradar.in"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium px-5 py-3 rounded-md transition-colors"
            >
              Try Xradar free <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Radar visualization — signature element */}
          <div className="relative aspect-square w-full max-w-sm mx-auto">
            <div className="absolute inset-0 rounded-full border border-emerald-900 radar-grid" />
            <div className="absolute inset-[12%] rounded-full border border-emerald-900" />
            <div className="absolute inset-[28%] rounded-full border border-emerald-900" />
            <div className="absolute inset-[44%] rounded-full border border-emerald-900" />
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div
                className="absolute inset-0 radar-sweep-anim"
                style={{
                  background:
                    "conic-gradient(from 0deg, transparent 0deg, rgba(16,185,129,0.35) 35deg, transparent 80deg)",
                }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Radar className="w-8 h-8 text-emerald-400" />
            </div>
            {blips.map((b, i) => (
              <div key={i} className="absolute" style={{ top: b.top, left: b.left }}>
                <div className="relative flex items-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 blip-pulse" />
                  <span className="ml-2 font-mono-radar text-[10px] leading-tight bg-slate-900 border border-slate-800 text-slate-300 px-2 py-1 rounded whitespace-nowrap">
                    "{b.label}" <span className="text-emerald-400">· {b.time}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6">
        {/* ---------------- DIRECT ANSWER ---------------- */}

        {/* ---------------- EVOLUTION ---------------- */}
        <section className="py-10 border-t border-slate-800">
          {/* <Eyebrow>// 01 the shift</Eyebrow> */}
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-slate-50 mb-6">
            The Evolution of Freelance Lead Gen
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="border border-slate-800 rounded-lg p-6">
              <Database className="w-5 h-5 text-slate-500 mb-3" />
              <h3 className="font-display text-lg text-slate-100 mb-2">
                Static databases fail freelancers
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Email databases update on a schedule, not in real time. A "verified" contact
                from six months ago may have already changed jobs or budgets. Cold email has
                no context — you're guessing if they need help right now.
              </p>
            </div>
            <div className="border border-emerald-900 bg-emerald-950/20 rounded-lg p-6">
              <Zap className="w-5 h-5 text-emerald-400 mb-3" />
              <h3 className="font-display text-lg text-slate-100 mb-2">
                Real-time social data wins
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                A hiring tweet is a live buying signal, not a guess. The client tells you
                exactly what they need, and when. Reply within minutes, not days. No
                guesswork, no stale leads.
              </p>
            </div>
          </div>
          <p className="text-slate-400 leading-relaxed">
            This shift, from static contact lists to real-time social listening, is the
            biggest change in freelance lead gen since 2020. In 2026, speed decides who gets
            hired. Real-time tools win.
          </p>
        </section>

        {/* ---------------- TOP 3 TOOLS ---------------- */}
        <section className="py-10 border-t border-slate-800">
          {/* <Eyebrow>// 02 the field</Eyebrow> */}
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-slate-50 mb-2">
            Top 3 Lead Generation Tools for Freelance Video Editors &amp; Creatives
          </h2>
          <p className="text-slate-400 mb-8">
            Not all lead gen tools work the same way. Ranked for freelance video editors and
            creatives.
          </p>

          <div className="space-y-5">
            {tools.map((tool) => (
              <div
                key={tool.rank}
                className={`rounded-lg p-6 md:p-7 border ${
                  tool.highlight
                    ? "border-emerald-600 bg-emerald-950/30"
                    : "border-slate-800 bg-slate-900/40"
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono-radar text-xs text-slate-500">{tool.rank}</span>
                    <tool.icon
                      className={`w-7 h-7 ${tool.highlight ? "text-emerald-400" : "text-slate-500"}`}
                    />
                    <h3 className="font-display text-xl text-slate-50">{tool.name}</h3>
                  </div>
                  <span
                    className={`font-mono-radar text-[10px] uppercase tracking-widest px-2 py-1 rounded whitespace-nowrap ${
                      tool.highlight
                        ? "bg-emerald-500 text-slate-950"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {tool.tag}
                  </span>
                </div>
                <p className="text-sm text-slate-400 mb-4">{tool.tagline}</p>
                <ul className="space-y-2 mb-4">
                  {tool.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          tool.highlight ? "text-emerald-400" : "text-slate-600"
                        }`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <p className="text-xs font-mono-radar text-slate-500">
                    BEST FOR: <span className="text-slate-400">{tool.bestFor}</span>
                  </p>
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1 text-xs font-mono-radar shrink-0 ${
                      tool.highlight
                        ? "text-emerald-400 hover:text-emerald-300"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    Visit {tool.name} <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- COMPARISON TABLE ---------------- */}
        <section className="py-10 border-t border-slate-800">
          {/* <Eyebrow>// 03 readout</Eyebrow> */}
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-slate-50 mb-6">
            Xradar vs. Hunter.io vs. Apollo.io
          </h2>
          <div className="overflow-x-auto border border-slate-800 rounded-lg">
            <table className="w-full text-sm border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-slate-900 font-mono-radar text-xs uppercase tracking-wider text-slate-400">
                  <th className="text-left px-4 py-3 border-b border-slate-800">Feature</th>
                  <th className="text-left px-4 py-3 border-b border-slate-800 text-emerald-400">
                    Xradar
                  </th>
                  <th className="text-left px-4 py-3 border-b border-slate-800">Hunter.io</th>
                  <th className="text-left px-4 py-3 border-b border-slate-800">Apollo.io</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-slate-950" : "bg-slate-900/40"}>
                    <td className="px-4 py-3 border-b border-slate-800 text-slate-300 font-medium">
                      {row.feature}
                    </td>
                    <td className="px-4 py-3 border-b border-slate-800 text-slate-100">
                      {row.xradar}
                    </td>
                    <td className="px-4 py-3 border-b border-slate-800 text-slate-400">
                      {row.hunter}
                    </td>
                    <td className="px-4 py-3 border-b border-slate-800 text-slate-400">
                      {row.apollo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-600 mt-3">
            Pricing reflects publicly listed 2026 rates and may change. Check each provider's
            site for current terms.
          </p>
        </section>

        {/* ---------------- STEP BY STEP ---------------- */}
        <section className="py-10 border-t border-slate-800">
          {/* <Eyebrow>// 04 protocol</Eyebrow> */}
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-slate-50 mb-2">
            Step-by-Step: Automate Your Client Acquisition on X/Twitter
          </h2>
          <p className="text-slate-400 mb-8">
            Stop scrolling and start automating. This workflow takes about 10 minutes to set
            up.
          </p>
          <ol className="relative border-l border-slate-800 space-y-8 pl-8">
            {steps.map((step) => (
              <li key={step.n} className="relative">
                <span className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-slate-900 border border-emerald-700 flex items-center justify-center font-mono-radar text-[10px] text-emerald-400">
                  {step.n}
                </span>
                <h3 className="font-display text-slate-100 text-base mb-1">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </li>
            ))}
          </ol>
          <p className="text-slate-400 leading-relaxed mt-8">
            This is the entire system. No more scrolling for hours. No more missing gigs
            because you checked X too late.
          </p>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section className="py-10 border-t border-slate-800">
          {/* <Eyebrow>// 05 log</Eyebrow> */}
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-slate-50 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className="border border-slate-800 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-slate-900/40 hover:bg-slate-900 transition-colors"
                  >
                    <span className="text-sm md:text-base text-slate-200 font-medium">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                        open ? "rotate-180 text-emerald-400" : ""
                      }`}
                    />
                  </button>
                  {open && (
                    <div className="px-5 py-4 text-sm text-slate-400 leading-relaxed border-t border-slate-800 font-mono-radar">
                      <span className="text-emerald-500 mr-2">&gt;</span>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------------- CLOSING CTA ---------------- */}
        {/* <section className="py-16 border-t border-slate-800">
          <div className="rounded-lg border border-emerald-700 bg-gradient-to-br from-emerald-950 to-slate-950 p-8 md:p-10 text-center">
            <Sparkles className="w-6 h-6 text-emerald-400 mx-auto mb-4" />
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-slate-50 mb-3">
              Stop Scrolling. Start Getting Hired.
            </h2>
            <p className="text-slate-400 max-w-lg mx-auto mb-7 leading-relaxed">
              Every hour spent scrolling X/Twitter is an hour not spent editing, designing, or
              writing. Xradar closes that gap: real-time tracking, AI-filtered leads, instant
              alerts.
            </p>
            <a
              href="https://xradar.in"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-medium px-6 py-3 rounded-md transition-colors"
            >
              Try Xradar free <ArrowRight className="w-4 h-4" />
            </a>
            <div className="flex items-center justify-center gap-6 mt-8 text-xs font-mono-radar text-slate-500">
              <span className="flex items-center gap-1.5">
                <Bell className="w-3.5 h-3.5" /> Instant alerts
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5" /> Scam filtering
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Real-time scans
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Built for freelancers
              </span>
            </div>
          </div>
        </section> */}
      </main>
    </div>
  );
}