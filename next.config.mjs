/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost','https://e-market-client.onrender.com/'],
    },
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      },
};



export default nextConfig;
