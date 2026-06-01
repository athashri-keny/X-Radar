import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    'apify-client', 
    'proxy-agent', 
    'got', 
    'got-scraping',
    'chromadb',
    '@chroma-core/ai-embeddings-common',
    '@chroma-core/default-embed',
    '@chroma-core/openai',
  ],

  webpack: (config) => {
    config.externals = [
      ...(Array.isArray(config.externals) ? config.externals : [config.externals]),
      ({ request }: { request: string }, callback: Function) => {
        if (request?.startsWith('@chroma-core/')) {
          return callback(null, `commonjs ${request}`);
        }
        callback();
      }
    ];
    return config;
  },

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