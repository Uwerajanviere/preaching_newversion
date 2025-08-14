/** @type {import('next').NextConfig} */
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Prevent static generation of problematic pages
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  // Force dynamic rendering for search page
  async generateStaticParams() {
    return [];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(new MiniCssExtractPlugin());
    }
    return config;
  },
}

export default nextConfig
