'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Radar, ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/animated-background'
import { GradientOrbs } from '@/components/gradient-orbs'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import SignSchema from '@/Schemas/SignInSchema'


export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error , seterror] = useState('')
  const [loading , setloading ] = useState(false)
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


  const handleLogin = async(e: React.FormEvent) => {
e.preventDefault()

    const result = SignSchema.safeParse({
      email: email,
      password: password
    })
    
  if (!result.success) {
    toast.error(result.error.message[0])
    return
  }

    setloading(true)
    try {
     const res =  await signIn("credentials" , {
        email,
        password,
        redirect: false
      })
     if (res?.status == 200) {
       router.push('/dashboard')
     }
      toast.success("Successfully login!")
      setloading(false)
    } catch (error: any) {
      console.log("Error while login in " , error)
      toast.error("error while signin in ")
      seterror(error.message)
    } finally {
      setloading(false)
    }
  }



  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background effects */}
      <AnimatedBackground />
      <GradientOrbs />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          {/* Logo */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 mb-12"
          >
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Radar className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">X-Radar</span>
          </motion.div>

          {/* Form container */}
          <motion.div
            variants={itemVariants}
            className="glass-effect rounded-xl p-8 border border-white/10 space-y-6"
          >
            {/* Heading */}
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
              <p className="text-gray-400 text-sm">
                Sign in to continue hunting leads
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={handleLogin}>
              {/* Email Input */}
              <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-600 rounded-lg py-2 px-4 focus:border-white/30 transition"
                />
              </motion.div>

              {/* Password Input */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-300">
                    Password
                  </label>
                  {/* <Link
                    href="#"
                    className="text-xs text-gray-400 hover:text-gray-300 transition"
                  >
                    Forgot password?
                  </Link> */}
                </div>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-600 rounded-lg py-2 px-4 focus:border-white/30 transition"
                />
              </motion.div>

{error && (
  <p className="text-red-400 text-sm text-center">{error}</p>
)}
              {/* Submit Button */}
              <motion.div variants={itemVariants} className="pt-2">
                <Button
                  className="w-full py-2 bg-white text-black hover:bg-gray-100 font-semibold rounded-lg flex items-center justify-center gap-2 transition"
                >
                 {loading ?  "Loading...." : "Sign - in"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </form>

            {/* Divider */}
            <motion.div variants={itemVariants} className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-black text-gray-600">or</span>
              </div>
            </motion.div>

            {/* Signup Link */}
            <motion.div variants={itemVariants} className="text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <Link
                  href="/auth/signup"
                  className="text-white font-semibold hover:underline transition"
                >
                  Sign Up
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
