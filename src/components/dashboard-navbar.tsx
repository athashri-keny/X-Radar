"use client";

import { Radar, LogOut, User, UserRound, Zap, Check, X } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

export function DashboardNavbar() {
  const { data: session, status } = useSession();

  const [open, setOpen] = useState(false);

  const handleRedicrectOfPayment = async () => {
    try {
      const res = await axios.post("/api/checkout");

      window.location.href = res.data.checkout_url;
    } catch (error) {
      console.log("Error while redirecting to payment page", error);
    }
  };

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      desc: "Perfect for getting started",
      popular: false,
      features: [
        { text: "12 hour cooldown", included: true },
        { text: "Only last 6 days tweets (no 24 hrs)", included: true },
        { text: "Only 2 free searches", included: true },
        { text: "5 leads max", included: true },
        { text: "AI reply suggestions", included: true },
        { text: "Automated 2 Search quries as per your niche", included: true },
      ],
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "/ month",
      desc: "For serious freelancers and job seekers",
      popular: true,
      features: [
        { text: "6 hour cooldown", included: true },
        { text: "Get lastest tweets (24hr)", included: true },
        { text: "Unlimited Searches", included: true },
        { text: "Unlimited leads (as per result)", included: true },
        { text: " AI replies suggestions ", included: true },
        { text: "Automated 5 Search quries as per your niche", included: true },
        { text: "Get personalized leads via Email", included: true },
      ],
    },
  ];

  if (status === "loading")
    return (
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 animate-pulse border border-white/10" />
    );

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/40 backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          {/* Logo */}
          <motion.div
            initial={{ x: -16, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <motion.div
              whileHover={{ rotate: 20, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="w-8 h-8 bg-white rounded-lg flex items-center justify-center"
            >
              <Radar className="w-5 h-5 text-black" />
            </motion.div>
            <span className="text-xl font-bold text-white tracking-tight hidden sm:block">
              X-Radar
            </span>
          </motion.div>

          {/* Right Section - Upgrade & User */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Upgrade Button */}

            {session?.user.plan == "free" ? (
              <motion.div
                initial={{ x: 16, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              >
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(255,255,255,0.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                  <Button
                    onClick={() => setOpen(true)}
                    className="border border-white/30 hover:border-white/60 bg-white/5 hover:bg-white/10 text-white font-semibold gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm"
                  >
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Upgrade</span>
                    <span className="xs:hidden">Upgrade</span>
                  </Button>
                </motion.div>
              </motion.div>
            ) : null}

            {/* User Avatar Dropdown */}
            <motion.div
              initial={{ x: 16, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    whileHover={{
                      scale: 1.1,
                      boxShadow: "0 0 16px rgba(255,255,255,0.15)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    className="rounded-full cursor-pointer"
                  >
                    <Avatar className="w-9 h-9 sm:w-10 sm:h-10 border border-white/20 hover:border-white/60 transition-colors duration-300">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-gradient-to-br from-white/20 to-white/10 text-white">
                        <UserRound className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-44 sm:w-48 bg-black/80 backdrop-blur-xl border border-white/10 text-white
                    data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-top-2
                    data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
                    duration-200"
                >
                  <DropdownMenuLabel className="text-white/50 text-xs uppercase tracking-widest font-medium">
                    My Account
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator className="bg-white/10" />

                  <DropdownMenuItem
                    className="gap-2 cursor-pointer 
                    text-white/80
                    hover:bg-white/10 focus:bg-white/10 focus:text-white
                    transition-all duration-150
                    hover:translate-x-1
                    group"
                  >
                    <Link href={"/user-info"}>View Account</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="gap-2 cursor-pointer 
                    text-red-400
                    hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-400
                    transition-all duration-150
                    hover:translate-x-1
                    group"
                  >
                    <LogOut className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5" />
                    <button onClick={() => signOut()}>Logout</button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Upgrade Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl w-[95vw] sm:w-full border border-white/10 bg-black/80 backdrop-blur-xl p-4 sm:p-6 rounded-xl sm:rounded-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="space-y-1 sm:space-y-2">
            <DialogTitle className="text-lg sm:text-2xl font-bold text-white">
              Upgrade Your Plan
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-base text-white/60">
              Choose the perfect plan for your needs. Start free, upgrade when
              ready.
            </DialogDescription>
          </DialogHeader>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 mt-4 sm:mt-8">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`glass-card p-4 sm:p-6 relative border rounded-lg transition-all duration-300 ${
                  plan.popular
                    ? "border-white/30 bg-white/10 ring-2 ring-yellow-500/50"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                {plan.popular && (
                  <motion.span
                    initial={{ scale: 0, y: -10 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{
                      delay: i * 0.15 + 0.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 text-xs font-bold whitespace-nowrap"
                  >
                    Most Popular
                  </motion.span>
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.15 + 0.1, duration: 0.4 }}
                >
                  <h3 className="text-base sm:text-xl font-bold text-white">
                    {plan.name}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm mt-0.5 sm:mt-1">
                    {plan.desc}
                  </p>
                  <div className="mt-3 mb-4 sm:mt-4 sm:mb-6">
                    <span className="text-2xl sm:text-3xl font-black text-white">
                      {plan.price}
                    </span>
                    <span className="text-white/60 text-xs sm:text-sm ml-1">
                      {plan.period}
                    </span>
                  </div>
                </motion.div>

                <motion.ul
                  className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.15 + 0.2, duration: 0.4 }}
                >
                  {plan.features.map((f, idx) => (
                    <motion.li
                      key={f.text}
                      className="flex items-start gap-2 text-xs sm:text-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 + 0.2 + idx * 0.05 }}
                    >
                      {f.included ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                          className="mt-0.5 flex-shrink-0"
                        >
                          <Check size={13} className="text-green-400" />
                        </motion.div>
                      ) : (
                        <X
                          size={13}
                          className="text-white/20 flex-shrink-0 mt-0.5"
                        />
                      )}
                      <span
                        className={
                          f.included ? "text-white/80" : "text-white/40"
                        }
                      >
                        {f.text}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.15 + 0.3, duration: 0.3 }}
                >
                  {plan.popular ? (
                    <Button
                      onClick={() => handleRedicrectOfPayment()}
                      className="w-full py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 bg-yellow-500 hover:bg-yellow-600 text-black shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40"
                    >
                      Get Started
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setOpen(false)}
                      className="w-full py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 border border-white/20 bg-white/5 hover:bg-white/10 text-white hover:border-white/40"
                    >
                      Start Free
                    </Button>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
