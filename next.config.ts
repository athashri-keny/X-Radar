import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['apify-client'],
  turbopack: {},  // ✅ silences turbopack conflict
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), 'apify-client']
    }
    return config
  }
};

export default nextConfig;