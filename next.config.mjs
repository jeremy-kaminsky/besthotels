

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'explorebesthotels.com' },
      { protocol: 'https', hostname: 'assets.hyatt.com' },
    ],
  },
}

export default nextConfig
