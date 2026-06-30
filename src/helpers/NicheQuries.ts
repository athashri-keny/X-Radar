export const nicheQueries: Record<string, string[]> = {

  // ── Frontend dev ──
  "React / Next.js": [
  "react developer contract",
  "Senior Frontend Developer",
  "Junior Frontend Developer",
  "Frontend Developer hiring",
  "Front End Developer role"
  ],
  "Vue / Nuxt": [
    "hiring frontend developer vue nuxt",
    "looking for vue nuxt developer freelance",
    "need someone to build website vue nuxt",
    "vue nuxt developer needed startup",
    "frontend contract work vue nuxt",
    "vue nuxt developer needed remote",
  ],
  "Angular / Enterprise": [
    "hiring frontend developer angular",
    "looking for angular developer freelance",
    "need someone to build website angular",
    "angular developer needed startup",
    "frontend contract work angular",
    "angular developer needed remote",
  ],

  // ── Backend dev ──
  "Node.js + Express": [
    "nodejs developer",
    "looking for node.js express developer freelance",
    "need someone to build api node.js express",
    "node.js express developer needed startup",
    "backend contract work node.js express",
    "node.js express developer needed remote",
  ],
  "Python + Django": [
    "hiring backend developer python django",
    "looking for python django developer freelance",
    "need someone to build api python django",
    "python django developer needed startup",
    "backend contract work python django",
    "python django developer needed remote",
  ],
  "Java + Spring": [
    "hiring backend developer java spring",
    "looking for java spring developer freelance",
    "need someone to build api java spring",
    "java spring developer needed startup",
    "backend contract work java spring",
    "java spring developer needed remote",
  ],
  "Go + Postgres": [
    "hiring backend developer golang postgres",
    "looking for golang postgres developer freelance",
    "need someone to build api golang postgres",
    "golang postgres developer needed startup",
    "backend contract work golang postgres",
    "golang postgres developer needed remote",
  ],

  // ── Full stack ──
  "MERN Stack": [
    "hiring full stack developer mern",
    "looking for mern stack developer freelance",
    "need someone to build app mern stack",
    "mern stack developer needed startup",
    "full stack contract work mern",
    "mern stack developer needed remote",
  ],
  "Next.js + Prisma": [
    "hiring full stack developer next.js prisma",
    "looking for next.js prisma developer freelance",
    "need someone to build app next.js prisma",
    "next.js prisma developer needed startup",
    "full stack contract work next.js prisma",
    "next.js prisma developer needed remote",
  ],
  "T3 Stack": [
    "hiring full stack developer t3 stack",
    "looking for t3 stack developer freelance",
    "need someone to build app t3 stack",
    "t3 stack developer needed startup",
    "full stack contract work t3 stack",
    "t3 stack developer needed remote",
  ],

  // ── Mobile dev ──
  "Flutter + Dart": [
    "hiring mobile developer flutter dart",
    "looking for flutter dart developer freelance",
    "need someone to build app flutter dart",
    "flutter dart developer needed startup",
    "mobile contract work flutter dart",
    "flutter dart developer needed remote",
  ],
  "React Native": [
    "hiring mobile developer react native",
    "looking for react native developer freelance",
    "need someone to build app react native",
    "react native developer needed startup",
    "mobile contract work react native",
    "react native developer needed remote",
  ],
  "iOS (Swift)": [
    "hiring mobile developer ios swift",
    "looking for ios swift developer freelance",
    "need someone to build app ios swift",
    "ios swift developer needed startup",
    "mobile contract work ios swift",
    "ios swift developer needed remote",
  ],

  // ── Data / ML ──
  "Python + Pandas": [
    "hiring data developer python pandas",
    "looking for python pandas developer freelance",
    "need someone to build data pipeline python pandas",
    "python pandas developer needed startup",
    "data contract work python pandas",
    "python pandas developer needed remote",
  ],
  "ML Engineer": [
    "hiring ml engineer pytorch tensorflow",
    "looking for ml engineer freelance",
    "need someone to build ml model pytorch",
    "ml engineer needed startup",
    "ml contract work pytorch tensorflow",
    "ml engineer needed remote",
  ],
  "Data Engineer": [
    "hiring data engineer spark airflow",
    "looking for data engineer freelance",
    "need someone to build data pipeline spark",
    "data engineer needed startup",
    "data contract work spark airflow",
    "data engineer needed remote",
  ],

  // ── Video Editor ──
  "YouTube": [
    "hiring youtube video editor",
    "looking for youtube editor freelance",
    "need someone to edit youtube videos",
    "youtube editor needed startup",
    "video editing contract work youtube",
    "youtube editor needed remote",
  ],
  "Reels": [
    "hiring reels video editor",
    "looking for reels editor freelance",
    "need someone to edit instagram reels",
    "reels editor needed startup",
    "video editing contract work reels",
    "reels editor needed remote",
  ],
  "Shorts": [
    "hiring shorts video editor",
    "looking for shorts editor freelance",
    "need someone to edit youtube shorts",
    "shorts editor needed startup",
    "video editing contract work shorts",
    "shorts editor needed remote",
  ],
  "Podcast": [
    "hiring podcast editor",
    "looking for podcast editor freelance",
    "need someone to edit podcast",
    "podcast editor needed startup",
    "audio editing contract work podcast",
    "podcast editor needed remote",
  ],
  "Motion Graphics": [
    "hiring motion graphics designer",
    "looking for motion graphics designer freelance",
    "need someone to create motion graphics",
    "motion graphics designer needed startup",
    "motion graphics contract work remote",
    "motion graphics designer needed remote",
  ],

  // ── Graphic Designer ──
  "Logo Designer": [
    "hiring logo designer",
    "looking for logo designer freelance",
    "need someone to design a logo",
    "logo designer needed startup",
    "design contract work logo",
    "logo designer needed remote",
  ],
  "Ad Creative Designer": [
    "hiring ad creative designer",
    "looking for ad creative designer freelance",
    "need someone to design ad creatives",
    "ad creative designer needed startup",
    "design contract work ad creatives",
    "ad creative designer needed remote",
  ],
  "Social Media Designer": [
    "hiring social media designer",
    "looking for social media designer freelance",
    "need someone to design social media posts",
    "social media designer needed startup",
    "design contract work social media",
    "social media designer needed remote",
  ],
}

export function generateQueries(niche: string): string[] {
  const queries = nicheQueries[niche]

  if (!queries) {
    console.warn("No queries found for:", niche)
    return []
  }

  return queries
}