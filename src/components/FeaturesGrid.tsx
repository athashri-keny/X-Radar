'use client'

import { motion } from "framer-motion";
import { Zap, Target, Bot, Bell, BarChart3, Shield } from "lucide-react";

const features = [
  { icon: Zap, title: "Real-Time Scanning", desc: "Scans Twitter/X instantly when you search, surfacing every relevant opportunity in seconds.", color: "text-primary" },
  { icon: Target, title: "Smart Matching", desc: "AI matches leads to your skills, experience, and niche for laser-accurate results.", color: "text-secondary" },
  { icon: Bot, title: "AI Reply Crafting", desc: "Generates personalized, professional replies that stand out from generic DMs.", color: "text-primary" },
  { icon: Bell, title: "Instant Alerts", desc: "Get notified via email or push the second a high-match lead appears.", color: "text-secondary" },
  { icon: BarChart3, title: "Lead Analytics", desc: "Track your outreach, response rates, and conversion metrics in one dashboard.", color: "text-primary" },
  { icon: Shield, title: "Privacy First", desc: "Your data stays private. We never post on your behalf without explicit permission.", color: "text-secondary" },
];

const FeaturesGrid = () => (
  <section id="features" className="py-24 relative">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Powerful <span className="gradient-text">Features</span>
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">Everything you need to turn Twitter into your #1 client acquisition channel.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="glass-card p-6 group hover:border-primary/30 hover:glow-border transition-all duration-300 cursor-default"
          >
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
              <f.icon size={22} className={f.color} />
            </div>
            <h3 className="text-lg font-bold mb-2 text-foreground">{f.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesGrid;
