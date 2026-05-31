"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

const features = [
  "6-hour cooldown between searches",
  "Latest tweets pulled within 24 hrs",
  "Unlimited leads per search result",
  "AI-generated reply suggestions",
  "5 smart search queries auto-built for your niche",
  "Personalized leads delivered to your inbox",
  "Every new feature free until stable",
];

export default function ProPricingSection({ nextBillingDate }: { nextBillingDate: string | null }) {

  const [isOpen, setIsOpen] = useState(false);
  const [loading , setloading ] = useState(false)
  const [error , seterror] = useState<any>("")
  

  const handleCancelSubscription = async() => {
    setloading(true)
    seterror("")
    try {
     const res =  await axios.post('/api/cancel-subscription')
     console.log(res.data)
      console.log("Successfully cancelled the subscription")
      toast.success("Successfully cancelled the subscription")
      setIsOpen(false)
      setloading(false)
    } catch (error:any) {
      console.log("Error while cancelling the subscrption " , error)
      seterror(error) 
      setloading(false)
      setTimeout(() => {
        seterror("")
      }, 5000)
    } finally {
      setloading(false)
    }
  };

  return (
    <div className="rounded-2xl border border-[#1f2330] bg-[#111318] p-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="mb-1 text-[10px] uppercase tracking-widest text-white">
            Current Plan
          </p>
          <p className="text-2xl font-black text-white">
            $9.99
            <span className="ml-1 text-xs font-normal text-white">/mo</span>
          </p>
        </div>

        <div className="flex flex-col items-end gap-1.5">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 20, delay: 0.1 }}
            className="flex items-center gap-1.5 rounded-full border border-[#2e3254] bg-[#1a1d2e] px-2.5 py-1 text-[10px] font-bold tracking-widest text-[#818cf8]"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#818cf8]" />
            PRO PLAN
          </motion.div>
        </div>
      </div>

      <div className="my-4 border-t border-[#1a1d2a]" />

      {/* Benefits */}
      <p className="mb-3 text-[10px] uppercase tracking-widest text-white">
        Your Benefits
      </p>

      <ul className="space-y-2.5">
        {features.map((f, i) => (
          <motion.li
            key={f}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.07, duration: 0.3 }}
            className="flex items-start gap-2.5"
          >
            <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border border-[#2e3254] bg-[#1a1d2e]">
              <Check size={8} strokeWidth={3} className="text-[#818cf8]" />
            </span>
            <span className="text-xs leading-5 text-[#94a3b8]">{f}</span>
          </motion.li>
        ))}
      </ul>

      {/* Next Billing Date */}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="mt-7 flex items-center justify-center gap-2 text-[10px] text-[#64748b]"
      >
        <span className="text-white font-medium text-xs">Next Billing Date:</span>
        <span className="px-2.5 py-1 rounded-md bg-[#1a1d2e] border border-[#2e3254] text-xs text-white">
          {new Date(nextBillingDate || "").toDateString() }
        </span>
      </motion.div>

      <div className="mt-6 border-t border-[#1a1d2a] pt-4 flex justify-center">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-2 left-0 right-0 mx-auto w-full max-w-xs bg-red-900/20 border border-red-600 text-red-400 px-4 py-2 rounded-lg text-xs text-center"
          >
            {error?.message || "An error occurred while cancelling subscription"}
          </motion.div>
        )}
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <Button
                variant="destructive"
                disabled={loading}
                className="text-xs font-semibold px-6 py-2 bg-red-600 hover:bg-red-700 text-white border-0 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="inline-flex items-center gap-2"
                  >
                    <Loader2 size={14} />
                    Cancelling...
                  </motion.span>
                ) : (
                  "Cancel Subscription"
                )}
              </Button>
            </motion.div>
          </AlertDialogTrigger>

          <AnimatePresence>
            {isOpen && (
              <AlertDialogContent>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -12 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="border border-[#2e3254] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-background p-6 shadow-lg rounded-lg"
                >
                  <AlertDialogHeader>
                    <AlertDialogTitle>Cancel Subscription?</AlertDialogTitle>
                    <AlertDialogDescription className="text-white">
                      Are you sure you want to cancel your subscription? You'll lose access to all Pro features.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <div className="flex gap-3 justify-end">
                    <AlertDialogCancel>Keep Subscription</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleCancelSubscription}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Yes, Cancel
                    </AlertDialogAction>
                  </div>
                </motion.div>
              </AlertDialogContent>
            )}
          </AnimatePresence>
        </AlertDialog>
      </div>
    </div>
  );
}