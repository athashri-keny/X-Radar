export const nicheQueries: Record<string, string[]> = {
  // ── React ──
  "React": [
    "need a React developer",
    "looking for a React developer",
    "need someone to build in React",
    "anyone know a good React developer",
    "need a freelancer to build in React",
    "hiring a React developer",
  ],

  // ── Next.js ──
  "Next.js": [
    "need a Next.js developer",
    "looking for a Next.js developer",
    "need someone to build in Next.js",
    "anyone know a good Next.js developer",
    "need a freelancer to build in Next.js",
    "hiring a Next.js developer",
  ],

  // ── Vue ──
  "Vue": [
    "need a Vue developer",
    "looking for a Vue developer",
    "need someone to build in Vue",
    "anyone know a good Vue developer",
    "hiring a Vue developer",
  ],

  // ── Angular ──
  "Angular": [
    "need an Angular developer",
    "looking for an Angular developer",
    "need someone to build in Angular",
    "anyone know a good Angular developer",
    "hiring an Angular developer",
  ],

  // ── Node.js ──
  "Node.js": [
    "need a Node.js developer",
    "looking for a Node.js developer",
    "need someone to build with Node.js",
    "anyone know a good Node.js developer",
    "hiring a Node.js developer",
  ],

  // ── Python ──
  "Python": [
    "need a Python developer",
    "looking for a Python developer",
    "need someone to build a Python script",
    "anyone know a good Python developer",
    "need a freelancer to build in Python",
    "hiring a Python developer",
  ],

  // ── Django ──
  "Django": [
    "need a Django developer",
    "looking for a Django developer",
    "need someone to build in Django",
    "anyone know a good Django developer",
    "hiring a Django developer",
  ],

  // ── Laravel ──
  "Laravel": [
    "need a Laravel developer",
    "looking for a Laravel developer",
    "need someone to build in Laravel",
    "anyone know a good Laravel developer",
    "hiring a Laravel developer",
  ],

  // ── Flutter ──
  "Flutter": [
    "need a Flutter developer",
    "looking for a Flutter developer",
    "need someone to build a Flutter app",
    "anyone know a good Flutter developer",
    "hiring a Flutter developer",
  ],

  // ── React Native ──
  "React Native": [
    "need a React Native developer",
    "looking for a React Native developer",
    "need someone to build a React Native app",
    "anyone know a good React Native developer",
    "hiring a React Native developer",
  ],

  // ── Full Stack ──
  "Full Stack": [
    "need a full stack developer",
    "looking for a full stack developer",
    "need someone to build my web app",
    "anyone know a good full stack developer",
    "need a freelancer to build my app",
    "hiring a full stack developer",
  ],

  // ── Frontend ──
  "Frontend": [
    "need a frontend developer",
    "looking for a frontend developer",
    "need someone to build my UI",
    "anyone know a good frontend developer",
    "need a freelancer to build my website",
    "hiring a frontend developer",
  ],

  // ── Backend ──
  "Backend": [
    "need a backend developer",
    "looking for a backend developer",
    "need someone to build my API",
    "anyone know a good backend developer",
    "need a freelancer to build my backend",
    "hiring a backend developer",
  ],

  // ── YouTube ──
  "YouTube": [
    "need a YouTube video editor",
    "looking for a YouTube editor",
    "need someone to edit my YouTube videos",
    "anyone know a good YouTube editor",
    "need a freelance YouTube editor",
    "hiring a YouTube video editor",
  ],

  // ── Reels ──
  "Reels": [
    "need a Reels editor",
    "looking for a Reels editor",
    "need someone to edit my Instagram Reels",
    "anyone know a good Reels editor",
    "need a freelance Reels editor",
    "hiring a Reels editor",
  ],

  // ── Shorts ──
  "Shorts": [
    "need a Shorts editor",
    "looking for a Shorts editor",
    "need someone to edit my YouTube Shorts",
    "anyone know a good Shorts editor",
    "need a freelance short form editor",
    "hiring a Shorts editor",
  ],

  // ── Podcast ──
  "Podcast": [
    "need a podcast editor",
    "looking for a podcast editor",
    "need someone to edit my podcast",
    "anyone know a good podcast editor",
    "need a freelance podcast editor",
    "hiring a podcast editor",
  ],

  // ── Motion Graphics ──
  "Motion Graphics": [
    "need a motion graphics designer",
    "looking for a motion graphics artist",
    "need someone to create motion graphics",
    "anyone know a good motion graphics designer",
    "need a freelance animator for my videos",
    "hiring a motion graphics designer",
  ],
}

export function generateQueries(niche: string): string[] {
  const queries = nicheQueries[niche]

  if (!queries) {
    console.warn("No queries found for:", niche)
    return []
  }

  console.log("Generating queries", queries)
  return queries  
}
