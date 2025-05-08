import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["plus.unsplash.com", "imagedelivery.net"],
  },
};

export default nextConfig;
