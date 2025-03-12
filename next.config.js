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
  };
  
  module.exports = nextConfig;
  

  module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: "http",
          hostname: "localhost",
          port: "2000",
          pathname: "/uploads/**",
        },
      ],
    },
  };
  
 
  