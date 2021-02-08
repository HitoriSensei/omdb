const vendorNextConfig = require('./vendor/next.config');
const merge = require('./vendor/utils/mergeNextConfig');

if(!process.env.OMDB_APIKEY) {
  console.error("Please set OMDB_APIKEY environmental variable")
  process.exit(1)
}

const nextConfig = merge(
    vendorNextConfig,
    require('next-transpile-modules')(['stale-while-revalidate-lru-cache'])({}),
    {
        env: {
          OMDB_APIKEY: process.env.OMDB_APIKEY,
        },
        async redirects(){
          return [
            {
              source: '/details/:id',
              destination: 'https://www.imdb.com/title/:id',
              permanent: false
            }
          ]
        },
    }
);

module.exports = nextConfig;