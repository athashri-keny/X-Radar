'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

const testimonials = [
  {
    name: 'Arjun Mehta',
    role: 'Freelance Developer',
    avatar: 'AM',
    text: 'Landed 3 clients in my first week. X-Radar found tweets I would have never scrolled to. The AI reply suggestions are scarily good.',
    rating: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'UI/UX Designer',
    avatar: 'PS',
    text: 'I used to spend 2 hours a day hunting for leads. Now I spend 10 minutes reviewing what X-Radar surfaces. It completely changed my workflow.',
    rating: 5,
  },
  {
    name: 'Rahul Nair',
    role: 'Copywriter',
    avatar: 'RN',
    text: 'The lead scoring is the best part — it filters out the noise so I only see high-intent tweets. Worth every rupee of the Pro plan.',
    rating: 5,
  },
  {
    name: 'Sneha Iyer',
    role: 'Full-stack Developer',
    avatar: 'SI',
    text: 'Went from 0 to booked in 2 weeks. The suggested replies feel personal, not spammy. My reply rate is through the roof.',
    rating: 5,
  },
  {
    name: 'Kartik Bose',
    role: 'Video Editor',
    avatar: 'KB',
    text: 'As someone new to freelancing, X-Radar gave me the confidence to reach out. I knew exactly which leads were worth my time.',
    rating: 5,
  },
  {
    name: 'Divya Rao',
    role: 'Content Strategist',
    avatar: 'DR',
    text: 'I signed a ₹40k/month retainer from a lead X-Radar found. ROI on the Pro plan paid off in day one.',
    rating: 5,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start pt-28 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-white/[0.02] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center"
      >
        {/* Big X-Radar wordmark */}
        <motion.div variants={itemVariants} className="mb-9">
          <h1 className="text-[clamp(4rem,14vw,10rem)] font-black leading-none tracking-tighter text-white select-none mt-15">
            X-Radar
          </h1>
        </motion.div>

        {/* Tagline — directly below the wordmark */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-400 mb-8 tracking-tight text-balance"
        >
          An AI that hunts hiring tweets so you don&apos;t have to.
        </motion.p>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-gray-500 mb-10 max-w-2xl leading-relaxed"
        >
          Scans Twitter/X in real-time, scores leads with AI, and crafts perfect
          reply suggestions
        </motion.p>

      
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-24"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 mt-10 bg-white text-black rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-white/20 transition"
          >
            <Link href={'/early-access'}>
            Get Started Free
            </Link>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}
