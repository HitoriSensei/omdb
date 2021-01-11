import Pages404 from '../../pages/404'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ReactElement } from 'react'

function ClientRedirect(props: { to: string }) {
  const { replace } = useRouter()
  replace(props.to)
  return null
}

export const DefaultErrorHandlerExtensions: Array<
  (ctx: AppProps & { pageProps: VendorErrorProps }) => ReactElement | undefined
> = [
  /**
   * Displays 404 page if server-side props fetching throws an error
   *
   * @deprecated
   * @param pageProps
   */
  ({ pageProps }) => {
    if (pageProps._is403 || pageProps._is404) {
      return <Pages404 />
    }
  },

  // Legacy
  ({ pageProps }) => {
    if (pageProps._redirect) {
      return <ClientRedirect to={pageProps._redirect} />
    }
  },
]

/**
 * @param Component
 * @param pageProps
 * @constructor
 */
export const DefaultErrorHandler = (props: AppProps & { pageProps: VendorErrorProps }) => {
  for (const handler of DefaultErrorHandlerExtensions) {
    const override = handler(props)
    if (override) {
      return override
    }
  }

  const Component = props.Component

  return <Component {...props.pageProps} />
}
