'use client'

import { Radar, LogOut, User, UserRound } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { signOut } from 'next-auth/react'
import { Button } from './ui/button'
import Link from 'next/link'


export function DashboardNavbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/40 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <motion.div
          initial={{ x: -16, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
          className="flex items-center gap-3"
        >
          <motion.div
            whileHover={{ rotate: 20, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="w-8 h-8 bg-white rounded-lg flex items-center justify-center"
          >
            <Radar className="w-5 h-5 text-black" />
          </motion.div>
          <span className="text-xl font-bold text-white tracking-tight hidden sm:block">
            X-Radar
          </span>
        </motion.div>

        {/* User Avatar Dropdown */}
        <motion.div
          initial={{ x: 16, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.1, boxShadow: '0 0 16px rgba(255,255,255,0.15)' }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="rounded-full cursor-pointer"
              >
                <Avatar className="w-10 h-10 border border-white/20 hover:border-white/60 transition-colors duration-300">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-gradient-to-br from-white/20 to-white/10 text-white">
                    <UserRound className="w-5 h-5 text-white" />
                  </AvatarFallback>
                </Avatar>
              </motion.div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              className="w-48 bg-black/80 backdrop-blur-xl border border-white/10 text-white
                data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2
                data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
                duration-200"
            >
              <DropdownMenuLabel className="text-white/50 text-xs uppercase tracking-widest font-medium">
                My Account
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="bg-white/10" />

              <DropdownMenuItem className="gap-2 cursor-pointer 
                text-white/80
                hover:bg-white/10 focus:bg-white/10 focus:text-white
                transition-all duration-150
                hover:translate-x-1
                group">
                  <Link href={'/user-info'}>
                       
                   {/* <User className="w-4 h-4 transition-transform duration-150 group-hover:scale-110" />      */}
                  View Account
                  </Link>
                  

              </DropdownMenuItem>

              <DropdownMenuItem className="gap-2 cursor-pointer 
                text-red-400
                hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-400
                transition-all duration-150
                hover:translate-x-1
                group">
                <LogOut className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                <button onClick={() => signOut()}>
                  Logout
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </motion.div>

      </div>
    </motion.nav>
  )
}