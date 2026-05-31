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
import PricingSectionDialog from '@/components/pricingSectionDialog'
import { LeadPipelineLoader } from '@/components/SpinnerLoader'
import PaywallOverlay from '@/components/pricingsectionpaywall'
import { useSearchParams } from 'next/navigation'
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

const {data: session , update} = useSession()
const usesearchparams = useSearchParams()

  const [isScanning, setIsScanning] = useState(false)
  const [leadsFoundNumber, setLeadsFoundNumber] = useState(0)
  const [cooldownMessage , setcooldownmessage] = useState('')
  const [cooldownEndTime, setCooldownEndTime] = useState(0)
  const [leads , setleads] = useState<leads[]>([])
  const [leadsHistory , setleadsHistory] = useState<leadsHistory[]>([])
  const [message , setmesssage] = useState('')
  const [apifyStatus , setApifyStatus] = useState('')
    const [open, setOpen] = useState(false)



  const TWEETYFOURHOURS_MS = 24 * 60 * 60 * 1000 // 24 hours 
  const SIXHOURCOOLDOWN = 6 * 60 * 60 * 1000 // 6 hours

  const endTime = Date.now() + (session?.user?.plan === 'free'  ? TWEETYFOURHOURS_MS : SIXHOURCOOLDOWN)  // calutate it 

const handleSearch = async (keyword: string, selectedDays: string) => {
  setIsScanning(true)
  setLeadsFoundNumber(0)
  setcooldownmessage('')

  // console.log("From handle search = " , keyword , selectedDays)

  try {
    const res = await axios.post('/api/run-agent', { keywords: keyword, TimePeriod: selectedDays })
    
    console.log('successfully agent fired', res.data)

    const SearchRunId = res.data.searchRunId

    const poll = async () => {
      try {
        const pollRes = await axios.get(`/api/get-status?searchRunId=${SearchRunId}`)
        const data = pollRes.data

        console.log("Data from recived from frontend " , data)

        if (data.status === 'pending') {
          setApifyStatus('running')
        }

        if (data.status === 'done') {
          setIsScanning(false) // ← only stops here when actually done
          

         if (data.leads.length > 0) {
           setLeadsFoundNumber(data.leads.length)
           setleads(data.leads || [])
           setCooldownEndTime(endTime)
           localStorage.setItem('CooldownEndTime', JSON.stringify(endTime))
    
         } else {
          console.log("No current lastest leads in your niche")
          setmesssage("No Lastest leads found in your niche right now. Check back in a few hours for fresh results.")
          setApifyStatus('done')
          
         }
         return ;
        }

        if (data.status === 'failed') {
          setIsScanning(false)
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
     console.log(error)
     // for 
    if (error.response?.status === 429) {
      setcooldownmessage(error.response.data.messsage)
    } 

    // for free users hiting the paywall
    if (error.response.status === 403) {
      setcooldownmessage(error.response.data.message)
           setOpen(true)
    }
    console.log("Error:", error.response)
    setIsScanning(false) // ← only set false here if POST itself failed
  }
}

  useEffect(() => {
    const saved = localStorage.getItem('CooldownEndTime')
if (saved) {
  setCooldownEndTime(Number(saved))
  // console.log('Cooldown setted succcessfully')

  // if the search has uprade in it then upddate the token from free to paid
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



const updateSession = async() => {
try {
  const rres = await update({plan: 'pro'})
  console.log( "seession updated  =" , rres)
} catch (error) {
  console.log("Error" , error)
}
}


  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background effects */}
      <AnimatedBackground />
      <GradientOrbs />

      {/* Content */}
      <div className="relative z-10">
        <DashboardNavbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 mb-55">
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

   <PaywallOverlay isOpen={open} onClose={() => setOpen(false)}/>


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
   <LeadPipelineLoader apifyStatus={apifyStatus} />
    <p className="text-gray-400 text-sm">Hunting leads for you...</p>
  </div>
) : leadsFoundNumber > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {leads.map((tweet: any) => (
  <LeadCard
    key={tweet.tweetId || tweet._id}              
    score={tweet.score || tweet.Score }               
    suggestReplyAi={tweet.suggestedReply || tweet.suggestedReply}  
    tweet={tweet.tweetText || tweet.TweetText}           
    tweetUrl={tweet.tweetUrl || tweet.Tweeturl}         
  />
))}

                </div>
              ) : message ? (
                <div className="flex justify-center py-16">
  <div className="relative flex items-start gap-3 bg-red-950/40 border border-red-500/50 text-red-300 rounded-xl px-5 py-4 max-w-md w-full shadow-lg shadow-red-900/20 animate-in fade-in slide-in-from-bottom-3 duration-500">
    
    {/* Pulsing dot */}
    <span className="mt-1 flex-shrink-0 relative flex h-3 w-3">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
    </span>

    <div>
      <p className="font-semibold text-red-300 text-sm">No Leads Found !!</p>
      <p className="text-red-400/80 text-sm mt-0.5">
       {message}
      </p>
    </div>

  </div>
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
      <button onClick={updateSession}>
        CLICK
      </button>
      <Footer/>
    </div>
  )
}
