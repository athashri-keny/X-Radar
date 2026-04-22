'use client'

import { motion } from "framer-motion";
import { ListChecks, Filter, Send } from "lucide-react";

const steps = [
  { icon: ListChecks, title: "Enter Multiple Queries", desc: "Run multiple search queries at once — target every niche, skill, and keyword that matters to your freelance business in a single sweep." },
  { icon: Filter, title: "Filtering The Noise", desc: "X-Radar filters out the noise, removing spam, irrelevant tweets, and low-quality leads so you only see real hiring opportunities." },
  { icon: Send, title: "Reply", desc: "Get AI-crafted reply suggestions tailored to each opportunity. One click to engage and land the gig." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 relative">
    <div className="absolute inset-0 dot-pattern opacity-20" />
    <div className="container mx-auto px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          How It <span className="gradient-text">Works</span>
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">Three simple steps to never miss a freelance opportunity again.</p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6 relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px border-t-2 border-dashed border-primary/30" />

        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="glass-card p-8 text-center relative hover:border-primary/30 transition-colors"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5 relative">
              <step.icon size={24} className="text-primary" />
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
