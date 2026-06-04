import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Providers } from "../providers";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "X-Radar",
  description: "X-Radar scans Twitter/X in real-time, finds hiring tweets, scores leads with AI, and crafts perfect reply suggestions. Find your next client today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
      <>
       <Providers>
          {children}
          <Toaster/>
          <Analytics/>
          <SpeedInsights/>
        </Providers>
      </>
       
    
 
  );
}
