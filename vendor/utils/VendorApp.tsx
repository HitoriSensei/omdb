import React from 'react'
import { AppProps } from 'next/app'
import { StylesProvider } from '@material-ui/core/styles'
import { wrapper } from 'vendor/store/configure-store'

export const VendorApp = (Component: React.ComponentType<AppProps>) => {
  const VendorAppWrapper = (props: AppProps) => {
    React.useEffect(() => {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side')
      if (jssStyles) {
        jssStyles.parentElement!.removeChild(jssStyles)
      }
    }, [])

    return (
      <StylesProvider injectFirst>
        <Component {...props} />
      </StylesProvider>
    )
  }

  return wrapper.withRedux(VendorAppWrapper)
}
