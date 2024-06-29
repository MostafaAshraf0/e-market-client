/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     domains: ['localhost','https://e-market-client.onrender.com'],
    // },
    reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'e-market-wcab.onrender.com',
        pathname: '/images',
      },
    ],
  },

    
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      },
};



export default nextConfig;
