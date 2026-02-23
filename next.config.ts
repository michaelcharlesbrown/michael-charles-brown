import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Turbopack to use webpack (better for systems with file watcher limits)
  experimental: {
    turbo: false,
  },
};

export default nextConfig;
