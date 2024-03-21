/** @type {import('next').NextConfig} */


const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['websocket'],
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'azariaimages.s3.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}



module.exports = nextConfig
