/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs uft-8-validate',
      bufferutil: 'commonjs bufferutil',
    })

    return config
  },
  swcMinify: false,
  images: {
    domains: ['uploadthing.com'],
  },
}

module.exports = nextConfig
