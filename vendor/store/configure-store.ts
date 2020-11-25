import { combineReducers, createStore, ReducersMapObject } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { createWrapper } from 'next-redux-wrapper'
import rootReducer from '../../store/root-reducer'
import memoizee from 'memoizee'

export const StoreReducerExtensions: ReducersMapObject<StoreRoot & VendorStoreRoot> = {
  ...rootReducer,
} as ReducersMapObject<StoreRoot & VendorStoreRoot>

export function configureStore() {
  const withVendorReducer = combineReducers<StoreRoot & VendorStoreRoot>(StoreReducerExtensions)
  return createStore(withVendorReducer, composeWithDevTools())
}

// export an assembled wrapper
export const wrapper = createWrapper<StoreRoot & VendorStoreRoot>(configureStore, {
  debug: process.env.NODE_ENV === 'development',
  // https://dev.to/ryyppy/reason-records-nextjs-undefined-and-getstaticprops-5d46
  serializeState: (state) => JSON.parse(JSON.stringify(state)),
})

const getActionCreator = memoizee(
  (p: unknown) => (payload: unknown) => ({
    type: p,
    payload: payload,
  }),
  {
    primitive: true,
  },
)

export function GenerateActions<Actions extends unknown>(): {
  [Action in keyof Actions]: Actions[Action] extends ActionPayload<infer Data>
    ? (payload: Data) => { type: Action; payload: Data }
    : () => { type: Action }
} {
  return new Proxy(
    {} as {
      [Action in keyof Actions]: Actions[Action] extends ActionPayload<infer Data>
        ? (payload: Data) => { type: Action; payload: Data }
        : () => { type: Action }
    },
    {
      get(target, p: keyof Actions) {
        return getActionCreator(p)
      },
    },
  )
}
