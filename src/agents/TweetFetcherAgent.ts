import FetchNEws from "@/tools/FetchNews";
import { Agent , run } from "@openai/agents";

import 'dotenv/config.js'



const ScorerAgent = new Agent({
    name: "Scorer_Agent",
   instructions: `You are a lead scoring agent. When given a keyword:
    1. IMMEDIATELY call Fetch_Tweets tool with that keyword - do not ask for confirmation
    2. Score each tweet 1-10 for buying intent
    3. For scores above 7, generate 3 reply options
    4. Return the results
    
    Never ask for confirmation. Always act immediately.`,
    tools: [FetchNEws]
})

async function Main(qurey = "") {
  const result = await run(ScorerAgent , qurey)
  console.log(`Result , Fetch tweets for EXACTLY this keyword: "${qurey}". Do not modify the keyword. Score them and generate replies for hot leads.`)
}

Main(`I need a developer`)
