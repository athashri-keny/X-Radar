'use client'

import { motion } from 'framer-motion'
import {
  Zap,
  BarChart3,
  MessageCircle,
  Sparkles,
  Clock,
  Shield,
} from 'lucide-react'
import { useInView } from 'react-intersection-observer'

export function Features() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const features = [
    {
      icon: BarChart3,
      title: 'AI lead scoring',
      description: 'Advanced ML models rank leads by quality and fit',
      color: 'from-gray-300 to-gray-400',
    },
    {
      icon: MessageCircle,
      title: 'Auto reply suggestions',
      description: 'Get personalized response templates that work',
      color: 'from-gray-400 to-gray-500',
    },
    {
      icon: Sparkles,
      title: 'Works for any niche',
      description: 'Customize keywords to match your expertise',
      color: 'from-gray-300 to-gray-400',
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Your data is encrypted and never shared',
      color: 'from-gray-300 to-gray-400',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id="features"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to dominate Twitter/X lead generation
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
              >
                <div className="glass-effect p-6 rounded-xl h-full hover:bg-white/10 transition group cursor-pointer">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} text-white mb-4 group-hover:scale-110 transition`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
