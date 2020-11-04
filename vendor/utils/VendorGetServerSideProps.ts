import { GetServerSidePropsContext } from 'next-redux-wrapper'
import { Store } from 'redux'
import { GetServerSideProps, GetServerSidePropsResult } from 'next'
import { wrapper } from '../store/configure-store'
import { serverSidePropsCommonErrorHandler } from './serverSidePropsCommonErrorHandler'

export class Redirect404 extends Error {}

export function VendorGetServerSideProps<T>(
  getData: (
    ctx: GetServerSidePropsContext & {
      store: Store<StoreRoot>
    },
  ) => Promise<GetServerSidePropsResult<T>>,
): GetServerSideProps<T> {
  return serverSidePropsCommonErrorHandler(wrapper.getServerSideProps, getData)
}
