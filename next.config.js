/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["images.unsplash.com", "localhost"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
      },
    ],
    formats: ["image/webp"],
  },
};

module.exports = nextConfig;
