const merge = require('lodash/merge')
const requireGlob = require("require-glob")
require('typescript-require')({
  targetES5: false,
  exitOnError: false,
  emitOnError: true,
  nodeLib: true,
  tmpDir: '.tsreq'
});

const nextConfig = {
  devIndicators: {
    autoPrerender: true
  },
  poweredByHeader: false,
  publicRuntimeConfig: require('../config/public.ts').default(),
  serverRuntimeConfig: require('../config/private.ts').default(),
  staticRewrites: [],
  async rewrites() {
    return [
      ...this.staticRewrites
    ]
  },
};

// Load mods
const mods = requireGlob.sync('./mods/*/next.config.js', {
  cwd: __dirname,
});

for(const mod in mods) {
  merge(nextConfig, mods[mod].nextConfig)
}

module.exports = nextConfig;