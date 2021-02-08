import { AppProps } from 'next/app'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { muiTheme } from 'styles/mui-theme'
import { MediaContextProvider } from 'vendor/utils/media'
import { PageTransitionScrollFixer } from 'vendor/components/PageTransitionScrollFixer'
import Header from 'components/Header/Header'
import { Footer } from 'components/Footer/Footer'
import React, { useEffect, useMemo } from 'react'
import { DefaultErrorHandler } from '../../utils/DefaultErrorHandler'
import { CssBaseline } from '@material-ui/core'

export const DefaultAppWrappers: Array<
  React.FunctionComponent<AppProps & { children: React.ReactNode }>
> = [
  function JSS({ children }) {
    useEffect(() => {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector('#jss-server-side')
      if (jssStyles) {
        jssStyles.parentElement?.removeChild(jssStyles)
      }
    }, [])

    return <>{children}</>
  },
  function MuiTheme({ children }) {
    return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
  },
  function MediaContext({ children }) {
    return <MediaContextProvider>{children}</MediaContextProvider>
  },
]

export const DefaultContentsWrappers: Array<
  React.FunctionComponent<AppProps & { children: React.ReactNode }>
> = []

export const DefaultAppAppends: Array<React.FunctionComponent> = [PageTransitionScrollFixer]

const useCreatePageWrapper = function (
  wrappers: Array<React.FunctionComponent<AppProps & { children: React.ReactNode }>>,
) {
  return useMemo(
    () =>
      wrappers.reduceRight(
        // eslint-disable-next-line react/display-name
        (Content, Wrapper) => (props: AppProps & { children: React.ReactNode }) => (
          <Wrapper {...props}>{Content(props)}</Wrapper>
        ),
        (({ children }) => children) as React.FunctionComponent<
          AppProps & { children: React.ReactNode }
        >,
      ),

    [wrappers.length],
  )
}

/**
 * This is the default app setup that provides useful features.
 * You create and use your own implementation providing it to VendorApp instead of DefaultApp
 *
 * @param props
 */
export const DefaultApp = (props: AppProps & { pageProps: VendorErrorProps & CommonPageProps }) => {
  const CombinedWrapper = useCreatePageWrapper(DefaultAppWrappers)
  const CombinedContentsWrapper = useCreatePageWrapper(DefaultContentsWrappers)

  return (
    <CombinedWrapper {...props}>
      {DefaultAppAppends.map((Append, i) => {
        return <Append key={i} />
      })}
      <CssBaseline />
      <Header {...props.pageProps} />
      <CombinedContentsWrapper {...props}>
        <DefaultErrorHandler key={props.router.route} {...props} />
      </CombinedContentsWrapper>
      <Footer />
    </CombinedWrapper>
  )
}
