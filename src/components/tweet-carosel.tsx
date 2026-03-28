'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Twitter } from 'lucide-react'
import { TweetCard } from './tweet-card'


const tweets = [
  {
    id: 1,
    username: 'Sarah Chen',
    handle: 'sarahdesigns_ux',
    tweet: 'Looking for a freelance video editor for my YouTube channel. Need weekly edits, ~5 mins each. Budget $250/video. DM me!',
    score: 94,
    suggestedReply:
      'Hey Sarah! I specialize in YouTube edits under 5 mins. Worked with 3 creators in your niche. Can send samples — when is a good time to chat?',
    timeAgo: '2 minutes ago',
  },
  {
    id: 2,
    username: 'Tech Startup IO',
    handle: 'techstartup_io',
    tweet: 'We need a Next.js developer for a 2 month contract. Remote, $4000/month. Must know TypeScript and MongoDB. Apply below 👇',
    score: 89,
    suggestedReply:
      "Hey! I've built 3 production Next.js + MongoDB apps. Available immediately for 2 months. Happy to share my portfolio — interested?",
    timeAgo: '5 minutes ago',
  },
  {
    id: 3,
    username: 'Mike Johnson',
    handle: 'marketer_mike',
    tweet: 'Hiring a copywriter for email sequences. E-commerce brand, 10k subscribers. $500 per sequence. Need someone who understands conversions.',
    score: 91,
    suggestedReply:
      "Hey Mike! I've written email sequences for 2 e-commerce brands with 30%+ open rates. Would love to show you examples — open to a quick call?",
    timeAgo: '8 minutes ago',
  },
  {
    id: 4,
    username: 'Podcast Growth',
    handle: 'podcastgrowth',
    tweet: 'Need a thumbnail designer for my podcast. Consistent weekly work, long term collab. Budget flexible for the right person. DM with portfolio!',
    score: 87,
    suggestedReply:
      'Hey! I design thumbnails for 4 podcasts currently — CTR improved 40% avg. Sending you my portfolio right now 👇',
    timeAgo: '12 minutes ago',
  },
]

export function TweetsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  // Auto-advance carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % tweets.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + tweets.length) % tweets.length)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % tweets.length)
  }

  const currentTweet = tweets[currentIndex]

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-5xl font-black text-white mb-4 text-balance">
            Real hiring tweets X-Radar found today
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-3">
            These are live tweets from Twitter/X — found before anyone else saw them
          </p>
          <p className="text-gray-600 text-xs sm:text-sm max-w-2xl mx-auto">
            Examples shown are illustrative — X-Radar finds tweets like these in real time
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative flex flex-col items-center">
          {/* Single card container */}
          <div className="w-full max-w-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.5 }}
              >
                <TweetCard
                  username={currentTweet.username}
                  handle={currentTweet.handle}
                  tweet={currentTweet.tweet}
                  score={currentTweet.score}
                  suggestedReply={currentTweet.suggestedReply}
                  timeAgo={currentTweet.timeAgo}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePrev}
              className="p-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {tweets.map((_, index) => (
                <motion.button
                  key={index}
                  animate={{
                    scale: index === currentIndex ? 1.2 : 1,
                    opacity: index === currentIndex ? 1 : 0.4,
                  }}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className="w-2 h-2 rounded-full bg-white transition"
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNext}
              className="p-2 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}
