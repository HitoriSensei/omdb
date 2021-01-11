import { HydrateAction } from './initial-state'

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
  return (store: any = initial, action: ActionOf<Actions> | HydrateAction) =>
    f(store, action) ?? store
}
