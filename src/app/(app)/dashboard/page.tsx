"use client";

import { useEffect, useState } from "react";
import { DashboardNavbar } from "@/components/dashboard-navbar";
import { DashboardSearch } from "@/components/dashboard-search";
import { LeadCard } from "@/components/lead-card";
import { SearchHistorySidebar } from "@/components/search-history-sidebar";
import AnimatedBackground from "@/components/AnimatedBackground";
import { GradientOrbs } from "@/components/gradient-orbs";
import { useSession } from "next-auth/react";
import axios from "axios";
import Footer from "@/components/footer";
import PricingSectionDialog from "@/components/pricingSectionDialog";
import { LeadPipelineLoader } from "@/components/SpinnerLoader";
import PaywallOverlay from "@/components/pricingsectionpaywall";
import UpgradePopover from "@/components/updrade-popover";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@base-ui/react";

interface leads {
  _id: string;
  TweetText: string;
  Tweeturl: string;
  Score: number;
  suggestReply: string;
}

interface leadsHistory {
  _id: string;
  keywords: string;
  updatedAt: Date;
}

export default function Dashboard() {
  const { data: session, status } = useSession();

  const [isScanning, setIsScanning] = useState(false);
  const [leadsFoundNumber, setLeadsFoundNumber] = useState(0);
  const [cooldownMessage, setcooldownmessage] = useState("");
  const [leads, setleads] = useState<leads[]>([]);
  const [leadsHistory, setleadsHistory] = useState<leadsHistory[]>([]);
  const [message, setmesssage] = useState("");
  const [apifyStatus, setApifyStatus] = useState("");
  const [open, setOpen] = useState(false);
  const [pricingsectionDialogOpen, SetPricingSectionDialogCLose] =
    useState(false);

      const [isCooldown, setIsCooldown] = useState(false);
        const [localScanning, setLocalScanning] = useState(false);
        const [hasRun , sethasRun] = useState(false)



  const TWEETYFOURHOURS_MS = 12 * 60 * 60 * 1000; // 24 hours
  const SIXHOURCOOLDOWN = 6 * 60 * 60 * 1000; // 6 hours

  // for bluring the leads
  const isFree = session?.user?.plan === "free";
  const FREE_LIMIT = 5;

  const visibleLeads = isFree ? leads.slice(0, FREE_LIMIT) : leads; // index 0 , 1 , 2 , 3 , 4 , 5
  const lockedLeads = isFree ? leads.slice(FREE_LIMIT) : []; // and then 5 , 6 , 7, ..... etc
  const lockCount = lockedLeads.length;

  const endTime =
    Date.now() +
    (session?.user?.plan === "free" ? TWEETYFOURHOURS_MS : SIXHOURCOOLDOWN); // calutate it

  const handleSearch = async (keyword: string, selectedDays: string) => {
    setIsScanning(true);
    setLeadsFoundNumber(0);
    setcooldownmessage("");
    setLocalScanning(true)
    setIsCooldown(true)
    sethasRun(true)

    // console.log("From handle search = " , keyword , selectedDays)

    try {
      const res = await axios.post("/api/run-agent", {
        keywords: keyword,
        TimePeriod: selectedDays,
      });

      // console.log('successfully agent fired', res.data)

      const SearchRunId = res.data.searchRunId;

      const poll = async () => {
        try {
          const pollRes = await axios.get(
            `/api/get-status?searchRunId=${SearchRunId}`,
          );
          const data = pollRes.data;

          // console.log("Data from recived from frontend " , data)

          if (data.status === "pending") {
            setApifyStatus("running");
          }

          if (data.status === "done") {
            setIsScanning(false); // ← only stops here when actually done
            setLocalScanning(false)
            setIsCooldown(false)

            if (data.leads.length > 0) {
              setLeadsFoundNumber(data.leads.length);
              setleads(data.leads || []);
              localStorage.setItem("CooldownEndTime", JSON.stringify(endTime));
            } else {
              console.log("No current lastest leads in your niche");
              setmesssage(
                "No Lastest leads found in your niche right now. Check back in a few hours for fresh results.",
              );
              setApifyStatus("done");
            }
            return;
          }

          if (data.status === "failed") {
            setIsScanning(false);
             setLocalScanning(false)
            setIsCooldown(false)
            return;
          }

          // still pending — poll again in 3s
          setTimeout(poll, 3000);
        } catch (error) {
          console.log("Poll error", error);
          setIsScanning(false);

        }
      };

      poll(); // fire and forget — finally runs immediately after this line
    } catch (error: any) {
      // this only catches errors from POST /api/run-agent (cooldown, auth etc)
      console.log(error);
      // for
      if (error.response?.status === 429) {
        setcooldownmessage(error.response.data.message);
      }

      // for free users hiting the paywall
      if (error.response.status === 403) {
        setcooldownmessage(error.response.data.message);
        setOpen(true);
      }
      console.log("Error:", error.response);
      // setcooldownmessage(error.response.data.messsage);
      setIsScanning(false); // ← only set false here if POST itself failed
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("CooldownEndTime");
   
    const fetchLeadsFrombackend = async () => {
      try {
        const res = await axios.get("/api/get-recent-leads");

        setleads(res.data.foundLeads);
        setLeadsFoundNumber(res.data.foundLeads.length);
        setleadsHistory(res.data.searchruns ?? []);

        if (res.data.lastSearchAt === null) {
          localStorage.removeItem("CooldownEndTime");
        }

        // console.log(res.data)
      } catch (error: any) {
        console.error("Error while fetching recent leads:", error.message);
      }
    };
    fetchLeadsFrombackend();
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background effects */}
      <AnimatedBackground />
      <GradientOrbs />

      {/* Content */}
      <div className="relative z-10">
        <DashboardNavbar />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 mb-55">
          {/* Search section */}
          <DashboardSearch
            onSearch={handleSearch}
            isScanning={isScanning}
            leadsFound={leadsFoundNumber}
            cooldownEndTime={0}
            LocalScanning={localScanning}
            isCooldown={isCooldown}
            hasRun={hasRun}
          />

          {cooldownMessage && (
            <p className="text-red-400 text-sm text-center mt-3">
              ⏳ {cooldownMessage}
            </p>
          )}

          <PaywallOverlay isOpen={open} onClose={() => setOpen(false)} />

          {/* Main content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-12">
            {/* Lead cards grid */}
            <div className="lg:col-span-3">
              {leadsFoundNumber > 0 && (
                <div className="space-y-4 mb-6">
                  <p className="text-sm text-gray-500 font-medium">
                    {leadsFoundNumber} leads found
                  </p>
                </div>
              )}

              {isScanning ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4">
                  <LeadPipelineLoader apifyStatus={apifyStatus} />
                  <p className="text-gray-400 text-sm">
                    Hunting leads for you...
                  </p>
                </div>
              ) : leadsFoundNumber > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {visibleLeads.map((tweet: any) => (
                    <LeadCard
                      key={tweet.tweetId || tweet._id}
                      score={tweet.score || tweet.Score}
                      suggestReplyAi={
                        tweet.suggestedReply || tweet.suggestedReply
                      }
                      tweet={tweet.tweetText || tweet.TweetText}
                      tweetUrl={tweet.tweetUrl || tweet.Tweeturl}
                    />
                  ))}
                  {/* locked leads section - only renders when free user has more than 5 leads */}
                  {lockCount > 0 && (
                    <div className="relative">
                      {/* real lead cards blurred behind the overlay - shows max 2 cards */}
                      <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        style={{
                          filter: "blur(6px)",
                          pointerEvents: "none",
                          userSelect: "none",
                        }}
                      >
                        {lockedLeads.map((tweet: any) => (
                          <LeadCard
                            key={tweet.tweetId || tweet._id}
                            score={tweet.score || tweet.Score}
                            suggestReplyAi={
                              tweet.suggestedReply || tweet.suggestedReply
                            }
                            tweet={tweet.tweetText || tweet.TweetText}
                            tweetUrl={tweet.tweetUrl || tweet.Tweeturl}
                          />
                        ))}
                      </div>

                      {/* overlay on top of blurred cards */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="glass-effect border border-white/20 rounded-xl px-8 py-6 flex flex-col items-center gap-3 text-center">
                          <p className="text-white font-bold text-lg">
                            🔒 {lockCount} more leads found
                          </p>
                          <p className="text-gray-400 text-sm">
                            Upgrade to Pro to unlock all leads + AI replies
                          </p>

                          <Button
                            onClick={() => SetPricingSectionDialogCLose(true)}
                            className="w-full py-2 px-6 bg-white text-black rounded-lg text-sm font-medium hover:bg-white/90 transition text-center"
                          >
                            Unlock all leads →
                          </Button>
                          <PricingSectionDialog
                            isopen={pricingsectionDialogOpen}
                            onClose={() => SetPricingSectionDialogCLose(false)}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

               

              ) : message ? (
                <div className="flex justify-center py-16">
                  <div className="relative flex items-start gap-3 bg-red-950/40 border border-red-500/50 text-red-300 rounded-xl px-5 py-4 max-w-md w-full shadow-lg shadow-red-900/20 animate-in fade-in slide-in-from-bottom-3 duration-500">
                    {/* Pulsing dot */}
                    <span className="mt-1 flex-shrink-0 relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                    </span>

                    <div>
                      <p className="font-semibold text-red-300 text-sm">
                        No Leads Found !!
                      </p>
                      <p className="text-red-400/80 text-sm mt-0.5">
                        {message}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg">
                    No leads yet. Search for hiring keywords to get started.
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <SearchHistorySidebar
                searches={leadsHistory.map((item) => ({
                  id: item._id,
                  keyword: item.keywords,
                  date: new Date(item.updatedAt).toLocaleTimeString(),
                  leadsCount: leadsFoundNumber,
                }))}
              />
            </div>
          </div>
          {/* {session?.user?.plan === "free" ? <UpgradePopover /> : null} */}
        </main>
      </div>
      <Footer />
    </div>
  );
}
