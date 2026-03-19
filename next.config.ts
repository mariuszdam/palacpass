import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "palacpass.pl",
      },
      {
        protocol: "https",
        hostname: "uqkbgkxqwnyinzfgrwec.supabase.co",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
