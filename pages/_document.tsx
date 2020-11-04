import React from 'react'
import { Html, Main, NextScript } from 'next/document'
import { Head } from 'vendor/components/Required/Head'
import { VendorDocument } from 'vendor/components/Required/VendorDocument/VendorDocument'

export default class MyDocument extends VendorDocument {
  render(): JSX.Element {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
