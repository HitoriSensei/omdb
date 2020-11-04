const merge = require('lodash/merge')
const requireGlob = require("require-glob");

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

// Load mods
const mods = requireGlob.sync('mods/*/next.config.js');

for(const mod in mods) {
  merge(nextConfig, mods[mod].nextConfig)
}

module.exports = nextConfig;