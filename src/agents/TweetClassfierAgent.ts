// import { Agent } from "@openai/agents";
// import 'dotenv/config'

// export const ScorerAgent = new Agent({
//     name: "Scorer_Agent",
    
//        instructions: `You are a lead scoring agent for X-Radar.

// You receive tweets as JSON. Score each tweet. Return results.

// Do NOT fetch anything. Do NOT call tools.

// ═══════════════════════════════════════
// THE ONLY QUESTION THAT MATTERS
// ═══════════════════════════════════════
// Is this person trying to HIRE someone, or are they trying to GET HIRED?

// HIRING = they need someone to do work for them → can score high
// GET HIRED = they are looking for work themselves → ALWAYS score 1

// ═══════════════════════════════════════
// INSTANT SCORE 1 — NO EXCEPTIONS
// ═══════════════════════════════════════
// Score 1 immediately if the tweet contains ANY of these:
// - "open to work", "open to opportunities", "looking for work"
// - "available for freelance", "available for hire", "hire me"
// - "I am a developer", "I'm a developer", "I build X"
// - Person is replying to someone else offering their own services
// - Person is asking for a job or internship for themselves
// - "#OpenToWork", "#hiring" used by someone selling themselves

// ═══════════════════════════════════════
// INSTANT SCORE 1 — BOT ACCOUNTS
// ═══════════════════════════════════════
// Score 1 if the account is clearly a job board bot:
// - Username has: jobs  , hiring, talent, recruit, HR, remote, careers
// - Tweet has structured format: Role, Location, Pay, Apply link
// - Copy-paste template style with excessive emojis

// ═══════════════════════════════════════
// LEGITIMACY CHECK — REAL HIRING TWEETS
// ═══════════════════════════════════════
// Only after passing above checks, score based on quality:

// Score 9-10:
// - Real person, specific tech stack mentioned
// - Describes actual project they are building
// - Personal tone, asks you to DM them

// Score 7-8:
// - Real person, clear hiring intent
// - Somewhat vague but genuine

// Score 4-6:
// - Ambiguous — could be hiring or self-promoting
// - Unclear who needs who
// (Do NOT return these in output)

// Score 1-3:
// - Spam signals, scam patterns, unrealistic pay claims
// (Do NOT return these in output)
// Return ONLY tweets with score 7 or above.

// ═══════════════════════════════════════
// SUGGESTED REPLY RULES
// ═══════════════════════════════════════
// The reply must:
// - Sound like a FREELANCER pitching to a CLIENT
// - Be under 2 sentences
// - Match the casual tone of the tweet
// - Reference something specific from the tweet (tech stack, project type, etc.)
// - Never start with "Hi", "Hello", "Hey"
// - Never say "assist", "leverage", "utilize", "opportunity", "sounds great"
// - Never sound like YOU are applying for a job


// ❌ Wrong: "This sounds like a great opportunity! What kind of projects will they work on?"
// ❌ Wrong: "I would love to apply! Can you share more details?"
// ✅ Right: "Node.js + Supabase is my stack — built a few transaction systems, happy to show what I've done"
// ✅ Right: "Next.js + Tailwind is exactly what I work with — what's the scope of the project?"

// ═══════════════════════════════════════
// OUTPUT — RAW JSON ONLY
// ═══════════════════════════════════════



// You MUST respond with ONLY a raw JSON array.
// DO NOT RETURN 1 TO 5 SCORED TWEETS IN OUTPUT
// No intro text. No explanation. No markdown. No backticks.
// Just the array starting with [ and ending with ]
// return the TweetId too and always return TweetId in string not number


// [
//   {
//     "tweetUrl": "https://x.com/...",
//     "TweetId": "33345...",
//     "tweetText": "tweet content",
//     "score": 9,
//     "suggestedReply": "reply here"
//   }
// ]
// `,
//     model: 'gpt-4o-mini',
    
// })



// TODO: make a Agent tool for identifying same tweet

import "dotenv/config"
import OpenAI from "openai"
import { ChatOpenAI } from "@langchain/openai"  
import { tool } from "@langchain/core/tools";
import z from "zod";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";
import { Annotation, END, MessagesAnnotation, MessagesValue, ReducedValue, START, StateGraph, StateSchema } from "@langchain/langgraph";
import { OpenAIEmbeddingFunction } from "@chroma-core/openai";
import { Pinecone } from '@pinecone-database/pinecone';
import { getEmgbedding } from "@/lib/EmbeddingFunction";


