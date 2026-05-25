'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Radar, ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

import { GradientOrbs } from '@/components/gradient-orbs'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import signupSchema from '@/Schemas/SignupSchema'
import { signIn } from 'next-auth/react'
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { Label } from '@/components/ui/label'
import * as z from "zod"

import { zodResolver } from "@hookform/resolvers/zod"

import { Controller , useForm } from 'react-hook-form'




export default function SignupPage() {

  const [Name , setname] = useState('')
  const [email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [niche, setNiche] = useState('')
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


  const form = useForm<z.input<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      Name: '',
      Email: '',
      password: '',
      aggrements: false
    }
  })

  // main function
  const handleSignup = async(data: z.input<typeof signupSchema>) => {

    const result = signupSchema.safeParse({ 
    Name: Name, 
    Email: email,
    password: Password, 
  aggrements: false
  })

  if (!result.success) {
    seterror(result.error.message)
    return
  }

    setloading(true)
    try {
        const res = await axios.post('/api/auth/signup' , {
            Name,
            email,
            Password,
            niche
        })
        // console.log(res.data)
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



  const handleGoogleLogin = async() => {
    
     const isValid = await form.trigger("aggrements")
  
  if (!isValid) return  // return 

    try {
       setloading(true)
      await signIn('google' , {callbackUrl: '/auth/set-niche'})
      toast.success("Successfully login with google!")
    } catch (error) {
      console.log("Error while loggin in with google " , error)
      setloading(false)
    } finally {
      setloading(false)
    }
  }

//   const handleXLogin = async () => {
//   try {
//     setloading(true)
//     await signIn('twitter', { callbackUrl: '/dashboard' })
//     toast.success("Successfully logged in with X!")
//   } catch (error) {
//     console.log("Error while logging in with X", error)
//     setloading(false)
//   } finally {
//     setloading(false)
//   }
// }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background effects */}
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
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Create Account</h1>
              <p className="text-gray-400 text-xs sm:text-sm">
                Start hunting leads on Twitter/X today
              </p>
            </div>

            {/* Form */}
            <form className="space-y-4" onSubmit={form.handleSubmit(handleSignup)}>

             <Controller
              name="Name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="Name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your Name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
               

              {/* Email Input */}
              <motion.div variants={itemVariants}>
              
   <Controller
              name="Email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Email
                  </FieldLabel>
                  <Input
                    {...field}
                    id="Email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your Email"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
              </motion.div>
            

              {/* Password Input */}
              <motion.div variants={itemVariants}>

                 <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-demo-title">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="Password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your Password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
              </motion.div>



              <motion.div variants={itemVariants}>

                <Controller
              name="aggrements"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
 <Field 
 {...field}
 orientation="horizontal" className="flex items-start gap-3 group cursor-pointer">
  <Checkbox
    id="agreements-checkbox"
    name="aggrements"
    className="mt-0.5 h-4 w-4 rounded border border-slate-700 bg-slate-900"
  
  />
  <Label
    htmlFor="agreements-checkbox"
    className="text-xs text-slate-400 leading-snug cursor-pointer 
               group-hover:text-slate-400 transition-colors duration-150"
  >
    I agree to the{" "}
    <a href="/terms" className="text-white hover:text-slate-300 underline underline-offset-2 transition-colors">
      Terms & Conditions
    </a>
    {" "}and I have read the{" "}
     {" "}
    <a href="/privacy" className="text-white hover:text-slate-300 underline underline-offset-2 transition-colors">
      Privacy Policy 
    </a>
  </Label>
</Field>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
             
              </motion.div>

             
              {/* Submit Button */}
              <motion.div variants={itemVariants} className="pt-2">
                <Button
                disabled={loading}
                type='submit'
                  className="w-full py-2 sm:py-2.5 bg-white text-black hover:bg-gray-100 font-semibold rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base transition"
                >

                     {loading ? "Creating account..." : "Sign Up"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </form>

{/* Google button — outside the form */}
<motion.div variants={itemVariants}>
 <button 
  type="button"
  onClick={handleGoogleLogin}
  disabled={loading}
  className='w-full py-2 sm:py-2.5 bg-white text-black hover:bg-gray-100 font-semibold rounded-lg flex items-center justify-center gap-2 text-sm sm:text-base transition'
>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
  {loading ? "Loading..." : "Continue With Google"}
</button>
</motion.div>

            {/* Divider */}
            <motion.div variants={itemVariants} className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-2 bg-black text-gray-600">or</span>
              </div>
              
            </motion.div>

 
            {/* Login Link */}
            <motion.div variants={itemVariants} className="text-center">
              <p className="text-gray-400 text-xs sm:text-sm">
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
         
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
