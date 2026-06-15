"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, AlertCircle } from "lucide-react";

interface SearchHistory {
  id: string;
  keyword: string;
  date: string;
  leadsCount: number;
}

interface SearchHistorySidebarProps {
  searches?: SearchHistory[];
  cooldownEndTime?: number;
}

export function SearchHistorySidebar({
  searches,
  cooldownEndTime = 0,
}: SearchHistorySidebarProps) {
  const [countdown, setCountdown] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);

  useEffect(() => {
    if (cooldownEndTime === 0) {
      setCountdown("");
      setIsCooldown(false);
      return;
    }

    const updateCountdown = () => {
      const now = Date.now();
      const remaining = Math.max(0, cooldownEndTime - now);

      if (remaining === 0) {
        setCountdown("");
        setIsCooldown(false);
      } else {
        // caluating the cool down
        setIsCooldown(true);
        const hours = Math.floor(remaining / 3600000);
        const minutes = Math.floor((remaining % 3600000) / 60000);
        const seconds = Math.floor((remaining % 60000) / 1000);
        setCountdown(
          `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
        );
      }
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [cooldownEndTime]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-effect rounded-xl p-5 border border-white/10 h-fit sticky top-28"
    >
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Search History
      </h3>

      {/* Cooldown timer banner */}
      {isCooldown && countdown && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex flex-col gap-2"
        >
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0" />
            <div className="flex items-center justify-between w-full">
              <p className="text-xs font-semibold text-yellow-500">
                Cooldown Active
              </p>
              <p className="text-xs font-mono text-yellow-400">{countdown}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed border-t border-white/5 pt-2">
            ⚠️ In compliance with X's privacy policy, leads will be
            automatically deleted after 12 hours.
          </p>
        </motion.div>
      )}

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {searches?.map((search, index) => (
          <motion.div
            key={search.id}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ x: 4 }}
            className="p-3 rounded-lg bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition"
          >
            <p className="text-sm font-medium text-white truncate">
              {search.keyword}
            </p>
            <div className="flex items-center justify-between mt-2">
              <p className="text-xs text-gray-500">{search.date}</p>
              <p className="text-xs font-semibold text-gray-400">
                {search.leadsCount} leads
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
