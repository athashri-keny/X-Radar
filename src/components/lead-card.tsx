'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, ExternalLink, Zap } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface LeadCardProps {
  tweet: string
  score: number
  suggestReplyAi: string
  tweetUrl: string
}

export function LeadCard({
  tweet,
  score,
  tweetUrl,
  suggestReplyAi,
}: LeadCardProps) {
  const [replyCopied, setReplyCopied] = useState(false)

  const getScoreColor = () => {
    if (score >= 8) return 'text-white'
    if (score >= 6) return 'text-gray-300'
    return 'text-gray-400'
  }

  const isHighScore = score >= 8

  const handleCopyReply = () => {
    setReplyCopied(true)
    navigator.clipboard.writeText(suggestReplyAi)
    setTimeout(() => setReplyCopied(false), 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`glass-effect rounded-xl p-6 flex flex-col gap-6 relative ${
        isHighScore
          ? 'border border-white/30 shadow-lg shadow-white/10'
          : 'border border-white/10'
      }`}
    >
      {/* Premium lead indicator */}
      {isHighScore && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between bg-gradient-to-r from-white/15 to-white/5 border border-white/30 rounded-lg px-4 py-3"
        >
          <div className="flex items-center gap-2">
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-lg"
            >
              ⭐
            </motion.span>
            <div>
              <p className="text-sm font-bold text-white">PREMIUM LEAD</p>
              <p className="text-xs text-gray-400">High quality match</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Top section: Score + small subtle view tweet link */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-white/60" />
          <span className="text-xs text-gray-500 font-medium">Lead Quality</span>
        </div>
        <div className="flex items-center gap-3">
          {/* Small subtle View Tweet — just an icon + tiny text, not a button */}
          <a
            href={tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-gray-400 hover:text-gray-400 transition-colors"
          >
            <ExternalLink className="w-3 h-3" />
            <span>view tweet</span>
          </a>
          <div className={`text-2xl font-bold ${getScoreColor()}`}>
            {score}
          </div>
        </div>
      </div>

      {/* Tweet text */}
      <div className="space-y-2">
        <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
          {tweet}
        </p>
      </div>

      {/* Suggested reply section */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-white/40" />
          <span className="text-xs text-gray-500 font-medium">SUGGESTED MESSAGE</span>
        </div>

        <textarea
          readOnly
          value={suggestReplyAi}
          className="w-full bg-white/3 border border-white/10 text-gray-300 text-sm rounded-lg p-3 resize-none focus:outline-none focus:ring-1 focus:ring-white/20"
          rows={3}
        />

        <AnimatePresence mode="wait">
          {replyCopied ? (
            <motion.button
              key="copied"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              disabled
              className="w-full py-2 px-3 bg-white/10 border border-white/20 text-white rounded-lg flex items-center justify-center gap-2 text-sm font-medium"
            >
              <Copy className="w-4 h-4" />
              Copied
            </motion.button>
          ) : (
            <motion.button
              key="copy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCopyReply}
              className="w-full py-2 px-3 border border-white/20 text-white hover:bg-white/5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition"
            >
              <Copy className="w-4 h-4" />
              Copy Message
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Status dropdown */}
      
    </motion.div>
  )
}