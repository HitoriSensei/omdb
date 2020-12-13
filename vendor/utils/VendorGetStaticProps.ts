import { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { Store } from 'redux'
import { wrapper } from '../store/configure-store'
import { serverSidePropsCommonErrorHandler } from './serverSidePropsCommonErrorHandler'
import { ParsedUrlQuery } from 'querystring'

export const GlobalStaticStoreExtensions: Array<
  (
    ctx: GetStaticPropsContext & {
      store: Store<StoreRoot & VendorStoreRoot>
    },
  ) => Promise<void> | void
> = []

const emptyProps = async function <T>() {
  return { props: {} as T }
}

export const loadStaticStoreExtensions = async function (
  ctx: GetStaticPropsContext & { store: Store<StoreRoot & VendorStoreRoot, any> },
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
  ) => GetStaticPropsResult<T> | Promise<GetStaticPropsResult<T> | void> | void = emptyProps,
) {
  return serverSidePropsCommonErrorHandler(wrapper.getStaticProps, async (ctx) => {
    await loadStaticStoreExtensions(ctx)
    return Promise.resolve(getProps(ctx))
  })
}
