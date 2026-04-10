'use client'

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedBackground = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      {/* Animated gradient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-primary/8 blur-[140px]"
        animate={{
          x: mousePos.x * 60 - 30,
          y: mousePos.y * 60 - 30,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 100 }}
        style={{ top: "15%", left: "20%" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-secondary/8 blur-[120px]"
        animate={{
          x: mousePos.x * -40 + 20,
          y: mousePos.y * -40 + 20,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 100 }}
        style={{ top: "50%", right: "10%" }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-primary/5 blur-[100px]"
        animate={{
          x: mousePos.x * 30 - 15,
          y: mousePos.y * -30 + 15,
        }}
        transition={{ type: "spring", damping: 50, stiffness: 100 }}
        style={{ bottom: "10%", left: "40%" }}
      />

      {/* Floating particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/30"
          style={{
            left: `${(i * 37 + 13) % 100}%`,
            top: `${(i * 53 + 7) % 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + (i % 4),
            repeat: Infinity,
            delay: (i * 0.3) % 3,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Horizontal scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Grid lines (subtle) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="hsl(197, 19%, 94%)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

export default AnimatedBackground;
