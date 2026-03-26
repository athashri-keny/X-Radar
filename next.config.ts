// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['apify-client'],
  
  outputFileTracingIncludes: {
    '/api/agents/run': [
      './node_modules/apify-client/**/*',
    ],
  },
};

export default nextConfig;