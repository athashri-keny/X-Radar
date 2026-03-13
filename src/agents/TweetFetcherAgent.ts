import FetchNEws from "@/tools/FetchNews";
import { Agent , run } from "@openai/agents";

import 'dotenv/config.js'

 export const queries = [
  "looking for a freelance web developer",
  "need someone to build my website",
  "need a Next.js developer",
  "website broken need help",
  "hiring a web developer",
]


// Main agent
const ScorerAgent = new Agent({
    name: "Scorer_Agent",
 instructions: `You are a lead scoring agent.

CRITICAL: Call Fetch_News ONLY ONCE. Never call it more than once.

STRICT RULES:
- Score 8-10 ONLY if person is LOOKING TO HIRE a developer
- Score 1-3 for developers promoting themselves
- Ignore tweets unrelated to web/app development

HOT LEAD:
✅ "need someone to build my website"
✅ "looking for a Next.js developer"
✅ "hiring a freelance developer"

NOT A LEAD:
❌ "I build web apps"
❌ Flight/airline complaints
❌ Non-development topics

Steps:
1. Call Fetch_News ONCE only
2. Score strictly
3. Generate 3 replies for scores above 7
4. Return URL with each result`,
    model: 'gpt-4o-mini',
    tools: [FetchNEws]
})

async function Main(KeyWords = "") {


  const result = await run(ScorerAgent , KeyWords)


  console.log(`Use this EXACT keyword without any changes: "${KeyWords}"`)
  console.log("results = " , result.finalOutput)
}

Main(` Looking for a Web developer`)
