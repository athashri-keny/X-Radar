"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight } from "lucide-react";
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
import SearchStatsBar from "./SearchBar";
import axios from "axios";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

// ─── Types ───────────────────────────────────────────────────────────────────

interface StackOption {
  name: string;
  tags: string;
}

interface NicheData {
  roles: string[];                          // shown as pills after niche is picked
  stacks: Record<string, StackOption[]>;   // keyed by role
}

// ─── Data Map ────────────────────────────────────────────────────────────────
// Niches that have roles+stacks live here. "VideoEditor" goes straight to
// sub-niches (YouTube / Reels) — no extra role step needed, so it's NOT here.

const NICHE_MAP: Record<string, NicheData> = {
  Developer: {
    roles: ["Frontend dev", "Backend dev", "Full stack", "Mobile dev", "Data / ML"],
    stacks: {
     "Frontend dev": [
  {
    name: "React / Next.js",
    tags: "React · Next.js · TS · Tailwind",
  },
  {
    name: "Vue / Nuxt",
    tags: "Vue 3 · Nuxt · Pinia",
  },
  {
    name: "Angular / Enterprise",
    tags: "Angular · RxJS · TypeScript",
  },
],
      "Backend dev": [
        {
          name: "Node.js + Express",
          tags: "REST API · MongoDB · AWS",
        },
        {
          name: "Python + Django",
          tags: "Django · FastAPI · PostgreSQL",
        },
        {
          name: "Java + Spring",
          tags: "Spring Boot · Microservices",
        },
        {
          name: "Go + Postgres",
          tags: "Golang · REST · gRPC",
        },
      ],
      "Full stack": [
        {
          name: "MERN Stack",
          tags: "MongoDB · Express · React · Node",
        },
        {
          name: "Next.js + Prisma",
          tags: "Next.js · Prisma · PostgreSQL",
        },
        {
          name: "T3 Stack",
          tags: "tRPC · Prisma · Tailwind · Next",
        },
      ],
      "Mobile dev": [
        {
          name: "Flutter + Dart",
          tags: "Flutter · iOS + Android",
        },
        {
          name: "React Native",
          tags: "RN · Expo · iOS + Android",
        },
        {
          name: "iOS (Swift)",
          tags: "Swift · UIKit · SwiftUI",
        },
      ],
      "Data / ML": [
        {
          name: "Python + Pandas",
          tags: "Pandas · NumPy · scikit-learn",
        },
        {
          name: "ML Engineer",
          tags: "PyTorch · TensorFlow · FastAPI",
        },
        {
          name: "Data Engineer",
          tags: "Spark · Airflow · AWS/GCP",
        },
      ],
    },
  },
};

