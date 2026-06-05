'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { GradientOrbs } from '@/components/gradient-orbs'
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from '@/components/ui/combobox'
import { Radar, Loader2 } from 'lucide-react'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


const NICHES = [
  'Developer',
  'Video Editor',
  'Ghostwriter',
  'Graphic Designer',
  'UI/UX Designer',
  'Copywriter',
  'Web Developer',
  'App Developer',
]

const NICHES_WITH_SUBNICHES: Record<string, string[]> = {
  'Developer': [
    'React', 'Vue', 'Angular', 'Next.js', 'Node.js', 'TypeScript',
    'Python', 'Django', 'FastAPI', 'Ruby on Rails', 'PHP', 'Laravel',
    'Go', 'Rust', 'Java', 'Spring Boot'
  ],
  'Video Editor': [
    'YouTube', 'Short-form / Reels', 'Podcast Editing', 'Color Grading',
    'Motion Graphics', 'Corporate Videos', 'Wedding Videos',
    'Documentary', 'Ad Creatives', 'Subtitles / Captions'
  ],
  'Ghostwriter': [
    'LinkedIn', 'Twitter / X', 'Newsletter', 'Blog Posts',
    'Long-form Articles', 'eBooks', 'Sales Emails', 'Cold Outreach',
    'YouTube Scripts', 'Podcast Scripts'
  ],
  // 'Graphic Designer': [
  //   'Logo Design', 'Brand Identity', 'Social Media Graphics',
  //   'Infographics', 'Pitch Deck Design', 'Packaging Design',
  //   'Print Design', 'Thumbnail Design', 'NFT Art', 'Illustration'
  // ],
  'UI/UX Designer': [
    'Figma', 'Mobile App Design', 'Web App Design', 'Wireframing',
    'Prototyping', 'Design Systems', 'SaaS Product Design',
    'Landing Page Design', 'User Research', 'Accessibility (a11y)'
  ],
  // 'Copywriter': [
  //   'Sales Pages', 'Email Sequences', 'Ad Copy', 'Product Descriptions',
  //   'Landing Pages', 'VSL Scripts', 'SaaS Copy', 'SEO Copy',
  //   'Cold Email', 'Social Media Copy'
  // ],
  'App Developer': [
    'iOS / Swift', 'Android / Kotlin', 'React Native', 'Flutter',
    'Cross-platform', 'Firebase', 'Supabase', 'SaaS Apps',
    'Chrome Extensions', 'AI-powered Apps'
  ],
}


function SetNiche() {
  const [niche, setNiche] = useState('')
  const [subNiche , setsubniche] = useState<any>('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const containerVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.1 },
    },
  }

  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const handleNiche = async() => {
    try {
      setLoading(true)
      await axios.post('/api/auth/setniche' , {
        niche: niche,
        subniche: subNiche
      })
      console.log("Successfully set the niche")
      toast.success("Successfully setted the niche")
        window.location.href = '/dashboard'
    } catch (error) {
      console.log("Error while sending niche to backend " , error)
      toast.error("Failed to set niche")
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background effects */}
      <GradientOrbs />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-3 sm:px-4 py-6 sm:py-0">
        <motion.div
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

              <motion.div variants={itemVariants} className="flex justify-center">
            
          </motion.div>
          {/* Card Container */}
          <motion.div
            variants={containerVariants}
            className="glass-effect rounded-xl p-5 sm:p-8 border border-white/10 space-y-4 sm:space-y-6"
          >
             <motion.div variants={itemVariants} className="flex justify-center">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-white rounded-3xl flex items-center justify-center">
              <Radar className="w-5 sm:w-7 h-5 sm:h-7 text-black" />
            </div>
          </motion.div>
            {/* Header */}
            <motion.div variants={titleVariants} initial="hidden" animate="visible">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 text-center leading-tight">
                Select Your Niche
              </h1>
              <p className="text-gray-200 text-center mb-6 sm:mb-8 text-xs sm:text-sm leading-relaxed">
                Choose the niche and a subniche it will help XRadar to optimize and search leads  for you 
              </p>  
            </motion.div>

            {/* Combobox Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-3 sm:space-y-4"
            >
              <label className="block text-xs sm:text-sm font-medium text-gray-300">
                Profession
              </label>
              <Combobox
                value={niche}
                onValueChange={(value) => setNiche(value || '')}
              >
                <ComboboxInput
                  placeholder="Search and select your niche..."
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-600 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 focus:border-white/30 transition text-xs sm:text-sm"
                  showClear
                />
                <ComboboxContent className="bg-black border-white/10 max-h-48 sm:max-h-60">
                  <ComboboxEmpty className="text-gray-500 py-4 sm:py-6 text-center text-xs sm:text-sm">
                    No niches found
                  </ComboboxEmpty>
                  <ComboboxList>
                    {NICHES.map((nicheOption) => (
                      <ComboboxItem
                        key={nicheOption}
                        value={nicheOption}
                        className="text-gray-100 hover:bg-white/10 focus:bg-white/10 cursor-pointer text-xs sm:text-sm py-2 sm:py-2.5"
                      >
                        {nicheOption}
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>


            {niche ? (
                <div className="space-y-3 sm:space-y-4 animate-in fade-in duration-300">

                      <label className="block text-xs sm:text-sm font-medium text-gray-300">
                Enter a subniche
              </label>
              <Combobox
               value={subNiche} 
  onValueChange={(value) => setsubniche(value || "")}
              >
                <ComboboxInput
                  placeholder="Search and select your subniche..."
                  className="w-full bg-white/5 border-white/10 text-white placeholder:text-gray-600 rounded-lg py-2.5 sm:py-3 px-3 sm:px-4 focus:border-white/30 transition text-xs sm:text-sm"
                  showClear
                />
                <ComboboxContent className="bg-black border-white/10 max-h-48 sm:max-h-60">
                  <ComboboxEmpty className="text-gray-500 py-4 sm:py-6 text-center text-xs sm:text-sm">
                    No subniches found
                  </ComboboxEmpty>
                  <ComboboxList>
                    {NICHES_WITH_SUBNICHES[niche].map((nicheOption:any) => (
                      <ComboboxItem
                        key={nicheOption}
                        value={nicheOption}
                        className="text-gray-100 hover:bg-white/10 focus:bg-white/10 cursor-pointer text-xs sm:text-sm py-2 sm:py-2.5"
                      >
                        {nicheOption}
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
                </div>
            ): null}
            </motion.div>

            {/* Selected Value Display */}
            {subNiche &&  (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-3 sm:p-4 bg-white/5 border border-white/10 rounded-lg"
              >
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  You are a <span className='font-bold'>{niche}</span> with skills in <span className='font-bold'>{subNiche}</span>
                </p>
              </motion.div>
            )}

            {/* Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-2 sm:pt-4"
            >
              <Button
              onClick={handleNiche}
                className="w-full py-2.5 sm:py-3 bg-white text-black hover:bg-gray-100 font-semibold rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm transition disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                disabled={!niche || loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Lets Start Hunting Leads'
                )}
              </Button>
            </motion.div>

            {/* Help Text */}
            <p className="text-xs text-gray-600 text-center">
              You can change your niche later in your settings
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default SetNiche
