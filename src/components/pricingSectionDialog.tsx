import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { Button } from '@base-ui/react'



function PricingSectionDialog({ isopen, onClose }: { isopen: boolean, onClose: () => void }) {

    
//   const {data: session} = useSession()


  const handleRedicrectOfPayment = async() => {
    try {
      const res = await axios.post('/api/checkout')

      window.location.href = res.data.checkout_url

    } catch (error) {
      console.log("Error while redirecting to payment page" , error)
    }
  }



const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Perfect for getting started",
    popular: false,
    features: [
      { text: "24 hour cooldown", included: true },
      { text: "Only last 6 days tweets (no 24 hrs)", included: true },
        { text: "Only 3 free searches", included: true },
      { text: "5 leads max", included: true },
      { text: "AI reply suggestions", included: true },
       { text: "Automated 2 Search quries as per your niche", included: true },
    ],
  },
  {
    name: "Pro",
    price: "$9.99",
    period: "/ month",
    desc: "For serious freelancers and job seekers",
    popular: true,
    features: [
      { text: "6 hour cooldown", included: true },
      { text: "Get lastest tweets (24hr)", included: true },
       { text: "Unlimited Searches", included: true },
       { text: "Unlimited leads (as per result)", included: true },
      { text: " AI replies suggestions ", included: true },
      { text: "Automated 5 Search quries as per your niche", included: true },
         { text: "Get persona lized leads via Email", included: true },
      { text: "Users Get every new feature first free of charge until stable", included: true },
    ],
  },
];
    return (
     <div>
  <Dialog open={isopen} onOpenChange={(open) =>  {if(!open) onClose()}}>
        <DialogContent className="max-w-3xl w-[95vw] sm:w-full border border-white/10 bg-black/80 backdrop-blur-xl p-4 sm:p-6 rounded-xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="space-y-1 sm:space-y-2">
            <DialogTitle className="text-lg sm:text-2xl font-bold text-white">Upgrade Your Plan</DialogTitle>
            <DialogDescription className="text-xs sm:text-base text-white/60">
              Choose the perfect plan for your needs. Start free, upgrade when ready.
            </DialogDescription>
          </DialogHeader>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 mt-4 sm:mt-8">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5, ease: 'easeOut' }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`glass-card p-4 sm:p-6 relative border rounded-lg transition-all duration-300 ${
                  plan.popular
                    ? 'border-white/30 bg-white/10 ring-2 ring-yellow-500/50'
                    : 'border-white/10 bg-white/5 hover:border-white/20'
                }`}
              >
                {plan.popular && (
                  <motion.span
                    initial={{ scale: 0, y: -10 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ delay: i * 0.15 + 0.2, type: 'spring', stiffness: 200 }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 text-xs font-bold whitespace-nowrap"
                  >
                    Most Popular
                  </motion.span>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.15 + 0.1, duration: 0.4 }}
                >
                  <h3 className="text-base sm:text-xl font-bold text-white">{plan.name}</h3>
                  <p className="text-white/60 text-xs sm:text-sm mt-0.5 sm:mt-1">{plan.desc}</p>
                  <div className="mt-3 mb-4 sm:mt-4 sm:mb-6">
                    <span className="text-2xl sm:text-3xl font-black text-white">{plan.price}</span>
                    <span className="text-white/60 text-xs sm:text-sm ml-1">{plan.period}</span>
                  </div>
                </motion.div>

                <motion.ul
                  className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.15 + 0.2, duration: 0.4 }}
                >
                  {plan.features.map((f, idx) => (
                    <motion.li
                      key={f.text}
                      className="flex items-start gap-2 text-xs sm:text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 + 0.2 + idx * 0.05 }}
                    >
                      {f.included ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200 }}
                          className="mt-0.5 flex-shrink-0"
                        >
                          <Check size={13} className="text-green-400" />
                        </motion.div>
                      ) : (
                        <X size={13} className="text-white/20 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={f.included ? "text-white/80" : "text-white/40"}>
                        {f.text}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.15 + 0.3, duration: 0.3 }}
                >
                  {plan.popular ? (
                    <Button
                      onClick={() => handleRedicrectOfPayment()}
                      className="w-full py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 bg-yellow-500 hover:bg-yellow-600 text-black shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40"
                    >
                      Get Started
                    </Button>
                  ) : (
                    <Button
                      className="w-full py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 border border-white/20 bg-white/5 hover:bg-white/10 text-white hover:border-white/40"
                    >
                      Start Free
                    </Button>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

     </div>   
    )
}

export default PricingSectionDialog
