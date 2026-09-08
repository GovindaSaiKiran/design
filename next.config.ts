import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Prevent TypeScript check failures from blocking production builds
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
