import { GetStaticPropsContext, GetStaticPropsResult } from 'next'
import { Store } from 'redux'

export const GlobalStaticStoreExtensions: Array<
  (
    ctx: GetStaticPropsContext & {
      store: Store<StoreRoot & VendorStoreRoot>
    },
  ) => Promise<void | Partial<GetStaticPropsResult<any>>> | void
> = []
