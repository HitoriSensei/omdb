import { AppProps } from 'next/app'
import React from 'react'
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles'
import 'vendor/styles/normalize.scss'
import 'vendor/styles/global.scss'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { wrapper } from '../vendor/store/configure-store'
import { muiTheme } from '../styles/mui-theme'
import { MediaContextProvider } from '../vendor/utils/media'
import { motion } from 'framer-motion'
import { PageTransitionScrollFixer } from '../vendor/components/PageTransitionScrollFixer'
import { ModalScrollFixer } from '../vendor/components/ModalScrollFixer'
import { useVendorApp } from '../vendor/hooks/useVendorApp'

const RootApp = ({ Component, pageProps, router }: AppProps) => {
  useVendorApp()

  return (
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={muiTheme}>
        <MediaContextProvider>
          <ModalScrollFixer />
          <PageTransitionScrollFixer />
          <Header />
          <motion.div className='root' animate='enter'>
            <Component key={router.route} {...pageProps} />
          </motion.div>
          <Footer />
        </MediaContextProvider>
      </MuiThemeProvider>
    </StylesProvider>
  )
}

export default wrapper.withRedux(RootApp)
