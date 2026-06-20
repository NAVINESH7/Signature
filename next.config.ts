import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "nlinacwaznfnmordxszg.supabase.co",
      },
    ],
  },
};

export default nextConfig;