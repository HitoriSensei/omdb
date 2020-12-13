import Pages404 from '../../pages/404'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'

function ClientRedirect(props: { to: string }) {
  const { replace } = useRouter()
  replace(props.to)
  return null
}

/**
 * Early version
 * Displays 404 page if server-side props fetching throws an error
 *
 * @param Component
 * @param pageProps
 * @constructor
 */
export const DefaultErrorHandler = ({
  Component,
  pageProps,
}: AppProps & { pageProps: VendorErrorProps }) => {
  return pageProps._is403 || pageProps._is404 ? (
    <Pages404 />
  ) : pageProps._redirect ? (
    <ClientRedirect to={pageProps._redirect} />
  ) : (
    <Component {...pageProps} />
  )
}
