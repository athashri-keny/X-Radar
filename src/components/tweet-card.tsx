'use client'

import { motion } from 'framer-motion'
import { Heart, MessageCircle, Repeat2, Twitter } from 'lucide-react'

interface TweetCardProps {
  username: string
  handle: string
  tweet: string
  score: number
  suggestedReply: string
  timeAgo: string
}

export function TweetCard({
  username,
  handle,
  tweet,
  score,
  suggestedReply,
  timeAgo,
}: TweetCardProps) {
  const getScoreBadgeColor = () => {
    if (score >= 90) return 'bg-green-500/20 text-green-400 border-green-500/30'
    if (score >= 80) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="glass-effect rounded-2xl p-6 border border-white/10 flex flex-col gap-5"
    >
      {/* Header - Twitter style */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-base font-bold text-white flex-shrink-0">
            {username
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>

          {/* User info */}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-bold text-white text-base">{username}</p>
              <span className={`px-2 py-1 rounded-full border text-xs font-semibold ${getScoreBadgeColor()}`}>
                {score}
              </span>
            </div>
            <p className="text-gray-500 text-sm">@{handle}</p>
            <p className="text-gray-600 text-xs mt-1">{timeAgo}</p>
          </div>
        </div>
      </div>

      {/* Tweet text - prominent */}
      <p className="text-gray-100 text-base leading-relaxed">{tweet}</p>

      {/* Divider */}
      <div className="w-full h-px bg-white/10" />

      {/* AI Suggested Reply */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Twitter className="w-4 h-4 text-blue-400" />
          <p className="text-sm font-semibold text-gray-300">Suggested Reply</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <p className="text-gray-300 text-sm leading-relaxed">{suggestedReply}</p>
        </div>
      </div>

      {/* Tweet actions - Twitter style */}
      <div className="flex items-center justify-around pt-3 text-gray-600 max-w-sm mx-auto w-full">
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-2 hover:text-blue-400 transition group"
        >
          <div className="p-2 rounded-full group-hover:bg-blue-400/20 transition">
            <MessageCircle className="w-4 h-4" />
          </div>
          <span className="text-xs">Reply</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-2 hover:text-green-400 transition group"
        >
          <div className="p-2 rounded-full group-hover:bg-green-400/20 transition">
            <Repeat2 className="w-4 h-4" />
          </div>
          <span className="text-xs">Retweet</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="flex items-center gap-2 hover:text-red-400 transition group"
        >
          <div className="p-2 rounded-full group-hover:bg-red-400/20 transition">
            <Heart className="w-4 h-4" />
          </div>
          <span className="text-xs">Like</span>
        </motion.button>
      </div>
    </motion.div>
  )
}
