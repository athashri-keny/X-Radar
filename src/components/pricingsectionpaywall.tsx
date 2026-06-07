"use client";

import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import PricingSectionDialog from "./pricingSectionDialog";
import { useState } from "react";

interface PaywallOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const leads = [
  {
    score: 92,
    tweet: "Hiring a senior React developer to lead our frontend team. Must have 5+ years experience with TypeScript and have shipped SaaS products.",
    msg: "I noticed this hiring opportunity and would love to help. I think I could be a great fit for what you're looking for.",
  },
  {
    score: 88,
    tweet: "Seeking a full-stack developer. Project involves Next.js, PostgreSQL, and AWS. Contract work, 6-month project.",
    msg: "I noticed this hiring opportunity and would love to help. I think I could be a great fit for what you're looking for.",
  },
];

function LeadCard({ lead, index }: { lead: typeof leads[0]; index: number }) {
  return (
    <motion.div
      animate={{ opacity: [0.5, 0.72, 0.5] }}
      transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: index * 0.7 }}
      className="bg-[#181818] border border-[#2a2a2a] rounded-xl overflow-hidden pointer-events-none select-none"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#222]">
        <span className="text-base">⭐</span>
        <div>
          <p className="text-white text-[11px] font-bold uppercase tracking-widest">Premium Lead</p>
          <p className="text-[#555] text-[10px] mt-0.5">High quality match</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[#555] text-[10px] font-semibold uppercase tracking-widest">Lead Quality</span>
          <span className="text-white text-3xl font-bold tracking-tight">{lead.score}</span>
        </div>

        <p className="text-[#bbb] text-[12.5px] leading-relaxed mb-3 blur-sm">{lead.tweet}</p>

        <div className="inline-flex items-center gap-1.5 border border-[#333] rounded-full px-3 py-1 text-[11px] text-[#666] mb-4">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          View Source
        </div>

        <p className="text-[#555] text-[10px] font-semibold uppercase tracking-widest mb-2">Suggested Message</p>
        <div className="bg-[#111] border border-[#222] rounded-lg px-3 py-2.5 text-[11.5px] text-[#666] leading-relaxed blur-sm">
          {lead.msg}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-center gap-2 px-4 py-3 border-t border-[#222] mt-3 text-[#555] text-xs">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="9" y="9" width="13" height="13" rx="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        Copy Message
      </div>
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#222] text-[#555] text-xs">
        <span>New</span>
        <span className="text-[#444] text-sm">⌄</span>
      </div>
    </motion.div>
  );
}

export default function PaywallOverlay({ isOpen, onClose }: PaywallOverlayProps) {
  const [openPricingDialog, setOpenPricingDialog] = useState(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
        <DialogContent className="max-w-4xl w-[95vw] border border-white/10 bg-black/90 backdrop-blur-xl p-5 sm:p-7 rounded-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-bold text-white">
              Live Results Preview
            </DialogTitle>
          </DialogHeader>

          {/* Cards + overlay */}
          <div className="relative grid grid-cols-2 gap-3 mt-2">
            {leads.map((lead, i) => <LeadCard key={i} lead={lead} index={i} />)}

            {/* Frosted overlay — less blur, lighter tint */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] rounded-2xl flex items-center justify-center z-10">

              {/* Popup — smaller size */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#181818] border border-[#303030] rounded-2xl p-5 w-[290px] text-center shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
              >
                {/* Lock icon */}
                <motion.div
                  animate={{ rotate: [0, -7, 7, -4, 4, 0] }}
                  transition={{ duration: 0.65, delay: 0.45 }}
                  className="inline-block mb-3"
                >
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2.5, delay: 1.2, repeat: Infinity, ease: "easeInOut" }}
                    className="w-11 h-11 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mx-auto"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2"/>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                    </svg>
                  </motion.div>
                </motion.div>

                <h3 className="text-white text-base font-bold tracking-tight leading-snug mb-4 m-3">
                  You've used all 2 free searches!
                </h3>
                <p className="text-white font-semibold text-xs leading-relaxed mb-4">
                  Upgrade to Xradar Pro to get Latest leads
                </p>

                <motion.button
                  onClick={() => setOpenPricingDialog(true)}
                  animate={{ boxShadow: ["0 0 0 0 rgba(255,255,255,0)", "0 0 22px 6px rgba(255,255,255,0.18)", "0 0 0 0 rgba(255,255,255,0)"] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.025 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-white text-black font-bold text-sm rounded-xl py-3 mb-2.5 cursor-pointer border-none"
                >
                  Upgrade to Pro
                </motion.button>

                <p className="text-gray-400 text-[11px] leading-relaxed mb-4">
                  6hr cooldown · Unlimited leads · Latest 24hr tweets
                </p>

                <div className="h-px bg-[#232323] mb-3" />

                <div className="flex justify-center gap-6">
                  {[["⚡", "Instant"], ["🔒", "Cancel anytime"], ["🎯", "High-intent"]].map(([icon, label]) => (
                    <div key={label} className="text-center">
                      <div className="text-base mb-0.5">{icon}</div>
                      <div className="text-[#444] text-[10px]">{label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </DialogContent>
      </Dialog>

      <PricingSectionDialog isopen={openPricingDialog} onClose={() => setOpenPricingDialog(false)} />
    </>
  );
}   