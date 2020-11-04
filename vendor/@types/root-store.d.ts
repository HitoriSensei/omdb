/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/ban-types */

declare interface StoreRoot {}

declare interface VendorStoreRoot {
  vendor: {
    version: 1
  }
}

declare interface StoreActions {}

declare interface VendorActions {}

declare type ActionPayload<Payload extends { [key: string]: unknown }> = {}

declare type Values<T extends any> = T[keyof T]

declare type ActionsMap<
  Actions extends {
    [action: string]: ActionPayload<{}> | null
  }
> = {
  [Action in keyof Actions]: Actions[Action] extends ActionPayload<infer Data>
    ? { type: Action; payload: Data }
    : { type: Action }
}

declare type ActionOf<
  Actions extends {
    [action: string]: ActionPayload<{}> | null
  }
> = Values<ActionsMap<Actions>>

declare interface StoreActions {
  __NEXT_REDUX_WRAPPER_HYDRATE__: {
    type: '__NEXT_REDUX_WRAPPER_HYDRATE__'
    payload: StoreRoot & VendorStoreRoot
  }
}
