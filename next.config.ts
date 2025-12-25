import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  typedRoutes: true,
  experimental: {
    mcpServer: true,
    turbopackFileSystemCacheForBuild: true,
    typedEnv: true,
  },
};

export default nextConfig;
