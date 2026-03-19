import type { NextConfig } from "next";


// NORMAL PACKAGES (e.g. axios, zod)

// npm run dev / npm run build
//         ↓
// Webpack runs → bundles everything into bundle.js
//         ↓
// API route is hit
//         ↓
// Node.js runs bundle.js ← axios, zod already inside the bundle
//                           node_modules not touched anymore ✅

// // ----------------------------------------

// // apify-client WITH serverExternalPackages

// npm run dev / npm run build
//         ↓
// Webpack runs → bundles everything EXCEPT apify-client
//                (skips it completely)
//         ↓
// API route is hit
//         ↓
// Node.js runs bundle.js
//         + goes to node_modules and loads apify-client FRESH
//           right at this moment ✅

const nextConfig: NextConfig = {
  serverExternalPackages: ['apify-client']
};

export default nextConfig;
