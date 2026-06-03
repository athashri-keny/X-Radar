"use client";

import { useState, useEffect } from "react";
import PricingSectionDialog from "./pricingSectionDialog";

interface UpgradePopoverProps {
  onUpgrade?: () => void;
  onDismiss?: () => void;
  autoShowDelay?: number;
}

export default function UpgradePopover({
  onDismiss,
  autoShowDelay = 2000,
}: UpgradePopoverProps) {
  const [visible, setVisible] = useState(false);
  const [isopen, setisopen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("xradar_upgrade_dismissed");
    if (dismissed) return;
    const t = setTimeout(() => {
      setVisible(true);
      setTimeout(() => setMounted(true), 10);
    }, autoShowDelay);
    return () => clearTimeout(t);
  }, [autoShowDelay]);

  function dismiss() {
    setMounted(false);
    setTimeout(() => {
      setVisible(false);
      sessionStorage.setItem("xradar_upgrade_dismissed", "1");
      onDismiss?.();
    }, 300);
  }

  if (!visible) return null;

  return (
    <>
      <style>{`
        @keyframes popoverSlideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes popoverSlideDown {
          from { opacity: 1; transform: translateY(0)   scale(1);    }
          to   { opacity: 0; transform: translateY(16px) scale(0.96); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .upgrade-popover {
          animation: popoverSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .upgrade-popover.closing {
          animation: popoverSlideDown 0.3s cubic-bezier(0.4, 0, 1, 1) forwards;
        }
        .upgrade-cta-btn {
          transition: opacity 0.15s, transform 0.15s;
        }
        .upgrade-cta-btn:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        .upgrade-cta-btn:active {
          transform: scale(0.97);
        }
        .upgrade-close-btn {
          transition: color 0.15s, background 0.15s;
          border-radius: 4px;
          padding: 2px;
        }
        .upgrade-close-btn:hover {
          background: rgba(128,128,128,0.12);
          color: #666 !important;
        }
        .upgrade-maybe-btn {
          transition: color 0.15s;
        }
        .upgrade-maybe-btn:hover {
          color: #888 !important;
          text-decoration: underline;
        }
        .upgrade-icon-wrap {
          animation: popoverSlideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
        }
      `}</style>

      <div
        className={`upgrade-popover${!mounted ? " closing" : ""}`}
        role="dialog"
        aria-label="Upgrade to Pro"
        style={{
          position: "fixed",
          bottom: "1.75rem",
          right: "1.75rem",
          zIndex: 50,
          width: 280,
          background: "#ffffff",
          border: "1px solid rgba(0,0,0,0.1)",
          borderRadius: 16,
          padding: "18px 18px 14px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.08)",
          fontFamily: "inherit",
          overflow: "hidden",
        }}
      >
        {/* subtle top accent bar */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 3,
          background: "linear-gradient(90deg, #26215C, #7F77DD, #26215C)",
          backgroundSize: "200% 100%",
          animation: "shimmer 3s linear infinite",
          borderRadius: "16px 16px 0 0",
        }} />

        {/* arrow */}
        <div style={{
          position: "absolute",
          bottom: -5, right: 20,
          width: 10, height: 10,
          background: "#ffffff",
          borderRight: "1px solid rgba(0,0,0,0.1)",
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          transform: "rotate(45deg)",
        }} />

        {/* icon + close row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          
          <button
            onClick={dismiss}
            aria-label="Close"
            className="upgrade-close-btn"
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "2px", color: "#aaa", display: "flex", lineHeight: 1,
            }}
          >

          </button>
        </div>

        {/* title */}
            <p style={{ margin: "0 0 6px", fontSize: 15, fontWeight: 800, lineHeight: 1.3, color: "#111" }}>
            Want today's latest leads?
            </p>

            {/* body */}
           <p style={{ margin: "0 0 16px", fontSize: 13, color: "black", fontWeight: 500 }}>
  You're seeing results from the <span style={{ color: "#a78bfa" }}> <br></br>last 6 days</span>. <br />
  Upgrade to Pro and get fresh leads from the <span style={{ color: "#a78bfa" }}>last 24 hours</span> every morning.
</p>

        {/* CTA */}
        <button
          onClick={() => setisopen(true)}
          className="upgrade-cta-btn"
          style={{
            width: "100%",
            background: "#26215C",
            color: "#EEEDFE",
            border: "none",
            borderRadius: 10,
            padding: "10px 0",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
          }}
        >
          Upgrade to X-radar Pro
        </button>

        {/* skip */}
        <div style={{ textAlign: "center", marginTop: 10 }}>
          <button
            onClick={dismiss}
            className="upgrade-maybe-btn"
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 11, color: "#aaa", padding: 0,
            }}
          >
            Maybe later
          </button>
        </div>

        <PricingSectionDialog isopen={isopen} onClose={() => setisopen(false)} />
      </div>
    </>
  );
}