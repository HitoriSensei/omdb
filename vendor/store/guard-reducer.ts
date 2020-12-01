import { HydrateAction } from './initial-state'
import { appInitialStore } from '../../store/app/redux'

/**
 * Type-checks reducer to implement every action of giver Actions set
 * @param initial
 * @param f
 */
export function guardReducer<
  Actions extends {
    [action: string]: ActionPayload<any> | null
  },
  Store
>(initial: Store, f: (store: Store, action: ActionOf<Actions> | HydrateAction) => Store) {
  return (store: any = appInitialStore, action: ActionOf<Actions> | HydrateAction) =>
    f(store, action) ?? store
}
