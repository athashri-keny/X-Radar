# X-Radar Architecture

## What it does
AI-powered Twitter/X lead generation SaaS for freelancers.
Users enter a niche and get scored, ranked leads from Twitter.

## Tech Stack
| Layer | Tech |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind, Framer Motion |
| Backend | Next.js API routes, Node.js |
| Database | MongoDB + Mongoose (6hr TTL on leads) |
| AI orchestration | LangGraph |
| LLM | GPT-4o-mini |
| Retrieval | RAG over a reference-tweet store (known good hiring tweets) |
| Scraper | Apify |
| Queue | QStash |
| Email | Resend |
| Payments | DodoPayments |
| Deploy | Vercel |

## System Flow

```mermaid
flowchart TD
    A([User enters niche]) --> B["/api/search"]
    B --> C[Apify scraper]
    C -->|returns run ID immediately| D["Frontend polls /api/poll every 3s"]
    D --> E[Raw tweets]
    E --> F["Pre-filter<br/>remove mocks, empty fields,<br/>strip unused fields"]
    F --> G

    subgraph G["LangGraph pipeline (GPT-4o-mini)"]
        direction TB
        H{{"Classifier node<br/>What type is this tweet?"}}
        H -->|Scam| I["Discard<br/>score 0, filtered out"]
        H -->|Self-promo| J["Discard<br/>score 0, filtered out"]
        H -->|Hiring| K["RAG scorer node<br/>compare with reference tweets"]
        K --> L{"Self-check node<br/>confident?"}
        L -->|low confidence| K
        L -->|confident| M["Score 1-10 + reason"]
    end

    M --> N[("MongoDB<br/>leads, 6hr TTL")]
    N --> O[QStash]
    O --> P[Resend email notification]
    N --> Q([Leads shown in dashboard])

    classDef discard fill:#fecaca,stroke:#ef4444,color:#7f1d1d
    classDef ai fill:#ddd6fe,stroke:#7c3aed,color:#3b0764
    classDef save fill:#bbf7d0,stroke:#16a34a,color:#14532d
    class I,J discard
    class H,K,L ai
    class M,N save
```

## Core Flow
1. User enters a niche, which triggers `/api/search`.
2. Apify scrapes tweets and returns a run ID immediately (fire-and-poll).
3. Frontend polls `/api/poll` every 3s using the run ID.
4. Raw tweets are filtered (remove mocks, empty fields, strip unused fields).
5. Filtered tweets go into the LangGraph pipeline:
   - **Classifier node** labels each tweet as `hiring`, `scam`, or `self-promo`.
   - Scam and self-promo tweets are discarded (score 0, filtered out).
   - Hiring tweets go to the **RAG scorer node**, which compares them against reference tweets and scores 1-10.
   - **Self-check node** checks the model's confidence and loops back to re-score if it is low.
6. Final leads (score + reason) are stored in MongoDB with a 6hr TTL.
7. QStash triggers an email notification via Resend.

## Free vs Pro
| Plan | Tweet window |
|---|---|
| Free | 7 days ago to 2 days ago |
| Pro | `within_time:24h` (latest tweets) |
