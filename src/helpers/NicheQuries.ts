export const nicheQueries: Record<string, string[]> = {
  // ── Developer ──
  "React": [
    "looking for a React developer",
    "need a freelance React developer",
    "hiring React developer",
    "React developer job opening",
    "React developer remote job",
  ],
  "Next.js": [
    "looking for a Next.js developer",
    "need a freelance Next.js dev",
    "hiring Next.js developer",
    "Next.js developer job opening",
    "Next.js developer remote job",
  ],
  "Vue": [
    "looking for a Vue developer",
    "need a Vue.js developer",
    "hiring Vue developer",
    "Vue developer job opening",
    "Vue developer remote job",
  ],
  "Angular": [
    "looking for an Angular developer",
    "need a freelance Angular dev",
    "hiring Angular developer",
    "Angular developer job opening",
    "Angular developer remote job",
  ],
  "Node.js": [
    "looking for a Node.js developer",
    "need a freelance Node.js dev",
    "hiring Node.js developer",
    "Node.js developer job opening",
    "Node.js backend developer remote",
  ],
  "Python": [
    "looking for a Python developer",
    "need a freelance Python dev",
    "hiring Python developer",
    "Python developer job opening",
    "Python developer remote job",
  ],
  "Django": [
    "looking for a Django developer",
    "need a freelance Django dev",
    "hiring Django developer",
    "Django developer job opening",
    "Django developer remote job",
  ],
  "Laravel": [
    "looking for a Laravel developer",
    "need a freelance Laravel dev",
    "hiring Laravel developer",
    "Laravel developer job opening",
    "Laravel developer remote job",
  ],
  "Flutter": [
    "looking for a Flutter developer",
    "need a freelance Flutter dev",
    "hiring Flutter developer",
    "Flutter developer job opening",
    "Flutter mobile developer remote",
  ],
  "React Native": [
    "looking for a React Native developer",
    "need a freelance React Native dev",
    "hiring React Native developer",
    "React Native developer job opening",
    "React Native developer remote job",
  ],
  "Full Stack": [
    "looking for a full stack developer",
    "need a freelance full stack dev",
    "hiring full stack developer",
    "full stack developer job opening",
    "full stack developer remote job",
  ],
  "Frontend": [
    "looking for a frontend developer",
    "need a freelance frontend dev",
    "hiring frontend developer",
    "frontend developer job opening",
    "frontend developer remote job",
  ],
  "Backend": [
    "looking for a backend developer",
    "need a freelance backend dev",
    "hiring backend developer",
    "backend developer job opening",
    "backend developer remote job",
  ],

  // ── Video Editor ──
  "YouTube": [
    "looking for a YouTube video editor",
    "need someone to edit my YouTube videos",
    "hiring YouTube editor",
    "YouTube editor job opening",
    "video editor needed for YouTube channel",
  ],
  "Reels": [
    "looking for a Reels editor",
    "need someone to edit my Instagram Reels",
    "hiring Reels video editor",
    "Reels editor job opening",
    "social media editor needed for Reels",
  ],
  "Shorts": [
    "looking for a Shorts editor",
    "need someone to edit my YouTube Shorts",
    "hiring Shorts video editor",
    "Shorts editor job opening",
    "short form video editor needed",
  ],
  "Podcast": [
    "looking for a podcast editor",
    "need someone to edit my podcast",
    "hiring podcast editor",
    "podcast editor job opening",
    "audio video editor needed for podcast",
  ],
  "Motion Graphics": [
    "looking for a motion graphics designer",
    "need someone to create motion graphics",
    "hiring motion graphics editor",
    "motion graphics job opening",
    "motion designer needed for video content",
  ],


    // ── Graphic Desginer ──
"Logo Designer": [
    "looking for a logo designer",
    "need a freelance logo designer",
    "hiring logo designer",
    "logo designer job opening",
    "logo designer remote job",
  ],
  "Ad Creative Designer": [
    "looking for an ad creative designer",
    "need a freelance ad designer",
    "hiring ad creative designer",
    "ad creative designer job opening",
    "ad creative designer remote job",
  ],
  "Social Media Designer": [
    "looking for a social media designer",
    "need a freelance social media designer",
    "hiring social media designer",
    "social media designer job opening",
    "social media designer remote job",
  ],
}

export function generateQueries(niche: string): string[] {
  const queries = nicheQueries[niche] // accessing the array[] key with the niche word

  if (!queries) {
    console.warn("No queries found for:", niche)
    return []
  }

  console.log("Generating queries for:", niche, queries)
  return queries
}