import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  reactCompiler: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  serverExternalPackages: ["typescript", "twoslash"],
  typedRoutes: true,
  experimental: {
    mcpServer: true,
    turbopackFileSystemCacheForBuild: true,
    typedEnv: true,
  },
  async rewrites() {
    return [
      {
        source: "/developer/:path*.mdx",
        destination: "/developer/llms.mdx/:path*",
      },
    ];
  },
};

export default withMDX(nextConfig);
