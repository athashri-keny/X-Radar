'use client'

import axios from 'axios'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { ArrowLeft, Radar, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GradientOrbs } from '@/components/gradient-orbs'

function Page() {
  const [NewPassword, setNewPassword] = useState('')
  const [verifycode, setVerifyCode] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const params = useParams()
  const router = useRouter()

  const UserId = params.UserId

  // console.log("params" , params.UserId)


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

  const handleResetPassword = async () => {
    if (!verifycode || !NewPassword) {
      setError('Please fill in all fields.')
      return
    }
    if (NewPassword.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    try {
      setLoading(true)
      setError('')
      await axios.post('/api/auth/reset-password', { UserId, NewPassword, verifycode })
      toast.success('Done! Login again.')
      router.push('/auth/login')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const isComplete = verifycode.length === 6 && NewPassword.length >= 8

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
            <h1 className="text-2xl font-bold text-white">Reset your password</h1>
            <p className="text-gray-400 text-sm">
              Enter the code we sent to your email and choose a new password.
            </p>
          </motion.div>

          {/* Verify Code Input */}
          <motion.div variants={itemVariants} className="space-y-2">
            <Label className="text-sm text-gray-400">Reset code</Label>
            <Input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={verifycode}
              onChange={(e) => {
                if (!/^\d*$/.test(e.target.value)) return
                setVerifyCode(e.target.value)
                setError('')
              }}
              placeholder="6-digit code"
              className="h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-600 focus-visible:ring-white/40 tracking-widest text-center text-lg"
            />
          </motion.div>

          {/* New Password Input */}
          <motion.div variants={itemVariants} className="space-y-2">
            <Label className="text-sm text-gray-400">New password</Label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={NewPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value)
                  setError('')
                }}
                onKeyDown={(e) => e.key === 'Enter' && handleResetPassword()}
                placeholder="Min. 8 characters"
                className="h-12 bg-white/5 border-white/20 text-white placeholder:text-gray-600 focus-visible:ring-white/40 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && <p className="text-red-400 text-xs">{error}</p>}
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <Button
              onClick={handleResetPassword}
              disabled={loading || !isComplete}
              className="w-full py-6 bg-white text-black hover:bg-gray-100 disabled:bg-gray-700 disabled:text-gray-500 font-semibold rounded-lg transition text-base"
            >
              {loading ? 'Resetting password...' : 'Reset password'}
            </Button>
          </motion.div>

          {/* Help text */}
          <motion.p variants={itemVariants} className="text-xs text-gray-600 text-center">
            Didn't get a code?{' '}
            <Link href="/auth/forgot-password" className="text-white hover:underline">
              Send again
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

export default Page