import { useEffect, useState } from "react";
import { IconRocket, IconRadar, IconCheck } from "@tabler/icons-react";

interface PipelineStage {
  id: string;
  label: string;
  doneLabel: string;
  IconComponent: React.ElementType;
  activeColor: string;
  pipeColor: string;
}

const stages: PipelineStage[] = [
  { id: "started",  label: "Search started", doneLabel: "Started", IconComponent: IconRocket, activeColor: "#A855F7", pipeColor: "#C084FC" },
  { id: "scanning", label: "Scanning",        doneLabel: "Scanned", IconComponent: IconRadar,  activeColor: "#C084FC", pipeColor: "#E9D5FF" },
];

const slowMessages = [
  "Scanning X for the freshest leads...",
  "This is taking a bit longer than usual...",
  "Still working, X has a lot of tweets to scan...",
  "Almost there, hang tight...",
]

export function LeadPipelineLoader({ apifyStatus }: any) {
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [doneStages, setDoneStages]     = useState<number[]>([]);
  const [filledPipes, setFilledPipes]   = useState<number[]>([]);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [slowMessageIndex, setSlowMessageIndex] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setCurrentStage(0), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (apifyStatus === "running") {
      setDoneStages([0]);
      setFilledPipes([0]);
      setTimeout(() => setCurrentStage(1), 500);
    }
  }, [apifyStatus]);

  // tick every second while scanning
  useEffect(() => {
    if (currentStage !== 1) return;
    const interval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [currentStage]);

  // rotate slow messages every 10s after 1 minute
  useEffect(() => {
    if (elapsedSeconds < 60) return;
    if (elapsedSeconds % 10 === 0) {
      setSlowMessageIndex(prev => (prev + 1) % slowMessages.length);
    }
  }, [elapsedSeconds]);

  const isSlow = elapsedSeconds >= 60;
  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      <div className="flex items-center justify-center">
        {stages.map((stage, i) => {
          const isDone     = doneStages.includes(i);
          const isActive   = currentStage === i && !isDone;
          const pipeFilled = filledPipes.includes(i);
          const Icon       = stage.IconComponent;

          return (
            <div key={stage.id} className="flex items-center">
              <div className="flex flex-col items-center gap-2">
                <div className="relative">
                  {isActive && (
                    <span
                      className="absolute inset-[-4px] rounded-full border-2 animate-ping"
                      style={{
                        borderColor: stage.activeColor,
                        // slow down ping when taking long
                        animationDuration: isSlow ? "2s" : "1.2s"
                      }}
                    />
                  )}
                  <div
                    className="w-[52px] h-[52px] rounded-full flex items-center justify-center border bg-white dark:bg-zinc-900 transition-all duration-300"
                    style={{
                      borderColor: isDone ? "#7C3AED" : isActive ? stage.activeColor : "#d1d5db",
                    }}
                  >
                    {isDone
                      ? <IconCheck size={22} color="#7C3AED" />
                      : <Icon size={22} color={isActive ? stage.activeColor : "#6b7280"} />
                    }
                  </div>
                </div>

                <span
                  className="text-[13px] whitespace-nowrap transition-colors duration-300"
                  style={{
                    color: isDone ? "#7C3AED" : isActive ? "#ffffff" : "#6b7280",
                  }}
                >
                  {isDone ? stage.doneLabel : stage.label}
                </span>
              </div>

              {i < stages.length - 1 && (
                <div className="w-[52px] h-[4px] relative overflow-hidden mb-5 mx-1 bg-gray-200 dark:bg-zinc-700">
                  <div
                    className="absolute inset-0 transition-transform duration-500 ease-in-out"
                    style={{
                      background: stages[i].pipeColor,
                      transform: pipeFilled ? "translateX(0)" : "translateX(-100%)",
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* timer */}
      {elapsedSeconds > 0 && (
        <p className="text-xs text-zinc-400">
          {minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`}
        </p>
      )}

      {/* slow message shown after 1 min */}
      {isSlow && (
        <p
          key={slowMessageIndex}
          className="text-sm text-amber-400 animate-pulse text-center max-w-[260px]"
        >
          {slowMessages[slowMessageIndex]}
        </p>
      )}

      <div className="flex gap-1">
        {[0, 1].map((i) => (
          <span
            key={i}
            className="w-1 h-1 rounded-full animate-bounce bg-gray-400 dark:bg-zinc-500"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}