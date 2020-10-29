import { combineReducers } from 'redux'
import { appReducer } from './app/redux'

export const rootReducer = combineReducers<StoreRoot>({
  app: appReducer,
})
