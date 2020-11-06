const merge = require("./utils/mergeNextConfig")
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
};

// Load mods
const mods = requireGlob.sync('./mods/*/next.config.js', {
  cwd: __dirname,
});

merge(nextConfig, ...Object.values(mods).map(m => m.nextConfig));

module.exports = nextConfig;