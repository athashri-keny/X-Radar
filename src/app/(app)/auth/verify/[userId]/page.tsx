'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, RotateCcw, Radar } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AnimatedBackground } from '@/components/animated-background'
import { GradientOrbs } from '@/components/gradient-orbs'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import { toast } from 'sonner'
import { signIn } from 'next-auth/react'

export default function OTPPage() {

  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [isResending, setIsResending] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const [error , seterror] = useState('')
  const [loading , setloading] = useState(false)
  const params = useParams()
  const router = useRouter()

  const userId = params.userId
  console.log("Userid" ,  userId)

  const verifyCode = async() => {
    try {
        setloading(true)
      const res =  await axios.post(`/api/auth/verify-code` , {
            verifycode: otp.join(''),
            userId: userId
        })

        const AutoLoginToken = res.data.AutoLoginToken

        console.log("Autologin token" , AutoLoginToken)

        await signIn('credentials' , {
          redirect: false,
          AutoLoginToken // // passes it to NextAuth
        })
        toast.success("Successfully Email verified")
        router.push('/dashboard')
        setloading(false)
    } catch (error: any) {
        console.log("Error while verifying code" , error)
        seterror(error)
        setloading(false)
    } finally{
        setloading(false)
    }
  }



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

  const handleOtpChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return
    
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1) // Keep only last digit
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  const handleResend = () => {
    setIsResending(true)
    setResendCooldown(60)
    
    // Simulate resend API call
    setTimeout(() => {
      setIsResending(false)
    }, 1000)

    // Countdown timer
    const countdown = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(countdown)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const otpValue = otp.join('')
  const isComplete = otpValue.length === 6

  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* Background effects */}
      <AnimatedBackground />
      <GradientOrbs />

      {/* Content */}
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
          {/* <motion.div variants={itemVariants} className="text-center space-y-3">
            <h1 className="text-3xl font-bold text-white">Verify your email</h1>
            <p className="text-gray-400">
              We've sent a 6-digit code to{' '}
              <span className="text-white font-medium">{Email}</span>
            </p>
          </motion.div> */}

          {/* OTP Input Fields */}
          <motion.div
            variants={itemVariants}
            className="flex gap-3 justify-center"
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 bg-white/5 border border-white/20 rounded-lg text-center text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-white/40 transition placeholder:text-gray-700"
                placeholder="•"
              />
            ))}
          </motion.div>

          {/* Verify Button */}
          <motion.div variants={itemVariants}>
            <Button
            onClick={verifyCode}
              disabled={!isComplete}
              className="w-full py-6 bg-white text-black hover:bg-gray-100 disabled:bg-gray-700 disabled:text-gray-500 font-semibold rounded-lg transition text-base"
            >
                 {loading ? "Verifing Account..." : "Continue"}
            </Button>
          </motion.div>

  {error && (
           <p>
            Error
           </p>
           )}
          {/* Resend Section */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-4 pt-4 border-t border-white/10"
          >
            <p className="text-sm text-gray-500">
              Didn't receive the code?
            </p>

            {resendCooldown > 0 ? (
              <p className="text-sm text-gray-600">
                Resend available in{' '}
                <span className="text-white font-semibold">{resendCooldown}s</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                disabled={isResending}
                className="flex items-center justify-center gap-2 text-white hover:text-gray-200 transition font-medium text-sm"
              >
                <RotateCcw className={`w-4 h-4 ${isResending ? 'animate-spin' : ''}`} />
                {isResending ? 'Sending...' : 'Resend code'}
              </button>
            )}
          </motion.div>

          {/* Help text */}
          <motion.p
            variants={itemVariants}
            className="text-xs text-gray-600 text-center"
          >
            If you didn't request this code, you can ignore this message or{' '}
            <Link href="/auth/login" className="text-white hover:underline">
              login to your account
            </Link>
            .
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
