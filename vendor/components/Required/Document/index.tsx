import _Document, { DocumentContext } from 'next/document'
import { ServerStyleSheets } from '@material-ui/core/styles'
import React from 'react'
import { DocumentInitialProps } from 'next/dist/next-server/lib/utils'

export class Document extends _Document {
  static getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> => {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets()
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      })

    const initialProps = await _Document.getInitialProps(ctx)

    return {
      ...initialProps,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    }
  }
}
