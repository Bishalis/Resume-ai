import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["pdf-parse", "puppeteer", "puppeteer-core"],
  experimental: {
  },
};

export default nextConfig;
