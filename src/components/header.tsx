'use client'

import { motion } from 'framer-motion'
import { Radar } from 'lucide-react'
import Link from 'next/link'

export function Header() {
  return (
    <motion.header  
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/20 bg-black/40"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Radar className="w-5 h-5 text-black" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">X-Radar</span>
        </motion.div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-gray-400 hover:text-white transition">
            How It Works
          </a>
          <a href="#features" className="text-gray-400 hover:text-white transition">
            Features
          </a>
          <a href="#pricing" className="text-gray-400 hover:text-white transition">
            Pricing
          </a>
          <a href="#faq" className="text-gray-400 hover:text-white transition">
            FAQ
          </a>
        </nav>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-200 transition"
        >
          <Link href={'/auth/signup'}>
                    Sign-Up

          </Link>
        </motion.button>
      </div>
    </motion.header>
  )
}
