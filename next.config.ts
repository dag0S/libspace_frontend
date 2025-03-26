import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "downloader.disk.yandex.ru",
      },
    ],
  },
};

export default nextConfig;
