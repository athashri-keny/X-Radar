'use client'

import { motion } from 'framer-motion'
import {
  Radar,
  UserRound,
  Mail,
  LogOut,
  Search,
 
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { signOut } from 'next-auth/react'


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



export default function AccountPage() {

const {data: session} = useSession()
const [data , setdata] = useState("")
const [sinceData , setSinceDate]  = useState(Date)
const [recentLeads , setrecentleads]  = useState('')


const getrecentLeads = async() => {
  try {
   const res =  await axios.get('/api/get-recent-leads')
   console.log(res.data)
  setrecentleads(res.data.searchruns)

  } catch (error) {
    console.log("Errror while getting recent leads " , error)
  }
}

const getuserDetails = async() => {
  try {
  
  const res =   await axios.get('/api/user-info')
    console.log(res.data)
    setdata(res.data)
    setSinceDate(res.data.user.createdAt)
} catch (error) {
  console.log("Error while fetching the user info" ,error)
}
}


useEffect(() => {
getuserDetails()
getrecentLeads()
} , [])


  return (
    <div className="min-h-screen bg-[#080a0f] text-white font-sans relative overflow-x-hidden">
      {/* Background atmosphere */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-[-10%] left-[15%] w-[520px] h-[520px] rounded-full bg-indigo-900/20 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[380px] h-[380px] rounded-full bg-blue-950/25 blur-[100px]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMC41IiBjeT0iMC41IiByPSIwLjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] opacity-60" />
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
            <motion.div whileHover={{ rotate: 20, scale: 1.1 }} transition={{ type: 'spring', stiffness: 300 }}
              className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <Radar className="w-5 h-5 text-black" />
            </motion.div>
            <span className="text-lg font-semibold tracking-tight">X-Radar</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/40 hidden sm:block">My Account</span>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors">
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign out</span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Main */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-20">

        {/* Profile Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10">
          <div className="relative">
            <Avatar className="w-20 h-20 border-2 border-white/10">
              <AvatarImage src={session?.user.image || undefined} />
              <AvatarFallback className="bg-gradient-to-br from-white/15 to-white/5 text-white">
                <UserRound className="w-9 h-9 text-white/70" />
              </AvatarFallback>
            </Avatar>
            <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#080a0f]" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold tracking-tight">{session?.user.name}</h1>
              <Badge className="bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5">
  Free
              </Badge>
            </div>
            <p className="text-white/45 text-sm mt-1">{session?.user.email}</p>
            <p className="text-white/30 text-xs mt-2">Member Since {new Date(sinceData).toDateString()}</p>
          </div>
        </motion.div>

        {/* Stats Row */}
        {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {stats.map(({ label, value, icon: Icon, delta }, i) => (
            <motion.div key={label} custom={1 + i * 0.4} variants={fadeUp} initial="hidden" animate="show"
              whileHover={{ y: -3, borderColor: 'rgba(255,255,255,0.15)' }}
              className="rounded-xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm p-4 transition-colors duration-200 cursor-default">
              <div className="flex items-center justify-between mb-3">
                <Icon className="w-4 h-4 text-white/30" />
                <span className="text-[10px] text-emerald-400/80 font-medium">{delta}</span>
              </div>
              <p className="text-2xl font-bold tracking-tight">{value}</p>
              <p className="text-white/35 text-xs mt-1">{label}</p>
            </motion.div>
          ))}
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Left col */}
          <div className="lg:col-span-3 space-y-5">

            {/* Personal Info */}
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-white/[0.06]">
                <h2 className="text-sm font-semibold text-white/80">Personal Information</h2>
              </div>
             <div className="px-6 py-5 space-y-5">
  {[
    { label: 'Full Name', value: session?.user?.name, icon: UserRound },
    { label: 'Email Address', value: session?.user?.email, icon: Mail },
  ].map(({ label, value, icon: Icon }) => (
    <div key={label} className="flex items-center gap-4">
      <div className="w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.06] flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-white/40" />
      </div>
      <div>
        <p className="text-[10px] text-white/30 uppercase tracking-widest mb-0.5">{label}</p>
        <p className="text-sm text-white/85 font-medium">{value ?? '—'}</p>
      </div>
    </div>
  ))}
</div>
            </motion.div>

            {/* Recent Searches */}
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={5}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Search className="w-3.5 h-3.5 text-white/30" />
                  <h2 className="text-sm font-semibold text-white/80">Recent Searches</h2>
                  
                </div>
              </div>
              <div className="divide-y divide-white/[0.04]"
              >
              </div>
            </motion.div>

          </div>

          {/* Right col */}
          <div className="lg:col-span-2 space-y-5">

            {/* Plan Card */}
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3.5}
              className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/30 to-black/40 backdrop-blur-sm overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.12),transparent_70%)]" />
              <div className="relative px-6 py-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[10px] text-indigo-400/70 uppercase tracking-widest mb-1">Current Plan</p>
                    <h3 className="text-xl font-bold">Free</h3>
                  </div>
                  {/* <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-indigo-400" />
                  </div>
                </div>
                <div className="space-y-2 mb-5">
                  {['Unlimited lead scraping', '50 saved lists', 'Priority support', 'API access'].map(f => (
                    <div key={f} className="flex items-center gap-2 text-xs text-white/60">
                      <Check className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                      {f}
                    </div>
                  ))} */}
                </div>
                <div className="flex items-center justify-between text-xs text-white/30 mb-4">
                  {/* <span>Renews Jul 10, 2026</span>
                  <span>$29 / mo</span> */}
                </div>
                {/* <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-medium hover:bg-indigo-500/30 transition-all duration-200 flex items-center justify-center gap-2">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Manage Billing
                </motion.button> */}
              </div>
            </motion.div>

            {/* Settings Links
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4.5}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.025] backdrop-blur-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-white/[0.06]">
                <h2 className="text-sm font-semibold text-white/80">Settings</h2>
              </div>
              <div className="divide-y divide-white/[0.05]">
                {sections.map(({ icon: Icon, label, desc }, i) => (
                  <motion.button key={label} custom={4.5 + i * 0.3} variants={fadeUp} initial="hidden" animate="show"
                    whileHover={{ x: 3, backgroundColor: 'rgba(255,255,255,0.03)' }}
                    className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors duration-150 group">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.06] flex items-center justify-center flex-shrink-0 group-hover:border-white/10 transition-colors">
                      <Icon className="w-3.5 h-3.5 text-white/35 group-hover:text-white/60 transition-colors" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-white/75 group-hover:text-white/90 transition-colors">{label}</p>
                      <p className="text-[10px] text-white/30 truncate mt-0.5">{desc}</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 flex-shrink-0 transition-colors" />
                  </motion.button>
                ))}
              </div>
            </motion.div> */}

          </div>
        </div>

      </main>
    </div>
  )
}