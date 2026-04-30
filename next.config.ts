import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Шинэ remotePatterns ашиглая – порт, замыг нь тодорхой заана
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "202.70.34.58",
        port: "8000",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;
