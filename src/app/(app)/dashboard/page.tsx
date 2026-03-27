'use client'

import { useEffect, useState } from 'react'
import { DashboardNavbar } from '@/components/dashboard-navbar'
import { DashboardSearch } from '@/components/dashboard-search'
import { LeadCard } from '@/components/lead-card'
import { SearchHistorySidebar } from '@/components/search-history-sidebar'
import { AnimatedBackground } from '@/components/animated-background'
import { GradientOrbs } from '@/components/gradient-orbs'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { log } from 'console'


// Mock lead data with score reasons
const mockLeads = [
  {
    id: 1,
    username: 'Sarah Chen',
    handle: 'sarahchen_co',
    tweet: "Hiring a senior React developer to lead our frontend team. Must have 5+ years experience with TypeScript and have shipped SaaS products.",
    score: 92,
    leads: 3,
    scoreReason: 'High intent — decision maker, specific skills, immediate need',
  },
  {
    id: 2,
    username: 'Alex Martinez',
    handle: 'alexmartinez',
    tweet: 'Looking for a content writer to create SEO-optimized blog posts. Ideally someone familiar with SaaS marketing and technical writing.',
    score: 78,
    leads: 5,
    scoreReason: 'Good intent — clear role description, niche expertise required',
  },
  {
    id: 3,
    username: 'Jordan Liu',
    handle: 'jordan_dev',
    tweet: 'Need a freelance designer for a startup project. Looking for someone who can do UI/UX and some branding work.',
    score: 65,
    leads: 2,
    scoreReason: 'Medium intent — vague scope, multiple skills, startup budget uncertain',
  },
  {
    id: 4,
    username: 'Emma Robinson',
    handle: 'emmadesigns',
    tweet: 'Seeking a full-stack developer. Project involves Next.js, PostgreSQL, and AWS. Contract work, 6-month project.',
    score: 88,
    leads: 4,
    scoreReason: 'High intent — specific tech stack, defined timeline, contract terms clear',
  },
  {
    id: 5,
    username: 'Tech Startup Hub',
    handle: 'techstartuphub',
    tweet: 'We need a DevOps engineer to set up our infrastructure. Experience with Kubernetes and Docker required.',
    score: 72,
    leads: 6,
    scoreReason: 'Good intent — specialized role, clear requirements, infrastructure focus',
  },
  {
    id: 6,
    username: 'Michael Zhang',
    handle: 'michaelzhang',
    tweet: 'Hiring a video editor for YouTube content. Must have experience with B2B tech content and fast turnaround times.',
    score: 55,
    leads: 1,
    scoreReason: 'Lower intent — niche role, budget not mentioned, engagement unclear',
  },
]

interface leads {
  _id: string
  TweetText: string,
  Tweeturl: string,
  Score: number,
  suggestReplyAi: string,
}


interface leadsHistory {
  _id: string,
  keywords: string,
  updatedAt: Date
}

export default function Dashboard() {


  const [isScanning, setIsScanning] = useState(false)
  const [leadsFoundNumber, setLeadsFoundNumber] = useState(0)
  const [cooldownEndTime, setCooldownEndTime] = useState(0)
  const [leads , setleads] = useState<leads[]>([])
  const [error , seterror] = useState("")
  const [leadsHistory , setleadsHistory] = useState<leadsHistory[]>([])


  const SIX_HOURS_MS = 24 * 60 * 60 * 1000
  const endTime = Date.now() + SIX_HOURS_MS


  // const runAgent = async() => {
  //   try {
  //     await axios.post('/api/run-agent')
  //   } catch (error: any) {
  //     console.log("Error while erroring the agent" , error)
  //      seterror(error)
  //     return error
      
  //   }
  // }



  const handleSearch = async(keyword: string) => {
        setIsScanning(true)
     setLeadsFoundNumber(0)
   try {

   const res =  await axios.post('/api/run-agent' , {
    keywords: keyword
   })

   console.log('successfully agent raned' , res.data)
     const fetchedLeads = res.data.leads
    setleads(fetchedLeads)
    setLeadsFoundNumber(fetchedLeads.length)
   setCooldownEndTime(Date.now() + SIX_HOURS_MS)
  localStorage.setItem('CooldownEndTime' , String(endTime))
   } catch (error: any) {
    console.log("Error while runnung the agent " , error)
    return error
   } finally {
    setIsScanning(false)
   }
  }



  useEffect(() => {
const saved = localStorage.getItem('CooldownEndTime')

if (saved) {
  setCooldownEndTime(Number(saved))
}


  const fetchLeadsFrombackend = async() => {
   try {
    const res = await axios.get('/api/get-recent-leads')
    // setleads(res.data)
    setleads(res.data.foundLeads)
    setLeadsFoundNumber(res.data.foundLeads.length) 
        setleadsHistory(res.data.searchruns ?? [])
    console.log(res.data)
   } catch (error) {
    console.log("Error while fetching the tweets" , error)
    return error
   }
  }
  fetchLeadsFrombackend()
  } , [])

// const handleSearch = (query: string) => {
//   setIsScanning(true)
//   setLeadsFoundNumber(0)
  
//   setTimeout(() => {
//     setIsScanning(false)
//     setleads(mockLeads as any)  // ← add this line
//     setLeadsFoundNumber(mockLeads.length)
//     setCooldownEndTime(Date.now() + SIX_HOURS_MS)
//     // saving it to local storage
//     localStorage.setItem('CooldownEndTime' , String(endTime))
//   }, 2000)
// }

// console.log(leads)


  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background effects */}
      <AnimatedBackground />
      <GradientOrbs />

      {/* Content */}
      <div className="relative z-10">
        <DashboardNavbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
          {/* Search section */}
          <DashboardSearch
            onSearch={handleSearch}
            isScanning={isScanning}
            leadsFound={leadsFoundNumber}
            cooldownEndTime={cooldownEndTime}
          />

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-12">
            {/* Lead cards grid */}
            <div className="lg:col-span-3">
              {leadsFoundNumber > 0 && (
                <div className="space-y-4 mb-6">
                  <p className="text-sm text-gray-500 font-medium">
                    {leadsFoundNumber} leads found
                  </p>
                </div>
              )}

              {isScanning ? (
  <div className="flex flex-col items-center justify-center py-16 gap-4">
    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    <p className="text-gray-400 text-sm">Hunting leads for you...</p>
  </div>
) : leadsFoundNumber > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {leads.map((tweet: any) => (
  <LeadCard
    key={tweet._id ?? tweet.id}
    score={tweet.Score ?? tweet.score}
    suggestReplyAi={tweet.suggestReplyAi ?? tweet.scoreReason}
    tweet={tweet.TweetText ?? tweet.tweet}
    tweetUrl={tweet.Tweeturl ?? tweet.handle}
  />
))}

                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg">
                    No leads yet. Search for hiring keywords to get started.
                  </p>
                </div>
              )}
            </div>


            {/* Sidebar */}
            <div className="lg:col-span-1">
              <SearchHistorySidebar cooldownEndTime={cooldownEndTime}
              searches={leadsHistory.map((item) => ({
                 id: item._id,
                 keyword: item.keywords,
                 date: new Date(item.updatedAt).toLocaleTimeString(),
                 leadsCount: leadsFoundNumber
              }))}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
