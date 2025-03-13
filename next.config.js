
  

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
  
  /** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["res.cloudinary.com"], // Add Cloudinary domain
  },
};

module.exports = nextConfig;

 
  