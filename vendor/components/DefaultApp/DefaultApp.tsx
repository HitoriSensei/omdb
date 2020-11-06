import { AppProps } from 'next/app'
import { MuiThemeProvider } from '@material-ui/core/styles'
import { muiTheme } from 'styles/mui-theme'
import { MediaContextProvider } from 'vendor/utils/media'
import { ModalScrollFixer } from 'vendor/components/ModalScrollFixer'
import { PageTransitionScrollFixer } from 'vendor/components/PageTransitionScrollFixer'
import { Header } from 'components/Header/Header'
import { motion } from 'framer-motion'
import { Footer } from 'components/Footer/Footer'
import React, { useMemo } from 'react'
import { DefaultErrorHandler } from '../../utils/DefaultErrorHandler'

export const DefaultAppWrappers: Array<React.ComponentType> = [
  ({ children }) => <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>,
  MediaContextProvider,
]

export const DefaultAppAppends: Array<React.ComponentType> = [
  ModalScrollFixer,
  PageTransitionScrollFixer,
]

/**
 * This is the default app setup that provides useful features.
 * You create and use your own implementation providing it to VendorApp instead of DefaultApp
 *
 * @param props
 */
export const DefaultApp = (props: AppProps & { pageProps: VendorErrorProps }) => {
  const CombinedWrapper = useMemo(
    () =>
      DefaultAppWrappers.reduce(
        // eslint-disable-next-line react/display-name
        (Content, Wrapper) => (props) => (
          <Wrapper>
            <Content {...props} />
          </Wrapper>
        ),
        (({ children }) => children) as React.ComponentType,
      ),
    [DefaultAppWrappers.length],
  )
  return (
    <CombinedWrapper>
      {DefaultAppAppends.map((Append, i) => (
        <Append key={i} />
      ))}
      <Header />
      <DefaultErrorHandler key={props.router.route} {...props} />
      <Footer />
    </CombinedWrapper>
  )
}
