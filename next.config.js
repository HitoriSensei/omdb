const vendorNextConfig = require('./vendor/next.config');
const merge = require('./vendor/utils/mergeNextConfig')

const nextConfig = merge(
    vendorNextConfig,
    require('next-transpile-modules')(['stale-while-revalidate-lru-cache'])({}),
    {
        async rewrites(){
          return [
            // Here put what you normally would put input rewrites() function result
          ]
        },
    }
);

module.exports = nextConfig;