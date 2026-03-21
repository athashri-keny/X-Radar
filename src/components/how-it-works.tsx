'use client'

import { motion } from 'framer-motion'
import { Search, Brain, MessageSquare } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

export function HowItWorks() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  }

  const steps = [
    {
      icon: Search,
      title: 'Enter your niche keywords',
      description: 'Define your expertise and let X-Radar scan Twitter/X for relevant hiring opportunities in real-time.',
      number: 1,
    },
    {
      icon: Brain,
      title: 'AI scores and ranks leads',
      description: 'Our advanced AI algorithm evaluates lead quality, budget indicators, and fit for your services.',
      number: 2,
    },
    {
      icon: MessageSquare,
      title: 'Reply with AI suggestions',
      description: 'Get personalized reply suggestions and land clients with confidence.',
      number: 3,
    },
  ]

  return (
    <section
      id="how-it-works"
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
            How It Works
          </h2>
          <p className="text-gray-400 text-lg">
            Three simple steps to find and land your next client
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative group"
              >
                {/* Connection line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-1/2 w-full h-0.5 bg-gradient-to-r from-white to-gray-400 opacity-30 transform -translate-y-1/2" />
                )}

                <div className="glass-effect p-8 rounded-xl h-full hover:bg-white/10 transition">
                  {/* Step number */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white text-black font-bold mb-6"
                  >
                    {step.number}
                  </motion.div>

                  {/* Icon */}
                  <div className="mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {step.description}
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
