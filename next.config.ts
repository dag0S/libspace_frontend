import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: process.env.NEXT_PUBLIC_DOMAIN as string,
      },
    ],
  },
};

export default nextConfig;
