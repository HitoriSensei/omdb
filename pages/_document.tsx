import React from 'react'
import { Html, Main, NextScript } from 'next/document'
import { GTMBody, GTMHead } from 'vendor/components/GTM'
import { Head } from 'vendor/components/Required/Head'
import { VendorDocument } from 'vendor/components/Required/VendorDocument/VendorDocument'

export default class MyDocument extends VendorDocument {
  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <script src='https://polyfill.io/v3/polyfill.min.js?features=ResizeObserver%2CIntersectionObserver%2Csmoothscroll%2CArray.isArray%2CArray.from%2CSet'></script>
          <GTMHead />
        </Head>
        <body>
          <GTMBody />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