const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });


const llm = new ChatOpenAI({
    apiKey: process.env.OPENAI_AI_KEY,
    model: 'gpt-4o-mini'
})

    // Tool node (Classification node)
    const classify_Tweets = tool(
        async({tweets}) => {

    //          const collection = await client.getOrCreateCollection({
    //     name: "hiring_tweets",
    //     embeddingFunction: new OpenAIEmbeddingFunction({
    //         apiKey: process.env.OPENAI_API_KEY!,
    //         modelName: 'text-embedding-3-small'
    //     })
    // })


    const collection = await getEmgbedding(tweets)

     const index = pc.index("tweets-ref")
  
     for(let i = 0; i < tweets.length; i++) {
     const results = await index.namespace("tweets").query({
     vector: collection[i], // grab the vector according to index current incoming tweet
    topK: 3,                   // ← return top 5 most similar tweets
    includeMetadata: true      // ← include text and label in results
  })

return results
     }
   


        }, {
            name: 'Classify_Tweets',
            description: 'Classify the tweets into SCAM TWEETS , HIRING TWEETS , AND SELF PROMORION BY LOOKING AT THE REFERENCE TWEETS FROM CHROMA DB. CLASSIFY THEM AND SCORE BASED ON CLOSED EMBEDDINGS YOU GET',
            schema: z.object({
                tweets: z.array(z.string()).describe("Tweets to classify")
            })
        }
    )



    // SCAM TWEETS
    const SCAM_TWEETS = tool(
        async({scamtweets}) => {
    return scamtweets;

        }, {
            name: 'SCAM_TWEETS',
            description: 'THESE ARE ALL SCAM TWEETS CLASSIFED BY YOU',
            schema: z.object({
            scamtweets: z.array(z.string()).describe("SCAM TWEETS")
            })
        }
    )


    // self promo
    const SELF_PROMO_TWEET = tool(
        async({SELF_PROMO}) => {
    return SELF_PROMO;
        }, {
            name: 'self-promo_tweets',
            description: 'THESE ARE ALL SELF PROMOTION TWEETS CLASSIFED BY YOU',
            schema: z.object({
            SELF_PROMO: z.array(z.string()).describe("Self promo")
            })
        }
    )
    //   {
//     "tweetUrl": "https://x.com/...",
//     "TweetId": "33345...",
//     "tweetText": "tweet content",
//     "score": 9,
//     "suggestedReply": "reply here"
//   }
// ]

    // sechma 

const outputSchema = z.object({
    tweets: z.array(z.object({
        tweetUrl: z.string().describe("Tweet URL"),
        tweetId: z.string().describe("Tweet ID"),
        tweetText: z.string().describe("Tweet text"),
        score: z.number().describe("Score of hiring intent 1-10"),
        suggestedReply: z.string().describe("Suggested reply")
    }))
})


    const Tools = [classify_Tweets , SELF_PROMO_TWEET , SCAM_TWEETS]

    // tools.map() converts each tool into a [name, tool] pair
    // Object.fromEntries() converts those pairs into an object 
    // because In your toolNode when LLM calls a tool by name, you look it up:
    const toolsbyName = Object.fromEntries(Tools.map((tool) => [tool.name , tool])) 


    const modelWithTools = llm.bindTools(Tools)


    // first llm call 
    const llmCall = async(state: any) => {

        const response = await modelWithTools.invoke([
            new SystemMessage(
                `You are a tweet classifier agent`
            ),
            ...state.messages // / spread full conversation history
        ])

        return {
        messages: [response],
        llmCalls: 1,
    };

    }

    // tool node (is)
    const toolNode = async (state: any) => {

        const lastMessage = state.messages.at(-1);

        // console.log("Tool node called" , lastMessage)

        // if it is not from ai message then return nothing 
        if (lastMessage == null || !AIMessage.isInstance(lastMessage)) {
        return { messages: [] };
    }

    const results = []

    // looping through the toolcalls 
    for(const toolCall of lastMessage.tool_calls ?? []) {
        
        // looking for which tool to call 
        const tool = toolsbyName[toolCall?.name] as any

        // calling the tool
        const observation = await tool.invoke(toolCall)

        results.push(observation)
    }

    return {messages: results}
    }




    const shouldContinue = (state: any) => {
    // getting the last message
    const lastMessage = state.messages.at(-1);

    // Check if it's not an AIMessage before accessing tool_calls
    if (!lastMessage || !AIMessage.isInstance(lastMessage)) {
        return END;
    } 

    // If the LLM makes a tool call, then perform an action
    if (lastMessage.tool_calls?.length) {
        return "toolNode";
    }

    // Otherwise, we stop (reply to the user)
    return "structuredOutputNode";
    };


    const AgnetState = new StateSchema({
        messages: MessagesValue,
        structuredResults: new ReducedValue(
            z.any().default(null),
            {reducer:  (current , next) => next}
        )
    })

    
    const structuredOutputNode = async(state: any) => {
        // telling the llm that you should response in this format its like blinding 
        const structuredOutput = llm.withStructuredOutput(outputSchema)
        // invoking llm with all the recent messages
      const res =  await structuredOutput.invoke(state.messages)
      console.log("StructruedOutput" , res)
       // returning all the state.messages
        return {
            messages: state.messages , 
            structuredResults: res.tweets 
        }
    }

    // linking all the and building graph
   export const AgentBuilder = new StateGraph(AgnetState)
    .addNode("llmCall" , llmCall)
    .addNode('toolNode' , toolNode)
    .addNode("structuredOutputNode" , structuredOutputNode)


    // starting point 
    .addEdge(START , 'llmCall') // "When graph starts, go to llmCall first." Simple, no condition.

    // logic
    
    .addConditionalEdges("llmCall", shouldContinue, ["toolNode", "structuredOutputNode"])
    .addEdge('toolNode' , 'llmCall')
    .addEdge("structuredOutputNode" , END)

    .compile() as any


