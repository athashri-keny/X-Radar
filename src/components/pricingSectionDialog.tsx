import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import axios from "axios";
import { motion } from "framer-motion";
import { Check, X, Zap, Clock } from "lucide-react";
import { Button } from "@base-ui/react";

function PricingSectionDialog({
  isopen,
  onClose,
}: {
  isopen: boolean;
  onClose: () => void;
}) {
  const [isIndia, setIsIndia] = useState(false);

  useEffect(() => {
    const detectCountry = async () => {
      const res = await fetch("/api/detech-country");
      const data = await res.json();
      console.log(data);
      setIsIndia(data.isIndia);
    };
    detectCountry();
  }, []);

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
      price: isIndia ? "₹0" : "$0",
      originalPrice: null,
      period: "forever",
      desc: "Perfect for getting started",
      popular: false,
      discountTag: null,
      features: [
        { text: "12 hour cooldown", included: true },
        { text: "Only last 6 days tweets (no 24 hrs)", included: true },
        { text: "Only 2 free searches", included: true },
        { text: "5 leads max", included: true },
        { text: "AI reply suggestions", included: true },
        {
          text: "Automated 2 search queries as per your niche",
          included: true,
        },
      ],
    },
    {
      name: "Pro",
      price: isIndia ? "₹299" : "$4.99",
      originalPrice: isIndia ? "₹599" : "$9.99",
      period: "/ month",
      desc: "For serious freelancers and job seekers",
      popular: true,
      discountTag: isIndia ? "57% OFF" : "50% OFF",
      features: [
        { text: "6 hour cooldown", included: true },
        { text: "Get latest tweets (24hr)", included: true },
        { text: "Unlimited Searches", included: true },
        { text: "Unlimited leads (as per result)", included: true },
        { text: "AI reply suggestions", included: true },
        {
          text: "Automated 5 search queries as per your niche",
          included: true,
        },
        { text: "Get personalized leads via Email", included: true },
        { text: "Every new feature free until stable", included: true },
      ],
    },
  ];

  return (
    <div>
      <Dialog
        open={isopen}
        onOpenChange={(open) => {
          if (!open) onClose();
        }}
      >
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

          {/* Early Bird Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mt-3 sm:mt-4"
          >
            <div className="flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 rounded-xl border border-violet-500/40 bg-violet-500/10 backdrop-blur-sm">
              <Zap size={14} className="text-violet-400 flex-shrink-0" />
              <p className="text-xs sm:text-sm font-medium text-violet-300 text-center">
                <span className="font-bold">Early Bird Deal</span>
                locked in for life as long as you stay subscribed. Price goes up
                once we hit capacity.
              </p>
              <Clock size={14} className="text-violet-400 flex-shrink-0" />
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 mt-4 sm:mt-6">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.02, y: -5 }}
                className={`glass-card p-4 sm:p-6 relative border rounded-lg transition-all duration-300 ${
                  plan.popular
                    ? "border-white/30 bg-white/10 ring-2 ring-violet-500/50"
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
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/50 text-violet-300 text-xs font-bold whitespace-nowrap"
                  >
                    Most Popular
                  </motion.span>
                )}

                {/* Discount badge */}
                {plan.discountTag && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-violet-500/20 border border-violet-500/40 text-violet-300 text-xs font-bold tracking-wide">
                    {plan.discountTag}
                  </span>
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
                    {/* Strikethrough original price */}
                    {plan.originalPrice && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white/80 text-sm sm:text-base font-bold line-through">
                          {plan.originalPrice}
                        </span>
                        <span className="text-xs text-violet-400 font-semibold">
                          Early Bird Price
                        </span>
                      </div>
                    )}
                    <div className="flex items-end gap-1">
                      <span className="text-2xl sm:text-3xl font-black text-white">
                        {plan.price}
                      </span>
                      <span className="text-white/60 text-xs sm:text-sm ml-1 mb-0.5">
                        {plan.period}
                      </span>
                    </div>
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
                    <>
                      <Button
                        onClick={() => handleRedicrectOfPayment()}
                        className="w-full py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40"
                      >
                        Claim Early Bird Deal →
                      </Button>
                      <p className="text-center text-xs text-white/40 mt-2">
                        🔒 Locked in forever · Cancel anytime
                      </p>
                    </>
                  ) : (
                    <Button className="w-full py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all duration-300 border border-white/20 bg-white/5 hover:bg-white/10 text-white hover:border-white/40">
                      Start Free
                    </Button>
                  )}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Bottom urgency note */}
          <p className="text-center text-xs text-white/30 mt-3">
            Early bird pricing is limited. Regular price resumes once we hit
            capacity.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PricingSectionDialog;
