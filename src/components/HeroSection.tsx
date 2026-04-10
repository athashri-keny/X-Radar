'use client'

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Play, Zap, User, Clock, Search, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

const useTypewriter = (text: string, speed = 40, delay = 800) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayed, done };
};

const HeroSection = () => {
  const heading1 = "Hunt clients on X. ";
  const heading2 = "In seconds.";
  const subtitle = "X-Radar scans Twitter/X in real-time, finds hiring tweets that match your skills, and crafts the perfect reply so you land leads faster";

  const { displayed: h1Text, done: h1Done } = useTypewriter(heading1, 50, 400);
  const { displayed: h2Text, done: h2Done } = useTypewriter(heading2, 50, 400 + heading1.length * 50 + 200);
  const { displayed: subText, done: subDone } = useTypewriter(subtitle, 20, 400 + heading1.length * 50 + 200 + heading2.length * 50 + 300);

  const [scanning, setScanning] = useState(false);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (subDone && !scanning && !showCard) {
      setScanning(true);
      const scanTimer = setTimeout(() => {
        setScanning(false);
        setShowCard(true);
        toast.success("Scan completed!", {
          description: "Found 1 high-quality lead matching your skills",
          icon: <CheckCircle2 size={18} />,
        });
      }, 2500);
      return () => clearTimeout(scanTimer);
    }
  }, [subDone]);

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6">
              {h1Text}
              <span className="gradient-text">{h2Text}</span>
              {!subDone && <span className="inline-block w-[3px] h-[1em] bg-primary animate-pulse ml-0.5 align-text-bottom" />}
            </h1>

            <p className=" text-lg max-w-lg mb-8 leading-relaxed min-h-[4.5rem] text-gray-300">
              {subText}
              {!subDone && h2Done && <span className="inline-block w-[2px] h-[1em] bg-muted-foreground animate-pulse ml-0.5 align-text-bottom" />}
            </p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: subDone ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href={'/dashboard'}>
              <button className="
              cursor-pointer
              px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold glow-primary hover:brightness-110 transition-all flex items-center gap-2">
                Get Started Free
                <ArrowRight size={18} />
              </button> 
              </Link>
             
             
            </motion.div>

            <motion.div
              className="flex items-center gap-6 mt-8 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: subDone ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse-neon" />
                100+ freelancers signed up
              </span>
           
            </motion.div>
          </motion.div>

          <div className="hidden lg:flex justify-center items-center">
            <AnimatePresence mode="wait">
              {scanning && (
                <motion.div
                  key="scanning"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Search size={14} className="text-primary animate-pulse" />
                    <span>Scanning tweets for leads...</span>
                  </div>
                  <div className="w-48 h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full bg-primary rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 2.5, ease: "easeInOut" }}
                    />
                  </div>
                </motion.div>
              )}

              {showCard && (
                <motion.div
                  key="card"
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                >
                  <div className="animate-float">
                    <div className="glass-card p-5 max-w-sm glow-border">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <User size={18} className="text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground text-sm">Sarah Chen</span>
                            <span className="text-muted-foreground text-xs">@sarahchen_dev</span>
                          </div>
                          <p className="text-foreground/80 text-sm mt-1 leading-relaxed">
                            Looking for a freelance React developer for a 3-month project. Must know TypeScript, Tailwind, and have experience with SaaS products. DM me! 🚀
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock size={12} />
                          <span>2 min ago</span>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-neon-green/20 text-neon-green text-xs font-bold animate-pulse-neon">
                          94% match
                        </div>
                      </div>

                      <div className="mt-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                        <p className="text-xs text-muted-foreground mb-1 font-medium">AI Suggested Reply:</p>
                        <p className="text-xs text-foreground/90 leading-relaxed">
                          "Hi Sarah! I'm a React/TS dev with 4+ years of SaaS experience. Would love to chat about your project — DM sent!"
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
