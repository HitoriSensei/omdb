import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import createSagaMiddleware from 'redux-saga'
import { rootReducer } from '../../store/root-reducer'
import { createWrapper } from 'next-redux-wrapper'

export function configureStore() {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

  return store
}

// export an assembled wrapper
export const wrapper = createWrapper<StoreRoot>(configureStore, {
  debug: process.env.NODE_ENV === 'development',
})

export function GenerateActions<
  Actions extends { [type: string]: ActionPayload<{ [key: string]: unknown }> | null }
>(): {
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
        return (payload: unknown) => ({
          type: p,
          payload: payload,
        })
      },
    },
  )
}
