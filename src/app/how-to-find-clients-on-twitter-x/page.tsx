"use client";

/**
 * Xradar — "How to Find Clients on X (Twitter)" Guide
 * -----------------------------------------------------
 * Drop into app/how-to-find-clients-on-x/page.jsx
 *
 * export const metadata = {
 *   title: "How to Find Clients on X (Twitter): A Freelancer's Guide | Xradar",
 *   description:
 *     "The exact search operators, keywords, and workflow freelancers use to find hiring tweets on X before anyone else replies — plus how to automate it.",
 * };
 */




import { useState } from "react";
import {
  Radar,
  Search,
  Clock,
  ArrowRight,
  ChevronDown,
  Check,
  Copy,
  Zap,
} from "lucide-react";

const searchOperators = [
  {
    query: `"need a video editor" -filter:replies`,
    explain: "Finds original posts (not replies) containing that exact phrase.",
  },
  {
    query: `"looking for someone to edit" min_faves:0`,
    explain: "Catches low-engagement posts — often the freshest, least-replied-to ones.",
  },
  {
    query: `"hiring an editor" OR "hiring a video editor"`,
    explain: "OR lets you cover phrasing variants in one search.",
  },
  {
    query: `"budget for edits" since:2026-07-01`,
    explain: "since: restricts results to a date range — useful for daily checks.",
  },
];

const keywordSets = [
  {
    niche: "Video editors",
    keywords: ["need a video editor", "looking for someone to edit", "hiring an editor", "DM me your rates for editing"],
  },
  {
    niche: "Designers",
    keywords: ["need a designer asap", "looking for a logo designer", "hiring a graphic designer"],
  },
  {
    niche: "Writers",
    keywords: ["need a copywriter", "looking for a ghostwriter", "hiring a content writer"],
  },
];

const steps = [
  {
    n: "01",
    title: "Build your keyword list",
    desc: "Write down every phrase a client might type when they need your service — not just \"hiring,\" but the casual versions too: \"need someone to,\" \"looking for,\" \"anyone know a good.\"",
  },
  {
    n: "02",
    title: "Use X's advanced search",
    desc: "Go to x.com/search-advanced (or add operators directly in the search bar). Combine phrases with OR, exclude replies with -filter:replies, and narrow by date with since:.",
  },
  {
    n: "03",
    title: "Save your searches",
    desc: "On X, save a search and turn on notifications for it. This is the free, manual version of real-time tracking — it works, it just requires you to keep checking.",
  },
  {
    n: "04",
    title: "Reply fast, and reply like a person",
    desc: "Skip the formal pitch. Match the tone of the tweet, mention something specific from it, and make it easy to say yes (a link to 2-3 relevant samples beats a full portfolio dump).",
  },
  {
    n: "05",
    title: "Track what actually converts",
    desc: "Note which keywords and reply styles get responses. Cut what doesn't work weekly — this is the part most people skip.",
  },
];

const faqs = [
  {
    q: "What's the fastest way to find hiring tweets on X?",
    a: "X's advanced search with exact-phrase operators and -filter:replies is the fastest free method. Saved searches with notifications turned on come closest to real-time without a dedicated tool.",
  },
  {
    q: "Why does replying fast matter so much?",
    a: "Hiring tweets get buried in minutes on X. Clients often go with whoever replies first with something relevant — being early matters more than having the most polished pitch.",
  },
  {
    q: "Do I need a paid tool for this, or can I do it manually?",
    a: "Manually works and costs nothing — the search operators above are the same ones any tool uses under the hood. A tool mainly saves you the time of checking constantly and filtering out spam yourself.",
  },
  {
    q: "What is Xradar?",
    a: "It's a tool I built to automate the workflow in this guide — scanning X for hiring-intent keywords, filtering obvious spam, and alerting you when something matches. It's new, so I'd rather you judge it by trying the free tier than by a comparison chart.",
  },
];

