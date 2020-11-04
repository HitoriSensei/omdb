import { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { Store } from 'redux'
import { wrapper } from '../store/configure-store'
import { serverSidePropsCommonErrorHandler } from './serverSidePropsCommonErrorHandler'

export const GlobalStaticStoreExtensions: Array<(
  ctx: GetStaticPropsContext & {
    store: Store<StoreRoot & VendorStoreRoot>
  },
) => Promise<void>> = []

const emptyProps = async function <T>() {
  return { props: {} as T }
}

export function VendorGetStaticProps<T>(
  getProps: (
    ctx: GetStaticPropsContext & {
      store: Store<StoreRoot>
    },
  ) => Promise<GetStaticPropsResult<T>> = emptyProps,
) {
  return serverSidePropsCommonErrorHandler(wrapper.getStaticProps, async (ctx) => {
    if (GlobalStaticStoreExtensions.length) {
      await Promise.all(GlobalStaticStoreExtensions.map((cb) => cb(ctx)))
    }
    return getProps(ctx)
  })
}
