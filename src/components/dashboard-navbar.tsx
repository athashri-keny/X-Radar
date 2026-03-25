'use client'

import { Radar } from 'lucide-react'

export function DashboardNavbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <Radar className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight hidden sm:block">X-Radar</span>
        </div>

        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-white/20 to-white/10 border border-white/20 flex items-center justify-center">
          <span className="text-sm font-bold text-white">U</span>
        </div>
      </div>
    </nav>
  )
}
