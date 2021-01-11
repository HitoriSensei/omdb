import { Store } from 'redux'
import { GetServerSidePropsResult, GetStaticPropsResult } from 'next'

export class BailLoadingException {
  constructor(public bailWith?: GetStaticPropsResult<void>) {}
}

export const serverSidePropsCommonErrorHandler = function <
  Ctx extends {
    store: Store<any, any>
  },
  P,
  V
>(getProps: (cb: (ctx: Ctx) => unknown) => V, getData: (ctx: Ctx) => P, isStatic: boolean): any {
  return getProps(
    async (ctx): Promise<GetServerSidePropsResult<P>> => {
      try {
        // https://dev.to/ryyppy/reason-records-nextjs-undefined-and-getstaticprops-5d46
        return JSON.parse(JSON.stringify((await getData(ctx)) || {}))
      } catch (e) {
        if (typeof e === 'object' && e instanceof BailLoadingException) {
          const result = (e.bailWith || {
            notFound: true,
          }) as GetStaticPropsResult<P>
          if (!isStatic) {
            delete (result as any).revalidate
          }
          return result
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
