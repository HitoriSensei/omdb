import { Store } from 'redux'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { wrapper } from '../store/configure-store'
import { serverSidePropsCommonErrorHandler } from './serverSidePropsCommonErrorHandler'
import { loadStaticStoreExtensions } from './VendorGetStaticProps'

export const GlobalServerSidePropsExtensions: Array<(
  ctx: GetServerSidePropsContext & {
    store: Store<StoreRoot & VendorStoreRoot>
  },
) => Promise<void> | void> = [loadStaticStoreExtensions]

export function VendorGetServerSideProps<T>(
  getData: (
    ctx: GetServerSidePropsContext & {
      store: Store<StoreRoot>
    },
  ) =>
    | GetServerSidePropsResult<T>
    | void
    | Promise<GetServerSidePropsResult<T> | void> = async function <T>() {
    return { props: {} as T }
  },
): GetServerSideProps<T> {
  return serverSidePropsCommonErrorHandler(
    wrapper.getServerSideProps as any,
    async (
      ctx: GetServerSidePropsContext & {
        store: Store<StoreRoot & VendorStoreRoot>
      },
    ) => {
      if (GlobalServerSidePropsExtensions.length) {
        await Promise.all(GlobalServerSidePropsExtensions.map((cb) => Promise.resolve(cb(ctx))))
      }
      return getData(ctx)
    },
  )
}
