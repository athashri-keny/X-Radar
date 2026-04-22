import 'dotenv/config'
import Openai from 'openai'

const client = new Openai();

type WorkType = 'freelance' | 'job'

export async function GenerateNiches(role: string, niche: string, workType: WorkType ) {

  console.log("from function " , role , niche , workType)

  const contextMap = {
    freelance: {
      poster: "founders, startups, or small business owners",
      intent: "hire someone for a paid project or contract work",
      signals: `"hiring", "need a dev", "dm me", "paying", "budget", "lmk", "asap", "contract"`,
      banned: ` hiring , full-time, salary, benefits, equity, office, onsite, apply, resume, interview`
    },
    job: {
      poster: "companies or recruiters",
      intent: "hire someone for a full-time or part-time job",
      signals: `"hiring", "join our team", "full-time", "salary", "apply", "remote job", "we're hiring"`,
      banned: `freelance, contract, gig, project-based, one-time`
    }
  }

  const ctx = contextMap[workType]; // freelancer or job


  const res = await client.responses.create({
    model: 'gpt-5-nano',
 instructions: `You are an expert Twitter/X search query writer.

You are helping a "${role}" who works in "${niche}" find tweets from ${ctx.poster} who want to ${ctx.intent}.

Generate exactly 8 Twitter/X search queries that look like something a REAL PERSON would tweet when they urgently need help or want to hire someone.


REAL TWEETS THAT SIGNAL HIRING INTENT (study the pattern, do not copy):
Need a React Developer
Simple dashboard UI

Budget: $800–$1,500
Apply with past projects


Need a React Developer to fix bugs + improve performance in an existing web app.

Budget: $200–$600
Long-term work possible.

Hiring!!

Senior Front-end Developer

Contract
Pay: 600k - 700k 
Technology: React + Redux


🚀 Hiring: Frontend Developer (Project-Based)

Looking for a Frontend Dev (React/Next.js) for a short-term project.

Hiring Developer
0–2 yrs | Freshers can apply.
7.5 LPA  | Hexa solutions | Remote

Now Hiring: Work From Home 
Senior Full Stack Developer 

A global cloud communications company is hiring experienced engineers 🌍

◽ Employer: MMDSmart Ltd
◽ Role: Senior Full Stack Developer (Go/React)
◽ Location: Fully Remote
◽ Pay: Competitive 

Responsibilities include:
Show more



RULES:
- Use casual lowercase Twitter language
- 4-7 words per query
- No hashtags, no formal language
- Keywords must reflect "${niche}" and "${role}" naturally
- STRONG SIGNALS to include where natural: ${ctx.signals}
- BANNED words: ${ctx.banned}

Output raw search strings only — no numbering, no quotes, no explanations.`,

    input: "Generate the 5 search queries now.",

    
  text: {
      format: {
        type: "json_schema",
        name: "queries_output",
        strict: true,
        schema: {
          type: "object",
          properties: {
            queries: {
              type: "array",
              items: { type: "string" }
            }
          },
          required: ["queries"],
          additionalProperties: false
        }
      }
    },


  });

  console.log(res.output_text);
}


GenerateNiches("Full stack" , "Webdeveloper" , "freelance")