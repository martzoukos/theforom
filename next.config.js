const { withSuperjson } = require('next-superjson')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'theforom.s3.eu-central-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'theforom.com',
      },
    ],
  },
}

module.exports = withSuperjson()(nextConfig)