"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, Zap, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { useSession } from "next-auth/react";
import PricingSectionDialog from "./pricingSectionDialog";
import PaywallOverlay from "./pricingsectionpaywall";

const SubNiches: Record<string, string[]> = {
  Developer: [
    "React",
    "Next.js",
    "Vue",
    "Node.js",
    "Python",
    "Django",
    "Laravel",
    "Flutter",
    "Full Stack",
  ],
  VideoEditor: ["YouTube", "Reels", "Shorts", "Podcast", "Motion Graphics"],
  "Graphic Designer": [
    "Logo Designer",
    "Ad Creative Designer",
    "Social Media Designer",
  ],
};

const Niches = Object.keys(SubNiches);

interface DashboardSearchProps {
  onSearch: (keyword: string, selectedDays: string) => Promise<void>;
  isScanning?: boolean;
  leadsFound?: number;
  cooldownEndTime?: number;
}

export function DashboardSearch({
  onSearch,
  isScanning = false,
  leadsFound = 0,
  cooldownEndTime = 0,
}: DashboardSearchProps) {
  const { data: session } = useSession();

  const [selectedMain, setSelectedMain] = useState("");

  const [open, setOpen] = useState(false);

  const [stack, setStack] = useState("");
  const [selectedDays, setSelectedDays] = useState("");
  const [localScanning, setLocalScanning] = useState(false);
  const [countdown, setCountdown] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);

  // put this above the component or in a separate file
  const SUBTITLES = [
    "Fresh leads are waiting — start hunting.",
    "Your next client is one tweet away.",
    "Leads refresh daily. Strike while it's hot.",
  ];

  // for updating the countdown
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

  const handleNicheSelect = (niche: string) => {
    setSelectedMain(niche);
    setStack("");
  };

  const searchQuery = `${stack} `.trim();

  const handleSearch = async () => {
    console.log("Full query before tool call:", searchQuery);
    if (!searchQuery.trim()) return;
    setLocalScanning(true);
    try {
      await onSearch(searchQuery, selectedDays);
    } catch {
      console.log("Error");
    }
  };

  // console.log("seleccted days " , selectedDays)

  const canSearch = !!searchQuery && !!selectedDays;

  const renderSubNiches = () => {
    if (!selectedMain) return null;
    const options = SubNiches[selectedMain];

    return (
      <div className="space-y-1 mt-3">
        <p className="text-xs sm:text-sm text-white mb-2">I am a</p>
        <ToggleGroup
          type="single"
          value={stack}
          onValueChange={(val) => setStack(val)}
          disabled={localScanning || isCooldown}
          className="flex flex-wrap gap-1.5 sm:gap-2 justify-start"
        >
          {options.map((item) => (
            <ToggleGroupItem
              key={item}
              value={item}
              className="px-3 sm:px-4 py-1.5 rounded-full border border-white/10 text-xs sm:text-sm data-[state=on]:bg-white data-[state=on]:text-black text-gray-400 hover:text-white hover:border-white/30 transition"
            >
              {item}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {session?.user?.name && (
        <div className="flex flex-col gap-1 mb-2">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="text-xl sm:text-2xl md:text-xl font-bold text-white"
          >
            Welcome,{" "}
            <span className="text-white font-semibold">
              {session.user.name.split(" ")[0]}
            </span>{" "}
          </motion.p>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-4 mt-5">
          Hunt Leads
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex flex-col md:flex-row md:gap-3 md:items-start gap-3"
      >
        <div className="flex-1 space-y-4">
          {/* Niche selector */}
          <div className="space-y-1.5">
            <p className="text-xs sm:text-sm text-white font-medium">
              Select your niche
            </p>
            <Combobox items={Niches}>
              <ComboboxInput
                placeholder="e.g. Developer, VideoEditor..."
                disabled={localScanning || isCooldown}
                readOnly
              />
              <ComboboxContent className="bg-black">
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem
                      key={item}
                      value={item}
                      onClick={() => handleNicheSelect(item)}
                    >
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>

          {/* Sub-niche toggles */}
          {renderSubNiches()}

          {/* Time Period */}
          {stack && (
            <div className="space-y-1.5">
              <p className="text-xs sm:text-sm text-white mb-2 sm:mb-3">
                Time Period
              </p>
              <ToggleGroup
                type="single"
                value={selectedDays}
                onValueChange={(val) => {
                  if (val === "24" && session?.user.plan === "free") {
                    setOpen(true);
                  } else {
                    setSelectedDays(val);
                  }
                }}
                disabled={localScanning || isCooldown}
                className="flex flex-wrap gap-1.5 sm:gap-2 justify-start"
              >
                <div className="relative group">
                  <ToggleGroupItem
                    value="24"
                    className="px-3 sm:px-4 py-1.5 rounded-full border border-white/10 text-xs sm:text-sm 
    data-[state=on]:bg-white data-[state=on]:text-black 
    text-gray-400 hover:text-white hover:border-white/30 transition
    aria-disabled:opacity-40 aria-disabled"
                    aria-disabled={session?.user.plan === "free"}
                  >
                    Last 24 hours
                    {session?.user.plan === "free" && (
                      <span className="ml-1.5 text-[10px]">🔒</span>
                    )}
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="48"
                    className="px-3 sm:px-4 py-1.5 rounded-full border border-white/10 text-xs sm:text-sm 
    data-[state=on]:bg-white data-[state=on]:text-black 
    text-gray-400 hover:text-white hover:border-white/30 transition
"
                  >
                    Last 48 hours
                  </ToggleGroupItem>
                  <PricingSectionDialog
                    isopen={open}
                    onClose={() => setOpen(false)}
                  />
                  {/* Tooltip on hover */}
                </div>
              </ToggleGroup>
            </div>
          )}

          {/* Query preview */}
          {canSearch && (
            <p className="text-gray-400 text-xs sm:text-sm mt-2">
              Your qurey will be{" "}
              <span className="text-white font-bold">{stack}</span> tweets
              across{" "}
              <span className="text-white font-bold">
                {session?.user.plan === "pro" ? "5" : "2"} search queries
              </span>{" "}
              from the{" "}
              <span className="text-white font-bold">
                last {selectedDays} {selectedDays === "24" ? "hours" : "hours"}
              </span>
            </p>
          )}
        </div>

        {/* Hunt Leads button */}
        <Button
          onClick={handleSearch}
          disabled={localScanning || isCooldown || !canSearch}
          className="w-full md:w-auto px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 bg-white text-black hover:bg-gray-100 disabled:bg-gray-700 disabled:text-gray-500 font-semibold rounded-lg flex items-center justify-center md:justify-start gap-2 text-sm sm:text-base transition"
        >
          {localScanning ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Search className="w-5 h-5" />
              </motion.div>
              Scanning...
            </>
          ) : (
            <>
              Hunt Leads
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </Button>
      </motion.div>

      {/* Scanning progress bar */}
      {/* {localScanning && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
          <p className="text-xs sm:text-sm text-gray-400">🔍 Scanning Twitter for hiring leads...</p>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: ['0%', '100%'] }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="h-full bg-linear-to-r from-white via-gray-400 to-white"
            />
          </div>
        </motion.div>
      )} */}

      {/* Cooldown timer */}
      {isCooldown && countdown && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs sm:text-sm text-yellow-500/80 font-medium"
        >
          ⏳ Next search available in {countdown}
        </motion.p>
      )}

      {/* Leads found */}
      {leadsFound > 0 && !localScanning && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs sm:text-sm text-green-500/80 font-medium"
        >
          {leadsFound} leads found!!
        </motion.p>
      )}
    </div>
  );
}
