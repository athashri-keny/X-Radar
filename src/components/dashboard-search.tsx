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
import SearchStatsBar from "./SearchBar";
import axios from "axios";

const SubNiches: Record<string, string[]> = {
  Developer: [
    "React",
  "Next.js",
  "Node.js",
  "Flutter",
  "Python",
  "Full Stack",
  ],
  VideoEditor: ["YouTube", "Reels", "Shorts"],
};

const Niches = Object.keys(SubNiches);

interface DashboardSearchProps {
  onSearch: (keyword: string, selectedDays: string) => Promise<void>;
  isScanning?: boolean;
  leadsFound?: number;
  cooldownEndTime?: number;
  isCooldown: boolean,
  LocalScanning: boolean,
  hasRun: boolean
}

export function DashboardSearch({
  onSearch,
  isScanning,
  leadsFound = 0,
  cooldownEndTime,
  isCooldown,
  LocalScanning,
  hasRun
}: DashboardSearchProps) {
  const { data: session } = useSession();

  const [selectedMain, setSelectedMain] = useState("");

  const [open, setOpen] = useState(false);
   const [searchStats, setSearchStats] = useState({ 
  manualSearchesUsed: 0, 
  autoScansUsed: 0 
})

  const [stack, setStack] = useState("");
  const [selectedDays, setSelectedDays] = useState("");
  // const [countdown, setCountdown] = useState("");
  // Temporarily add this where you render SearchStatsBar
console.log("Passing to SearchStatsBar:", { searchStats })


  // put this above the component or in a separate file
  const SUBTITLES = [
    "Fresh leads are waiting — start hunting.",
    "Your next client is one tweet away.",
    "Leads refresh daily. Strike while it's hot.",
  ];

  // for updating the countdown
 
  useEffect(() => {

   const fetchStatus = async() => {
     const res = await axios.get('/api/search-status')
     setSearchStats(res.data)
   }
  fetchStatus()
  } , [leadsFound])


  const handleNicheSelect = (niche: string) => {
    setSelectedMain(niche);
    setStack("");
  };

  const searchQuery = `${stack} `.trim();

  const handleSearch = async () => {
  if (!searchQuery.trim()) return;
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
          disabled={LocalScanning || isCooldown}
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

        <SearchStatsBar 
        autoScansUsed={searchStats.autoScansUsed}
        manualSearchesUsed={searchStats.manualSearchesUsed}
        />

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
                disabled={LocalScanning || isCooldown}
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
                setSelectedDays(val)
                }}
                disabled={LocalScanning || isCooldown}
                className="flex flex-wrap gap-1.5 sm:gap-2 justify-start"
              >
                <div className="relative group">
                  <ToggleGroupItem
                    value="24"
                    className="px-3 sm:px-4 py-1.5 rounded-full border
    data-[state=on]:bg-white data-[state=on]:text-black 
    text-gray-400 hover:text-white hover:border-white/30 transition"
                    
                  >
                    Last 24 hours
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
          disabled={LocalScanning || isCooldown || !canSearch}
          className="w-full md:w-auto px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 bg-white text-black hover:bg-gray-100 disabled:bg-gray-700 disabled:text-gray-500 font-semibold rounded-lg flex items-center justify-center md:justify-start gap-2 text-sm sm:text-base transition"
        >
          {LocalScanning ? (
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

      {/* Cooldown timer */}

      {!isCooldown && !LocalScanning && hasRun && (
 <motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="text-xs sm:text-sm text-white/90 font-bold mt-2 leading-relaxed"
>
  That&apos;s it! These are the latest tweets in your niche from the last 48 hours.
  We&apos;ll email you once we find new leads. <br />
  You can search again now, but we recommend waiting 3–4 hours to get the freshest leads. <br />
  <span className="inline-flex items-center gap-1.5 text-white/60 text-xs mt-1">
  </span>
</motion.p>
)}
    

      {/* Leads found */}
      {leadsFound > 0 && !LocalScanning && (
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
