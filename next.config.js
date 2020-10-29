const vendorNextConfig = require('./vendor/next.config');
const merge = require('lodash/merge')

const nextConfig = merge(
    vendorNextConfig,
    {
        publicRuntimeConfig: {
          GTM_ID: ''
        },
        staticRewrites: [
            {
                source: '/polityka-cookies',
                destination: '/api/sites/default/files/2020-06/polityka-prywatnosci-zywiec-zdroj-pl%20%281%29.pdf',
            },
        ]
    });

module.exports = nextConfig;