'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import {
  Radar,
  UserRound,
  Mail,
  LogOut,
  Search,
  ScanText,
  Users,
  Zap,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProPricingSection from '@/components/ProPricingSection'
import FreePricingSection from '@/components/FreepricingSection'
import Footer from '@/components/footer'

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: i * 0.07,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
}



// Animated counter hook 
function useCounter(target: number, duration = 1.4) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString())
  useEffect(() => {
    const controls = animate(count, target, { duration, ease: 'easeOut' })
    return controls.stop
  }, [target])
  
  return rounded
}

// Individual stat card
function StatCard({
  icon: Icon,
  label,
  value,
  suffix = '',
  accent,
  delay,
}: {
  icon: React.ElementType
  label: string
  value: number
  suffix?: string
  accent: string
  delay: number
}) {

  const display = useCounter(value)

  
  return (
    <motion.div
      custom={delay}
      variants={fadeUp}
      initial="hidden"
      animate="show"
      whileHover={{ y: -3, borderColor: 'rgba(255,255,255,0.13)' }}
      className="rounded-2xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm p-4 transition-colors duration-200 cursor-default"
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: accent + '33', border: `1px solid ${accent}44` }}
        >
          <Icon className="w-4 h-4" style={{ color: accent }} />
        </div>
      </div>
      <p className="text-2xl font-bold tracking-tight">
        <motion.span>{display}</motion.span>
        {suffix && <span className="text-base text-white/40 ml-0.5">{suffix}</span>}
      </p>
      <p className="text-white/35 text-xs mt-1">{label}</p>
    </motion.div>
  )
}

type Userdata = {
  Email: string
  Name: string
  isVerifiedEmail: boolean
  Niche: string
  createdAt: Date
  subniches: string
  dodocustomerId: string
  plan: string
  planActivatedAt: Date
  planExpiresAt: Date
}

