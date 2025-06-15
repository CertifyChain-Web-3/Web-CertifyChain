/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Disable output export which can cause issues with certain dependencies
  output: 'standalone',
  // Configure webpack to handle browser API usage during SSR
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Mock browser APIs that are not available during SSR
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        indexedDB: false
      };
    }
    return config;
  },
};

module.exports = nextConfig;
