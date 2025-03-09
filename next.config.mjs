/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "cdn.shopify.com",
      },
    ],
  },
    async redirects() {
      return [
        {
          source: "/", 
          destination: "/Home",
          permanent: true, 
        },
      ];
    },
  };
  
  export default nextConfig; 
  