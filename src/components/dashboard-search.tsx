  'use client'

  import { useState, useEffect } from 'react'
  import { motion } from 'framer-motion'
  import { Search, ArrowRight, Plus, Sparkles } from 'lucide-react'
  import { Input } from '@/components/ui/input'
  import { Button } from '@/components/ui/button'
  import { ToggleGroup, ToggleGroupItem } from '@radix-ui/react-toggle-group'
import axios from 'axios'

  interface DashboardSearchProps {
    onSearch: (keywords: string[], selectedDays: string) => Promise<void>
    isScanning?: boolean
    leadsFound?: number
    cooldownEndTime?: number
  }

  export function DashboardSearch({
    onSearch,
    isScanning = false,
    leadsFound = 0,
    cooldownEndTime = 0,
  }: DashboardSearchProps) {

    const [queries, setQueries] = useState(['', ''])
    // const [workType, setWorkType] = useState('')
    const [selectedDays, setSelectedDays] = useState('')
    const [countdown, setCountdown] = useState('')
    const [isCooldown, setIsCooldown] = useState(false)
    const [queryErrors, setQueryErrors] = useState<string[]>([''])
    const [vaildQurey , setvaildQurey] = useState(false)


    const validateQuery = async (index: number, value: string) => {
    if (!value.trim()) return // skip empty boxes

    const res = await axios.post('/api/validate-user-qurey', {
      query: queries
    })



  const updatedErrors = [...queryErrors]
  updatedErrors[index] = res.data.valid ? 'valid' : res.data.reason
  console.log(updatedErrors)
  setQueryErrors(updatedErrors)  // ✅ directly update errors array
      setvaildQurey(res.data.
valid)

localStorage.setItem('quries' , JSON.stringify(queries))
  }

    const placeholders = [
      'e.g. looking for a React developer...',
      'e.g. hiring a frontend freelancer...',
      'e.g. need a freelance React developer',
      'eg need React freelancer' 
    ]

    useEffect(() => {
      if (!cooldownEndTime) return
      const updateCountdown = () => {
        const now = Date.now()
        const remaining = Math.max(0, cooldownEndTime - now)
        if (remaining === 0) {
          setCountdown('')
          setIsCooldown(false)
        } else {
          setIsCooldown(true)
          const hours = Math.floor(remaining / 3600000)
          const minutes = Math.floor((remaining % 3600000) / 60000)
          const seconds = Math.floor((remaining % 60000) / 1000)
          setCountdown(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
        }
      }
      updateCountdown()
      const interval = setInterval(updateCountdown, 1000)
      return () => clearInterval(interval)
    }, [cooldownEndTime])

    useEffect(() => {
  const saved = localStorage.getItem('quries')

  if (saved) {
    setQueries(JSON.parse(saved))
  }

}, [])
    const updateQuery = (index: number, value: string) => {
      const updated = [...queries]
      updated[index] = value
      setQueries(updated)
      
    }

    const addQueryBox = () => {
      if (queries.length < 4) setQueries([...queries, ''])
    }

  
    const filledQueries = queries.filter(q => q.trim() !== '') || ""
    const canSearch = filledQueries.length > 0  && selectedDays


    console.log("search quries before call " , filledQueries)

    const handleSearch = async () => {
      if (!canSearch) return
      await onSearch(filledQueries, selectedDays)
    }

    return (
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">Hunt Leads</h2>
          {/* <p className="text-gray-400">Find high-intent hiring tweets in seconds</p>
          <p className="text-xs pt-3 font-bold mb-2 mt-3 text-gray-400">
            NOTE - X-Radar is currently in beta version. For bugs or feedback, reach us at{' '}
            <a href="mailto:xradar10@gmail.com" className="text-gray-400 hover:text-white underline underline-offset-2 transition">
              xradar10@gmail.com
            </a>
            <span className='mt-3 block'>
              Liked X-Radar? Tweet about tagging us. Your tweet will be Featured in our Landing page{' '}
              <a href="https://x.com/XRadarAI" target="_blank" rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition">
                @XRadarAI
              </a>
            </span>
          </p> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col md:flex-row md:gap-3 md:items-start gap-3"
        >
          <div className="flex-1 space-y-4">

            {/* Manual query input boxes */}
            <div className="space-y-1.5 md:space-y-2 w-full">
             <div className="mb-2 sm:mb-3">
  

  <p className="text-xs sm:text-sm text-gray-400 mt-2 sm:mt-3">
    Think of this like the X search bar type what a <span className="text-white font-semibold">client would post</span> when they need someone like you.
  </p>
  <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
    Example: if you're a React dev, type{' '}
    <span className="text-white font-mono bg-white/10 px-1.5 py-0.5 rounded text-xs">need a react developer</span>
    {' '}or{' '}
    <span className="text-white font-mono bg-white/10 px-1.5 py-0.5 rounded text-xs">hiring frontend freelancer</span>
  </p>
  <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
    X-Radar runs all queries at once and <span className="text-white font-semibold">filters out the noise</span> for you.
  </p>
  <p className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-2">
   <span className="text-white font-semibold">Add up to 4 queries</span> more queries = wider net = more leads caught.
</p>
</div>

<p className="text-xs sm:text-sm text-white font-medium flex items-center gap-1.5">
  Your search queries
  <Sparkles className="w-3 h-3 text-yellow-400" />
</p>
             {queries.map((q, i) => (
  <div key={i}>
    <Input
      value={q}
      onChange={(e) => updateQuery(i, e.target.value)}
      onBlur={() => validateQuery(i, q)}
      placeholder={placeholders[i]}
      disabled={isScanning || isCooldown}
      className={`w-full bg-white/5 text-white placeholder:text-gray-600 focus:border-white/30
        ${queryErrors[i] === 'valid' ? 'border-green-500' : 
          queryErrors[i] ? 'border-red-500' : 'border-white/10'}
      `}
    />
    {queryErrors[i] === 'valid' && (
      <p className="text-green-400 text-xs sm:text-sm mt-1">

            </p>
    )

    }
    {queryErrors[i] != 'valid' && (
      <p className="text-red-400 text-xs sm:text-sm mt-1">{queryErrors[i]}</p>
    ) 
    }
  </div>
))}
              {queries.length < 4 && (
                <button
                  onClick={addQueryBox}
                  disabled={isScanning || isCooldown }
                  className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 hover:text-white transition mt-1"
                >
                  <Plus className="w-3 h-3" />
                  Add another search
                </button>
              )}
              
              
            </div>

          {/* TODO: THIS IS LOOKING FOR JOB TYPE REMOVED IT FOR NOW IF THE RESULTS ARE NOT THAT MATCHING ADD IT AGAIN  */}
            {/* Looking for
            <div className="space-y-1">
              <p className="text-xs text-white mb-3">Looking for</p>
              <ToggleGroup
                type="single"
                value={workType}
                onValueChange={(val) => setWorkType(val)}
                disabled={isScanning || isCooldown}
                className="flex gap-2 justify-start"
              >
                <ToggleGroupItem
                  value="freelance leads"
                  className="px-4 py-1.5 rounded-full border border-white/10 text-sm data-[state=on]:bg-white data-[state=on]:text-black text-gray-400 hover:text-white hover:border-white/30 transition"
                >
                  Freelance leads
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="jobs"
                  className="px-4 py-1.5 rounded-full border border-white/10 text-sm data-[state=on]:bg-white data-[state=on]:text-black text-gray-400 hover:text-white hover:border-white/30 transition"
                >
                  Jobs
                </ToggleGroupItem>
              </ToggleGroup>
            </div> */}

            {/* Time Period */}
            <div className="space-y-1.5">
              <p className="text-xs sm:text-sm text-white mb-2 sm:mb-3">Time Period</p>
              <ToggleGroup
                type="single"
                value={selectedDays}
                onValueChange={(val) => setSelectedDays(val)}
                disabled={isScanning || isCooldown}
                className="flex flex-wrap gap-1.5 sm:gap-2 justify-start"
              >
                <ToggleGroupItem
                  value="24"
                  className="px-3 sm:px-4 py-1.5 rounded-full border border-white/10 text-xs sm:text-sm data-[state=on]:bg-white data-[state=on]:text-black text-gray-400 hover:text-white hover:border-white/30 transition"
                >
                  Last 24 hours
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="7"
                  className="px-3 sm:px-4 py-1.5 rounded-full border border-white/10 text-xs sm:text-sm data-[state=on]:bg-white data-[state=on]:text-black text-gray-400 hover:text-white hover:border-white/30 transition"
                >
                  Last 7 days
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            {/* Query preview */}
            {queries.length > 0  && selectedDays && (
              <p className="text-gray-400 text-xs sm:text-sm mt-2">
                Running <span className="text-white font-bold">{queries.length} search{queries.length > 1 ? 'es' : ''}</span> for{' '}
                <span className="text-white font-bold"></span> tweets from the{' '}
                <span className="text-white font-bold">last {selectedDays === '24' ? '24 hours' : '7 days'}</span>
              </p>
            )}

          </div>

          {/* Hunt Leads button */}
          <Button
            onClick={handleSearch}
            disabled={isScanning || isCooldown || !canSearch || !vaildQurey }
            className="w-full md:w-auto px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 bg-white text-black hover:bg-gray-100 disabled:bg-gray-700 disabled:text-gray-500 font-semibold rounded-lg flex items-center justify-center md:justify-start gap-2 text-sm sm:text-base transition"
          >
            {isScanning ? (
              <>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
                  <Search className="w-5 h-5" />
                </motion.div>
                Scanning...
              </>
            ) : (
              <>
                Hunt Leads
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </Button>
        </motion.div>

        {/* Scanning state */}
        {isScanning && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            <p className="text-xs sm:text-sm text-gray-400">🔍 Scanning Twitter for hiring leads...</p>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: ['0%', '100%'] }}
                transition={{ duration: 2, ease: 'easeInOut' }}
                className="h-full bg-linear-to-r from-white via-gray-400 to-white"
              />
            </div>
          </motion.div>
        )}

        {/* Cooldown timer */}
        {isCooldown && countdown && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs sm:text-sm text-yellow-500/80 font-medium">
            ⏳ Next search available in {countdown}
          </motion.p>
        )}

        {/* Leads found */}
        {leadsFound > 0 && !isScanning && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs sm:text-sm text-green-500/80 font-medium">
            ✅ {leadsFound} leads found
          </motion.p>
        )}
      </div>
    )
  }