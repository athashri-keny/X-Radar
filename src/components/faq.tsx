'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'

export function FAQ() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: 'How does X-Radar find leads on Twitter/X?',
      answer:
        'X-Radar uses advanced web scraping and API integration with Twitter/X to monitor tweets in real-time. We search for hiring-related keywords and patterns that indicate potential clients looking for freelancers.',
    },
    {
      question: 'How accurate is the AI lead scoring?',
      answer:
        'Our AI model is trained on thousands of successful freelancer-client interactions. It achieves 92% accuracy in predicting lead quality based on budget indicators, past hiring patterns, and project complexity signals.',
    },
    {
      question: 'Can I customize the keywords X-Radar monitors?',
      answer:
        'Yes! With the Pro and Agency plans, you can add unlimited custom keywords to match your specific expertise. You can track anything from "looking for a designer" to specific tech stacks or industries.',
    },
    {
      question: 'How quickly will I see results?',
      answer:
        'Most users see their first qualified lead within 24 hours of setting up their keywords. However, results depend on your niche popularity and how specific your keywords are.',
    },
    {
      question: 'Is my data safe and private?',
      answer:
        'Absolutely. We use bank-level encryption for all data. Your keyword filters and lead history are never shared with third parties. You own your data and can export it anytime.',
    },
    {
      question: 'Can I cancel anytime?',
      answer:
        'Yes, cancel your subscription anytime with no penalties. If you\'re not satisfied within 30 days, we offer a full refund. No questions asked.',
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section
      id="faq"
      ref={ref}
      className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-lg">
            Everything you need to know about X-Radar
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass-effect rounded-xl overflow-hidden"
            >
              <motion.button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition"
              >
                <h3 className="text-left font-semibold text-white">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-400 border-t border-white/10 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://mail.google.com/mail/?view=cm&to=xradar10@gmail.com&su=X-Radar Early Access"
            target='_blank'
            className="inline-block px-6 py-2 glass-effect rounded-lg text-white hover:bg-white/10 transition font-medium"
          >
            Contact Our Team
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
