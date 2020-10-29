import 'react-redux'

declare module 'react-redux' {
  interface DefaultRootState extends StoreRoot {}
}
