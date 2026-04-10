'use client'

import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How does X-Radar find hiring tweets?", a: "X-Radar uses advanced NLP and AI models to scan Twitter/X in real-time, identifying tweets that contain hiring signals, freelance requests, and project opportunities — even when they don't explicitly say 'hiring'." },
  { q: "Will X-Radar post on my behalf?", a: "Never. X-Radar only suggests replies. You always have full control over what gets posted. We respect your account and privacy." },
  { q: "How accurate is the AI matching?", a: "Our matching algorithm has a 92%+ accuracy rate. It considers your skills, experience level, niche, and past engagement patterns to surface the most relevant leads." },
  { q: "Can I cancel my Pro subscription anytime?", a: "Absolutely. No contracts, no lock-in. Cancel anytime from your dashboard and you'll retain access until the end of your billing cycle." },
  { q: "What makes X-Radar different from manual searching?", a: "Manual searching means hours of scrolling. X-Radar surfaces the best leads in seconds, scores them instantly, and crafts personalized replies — saving you hours every week." },
];

const FAQSection = () => (
  <section id="faq" className="py-24">
    <div className="container mx-auto px-4 max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-card p-6"
      >
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left text-foreground hover:text-primary text-sm font-semibold">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-sm leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </div>
  </section>
);

export default FAQSection;
