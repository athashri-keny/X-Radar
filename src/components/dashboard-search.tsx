'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface DashboardSearchProps {
  onSearch: (query: string) => Promise<void> // pass the keyword up
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

  const [searchQuery, setSearchQuery] = useState('') as any

  const [localScanning, setLocalScanning] = useState(false)
  const [countdown, setCountdown] = useState('')
  const [isCooldown, setIsCooldown] = useState(false)

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
        setCountdown(
          `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        )
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [cooldownEndTime])

  const handleSearch = async() => {
  if (!searchQuery.trim()) return
    setLocalScanning(true)
    try {
     await onSearch(searchQuery)
    } finally {
      setLocalScanning(false)
    }
  
     
  }

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-white mb-2">Hunt Leads</h2>
        <p className="text-gray-400">Find high-intent hiring tweets in seconds</p>
<p className="text-xs pt-3 font-bold mb-2 mt-3 text-gray-400">
  NOTE - X-Radar is currently in beta version. For bugs or feedback, reach us at{' '}
  <a href="mailto:xradar10@gmail.com" className="text-gray-400 hover:text-white underline underline-offset-2 transition">
    xradar10@gmail.com
  </a>
  <span className='mt-3 block'>
    Liked X-Radar? Tweet about tagging us. Your tweet will be Featured in our Landing page 
    <a 
      href="https://x.com/XRadarAI" 
      target="_blank" 
      rel="noopener noreferrer"
      className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition"
    >
        @XRadarAI 
    </a>
  </span>
</p>

      </motion.div>



      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex gap-3"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
          <Input
            type="text"
            placeholder="Search hiring keywords e.g. hiring developer"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isScanning || isCooldown}
            className="pl-12 py-6 text-base bg-white/5 border-white/10 text-white placeholder:text-gray-600 rounded-lg disabled:opacity-50"
          />
        </div>
        <Button
          onClick={handleSearch}
          disabled={localScanning || isCooldown || !searchQuery.trim()}
          className="px-8 py-6 bg-white text-black hover:bg-gray-100 disabled:bg-gray-700 disabled:text-gray-500 font-semibold rounded-lg flex items-center gap-2 text-base transition"
        >
          {localScanning ? (
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

      {/* Scanning state message */}
      {localScanning && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <p className="text-sm text-gray-400">
            🔍 Scanning Twitter for hiring leads...
          </p>
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
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-yellow-500/80 font-medium"
        >
          ⏳ Next search available in {countdown}
        </motion.p>
      )}

      {/* Leads found message */}
      {leadsFound > 0 && !localScanning && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-green-500/80 font-medium"
        >
          ✅ {leadsFound} leads found
        </motion.p>
      )}
    </div>
  )
}
