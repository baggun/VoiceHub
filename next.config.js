/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
};


const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: false,
});
 

module.exports = withBundleAnalyzer(nextConfig);


// // import withBundleAnalyzer from '@next/bundle-analyzer';
// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
//   openAnalyzer: true,
// });

// // const bundleAnalyzer = withBundleAnalyzer({
// // 	enabled: process.env.ANALYZE === 'true',
// //   openAnalyzer: true,
// // })
// // module.exports = nextConfig
// module.exports = withBundleAnalyzer({
//   compress: true,
//   webpack(config, { webpack }) {
//     const prod = process.env.NODE_ENV === "production";
//     return {
//       ...config,
//       mode: prod ? "production" : "development",
//       devtool: prod ? "hidden-source-map" : "eval",

//       // reactStrictMode: false,
//       // swcMinify: true,
//       // compiler: {
//       //   // ssr and displayName are configured by default
//       //   styledComponents: true,
//       // },
//     };
//   },
// });
