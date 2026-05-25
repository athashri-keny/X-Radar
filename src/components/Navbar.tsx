'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Radar } from "lucide-react";
import Link from "next/link";

const navLinks = ["How It Works", "Features", "Pricing", "FAQ"];

const  Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase().replace(/\s/g, "-"))?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-t-0 border-x-0 rounded-none">
     <div className="container mx-auto flex items-center justify-between h-16 px-4 md:px-12 lg:px-20">
        <a href="#" className="flex items-center gap-2 text-foreground font-bold text-xl">
          <Radar className="text-primary" size={28} />
          <span>X-Radar</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              {link}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <Link href={'/auth/signup'}>
          <button
          className="
          cursor-pointer
          px-5 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm glow-primary hover:brightness-110 transition-all">
            Sign Up
          </button> 
          </Link>
         
        </div>

        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden border-t border-border"
          >
            <div className="flex flex-col gap-4 p-4">
              {navLinks.map((link) => (
                <button key={link} onClick={() => scrollTo(link)} className="text-muted-foreground hover:text-foreground text-sm font-medium text-left">
                  {link}
                </button>
              ))}
              <button className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm glow-primary w-full">
                Sign Up
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
