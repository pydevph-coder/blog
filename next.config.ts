/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Explicitly disable Turbopack to avoid symlink permission issues on Windows
  experimental: {
    turbo: false,
  },
};

module.exports = nextConfig;
