import { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { Store } from 'redux'
import { wrapper } from '../store/configure-store'
import { serverSidePropsCommonErrorHandler } from './serverSidePropsCommonErrorHandler'
import { ParsedUrlQuery } from 'querystring'
import { GlobalStaticPropsDecorators } from 'vendor/utils/VendorGetStaticPropsDecorators'
import { GlobalStaticStoreExtensions } from 'vendor/utils/GlobalStaticStoreExtensions'

export const loadStaticStoreExtensions = async function (
  ctx: GetStaticPropsContext & {
    store: Store<StoreRoot & VendorStoreRoot, any>
  },
) {
  if (GlobalStaticStoreExtensions.length) {
    await Promise.all(GlobalStaticStoreExtensions.map((cb) => Promise.resolve(cb(ctx))))
  }
}

export function VendorGetStaticProps<T, Q extends ParsedUrlQuery = ParsedUrlQuery>(
  getProps: (
    ctx: GetStaticPropsContext<Q> & {
      store: Store<StoreRoot>
    },
  ) =>
    | GetStaticPropsResult<T>
    | Promise<GetStaticPropsResult<T> | undefined | void>
    | undefined
    | void = () => ({
    props: {} as T,
  }),
) {
  return serverSidePropsCommonErrorHandler(
    wrapper.getStaticProps,
    async (ctx) => {
      await loadStaticStoreExtensions(ctx)
      let returnProps: GetStaticPropsResult<T> | undefined = (await getProps(ctx)) || undefined
      for (const decorator of GlobalStaticPropsDecorators) {
        returnProps ||= await decorator(returnProps)
      }
      return returnProps
    },
    true,
  )
}
