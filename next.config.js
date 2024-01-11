/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io', 'via.placeholder'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
