import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['apify-client', 'proxy-agent', 'got', 'got-scraping'],

  outputFileTracingIncludes: {
    '/api/agents/run': [
      './node_modules/apify-client/**/*',
      './node_modules/proxy-agent/**/*',
      './node_modules/got/**/*',
      './node_modules/got-scraping/**/*',
    ],
  },
};

export default nextConfig;