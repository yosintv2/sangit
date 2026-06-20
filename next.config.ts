import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export only at build time; dev runs without the constraint so dynamic
  // routes (e.g. /postal/[code]) resolve on-demand without needing generateStaticParams.
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    webpackMemoryOptimizations: true,
  },
};

export default nextConfig;
