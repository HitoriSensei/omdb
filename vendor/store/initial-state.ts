import { HYDRATE } from 'next-redux-wrapper'
import { Action } from 'redux'

export interface HydrateAction extends Action<typeof HYDRATE> {
  payload: StoreRoot & VendorStoreRoot
}
