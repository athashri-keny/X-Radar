'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, ChevronsUpDown, Radar, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { AnimatedBackground } from '@/components/animated-background'
import { GradientOrbs } from '@/components/gradient-orbs'
import axios from 'axios'
import { Toast } from '@/components/ui/toast'
import { toast } from 'sonner'


const niches = [
  { value: 'web-development', label: 'Web Development' },
  { value: 'mobile-development', label: 'Mobile Development' },
  { value: 'ui-ux-design', label: 'UI/UX Design' },
  { value: 'graphic-design', label: 'Graphic Design' },
  { value: 'copywriting', label: 'Copywriting' },
  { value: 'content-writing', label: 'Content Writing' },
  { value: 'video-editing', label: 'Video Editing' },
  { value: 'motion-graphics', label: 'Motion Graphics' },
  { value: 'social-media', label: 'Social Media Management' },
  { value: 'seo', label: 'SEO' },
  { value: 'data-science', label: 'Data Science' },
  { value: 'devops', label: 'DevOps' },
  { value: 'virtual-assistant', label: 'Virtual Assistant' },
  { value: 'consulting', label: 'Consulting' },
  { value: 'other', label: 'Other' },
]

// Total seats and seats taken (UI only - you can make this dynamic)
const TOTAL_SEATS = 5
 // Change this value or make it dynamic

export default function EarlyAccessPage() {

  const [email, setEmail] = useState('')
  const [niche, setNiche] = useState('')
  const [open, setOpen] = useState(false)
  const [loading , setloading] = useState(false)
  const [error , setError ] = useState('')
  const [submitted , setSubmitted] = useState(false)
  const [seatsTaken , setseatsTaken] = useState(Number)

  const seatsLeft = TOTAL_SEATS - seatsTaken

// for fetching the counts
  useEffect(() => {
 const fetchCount = async() => {
 const res = await axios.get('/api/early-access')
 console.log(res.data.count)
      setseatsTaken(res.data.count)
 }
     fetchCount()
  } , [])


  // for handling the submt 
  const handleSubmit = async(e: React.FormEvent) => {
  try {
      e.preventDefault()
      setloading(true)
      setError('')
       await axios.post('/api/early-access' , {
          email,
          niche
      })
  setseatsTaken(prev => prev + 1)

  setSubmitted(true)
  
  toast.success("Successfully joined the waitlist!")

  console.log({ email, niche })

  } catch (error: any) {
    setloading(false)
    console.log("Error while sumiting the form check if the seats are full!" , error)
    if (error.response?.status === 409) {
      const errorMsg = "You're already on the waitlist! We'll contact you soon. 😊"
      setError(errorMsg)
      toast.error(errorMsg)
    } else if (error.response?.status === 400) {
      const errorMsg = "Please fill in all required fields correctly."
      setError(errorMsg)
      toast.error(errorMsg)
    } else if (error.response?.status === 503) {
      const errorMsg = "Someone from this niche already joined! We will notify you when more spots open"
      setError(errorMsg)
      toast.error(errorMsg)
    } 
    else if (error.response?.status === 504) {
      const errorMsg = "All seats are full. We will notify you when more spots are open"
      setError(errorMsg)
      toast.error(errorMsg)
    } 
    else {
      const errorMsg = "Something went wrong. Please try again."
      setError(errorMsg)
      toast.error(errorMsg)
    }
  }finally{
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

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      {/* Background effects */}
      <AnimatedBackground />
      <GradientOrbs />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <Radar className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold text-white">X-Radar</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pb-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md text-center"
          >
            {/* Seats indicator */}
            <motion.div variants={itemVariants} className="mb-8">
              <div className="inline-flex items-center gap-2 glass-effect px-4 py-2 rounded-full">
                <div className="flex gap-1">
                  {Array.from({ length: TOTAL_SEATS }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'w-2 h-2 rounded-full transition-colors',
                        i < seatsTaken ? 'bg-gray-600' : 'bg-white'
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-white">
                  {seatsLeft} of {TOTAL_SEATS} seats left
                </span>
              </div>
            </motion.div>

            {/* Heading */}
         <motion.h1
  variants={itemVariants}
  className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight"
>
  Get Early Access to{" "}
  <span className="inline-flex items-center gap-2   ">
    <Radar className="w-8 h-8 text-white inline" />
    X-Radar
  </span>
</motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-gray-400 mb-8 text-lg"
            >
              Join the MVP waitlist. Limited to {TOTAL_SEATS} seats only.
            </motion.p>

            {/* Form */}
            <motion.form
              variants={itemVariants}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              {/* Email field */}
              <div className="text-left">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-400 mb-2"
                >
                  Email address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border-white/20 text-white placeholder:text-gray-500 focus-visible:ring-white/30 focus-visible:border-white/40 h-12"
                />
              </div>

              {/* Niche combobox */}
              <div className="text-left">
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Your niche
                </label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white h-12"
                    >
                      {niche
                        ? niches.find((n) => n.value === niche)?.label
                        : 'Select your niche...'}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 bg-black/95 border-white/20 backdrop-blur-xl">
                    <Command className="bg-transparent">
                      <CommandInput
                        placeholder="Search niches..."
                        className="text-white"
                      />
                      <CommandList>
                        <CommandEmpty className="text-gray-400">
                          No niche found.
                        </CommandEmpty>
                        <CommandGroup>
                          {niches.map((n) => (
                            <CommandItem
                              key={n.value}
                              value={n.value}
                              onSelect={(currentValue) => {
                                setNiche(
                                  currentValue === niche ? '' : currentValue
                                )
                                setOpen(false)
                              }}
                              className="text-white data-[selected=true]:bg-white/10 data-[selected=true]:text-white cursor-pointer"
                            >
                              <Check
                                className={cn(
                                  'mr-2 h-4 w-4',
                                  niche === n.value
                                    ? 'opacity-100'
                                    : 'opacity-0'
                                )}
                              />
                              {n.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Submit button */}
          <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
>
  {submitted ? (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8 px-4 border border-green-500/30 rounded-xl bg-green-500/10"
    >
        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-6 h-6 text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
            You're on the list! 🎉
        </h3>
        <p className="text-gray-400 text-sm">
            We'll email you at <span className="text-white">{email}</span> when X-Radar is ready.
        </p>
        <p className="text-gray-500 text-xs mt-3">
            Expected launch: very soon 🚀
        </p>
    </motion.div>
) : (
    <Button
        type="submit"
        className="w-full bg-white text-black hover:bg-gray-200 h-12 text-base font-semibold mt-2"
        disabled={seatsLeft === 0 || loading}
    >
        {loading ? (
            <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                Joining...
            </div>
        ) : seatsLeft === 0 ? (
            'Waitlist Full'
        ) : (
            'Join the Waitlist'
        )}
    </Button>
)}

{error && (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-4 px-4 border border-red-500/30 rounded-lg bg-red-500/10 mb-4"
  >
    <p className="text-red-400 text-sm font-medium">
      {error}
    </p>
  </motion.div>
)}
   
</motion.div>
            </motion.form>

            {/* Footer note */}
            <motion.p
              variants={itemVariants}
              className="mt-9 text-xs text-white-600"
            >
              By joining, you will recive a joining Email When MVP is ready!.
             <br/> No spam, unsubscribe anytime.
            </motion.p>
          </motion.div>
        </main>
      </div>
    </div>
  )
}
