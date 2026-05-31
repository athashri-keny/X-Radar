'use client'


import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    desc: "Perfect for getting started",
    popular: false,
    features: [
      { text: "24 hour cooldown", included: true },
      { text: "Only last 6 days tweets (no 24 hrs)", included: true },
        { text: "Only 3 free searches", included: true },
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
      { text: "Users Get every new feature first free of charge until stable", included: true },
    ],
  },
];

const PricingSection = () => (
  
  <section id="pricing" className="py-24 relative">
    <div className="absolute inset-0 dot-pattern opacity-20" />
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Simple <span className="gradient-text">Pricing</span>
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">Start free. Upgrade when you're ready to go all-in.</p>
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
            <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
            <p className="text-muted-foreground text-sm mt-1">{plan.desc}</p>
            <div className="mt-6 mb-8">
              <span className="text-4xl font-black text-foreground">{plan.price}</span>
              <span className="text-muted-foreground text-sm ml-1">{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li key={f.text} className="flex items-center gap-2.5 text-sm">
                  {f.included ? (
                    <Check size={16} className="text-neon-green flex-shrink-0" />
                  ) : (
                    <X size={16} className="text-muted-foreground/40 flex-shrink-0" />
                  )}
                  <span className={f.included ? "text-foreground" : "text-muted-foreground/50"}>{f.text}</span>
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
              {plan.popular ? "Get Started" : "Start Free"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
