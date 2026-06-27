"use client";

import { motion } from "framer-motion";
import { Check, X, Zap, Clock } from "lucide-react";
import { useEffect, useState } from "react";

const PricingSection = () => {
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

  const plans = [
  {
    name: "Free",
    price: isIndia ? "₹0" : "$0",
    originalPrice: null,
    period: "forever",
    desc: "Taste the value, then decide",
    popular: false,
    discountTag: null,
    features: [
      { text: "3 manual searches — lifetime", included: true },
      { text: "2 autoscans — lifetime (runs every 12hrs)", included: true },
      { text: "24hr fresh leads (only 3 searches)", included: true },
      { text: "Top 5 leads shown, rest blurred", included: true },
      { text: "AI reply suggestions", included: true },
      { text: "Email teaser (5 leads + locked count)", included: true },
      { text: "Unlimited manual searches", included: false },
      { text: "Full leads in email", included: false },
    ],
  },
  {
    name: "Pro",
    price: isIndia ? "₹699" : "$4.99",
    originalPrice: isIndia ? "₹1399" : "$9.99",
    period: "/ month",
    desc: "Leads find you — even while you sleep",
    popular: true,
    discountTag: isIndia ? "50% OFF" : "50% OFF",
    features: [
      { text: "Unlimited manual searches", included: true },
      { text: "Autoscan every 12hrs — forever", included: true },
      { text: "24hr fresh leads", included: true },
      { text: "All leads visible, no blur", included: true },
      { text: "AI reply suggestions", included: true },
      { text: "Full leads + reply suggestions in email", included: true },
      { text: "One-tap back to app from email", included: true },
      { text: "Every new feature free until stable", included: true },
    ],
  },
]

  return (
    <section id="pricing" className="py-24 relative">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Simple <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Start free. Upgrade when you're ready to go all-in.
          </p>
        </motion.div>

        {/* Early Bird Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto mb-8"
        >
          <div className="flex items-center justify-center gap-3 px-5 py-3 rounded-xl border border-violet-500/40 bg-violet-500/10 backdrop-blur-sm">
            <Zap size={16} className="text-violet-400 flex-shrink-0" />
            <p className="text-sm font-medium text-violet-300">
              <span className="font-bold">Early Bird Deal</span>
              {" — "}
              locked in for life as long as you stay subscribed. Price goes up
              once we hit capacity.
            </p>
            <Clock size={16} className="text-violet-400 flex-shrink-0" />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`glass-card p-8 relative ${plan.popular ? "glow-border" : ""}`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  Most Popular
                </span>
              )}

              {/* Discount badge */}
              {plan.discountTag && (
                <span className="absolute top-4 right-4 px-2.5 py-1 rounded-md bg-violet-500/20 border border-violet-500/40 text-violet-300 text-xs font-bold tracking-wide">
                  {plan.discountTag}
                </span>
              )}

              <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mt-1">{plan.desc}</p>

              <div className="mt-6 mb-8">
                {/* Crossed-out original price */}
                {plan.originalPrice && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-foreground/80 text-base font-bold line-through">
                      {plan.originalPrice}
                    </span>
                    <span className="text-xs text-violet-400 font-semibold">
                      Early Bird Price
                    </span>
                  </div>
                )}
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground text-sm mb-1">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li
                    key={f.text}
                    className="flex items-center gap-2.5 text-sm"
                  >
                    {f.included ? (
                      <Check
                        size={16}
                        className="text-neon-green flex-shrink-0"
                      />
                    ) : (
                      <X
                        size={16}
                        className="text-muted-foreground/40 flex-shrink-0"
                      />
                    )}
                    <span
                      className={
                        f.included
                          ? "text-foreground"
                          : "text-muted-foreground/50"
                      }
                    >
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-semibold text-sm transition-all ${
                  plan.popular
                    ? "bg-primary text-primary-foreground glow-primary hover:brightness-110"
                    : "border border-border text-foreground hover:bg-muted/50"
                }`}
              >
                {plan.popular ? "Claim Early Bird Deal →" : "Start Free"}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom urgency note */}
      </div>
    </section>
  );
};

export default PricingSection;
