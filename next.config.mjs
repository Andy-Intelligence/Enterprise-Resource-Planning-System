// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
// import pwa from 'next-pwa'
// // Configuration options for Next.js
// const nextConfig = {
//   reactStrictMode: true, // Enable React strict mode for improved error handling
//   swcMinify: true,      // Enable SWC minification for improved performance
//   compiler: {
//     removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
//   },
// };

// // Configuration object tells the next-pwa plugin 
// const withPWA = pwa({
//   dest: "public", // Destination directory for the PWA files
//   disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
//   register: true, // Register the PWA service worker
//   skipWaiting: true, // Skip waiting for service worker activation
// });

// // Export the combined configuration for Next.js with PWA support
// module.exports = withPWA(nextConfig);

// const withPWA = require("next-pwa");

// module.exports = withPWA({
//   pwa: {
//     dest: "public",
//     disable: process.env.NODE_ENV === "development",
//     register: true,
//     skipWaiting: true,
//   },
//   reactStrictMode: true,
//   swcMinify: true,
//   webpack: (config) => {
//     // Optionally, add custom webpack configuration here
//     return config;
//   },
// });


import pwa from "next-pwa";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development",
  },
};

const withPWAConfig = pwa({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,

});

const withPWA = (nextConfig) => {
  return withPWAConfig(nextConfig);
};

export default withPWA(nextConfig);
