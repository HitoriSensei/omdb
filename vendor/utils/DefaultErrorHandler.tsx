import React from 'react'
import Pages404 from '../../pages/404'
import { AppProps } from 'next/app'

/**
 * Early version
 * Displays 404 page if server-side props fetching throws an error
 *
 * @param Component
 * @param pageProps
 * @constructor
 */
export const DefaultErrorHandler = <T extends any>({
  Component,
  pageProps,
}: AppProps & { pageProps: VendorErrorProps }) => {
  return pageProps._is403 || pageProps._is404 ? <Pages404 /> : <Component {...pageProps} />
}
