import { Store } from 'redux'
import { Redirect404 } from './VendorGetServerSideProps'

export const serverSidePropsCommonErrorHandler = function <
  Ctx extends {
    store: Store<any, any>
  },
  P,
  V
>(getProps: (cb: (ctx: Ctx) => unknown) => V, getData: (ctx: Ctx) => P): any {
  return getProps(
    async (ctx): Promise<{ props: VendorErrorProps } | P> => {
      try {
        return await getData(ctx)
      } catch (e) {
        if (e instanceof Redirect404) {
          return {
            props: {
              _is404: true,
            },
          }
        } else if (e.response?.status === 403) {
          return {
            props: {
              _is403: true,
            },
          }
        }
        throw e
      }
    },
  )
}
