'use client'

import { useEffect, useState } from 'react'
import { DashboardNavbar } from '@/components/dashboard-navbar'
import { DashboardSearch } from '@/components/dashboard-search'
import { LeadCard } from '@/components/lead-card'
import { SearchHistorySidebar } from '@/components/search-history-sidebar'
import AnimatedBackground from '@/components/AnimatedBackground'
import { GradientOrbs } from '@/components/gradient-orbs'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import Footer from "@/components/footer";

interface leads {
  _id: string
  TweetText: string,
  Tweeturl: string,
  Score: number,
  suggestReply: string,
}


interface leadsHistory {
  _id: string,
  keywords: string,
  updatedAt: Date
}

export default function Dashboard() {

// const {data: session} = useSession()
// // console.log(session?.user.email)
// // console.log(session?.user.name)
// // console.log(session?.user._id)




  const [isScanning, setIsScanning] = useState(false)
  const [leadsFoundNumber, setLeadsFoundNumber] = useState(0)
  const [cooldownMessage , setcooldownmessage] = useState('')
  const [cooldownEndTime, setCooldownEndTime] = useState(0)
  const [leads , setleads] = useState<leads[]>([])
  const [leadsHistory , setleadsHistory] = useState<leadsHistory[]>([])


  const SIX_HOURS_MS = 24 * 60 * 60 * 1000 // 24 hours 
  const endTime = Date.now() + SIX_HOURS_MS // calutate it 


  // const runAgent = async() => {
  //   try {
  //     await axios.post('/api/run-agent')
  //   } catch (error: any) {
  //     console.log("Error while erroring the agent" , error)
  //      seterror(error)
  //     return error
      
  //   }
  // }'

const handleSearch = async (keyword: String[], selectedDays: string) => {
  setIsScanning(true)
  setLeadsFoundNumber(0)
  setcooldownmessage('')

  console.log("From handle search = " , keyword , selectedDays)

  try {
    const res = await axios.post('/api/run-agent', { keywords: keyword, TimePeriod: selectedDays })
    
    console.log('successfully agent fired', res.data)

    const SearchRunId = res.data.searchRunId

    const poll = async () => {
      try {
        const pollRes = await axios.get(`/api/get-status?searchRunId=${SearchRunId}`)
        const data = pollRes.data

        if (data.status === 'done') {
          setleads(data.leads)
          setIsScanning(false)  // ← only stops here when actually done
          setLeadsFoundNumber(data.leads.length)
          setCooldownEndTime(Date.now() + SIX_HOURS_MS)
          return
        }

        if (data.status === 'failed') {
          setIsScanning(false)
          console.log("Search failed")
          return
        }

        // still pending — poll again in 3s
        setTimeout(poll, 3000)

      } catch (error) {
        console.log("Poll error", error)
        setIsScanning(false)
      }
    }

    poll() // fire and forget — finally runs immediately after this line

  } catch (error: any) {
    // this only catches errors from POST /api/run-agent (cooldown, auth etc)
    if (error.response?.status === 429) {
      setcooldownmessage(error.response.data.message)
    }
    console.error("Error:", error.response?.data?.message || error.message)
    setIsScanning(false) // ← only set false here if POST itself failed
  }
  // ← no finally block at all
}


  useEffect(() => {
const saved = localStorage.getItem('CooldownEndTime')


if (saved) {
  setCooldownEndTime(Number(saved))
}

  const fetchLeadsFrombackend = async() => {
   try {
    const res = await axios.get('/api/get-recent-leads')
    setleads(res.data.foundLeads)
    setLeadsFoundNumber(res.data.foundLeads.length) 
    setleadsHistory(res.data.searchruns ?? [])
    console.log(res.data)
   } catch (error: any) {
    console.error("Error while fetching recent leads:", error.message)
   }
  }
  fetchLeadsFrombackend()
  } , [])


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

          {cooldownMessage && (
  <p className="text-red-400 text-sm text-center mt-3">
    ⏳ {cooldownMessage}
  </p>
)}

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
    suggestReplyAi={tweet.suggestedReply}
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
      <Footer/>
    </div>
  )
}
