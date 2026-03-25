'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Radar, ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AnimatedBackground } from '@/components/animated-background'
import { GradientOrbs } from '@/components/gradient-orbs'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import signupSchema from '@/Schemas/SignupSchema'

export default function SignupPage() {

  const [Name , setname] = useState('')
  const [email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading , setloading ] = useState(false)
  const [error , seterror] = useState('')

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

  // main function
  const signup = async() => {


    const result = signupSchema.safeParse({ 
    Name: Name, 
    Email: email,
    password: Password, 
  })

  if (!result.success) {
    toast.error(result.error.message[0])
    return
  }

    setloading(true)
    try {
        const res = await axios.post('/api/auth/signup' , {
            Name,
            email,
            Password
        })
        console.log(res.data)
        console.log("Successfully signup!")
        toast.success("Success redirecting to Email verification!")
        setloading(false)
        setTimeout(() => {
          router.push(`/auth/verify/${res.data.userId}`)
        }, 3000);
      } catch (error: any) {
        console.log("Error while signing up" , error)
        seterror(error)
        setloading(false)
    }finally{
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
              <h1 className="text-3xl font-bold text-white">Create Account</h1>
              <p className="text-gray-400 text-sm">
                Start hunting leads on Twitter/X today
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={(e) => {e.preventDefault(); signup()}}>

                <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                   Name
                 </label>
                <Input
                  type="name"
                  placeholder="Joe Don"
                  value={Name}
                  onChange={(e) => setname(e.target.value)}
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-600 rounded-lg py-2 px-4 focus:border-white/30 transition"
                />
              </motion.div>

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
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-600 rounded-lg py-2 px-4 focus:border-white/30 transition"
                />
              </motion.div>

              {/* Confirm Password Input */}
              {/* <motion.div variants={itemVariants}>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-600 rounded-lg py-2 px-4 focus:border-white/30 transition"
                />
              </motion.div> */}

              {/* Submit Button */}
              <motion.div variants={itemVariants} className="pt-2">
                <Button
                disabled={loading}
                type='submit'
                  className="w-full py-2 bg-white text-black hover:bg-gray-100 font-semibold rounded-lg flex items-center justify-center gap-2 transition"
                >

                     {loading ? "Creating account..." : "Sign Up"}
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

            {/* Login Link */}
            <motion.div variants={itemVariants} className="text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{' '}
                <Link
                  href="/auth/login"
                  className="text-white font-semibold hover:underline transition"
                >
                  Sign In
                </Link>
              </p>
            </motion.div>
           
           {error && (
           <p>
            Error
           </p>
           )}

            {/* Terms */}
            <motion.p
              variants={itemVariants}
              className="text-xs text-gray-600 text-center"
            >
              By signing up, you agree to our{' '}
              <a href="#" className="text-gray-400 hover:text-gray-300 transition">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-gray-400 hover:text-gray-300 transition">
                Privacy Policy
              </a>
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