// function CopyableQuery({ query }) {
//   const [copied, setCopied] = useState(false);
//   return (
//     <button
//       onClick={() => {
//         navigator.clipboard?.writeText(query);
//         setCopied(true);
//         setTimeout(() => setCopied(false), 1500);
//       }}
//       className="w-full text-left flex items-center justify-between gap-3 bg-purple-950/30 border border-purple-900 rounded-md px-4 py-3 hover:border-purple-700 transition-colors group"
//     >
//       <code className="text-sm text-purple-300 font-mono-radar break-all">{query}</code>
//       <span className="shrink-0 text-slate-500 group-hover:text-purple-400">
//         {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
//       </span>
//     </button>
//   );
// }

export default function FindClientsOnXGuide() {
  const [openFaq, setOpenFaq] = useState(0);
  const [activeNiche, setActiveNiche] = useState(0);

  return (
    <div className="font-body bg-black text-slate-300 min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono-radar { font-family: 'JetBrains Mono', monospace; }
        .font-body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* ---------------- HERO ---------------- */}

        <title>How to Find Freelance Clients on X/Twitter in 2026 | Xradar</title>
      <meta name="description" content="Static databases miss real-time hiring intent. Compare the top lead gen tools for freelancers and learn how to find clients on X/Twitter fast." />
        
      <header className="border-b border-slate-800">
        <div className="max-w-3xl mx-auto px-6 pt-20 pb-14">
          <div className="flex items-center gap-2 mb-6 text-purple-400">
            <Radar className="w-5 h-5" />
            <span className="font-mono-radar text-xs tracking-[0.2em] uppercase">Freelancer guide</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold text-white leading-[1.1] mb-6">
            How to Find Clients on X (Twitter)
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
            The actual search operators and workflow for finding hiring tweets before
            someone else replies first 
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6">
        {/* ---------------- WHY SPEED MATTERS ---------------- */}
        <section className="py-10 border-t border-slate-800">
          <h2 className="font-display text-2xl font-semibold text-white mb-4">
            Why this works better than a portfolio site
          </h2>
          <p className="text-slate-400 leading-relaxed mb-4">
            A hiring tweet is someone telling you, in real time, exactly what they need and
            that they need it now. Compare that to a static profile on a freelance
            marketplace, where you're competing on price against a hundred other listings a
            client has to sift through.
          </p>
          <p className="text-slate-400 leading-relaxed">
            The catch: hiring tweets get buried fast. On a niche like video editing, the
            first two or three relevant replies usually get the client's attention — everyone
            after that is background noise. So the workflow below is built around one thing:
            finding these tweets earlier than most people do.
          </p>
        </section>

        {/* ---------------- SEARCH OPERATORS ---------------- */}
        <section className="py-10 border-t border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5 text-purple-400" />
            <h2 className="font-display text-2xl font-semibold text-white">
              Search operators that actually work
            </h2>
          </div>
          <p className="text-slate-400 leading-relaxed mb-6">
            Use these directly in X's search bar. Tap any query to copy it.
          </p>
          <div className="space-y-3">
            {searchOperators.map((op, i) => (
              <div key={i}>
                {/* <CopyableQuery query={op.query} /> */}
                <p className="text-xs text-slate-500 mt-2 pl-1">{op.explain}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- KEYWORD SETS BY NICHE ---------------- */}
        <section className="py-10 border-t border-slate-800">
          <h2 className="font-display text-2xl font-semibold text-white mb-4">
            Starter keyword sets by niche
          </h2>
          <div className="flex gap-2 mb-5 flex-wrap">
            {keywordSets.map((set, i) => (
              <button
                key={set.niche}
                onClick={() => setActiveNiche(i)}
                className={`font-mono-radar text-xs uppercase tracking-wider px-3 py-2 rounded-md border transition-colors ${
                  activeNiche === i
                    ? "border-purple-500 bg-purple-950/50 text-purple-300"
                    : "border-slate-700 text-slate-500 hover:border-slate-600"
                }`}
              >
                {set.niche}
              </button>
            ))}
          </div>
          <ul className="space-y-2">
            {keywordSets[activeNiche].keywords.map((k, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                <Check className="w-4 h-4 mt-0.5 shrink-0 text-purple-400" />
                "{k}"
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-500 mt-4">
            Swap in your own niche's phrasing — the goal is matching how a client actually
            types, not how a job listing would.
          </p>
        </section>

        {/* ---------------- STEP BY STEP WORKFLOW ---------------- */}
        <section className="py-10 border-t border-slate-800">
          <h2 className="font-display text-2xl font-semibold text-white mb-2">
            The full workflow
          </h2>
          <p className="text-slate-400 mb-8">
            This works with zero paid tools. It takes discipline to check often enough —
            that's the actual bottleneck.
          </p>
          <div>
            {steps.map((step, i) => (
              <div key={step.n}>
                <div className="rounded-lg border border-slate-800 bg-purple-950/20 hover:border-purple-800 transition-colors p-6 md:p-7 flex gap-5 md:gap-6">
                  <div className="shrink-0 flex flex-col items-center gap-3 pt-0.5">
                    <span className="font-mono-radar text-3xl md:text-4xl font-semibold text-purple-400/90 leading-none">
                      {step.n}
                    </span>
                    {/* signal-strength meter: how far into the sequence this step sits */}
                    <div className="flex items-end gap-[3px] h-4" aria-hidden="true">
                      {steps.map((_, j) => (
                        <span
                          key={j}
                          className={`w-[3px] rounded-full transition-colors ${
                            j <= i ? "bg-purple-500" : "bg-slate-700"
                          }`}
                          style={{ height: `${6 + j * 2.5}px` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="pt-0.5">
                    <h3 className="font-display text-white text-base md:text-lg mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
                {i < steps.length - 1 && (
                  <div className="flex justify-center">
                    <div className="w-px h-5 bg-slate-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- HONEST FOUNDER NOTE / TOOL MENTION ---------------- */}
        <section className="py-10 border-t border-slate-800">
          <div className="rounded-lg border border-purple-900 bg-purple-950/30 p-6 md:p-7">
            <div className="flex items-center gap-2 mb-4 text-purple-400">
              <Zap className="w-4 h-4" />
              <span className="font-mono-radar text-xs uppercase tracking-widest">Why I built Xradar</span>
            </div>
            <p className="text-slate-300 leading-relaxed mb-4">
              I was doing the workflow above by hand — saved searches, checking every hour,
              still missing tweets because I had a life outside of X. So I built Xradar to
              run the same searches continuously, filter out the obvious spam and bot posts,
              and alert me the moment something matches.
            </p>
            <p className="text-slate-400 leading-relaxed mb-5">
              It's a new, solo-built tool — not a mature product with years of reviews behind
              it. If your outreach is mainly cold email at scale, a tool like Hunter.io or
              Apollo.io solves a different problem and is a better fit. Xradar is specifically
              for this X hiring-tweet workflow. There's a free tier, so the fastest way to know
              if it's useful to you is to try it on your own keywords.
            </p>
            <a
              href="https://xradar.in"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2.5 rounded-md transition-colors text-sm"
            >
              Try Xradar free <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* ---------------- FAQ ---------------- */}
        <section className="py-10 border-t border-slate-800">
          <h2 className="font-display text-2xl font-semibold text-white mb-6">
            FAQ
          </h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={i} className="border border-slate-800 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-purple-950/20 hover:bg-purple-950/40 transition-colors"
                  >
                    <span className="text-sm md:text-base text-slate-200 font-medium">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${
                        open ? "rotate-180 text-purple-400" : ""
                      }`}
                    />
                  </button>
                  {open && (
                    <div className="px-5 py-4 text-sm text-slate-400 leading-relaxed border-t border-slate-800">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}