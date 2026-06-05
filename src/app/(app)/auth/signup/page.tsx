'use client'

import { useEffect, useRef, useState } from 'react'
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

    // anvas ────────────────────────────────────────────────────────────
  function RadarCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const angleRef  = useRef(0);
    const rafRef    = useRef<number>(0);
   
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d")!;
      const cx = 100, cy = 100, R = 88;
   
      const blips = [
        { x: 138, y: 58,  phase: 0,   period: 2100 },
        { x: 64,  y: 132, phase: 600, period: 2700 },
        { x: 155, y: 118, phase: 900, period: 1900 },
      ];
   
      function draw(ts: number) {
        ctx.clearRect(0, 0, 200, 200);
        angleRef.current += 0.022;
        const a = angleRef.current;
   
        // rings
        [R, 66, 42, 20].forEach((r, i) => {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(168,85,247,${0.22 - i * 0.03})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        });
   
        // cross lines
        ([
          [cx, cy - R, cx, cy + R],
          [cx - R, cy, cx + R, cy],
          [cx - 63, cy - 63, cx + 63, cy + 63],
          [cx + 63, cy - 63, cx - 63, cy + 63],
        ] as [number,number,number,number][]).forEach(([x1,y1,x2,y2]) => {
          ctx.beginPath();
          ctx.moveTo(x1, y1); ctx.lineTo(x2, y2);
          ctx.strokeStyle = "rgba(168,85,247,0.1)";
          ctx.lineWidth = 0.7;
          ctx.stroke();
        });
   
        // sweep cone
        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, R, 0, Math.PI * 2);
        ctx.clip();
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, R, a - Math.PI * 0.42, a);
        ctx.closePath();
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
        grad.addColorStop(0,   "rgba(168,85,247,0.0)");
        grad.addColorStop(0.5, "rgba(168,85,247,0.2)");
        grad.addColorStop(1,   "rgba(168,85,247,0.5)");
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();
   
        // sweep line
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * R, cy + Math.sin(a) * R);
        ctx.strokeStyle = "rgba(216,180,254,0.75)";
        ctx.lineWidth = 1.4;
        ctx.stroke();
   
        // center dot
        ctx.beginPath();
        ctx.arc(cx, cy, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#a855f7";
        ctx.fill();
   
        // blips
        blips.forEach(b => {
          const t     = ((ts + b.phase) % b.period) / b.period;
          const alpha = t < 0.5 ? t * 2 : 2 - t * 2;
          ctx.beginPath();
          ctx.arc(b.x, b.y, 4 + t * 14, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(192,132,252,${(1 - t) * 0.55})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.beginPath();
          ctx.arc(b.x, b.y, 3.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(216,180,254,${0.3 + alpha * 0.7})`;
          ctx.fill();
        });
   
        rafRef.current = requestAnimationFrame(draw);
      }
   
      rafRef.current = requestAnimationFrame(draw);
      return () => cancelAnimationFrame(rafRef.current);
    }, []);
   
    return <canvas ref={canvasRef} width={200} height={200} />;
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

  // console.log(error)

  // main function
  const handleSignup = async(data: z.input<typeof signupSchema>) => {
    setloading(true)
    try {
        const res = await axios.post('/api/auth/signup' , {
            Name: data.Name,
            email: data.Email,
            Password: data.password,
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
          seterror(error?.response?.data?.message || "Something went wrong. Please try again.")

  console.log("Response data:", error?.response?.data)
  console.log("Type:", typeof error?.response?.data)

  seterror(error?.response?.data.message || "Something went wrong")
        setloading(false)
    }finally{
      setloading(false)
    }
  }

  console.log("Error setted " ,error)


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

    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center px-4 py-10">
      {/* Background effects */}
      <GradientOrbs />

  <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-[860px] overflow-hidden rounded-2xl
                   grid grid-cols-1 md:grid-cols-[1fr_380px]"
        style={{
          background: "rgba(255,255,255,0.035)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* ── LEFT PANEL — hidden on mobile ── */}
        <motion.div
          className="relative hidden md:flex flex-col justify-between overflow-hidden px-10 py-12"
          style={{ background: "linear-gradient(145deg,#0f0524 0%,#091838 60%,#080d1e 100%)" }}
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(circle at 30% 70%, rgba(100,40,200,0.12), transparent 60%)" }}
          />
 
          <div className="relative z-10 flex flex-col items-center">
            <motion.div variants={itemVariants} className="mb-7">
              <RadarCanvas />
            </motion.div>
 
            <motion.h2 variants={itemVariants} className="text-white font-bold text-xl leading-snug mb-3 text-center">
              Find your next Client on X <br />Before anyone else
            </motion.h2>
            <motion.p variants={itemVariants} className="text-sm leading-relaxed text-center" style={{ color: "rgba(255,255,255,0.42)" }}>
              X-Radar lets you run multiple search queries on Twitter/X in real-time to find
              high-intent leads tailored to your niche — automatically, every day.
            </motion.p>
          </div>
 
          <motion.div
            variants={itemVariants}
            className="relative z-10 pt-5"
            style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
          >
            <p className="text-xs uppercase mb-3" style={{ color: "rgba(255,255,255,0.28)" }}>
              Used by freelancers and working professionals in
            </p>
            <div className="flex flex-wrap gap-2">
              {["Web Dev","Design","Copywriting"].map((t, i) => (
                <motion.span
                  key={t}
                  variants={itemVariants}
                  custom={i}
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
 
        {/* ── RIGHT PANEL ── */}
        <div
          className="flex flex-col justify-center px-6 py-8 sm:px-9 sm:py-10"
          style={{ background: "#0c0c14" }}
        >
          {/* Logo */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <Radar className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">X-Radar</span>
          </motion.div>

          {/* Heading */}
          <motion.div variants={itemVariants} className="space-y-1 mb-7">
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="text-gray-400 text-sm">Start hunting leads on Twitter/X today</p>
          </motion.div>

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
    checked={field.value}
    onCheckedChange={field.onChange}
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
                  className="w-full py-2 bg-white text-black hover:bg-gray-100 font-semibold rounded-lg flex items-center justify-center gap-2 transition active:scale-[0.98] disabled:opacity-60"
                >
                     {loading ? "Creating account..." : "Sign Up"}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </form>

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm text-center"
              >
                {error}
              </motion.p>
            )}

            {/* Google button — outside the form */}
            <motion.button
              variants={itemVariants}
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.09)" }}
              className="w-full py-2 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-60"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {loading ? "Loading..." : "Continue With Google"}
            </motion.button>

            {/* Divider */}
            <motion.div variants={itemVariants} className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#0c0c14] text-gray-600">or</span>
              </div>
            </motion.div>

            {/* Sign up link */}
            <motion.div variants={itemVariants} className="text-center">
              <p className="text-gray-400 text-sm">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-white font-semibold hover:underline transition">
                  Sign In
                </Link>
              </p>
            </motion.div>

        </div>
      </motion.div>
    </div>
  )
}
