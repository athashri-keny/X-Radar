"use client";

import axios from "axios";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const freeFeatures = [
  { text: "24-hour cooldown", upgradesTo: "6-hour cooldown" },
  { text: "Tweets from last 6-days", upgradesTo: "Within 24 hrs" },
  { text: "5 leads max per search", upgradesTo: "Unlimited leads" },
  { text: "AI reply suggestions", upgradesTo: null },
  { text: "2 search queries", upgradesTo: "5 smart queries" },
];

const proOnlyFeatures = [
  "Get personalized leads via Email",
  "Every new feature free until stable",
];

export default function PricingSection() {

  
  const handleRedicrectOfPayment = async() => {
    try {
      const res = await axios.post('/api/checkout')

      window.location.href = res.data.checkout_url

    } catch (error) {
      console.log("Error while redirecting to payment page" , error)
    }
  }


  return (
    <div className="flex flex-col gap-3 font-sans">
      {/* Free Card */}
      <div className="rounded-2xl border border-[#1f2330] bg-[#111318] p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-widest text-white">
              Current Plan
            </p>
            <p className="text-2xl font-black text-[#e2e8f0]">Free</p>
          </div>
          <span className="rounded-full border border-[#2a2d3d] bg-[#1a1d2e] px-3 py-1 text-[10px] font-medium tracking-widest text-[#4a5168]">
            Free tier
          </span>
        </div>

        <div className="my-4 border-t border-[#1a1d2a]" />

        <p className="mb-3 text-[10px] uppercase tracking-widest text-white">
          What you get
        </p>

        <ul className="space-y-2.5">
          {freeFeatures.map((f, i) => (
            <motion.li
              key={f.text}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.3 }}
              className="flex items-center gap-2.5"
            >
              <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-[#253025] bg-[#1a1f1a]">
                <Check size={8} strokeWidth={3} className="text-[#4a7a4a]" />
              </span>
              <span className="text-xs text-white">{f.text}</span>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Pro Card */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-[#818cf8] bg-[#111318] p-5">
        {/* Most popular badge */}
        <div className="absolute right-0 top-0 rounded-bl-lg bg-[#818cf8] px-3 py-1 text-[10px] font-semibold tracking-wide text-white">
          Most popular
        </div>

        <div className="flex items-start justify-between">
          <div>
            <p className="mb-1 text-[10px] uppercase tracking-widest text-[#818cf8]">
              Upgrade to
            </p>
            <p className="text-2xl font-black text-[#e2e8f0]">X-Radar Pro</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-black text-white mt-3 ">$9.99</p>
            <p className="text-[10px] text-white">/month</p>
          </div>
        </div>

        <div className="my-4 border-t border-[#1a1d2a]" />

        <p className="mb-3 text-[10px] uppercase tracking-widest text-white">
          Everything in free, plus
        </p>

        <ul className="space-y-2.5">
          {freeFeatures.map((f, i) => (
            <motion.li
              key={f.text}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-[#3730a3] bg-[#1e1b4b]">
                <Check size={8} strokeWidth={3} className="text-[#818cf8]" />
              </span>

              {f.upgradesTo ? (
                <span className="flex flex-col gap-0">
                  <span className="relative w-fit text-[10px] text-white opacity-50 line-through decoration-gray-900">
                    {f.text}
                  </span>
                  <span className="text-xs font-semibold text-white">
                    {f.upgradesTo}
                  </span>
                </span>
              ) : (
                <span className="text-xs text-white font-semibold">{f.text}</span>
              )}
            </motion.li>
          ))}

          {proOnlyFeatures.map((f, i) => (
            <motion.li
              key={f}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15 + (freeFeatures.length + i) * 0.06,
                duration: 0.3,
              }}
              className="flex items-center gap-2.5"
            >
              <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-[#3730a3] bg-[#1e1b4b]">
                <Check size={8} strokeWidth={3} className="text-[#818cf8]" />
              </span>
              <span className="text-xs text-white">{f}</span>
            </motion.li>
          ))}
        </ul>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          onClick={() => handleRedicrectOfPayment()}
          className="mt-5 w-full rounded-lg bg-[#818cf8] py-2.5 text-xs font-semibold tracking-wide text-white transition-opacity hover:opacity-90 cursor-pointer"
        >
          Upgrade to Pro
        </motion.button>

        <p className="mt-2 text-center text-[10px] text-white">
          Cancel anytime · No hidden fees
        </p>
      </div>
    </div>
  );
}