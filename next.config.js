/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_S3_URL, "baggun.s3.ap-northeast-2.amazonaws.com"]
  },
  compiler: {
    styledComponents: true,
  },
};


const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});
 

module.exports = withBundleAnalyzer(nextConfig);