// VideoEditor keeps the old flat sub-niche approach — no stacks needed.
const VIDEO_SUBNICHE_QUERIES: Record<string, string> = {
  YouTube: "hiring video editor youtube long form",
  Reels: "hiring reels editor instagram short form",
  Shorts: "hiring shorts video editor youtube",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const Niches = ["VideoEditor"];

const VIDEO_SUBNICHES = ["YouTube", "Reels", "Shorts" ];

// ─── Props ───────────────────────────────────────────────────────────────────

interface DashboardSearchProps {
  onSearch: (keyword: string) => Promise<void>;
  isScanning?: boolean;
  leadsFound?: number;
  cooldownEndTime?: number;
  isCooldown: boolean;
  LocalScanning: boolean;
  hasRun: boolean;
}

// ─── Component ───────────────────────────────────────────────────────────────

export function DashboardSearch({
  onSearch,
  leadsFound = 0,
  isCooldown,
  LocalScanning,
  hasRun,
}: DashboardSearchProps) {
  const { data: session } = useSession();

  const [selectedMain, setSelectedMain] = useState("");   // niche: "Developer" | "VideoEditor"
  const [selectedRole, setSelectedRole] = useState("");   // Developer only: "Frontend dev" etc.
  const [selectedStack, setSelectedStack] = useState(""); // stack name within role
  const [open, setOpen] = useState(false);
  const [searchStats, setSearchStats] = useState({
    manualSearchesUsed: 0,
    autoScansUsed: 0,
  });
 

   useEffect(() => {

   const fetchStatus = async() => {
     const res = await axios.get('/api/search-status')
     setSearchStats(res.data)
   }
  fetchStatus()
  } , [leadsFound])


  // ── Derived ───────────────────────────────────────────────────────────────

  const isDeveloper = selectedMain === "Developer";
  const isVideoEditor = selectedMain === "VideoEditor";

  const rolesForNiche = isDeveloper ? NICHE_MAP.Developer.roles : [];

  console.log("Roles for nche " , rolesForNiche)

  const stacksForRole =
    isDeveloper && selectedRole
      ? NICHE_MAP.Developer.stacks[selectedRole] ?? []
      : [];

console.log("Stacks for roles" , stacksForRole)



      const searchQuery = `${selectedStack} `.trim()

      console.log("Seleeccted stacks" , selectedStack) // for eg React/ Nextjs

  const canSearch = !!searchQuery;

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleNicheSelect = (niche: string) => {
    setSelectedMain(niche);
    setSelectedRole("");
    setSelectedStack("");
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setSelectedStack("");
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      await onSearch(searchQuery);
      console.log("Search quries will be" , searchQuery)
    } catch {
      console.error("Search error");
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-4">
      {/* Welcome */}
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
            </span>
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
        <div className="flex-1 space-y-5">

          {/* Step 1 — Niche (unchanged combobox) */}
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

          {/* Step 2a — Developer: Role pills */}
        
          {/* Step 2b — VideoEditor: flat sub-niche pills (original behaviour) */}
          {isVideoEditor && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              <p className="text-xl sm:text-sm text-white font-medium mb-6">
                What you are willing to work in?
              </p>
              <ToggleGroup
                type="single"
                value={selectedStack}
                onValueChange={(val) => val && setSelectedStack(val)}
                disabled={LocalScanning || isCooldown}
                className="flex flex-wrap gap-2 justify-start"
              >
                {VIDEO_SUBNICHES.map((item) => (
                  <ToggleGroupItem
                    key={item}
                    value={item}
                    className="px-4 py-1.5 rounded-full border border-white/10 text-xs sm:text-sm
                      data-[state=on]:bg-white data-[state=on]:text-black
                      text-gray-400 hover:text-white hover:border-white/30 transition"
                  >
                    {item}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </motion.div>
          )}

       

      
        

          {/* Query preview */}
    
     {canSearch && (
  <p className="text-gray-400 text-xs sm:text-sm mt-1">
    Your query will be{" "}
    <span className="text-white font-bold">{selectedStack}</span>{" "}
    tweets across X{" "}
    <span className="text-white font-bold">
      {session?.user.plan === "pro" ? "5" : "3"}{" "}
      <HoverCard>
        <HoverCardTrigger asChild>
          <span className="underline decoration-dotted cursor-help text-white">
            Niche queries
          </span>
        </HoverCardTrigger>
        <HoverCardContent className="text-sm text-gray-300 max-w-xs">
          We use {session?.user.plan === "pro" ? "5" : "3"} hand-crafted
          search queries specifically designed for your selected niche
          (<span className="text-white font-medium">{selectedStack}</span>).
          The more targeted the queries, the more relevant your results 
          instead of one generic search, we run multiple variations tuned
          to how people in this niche actually phrase hiring tweets.
        </HoverCardContent>
      </HoverCard>{" "}
      from last 24 hours
    </span>{" "}
  </p>
)}
        </div>

        {/* Hunt Leads button */}
        <Button
          onClick={handleSearch}
          disabled={LocalScanning || isCooldown || !canSearch}
          className="w-full md:w-auto px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6
            bg-white text-black hover:bg-gray-100
            disabled:bg-gray-700 disabled:text-gray-500
            font-semibold rounded-lg flex items-center justify-center md:justify-start
            gap-2 text-sm sm:text-base transition"
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

      {/* Post-scan message */}
      {!isCooldown && !LocalScanning && hasRun && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xs sm:text-sm text-white/90 font-bold mt-2 leading-relaxed"
        >
          That&apos;s it! These are the latest tweets in your niche from the
          last 48 hours. We&apos;ll email you once we find new leads.
          <br />
          You can search again now, but we recommend waiting 3–4 hours to get
          the freshest leads.
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