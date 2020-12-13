import { Store } from 'redux'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { wrapper } from '../store/configure-store'
import { serverSidePropsCommonErrorHandler } from './serverSidePropsCommonErrorHandler'
import { loadStaticStoreExtensions } from './VendorGetStaticProps'
import { ParsedUrlQuery } from 'querystring'

export const GlobalServerSidePropsExtensions: Array<
  (
    ctx: GetServerSidePropsContext & {
      store: Store<StoreRoot & VendorStoreRoot>
    },
  ) => Promise<void> | void
> = [loadStaticStoreExtensions]

export function VendorGetServerSideProps<T, Q extends ParsedUrlQuery = ParsedUrlQuery>(
  getData: (
    ctx: GetServerSidePropsContext<Q> & {
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
      ctx: GetServerSidePropsContext<Q> & {
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
