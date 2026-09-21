import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for GitHub Pages (see scripts/build-pages.mjs).
  ...(process.env.PAGES_EXPORT ? { output: "export" as const, images: { unoptimized: true } } : {}),
};

export default nextConfig;
