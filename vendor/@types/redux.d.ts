import 'redux'
declare module 'redux' {
  export interface Dispatch {
    <T extends RootAction>(action: T): T
  }
}
