import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ciglissime.com",
      },
      {
        protocol: "https",
        hostname: "*.ciglissime.com",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
      {
        protocol: "https",
        hostname: "*.myshopify.com",
      },
    ],
  },
};

export default nextConfig;