//     const tweets = [
//     {
//         tweetUrl: "https://x.com/indie_dev/status/1234567890",
//         tweetId: "1234567890",
//         tweetText: "Built with: React, Vite, Tailwind CSS, and Supabase. 💻 I'm looking for honest feedback! What features should I add? Drop your suggestions below! 👇💭 As an indie developer if you like my work, a little funding/coffee help me build more features that mean the world to me. ❤️☕"
//     },
//     {
//         tweetUrl: "https://x.com/techjobs_my/status/2345678901",
//         tweetId: "2345678901",
//         tweetText: "Hiring: Junior Software Developer - 1M Technology Global 📍 Hybrid — 3 days office, 2 days remote (Malaysia) | React, Laravel, PHP | RM3,500 – RM6,000/month"
//     },
//     {
//         tweetUrl: "https://x.com/frontend_dev/status/3456789012",
//         tweetId: "3456789012",
//         tweetText: "I'm looking for a job. Immediate Joiner, Frontend Developer with 4+ years of experience in Banking Domain in React.js, JavaScript"
//     },
//     {
//         tweetUrl: "https://x.com/startup_hiring/status/4567890123",
//         tweetId: "4567890123",
//         tweetText: "Building a product that actually solves problems. Looking for folks obsessed with clean architecture and delightful UX. Roles: Senior Software Engineer (Backend, Golang), Lead Frontend Developer (React, TypeScript). DM your GitHub/LinkedIn"
//     },
//     {
//         tweetUrl: "https://x.com/scam_account/status/5678901234",
//         tweetId: "5678901234",
//         tweetText: "EARN 500 rupees instantly from working from home"
//     }
// ]

//     const result = await AgentBuilder.invoke({
//     messages: [new SystemMessage(`
//        You are an expert tweet classifier agent for a lead generation platform.

// You will receive a list of tweets. Classify each tweet into exactly one of these categories:

// CATEGORIES:
// - HIRING: A company or recruiter is OFFERING a job, role, or position
// - SELF_PROMO: Person promoting their own product, service, or work
// - SCAM: Suspicious, spam, or get-rich-quick tweets

// SUGGESTED REPLY RULES:
// - ONLY generate a suggestedReply for HIRING tweets
// - ONLY return the tweets which are classified as HIRING TWEETS
// - For all other categories (JOB_SEEKER, SELF_PROMO, SCAM) set suggestedReply to null
// - Suggested replies should be casual, friendly and show genuine interest in the role
// - Never write formal or robotic replies
//         `),
//     // new HumanMessage(
//     //     `Classify these tweets:
//     //   ${JSON.stringify(tweets, null, 2)}
//     //     `
//     // ), 
//     ],
//     },
// );





    // console.log(result.messages)