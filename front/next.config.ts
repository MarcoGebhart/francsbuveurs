import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**',
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**", // accepte toutes les images Cloudinary
      },
    ],
  },
};

export default nextConfig;
