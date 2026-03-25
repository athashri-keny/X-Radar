import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['apify-client'],
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [...(config.externals || []), 'apify-client']
    }
    return config
  }
};

export default nextConfig;