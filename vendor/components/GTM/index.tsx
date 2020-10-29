import React from 'react'
import getConfig from 'next/config'

export const GTMHead: React.ComponentType = () => {
  const gtmid = getConfig().publicRuntimeConfig.GTM_ID
  return gtmid ? (
    <>
      {/* Google Tag Manager */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmid}');
              `,
        }}
      />
    </>
  ) : null
}

export const GTMBody: React.ComponentType = () => {
  const gtmid = getConfig().publicRuntimeConfig.GTM_ID
  return gtmid ? (
    <>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmid}`}
          height='0'
          width='0'
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      {/* End Google Tag Manager (noscript) */}
    </>
  ) : null
}
