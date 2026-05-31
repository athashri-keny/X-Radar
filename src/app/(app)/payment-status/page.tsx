'use client';

import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radar, CheckCircle2, RefreshCw, Zap, Mail, Target, Clock, AlertTriangle, Info } from 'lucide-react';
import axios from 'axios';


// ─── Types ────────────────────────────────────────────────────────────────────

type Status = 'checking' | 'done' | 'failed';

// ─── Particles ────────────────────────────────────────────────────────────────

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  delay: 0.08 + (i % 6) * 0.055,
  angle: (i / 24) * 360,
  dist: 70 + (i % 3) * 30,
  color: ['#ffffff', '#e2e8f0', '#94a3b8', '#cbd5e1', '#ffffff'][i % 5],
}));

function Particle({ delay, x, y, color }: { delay: number; x: number; y: number; color: string }) {
  return (
    <motion.span
      initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      animate={{ opacity: 0, x, y, scale: 0, rotate: 180 }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      className="absolute w-2 h-2 rounded-sm pointer-events-none"
      style={{ top: '50%', left: '50%', background: color }}
    />
  );
}

// ─── Animated checkmark ───────────────────────────────────────────────────────

function AnimatedCheck() {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
      <motion.circle
        cx="28" cy="28" r="26"
        stroke="white" strokeWidth="2" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      />
      <motion.path
        d="M17 28.5L25 36L39 20"
        stroke="white" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.55, ease: 'easeOut' }}
      />
    </svg>
  );
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner() {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
      className="w-11 h-11 rounded-full border-2 border-white/10 border-t-white"
    />
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────

const FEATURES = [
  { icon: Clock,  label: '6hr cooldown' },
  { icon: Mail,   label: 'Unlimited leads' },
  { icon: Target, label: 'Latest 24hr tweets' },
  { icon: Zap,    label: 'Email alerts' },
];

// ─── Checking view ────────────────────────────────────────────────────────────

function CheckingView() {
  const steps = ['Processing payment…', 'Activating Pro features…', 'Almost there…'];
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 1300);
    const t2 = setTimeout(() => setStep(2), 2700);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <motion.div
      key="checking"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-5"
    >
      <Spinner />
      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.22 }}
          className="text-white/40 text-sm font-medium"
        >
          {steps[step]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Success view ─────────────────────────────────────────────────────────────

function SuccessView() {
  const [showParticles, setShowParticles] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowParticles(false), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      key="done"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center"
    >
      {/* Check + confetti */}
      <div className="relative mb-6">
        {showParticles && PARTICLES.map(p => (
          <Particle
            key={p.id}
            delay={p.delay}
            color={p.color}
            x={Math.cos((p.angle * Math.PI) / 180) * p.dist}
            y={Math.sin((p.angle * Math.PI) / 180) * p.dist}
          />
        ))}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatedCheck />
        </motion.div>
      </div>

      {/* Label + headline */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="text-center mb-2"
      >
        <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/30 mb-2">
          Welcome to Pro
        </p>
        <h1 className="text-white text-2xl font-bold tracking-tight leading-tight">
          You're all set 🎉
        </h1>
      </motion.div>

      {/* Sub */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        className="text-white/40 text-[13px] text-center leading-relaxed max-w-[240px] mt-2 mb-6"
      >
        Your Pro plan is active. Start hunting leads before someone else does.
      </motion.p>

      {/* Pills */}
      <div className="flex flex-wrap gap-2 justify-center mb-7">
        {FEATURES.map(({ icon: Icon, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55 + i * 0.07, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-[11px] text-white/50 font-medium"
          >
            <Icon size={11} strokeWidth={2} />
            {label}
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.a
        href="/dashboard"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.4 }}
        whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(255,255,255,0.15)' }}
        whileTap={{ scale: 0.97 }}
        className="bg-white text-black font-bold text-[13px] px-7 py-3 rounded-xl tracking-tight cursor-pointer no-underline"
      >
        Start Hunting Leads →
      </motion.a>
    </motion.div>
  );
}

// ─── Failed view
function FailedView({ onRetry }: { onRetry: () => void }) {
  return (
    <motion.div
      key="failed"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-4 text-center"
    >
      {/* Icon */}
      <div className="w-13 h-13 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
        <AlertTriangle size={22} className="text-red-400" />
      </div>

      {/* Heading */}
      <div>
        <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-white/25 mb-1.5">
          Payment issue
        </p>
        <p className="text-white text-lg font-bold tracking-tight mb-2">
          Activation failed
        </p>
        <p className="text-white/35 text-xs leading-relaxed max-w-[220px]">
          Your payment may have been processed but your account wasn't upgraded.
          Don't worry — you won't be charged twice.
        </p>
      </div>

      {/* Refund notice */}
      <div className="w-full bg-yellow-500/[0.06] border border-yellow-500/15 rounded-xl px-3.5 py-2.5 text-left flex gap-2">
        <Info size={14} className="text-yellow-400/70 mt-0.5 shrink-0" />
        <p className="text-white/40 text-[11px] leading-relaxed">
          If money was debited, it will be refunded within{" "}
          <span className="text-white/55 font-semibold">5–7 business days</span>{" "}
          to your original payment method.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 w-full">
        <motion.button
          onClick={onRetry}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="bg-white text-black font-bold text-xs py-2.5 rounded-xl cursor-pointer"
        >
          Try Again
        </motion.button>
        <motion.a
          href="mailto:support@xradar.in"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-1.5 bg-transparent border border-white/8 text-white/40 text-[11px] py-2 rounded-xl cursor-pointer no-underline"
        >
          <Mail size={12} /> Contact support
        </motion.a>
      </div>
    </motion.div>
  );
}
// ─── Page ─────────────────────────────────────────────────────────────────────

 


export default function PaymentSuccessClient({ initialStatus }: { initialStatus: Status }) {

  const { data: session ,     update } = useSession();
  const [status, setStatus] = useState<Status>(initialStatus);
  const [hasRun , setRun] = useState(false)

  console.log("Session from the client side" , session?.user )


  const checksession = async() => {

    // Guard One: if there is no session then it will return and not run 
    if(!session?.user) return 

    // Guard Two: if there is has hasrun === true and it will not run 
    if(hasRun === true) return


      setRun(true)

    // already confirmed pro on server — just sync client JWT
    if (initialStatus === 'done') {
      // console.log("triggred!!! ")
    await update({ plan: 'pro' });
      console.log('Updated successfully session' )
      return;
    }

    // webhook hasn't fired yet — start polling
    const interval = setInterval(async () => {
      // console.log("Polling triggedd!! ")
      try {
        const res = await axios.get('/api/payment-sucess');
        if (res.data.upgraded === true) {
          await update({ plan: 'pro' });
          setStatus('done');
          clearInterval(interval);
        }
      } catch {
        // keep polling silently
      }
    }, 3000);

    // stop polling after 30s
     setTimeout(() => {
      clearInterval(interval);
      setStatus('failed');
    }, 30000);
   return
  ; 
  }


  useEffect(() => {
  checksession()
  } , [session?.user])

async function check() {
  try {
    const res = await axios.get(`/api/payment-sucess`)
    if (res.data.upgraded === true) {
        const rres = await update({ plan: 'pro' });
        console.log("session updated =", rres?.user);
        setStatus('done');
      } else {
        setStatus('failed');
      }
  } catch (error) {
    console.log("Error while checking " , error)
    setStatus('failed');
  }
}

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 font-sans">

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 500px 350px at 50% 38%, rgba(255,255,255,0.03) 0%, transparent 70%)' }}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative bg-[#111] border border-white/[0.07] rounded-2xl px-8 py-10 w-full max-w-[340px] flex flex-col items-center shadow-[0_40px_80px_rgba(0,0,0,0.5)] overflow-hidden"
      >
        {/* Top accent */}
        <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-2 mb-8"
        >
          <Radar size={20} color="white" strokeWidth={1.75} />
          <span className="text-white font-bold text-[15px] tracking-tight">X-Radar</span>
        </motion.div>

        <AnimatePresence mode="wait">
          {status === 'checking' && <CheckingView key="checking" />}
          {status === 'done'     && <SuccessView  key="done" />}
          {status === 'failed'   && <FailedView   key="failed" onRetry={check} />}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}