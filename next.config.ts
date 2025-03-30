import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "downloader.disk.yandex.ru",
        pathname: "/disk/**",
      },
    ],
  },
};

export default nextConfig;
