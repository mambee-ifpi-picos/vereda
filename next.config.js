/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')({
  dest: 'public',
  // disable: process.env.NODE_ENV === 'development',
  // register: true,
  // scope: '/app',
  // sw: 'service-worker.js',
  //...
})

module.exports = withPWA({
  // next.js config
  reactStrictMode: false,
  env: {
    FIREBASE_API_KEY: process.env.API_KEY,
  },
})
