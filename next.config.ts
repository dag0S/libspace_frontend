import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "api.libspace-gosudarev.ru",
      },
    ],
  },
};

export default nextConfig;
