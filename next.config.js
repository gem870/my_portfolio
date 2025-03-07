/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "http",
          hostname: "192.168.56.1",
          port: "3000",
          pathname: "/uploads/**",
        },
      ],
    },
    async headers() {
      return [
        {
          source: "/api/:path*",
          headers: [
            {
              key: "Access-Control-Allow-Origin",
              value: "http://localhost:3000",
            },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET,OPTIONS,POST",
            },
            {
              key: "Access-Control-Allow-Headers",
              value: "Content-Type, Authorization",
            },
          ],
        },
      ];
    },
  };
  
  module.exports = nextConfig;
  
 
  