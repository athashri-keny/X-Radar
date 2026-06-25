'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Radar } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { GradientOrbs } from '@/components/gradient-orbs'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'sonner'

export default function ForgotPassword() {
  const [Email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const handleForgotPassword = async () => {
    if (!Email) {
      setError('Please enter your email address.')
      return
    }
    try {
      setLoading(true)
      setError('')
     const res =  await axios.post('/api/auth/forgot-password', { Email })
    //  console.log("res data" , res.data)
     const UserId = res.data.UserId

     console.log("Userid recived " , UserId)

      toast.success('Reset code sent! Check your inbox.')
      router.push(`/auth/reset-password/${UserId}`)
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      <GradientOrbs />

      <div className="relative z-10 w-full max-w-md px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Back button */}
          <motion.div variants={itemVariants}>
            <Link href="/auth/login">
              <button className="flex items-center gap-2 text-gray-400 hover:text-white transition">
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </button>
            </Link>
          </motion.div>

          {/* Logo */}
          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
              <Radar className="w-7 h-7 text-black" />
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div variants={itemVariants} className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-white">Forgot your password?</h1>
            <p className="text-gray-400 text-sm">
              Enter your email and we'll send you a reset code.
            </p>
          </motion.div>

          {/* Email Input */}
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="text-sm text-gray-400">Email address</label>
            <input
              type="email"
              value={Email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleForgotPassword()}
              placeholder="you@example.com"
              className="w-full h-12 bg-white/5 border border-white/20 rounded-lg px-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/40 transition placeholder:text-gray-600"
            />
            {error && (
              <p className="text-red-400 text-xs mt-1">{error}</p>
            )}
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <Button
              onClick={handleForgotPassword}
              disabled={loading || !Email}
              className="w-full py-6 bg-white text-black hover:bg-gray-100 disabled:bg-gray-700 disabled:text-gray-500 font-semibold rounded-lg transition text-base"
            >
              {loading ? 'Sending code...' : 'Send reset code'}
            </Button>
          </motion.div>

          {/* Help text */}
          <motion.p
            variants={itemVariants}
            className="text-xs text-gray-600 text-center"
          >
            Remember your password?{' '}
            <Link href="/auth/login" className="text-white hover:underline">
              Back to login
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}