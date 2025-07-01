import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features for better production performance
  experimental: {
    // Reduce memory usage in serverless environments
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  
  // Optimize for production deployment
  ...(process.env.NODE_ENV === 'production' && {
    output: 'standalone',
    
    // Reduce bundle size
    webpack: (config: { externals: string[] }) => {
      config.externals.push('@prisma/client')
      return config
    },
  }),
  
  // Improve static file handling
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Better error handling in production
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;
