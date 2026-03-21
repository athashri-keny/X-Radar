'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

export function Pricing() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const plans = [
    {
      name: 'Free',
      price: 0,
      currency: '₹',
      description: 'Perfect for testing the waters',
      cta: 'Get Started',
      features: [
        'Up to 10 leads per day',
        'Basic AI scoring',
        'Manual reply suggestions',
        'Community support',
        'Email support',
      ],
      highlighted: false,
    },
    {
      name: 'Pro',
      price: 499,
      currency: '₹',
      period: '/month',
      description: 'For serious freelancers',
      cta: 'Start Free Trial',
      features: [
        'Unlimited daily leads',
        'Advanced AI scoring',
        'AI-powered reply suggestions',
        'Priority email support',
        'Custom keyword tracking',
        'Lead quality filters',
        'Analytics dashboard',
      ],
      highlighted: true,
    },
    {
      name: 'Agency',
      price: 999,
      currency: '₹',
      period: '/month',
      description: 'For teams and agencies',
      cta: 'Start Free Trial',
      features: [
        'Unlimited leads & team members',
        'Priority AI processing',
        'White-label options',
        'Dedicated account manager',
        '24/7 phone + email support',
        'Custom integrations',
        'Advanced analytics',
        'Team collaboration tools',
      ],
      highlighted: false,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  return (
    <section
      id="pricing"
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
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-400 text-lg">
            Choose the plan that fits your needs
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={plan.highlighted ? { scale: 1.02 } : {}}
              className={`relative rounded-2xl transition ${
                plan.highlighted
                  ? 'ring-2 ring-white md:scale-105'
                  : 'glass-effect'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-white text-black px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div
                className={`p-8 rounded-2xl h-full flex flex-col ${
                  plan.highlighted ? 'bg-gradient-to-br from-white/5 to-white/5 border border-white/20' : ''
                }`}
              >
                {/* Plan name and price */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white">
                      {plan.currency}
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-gray-400">{plan.period}</span>
                    )}
                  </div>
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-lg font-semibold mb-8 transition ${
                    plan.highlighted
                      ? 'bg-white text-black hover:shadow-lg hover:shadow-white/50'
                      : 'glass-effect text-white hover:bg-white/10'
                  }`}
                >
                  {plan.cta}
                </motion.button>

                {/* Features list */}
                <div className="space-y-4 flex-1">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      transition={{ delay: featureIndex * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Money back guarantee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center text-gray-400"
        >
          <p>
            30-day money-back guarantee on all paid plans. No questions asked.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