export default function AccountPage() {
  const { data: session } = useSession()
  const [data, setdata] = useState<Userdata>()
  const [totalleadsfound , settotalleadsFounds] = useState(0)
  const [TotalTweetsScraped , setTotalTweetsScraped] = useState(0)
  const [totalRuns , settotalRuns ] = useState(0) 
  const [nextBillingDate , setnextbillingdate] = useState(null)

  
 const [leadsHistory , setleadsHistory] = useState<[]>([])




  const getuserDetails = async () => {
    try {
      const res = await axios.get('/api/user-info')
      console.log(res.data)
      
       if (res.data.newStats?.length > 0) {
            settotalRuns(res.data.newStats[0].totalRuns)
            setTotalTweetsScraped(res.data.newStats[0].TotalTweetsScraped)
            settotalleadsFounds(res.data.newStats[0].TotalLeadsFound) 
            setnextbillingdate(res.data.next_billing_date)
        }
        
      setdata(res.data.user)
    } catch (error) {
      console.error('Error while fetching the user info', error)
    }
  }

  useEffect(() => {
    getuserDetails()
  }, [])

useEffect(() => {
  const fetchLeadsFrombackend = async() => {
   try {
    const res = await axios.get('/api/get-recent-leads')
    setleadsHistory(res.data.searchruns ?? [])
    console.log(res.data)
   } catch (error: any) {
    console.error("Error while fetching recent leads:", error.message)
   }
  }
  fetchLeadsFrombackend()
} , [])

  // Demo stats — swap these with real API values when ready
  const stats = [
    {
      icon: ScanText,
      label: 'Tweets Scraped',
      value:  TotalTweetsScraped,
      accent: '#818cf8',
      delay: 1.2,
    },
    {
      icon: Users,
      label: 'Filtered Out leads',
      value: totalleadsfound,
      accent: '#34d399',
      delay: 1.35,
    },
    {
      icon: Zap,
      label: 'Total Runs',
      value: totalRuns,
      accent: '#f59e0b',
      delay: 1.5,
    },
  ]

  return (
    
  <div className="min-h-screen bg-[#080a0f] text-white font-sans relative overflow-x-hidden">
  {/* Background atmosphere */}
  <div className="pointer-events-none fixed inset-0 z-0">
    <div className="absolute top-[-10%] left-[15%] w-130 h-[520px] rounded-full bg-indigo-900/20 blur-[120px]" />
    <div className="absolute bottom-[10%] right-[5%] w-[380px] h-[380px] rounded-full bg-blue-950/25 blur-[100px]" />
    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,...')] opacity-60" />
  </div>

  {/* Navbar */}
  <motion.nav
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    className="fixed top-0 w-full z-50 border-b border-white/[0.07] bg-black/30 backdrop-blur-xl"
  >
    <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <motion.div
          whileHover={{ rotate: 20, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="w-8 h-8 bg-white rounded-lg flex items-center justify-center"
        >
          <Radar className="w-5 h-5 text-black" />
        </motion.div>
        <span className="text-lg font-semibold tracking-tight">X-Radar</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-white/40 hidden sm:block">My Account</span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Sign out</span>
        </motion.button>
      </div>
    </div>
  </motion.nav>

  {/* Main */}
  <main className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-20">

    {/* Profile Header */}
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={0}
      className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10"
    >
      <div className="relative">
        <Avatar className="w-20 h-20 border-2 border-white/10">
          <AvatarImage src={session?.user.image || "https://github.com/shadcn.png"} />
          <AvatarFallback className="bg-gradient-to-br from-white/15 to-white/5 text-white">
            <UserRound className="w-9 h-9 text-white/70" />
          </AvatarFallback>
        </Avatar>
        <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#080a0f]" />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-2xl font-bold tracking-tight">{data?.Name || "User"}</h1>

          {data?.plan === 'pro' ? (
            <Badge className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-semibold uppercase px-2 py-0.5">
             XRadar-PRO
            </Badge>
          ) : (
            <Badge className="bg-white/10 text-white/50 border border-white/10 text-[10px] font-semibold uppercase px-2 py-0.5">
              Free Plan
            </Badge>
          )}
        </div>

        <p className="text-white/90 text-xs mt-2">
          Member Since: {new Date(data?.createdAt || '').toDateString()}
        </p>
      </div>
    </motion.div>

    {/* Stats */}
    <div className="grid grid-cols-3 gap-3 mb-8">
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>

    {/* Layout */}
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 items-start">

      {/* LEFT */}
      <div className="lg:col-span-3 space-y-5">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={5}
          className="rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm w-full"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-white/30" />
              <h2 className="text-sm font-semibold text-white/80">Recent Searches</h2>
            </div>

            <span className="text-xs text-white/20 bg-white/[0.05] px-2 py-0.5 rounded-full">
              {leadsHistory.length} runs
            </span>
          </div>

          {/* Content */}
          <div className="divide-y divide-white/[0.04]">
            {leadsHistory.length === 0 ? (
              <div className="flex flex-col items-center gap-2 py-10 text-white/50">
                <Search className="w-5 h-5" />
                <p className="text-sm">No recent searches yet.</p>
              </div>
            ) : (
              leadsHistory.map((lead: any, i: number) => (
                <div key={i} className="px-6 py-3.5 flex justify-between hover:bg-white/[0.03]">
                  <span>{lead.keywords}</span>
                  <span>{lead.TotalLeadsFound} leads</span>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* RIGHT */}
      <div className="lg:col-span-2 w-full">

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3.5}
          className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/30 to-black/40 backdrop-blur-sm overflow-hidden"
        >
          <div className="relative px-6 py-5">
            <p className="text-[10px] text-indigo-400/70 uppercase mb-3">Current Plan</p>

  
            <div className="w-full">
  {data?.plan === 'pro' ? (
    <ProPricingSection nextBillingDate={nextBillingDate} />
  ) : (
    <FreePricingSection />
  )}
</div>

          </div>
        </motion.div>

      </div>
    </div>
  </main>

  <Footer />
</div>
  )
}