/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

const withTM = require('next-transpile-modules')(['three'])
module.exports = withTM()

module.exports = nextConfig
