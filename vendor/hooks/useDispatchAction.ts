import { useDispatch } from 'react-redux'
import { useCallback } from 'react'

/**
 * Allows creating efficient redux store dispatches with bound payloads.
 * Specialized version of useAction.
 *
 * Ex.
 * const openModal = useDispatchAction(AppAction.TOGGLE_APP_MENU, true) // calling onSceneComplete() = dispatch(AppAction.TOGGLE_APP_MENU(true))
 *
 * return <button onClick={openModal}/>
 * @param action
 */
export function useDispatchAction<Action, Data = any | void, T extends Data = Data>(
  action: () => { type: Action },
): () => void
export function useDispatchAction<Action, Data = any | void>(
  action: (payload: Data) => { type: Action; payload: Data },
  payload: Data,
): () => void
export function useDispatchAction<Action, Data = any | void, T extends Data = Data>(
  action: ((payload: Data) => { type: Action; payload: Data }) | (() => { type: Action }),
  payload?: T,
) {
  const dispacher = useDispatch()
  return useCallback(() => {
    dispacher(payload !== undefined ? action(payload) : (action as () => { type: Action })())
  }, [action, payload])
}
