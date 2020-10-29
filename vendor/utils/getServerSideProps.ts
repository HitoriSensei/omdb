import { GetServerSidePropsContext } from 'next-redux-wrapper'
import { Store } from 'redux'
import {
  GetServerSideProps,
  GetServerSidePropsResult,
  GetStaticProps,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from 'next'
import { wrapper } from '../store/configure-store'

export class Redirect404 extends Error {}

const commonErrorHandler = function <
  Ctx extends {
    store: Store<any, any>
  },
  P,
  V
>(getProps: (cb: (ctx: Ctx) => unknown) => V, getData: (ctx: Ctx) => P): any {
  return getProps(async (ctx) => {
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
  })
}

export function getServerSidePropsWithStore<T>(
  getData: (
    ctx: GetServerSidePropsContext & {
      store: Store<StoreRoot>
    },
  ) => Promise<GetServerSidePropsResult<T>>,
): GetServerSideProps<T> {
  return commonErrorHandler(wrapper.getServerSideProps, getData)
}

export function getStaticPropsWithStore<T>(
  getData: (
    ctx: GetStaticPropsContext & {
      store: Store<StoreRoot>
    },
  ) => Promise<GetStaticPropsResult<T>>,
): GetStaticProps<T> {
  return commonErrorHandler(wrapper.getStaticProps, getData)
}
