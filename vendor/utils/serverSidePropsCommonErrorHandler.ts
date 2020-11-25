import { Store } from 'redux'
import { Redirect, Redirect404 } from './VendorGetServerSideProps'
import { GetServerSidePropsResult } from 'next'

export const serverSidePropsCommonErrorHandler = function <
  Ctx extends {
    store: Store<any, any>
  },
  P,
  V
>(getProps: (cb: (ctx: Ctx) => unknown) => V, getData: (ctx: Ctx) => P): any {
  return getProps(
    async (ctx): Promise<GetServerSidePropsResult<P>> => {
      try {
        // https://dev.to/ryyppy/reason-records-nextjs-undefined-and-getstaticprops-5d46
        return JSON.parse(JSON.stringify(await getData(ctx)))
      } catch (e) {
        if (e instanceof Redirect404) {
          return {
            notFound: true,
          }
        } else if (e instanceof Redirect) {
          return {
            redirect: {
              destination: e.path,
              permanent: false,
            },
          }
        } else if (e.response?.status === 403) {
          console.warn('Found 403 in', e.response)
          return {
            notFound: true,
          }
        }
        throw e
      }
    },
  )
}
