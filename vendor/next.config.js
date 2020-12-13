const merge = require("./utils/mergeNextConfig")
const requireGlob = require("require-glob")
const globImporter = require('sass-glob-importer');
const packageImporter = require('node-sass-package-importer');

require('typescript-require')({
  targetES5: false,
  exitOnError: false,
  emitOnError: true,
  nodeLib: true,
  tmpDir: '.tsreq'
});

const serverRuntimeConfig = require('../config/private.ts').default();

const nextConfig = {
  images: serverRuntimeConfig.images,
  devIndicators: {
    autoPrerender: true
  },
  sassOptions: { importer: [
    packageImporter(),
    globImporter(),
  ]},
  poweredByHeader: false,
  publicRuntimeConfig: require('../config/public.ts').default(),
  serverRuntimeConfig: serverRuntimeConfig,
};

// Load mods
const mods = requireGlob.sync('./mods/*/next.config.js', {
  cwd: __dirname,
});

merge(nextConfig, ...Object.values(mods).map(m => m.nextConfig));

module.exports = nextConfig;
