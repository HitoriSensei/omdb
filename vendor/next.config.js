const nextConfig = {
  devIndicators: {
    autoPrerender: true
  },
  publicRuntimeConfig: require('../config/public.json'),
  serverRuntimeConfig: require('../config/private.json'),
  staticRewrites: [
    {
      source: '/sitemap.xml',
      destination: '/api/sitemap.xml',
    },
  ],
  async rewrites() {
    return [
      ...this.staticRewrites
    ]
  },
};

module.exports = nextConfig;