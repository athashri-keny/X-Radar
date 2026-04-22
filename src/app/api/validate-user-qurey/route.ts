import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(request: NextRequest) {
  const { query } = await request.json()

  if (!query ) {
    return NextResponse.json({ valid: false, reason: "Query too short" })
  }

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini", // same model you use for scoring, cheap and fast
    max_tokens: 100,
    response_format: { type: "json_object" }, // forces JSON output, no parsing issues
    messages: [
      {
        role: "system",
        content: `You are a query validator for X-Radar, a tool that finds hiring tweets on X/Twitter.

Return JSON only: {"valid": true/false, "reason": "short reason"}

VALID queries (be generous, approve these):
MAIN - The qurey must have the intent of hiring or looking for a freelance leads then only approve and move on
NOTE- If the qurey is from two different niche eg like video editor and a developer than return false 

INVALID queries only if clearly:
- gibberish: "asdfghjkl", "aaa bbb"
- completely unrelated: "buy cheap shoes", "weather today"
- too vague with no work intent: "hello", "yes"


in the error message give me warning message that this is a gibberish qurey and its not related
Also return true when the qurey is right
`
      },
      {
        role: "user",
        content: `Validate this query: "${query}"`
      }
    ]
  })

  const text = response.choices[0].message.content || ''



  try {
    const result = JSON.parse(text)
    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ 
      message: "Error while vaildating "
     } , {
      status: 500

     }) // fail open
  }
}