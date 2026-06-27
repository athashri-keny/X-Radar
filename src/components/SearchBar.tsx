"use client";

import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SearchStatsBarProps {
  manualSearchesUsed: number;
  autoScansUsed: number; // matches API key: autoScansUsed
}

const MANUAL_MAX = 3;
const AUTOSCAN_MAX = 2;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function safeNum(val: unknown): number {
  const n = Number(val);
  return isNaN(n) ? 0 : n;
}

function barColor(remaining: number, max: number): string {
  const ratio = remaining / max;
  if (ratio > 0.5) return "bg-emerald-500";
  if (ratio > 0)   return "bg-amber-400";
  return "bg-rose-500";
}

// ─── Compact stat row ─────────────────────────────────────────────────────────

interface StatRowProps {
  label: string;
  used: number;
  max: number;
  delay: number;
}

function StatRow({ label, used, max, delay }: StatRowProps) {
  const remaining = max - used;
  const isExhausted = remaining <= 0;
  const pct = Math.min(100, (used / max) * 100);
  const color = barColor(Math.max(0, remaining), max);

  return (
    <motion.div
      className="space-y-1"
      initial={{ opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] text-muted-foreground truncate">{label}</span>
        {isExhausted ? (
          <Badge
            variant="destructive"
            className="text-[9px] px-1 py-0 h-4 leading-none shrink-0"
          >
            0 left
          </Badge>
        ) : (
          <span className="text-[11px] tabular-nums text-muted-foreground shrink-0">
            {used}/{max} used
          </span>
        )}
      </div>

      {/* Track */}
      <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(pct, pct > 0 ? 4 : 0)}%` }}
          transition={{ duration: 0.55, delay: delay + 0.08, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function SearchStatsBar({ manualSearchesUsed, autoScansUsed }: SearchStatsBarProps) {
  const { data: session, status } = useSession();
  const plan = (session?.user as { plan?: string })?.plan;

  // Wait for session before gating — avoids flash-null during hydration
  if (status === "loading") return null;
  if (plan !== "free") return null;

  const manualUsed = safeNum(manualSearchesUsed);
  const autoUsed   = safeNum(autoScansUsed);

  return (
    <AnimatePresence>
      <motion.div
        className="w-56"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3 space-y-3">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Free usage
          </p>

          <StatRow
            label="Manual searches"
            used={manualUsed}
            max={MANUAL_MAX}
            delay={0.05}
          />
          <StatRow
            label="Auto-scans"
            used={autoUsed}
            max={AUTOSCAN_MAX}
            delay={0.12}
          />

          <p className="text-[10px] text-muted-foreground/70 leading-tight pt-0.5">
            <Link
              href=""
              className="text-violet-400 hover:text-violet-300 underline underline-offset-2 transition-colors"
            >
              Upgrade to Pro
            </Link>{" "}
            for unlimited searches
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}