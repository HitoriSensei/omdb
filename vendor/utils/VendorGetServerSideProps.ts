import { GetServerSidePropsContext } from 'next-redux-wrapper'
import { Store } from 'redux'
import { GetServerSideProps, GetServerSidePropsResult } from 'next'
import { wrapper } from '../store/configure-store'
import { serverSidePropsCommonErrorHandler } from './serverSidePropsCommonErrorHandler'

/**
 * @deprecated use `redirect` in getStaticProps/getServerSideProps:
 * https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export class Redirect {
  constructor(public path: string) {}
}

/**
 * @deprecated use `notFound` in getStaticProps/getServerSideProps:
 * https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 */
export class Redirect404 extends Redirect {
  constructor() {
    super('/404')
  }
}

export const GlobalServerSidePropsExtensions: Array<(
  ctx: GetServerSidePropsContext & {
    store: Store<StoreRoot & VendorStoreRoot>
  },
) => Promise<void>> = []

export function VendorGetServerSideProps<T>(
  getData: (
    ctx: GetServerSidePropsContext & {
      store: Store<StoreRoot>
    },
  ) => GetServerSidePropsResult<T> | Promise<GetServerSidePropsResult<T>> = async function <T>() {
    return { props: {} as T }
  },
): GetServerSideProps<T> {
  return serverSidePropsCommonErrorHandler(
    wrapper.getServerSideProps,
    async (
      ctx: GetServerSidePropsContext & {
        store: Store<StoreRoot & VendorStoreRoot>
      },
    ) => {
      if (GlobalServerSidePropsExtensions.length) {
        await Promise.all(GlobalServerSidePropsExtensions.map((cb) => cb(ctx)))
      }
      return getData(ctx)
    },
  )
}
