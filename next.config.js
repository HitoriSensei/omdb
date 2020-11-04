const vendorNextConfig = require('./vendor/next.config');
const merge = require('lodash/merge')

const nextConfig = merge(
    vendorNextConfig,
    {
        staticRewrites: [
            // Here put what you normally would put input rewrites() function result
        ]
    });

module.exports = nextConfig;