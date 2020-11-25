import { useCallback } from 'react'

/**
 * Allows creating efficient callbacks with bound parameters.
 * Ex.
 * const [ finished, setFinished ] = useState<boolean>(false)
 * const onSceneComplete = useAction(setFinished, true) // calling onSceneComplete() = setFinished(true)
 *
 * return <button onClick={onSceneComplete}/>
 * @param action
 */
export function useAction<Action, T, Data = any | void>(action: () => T): () => void
export function useAction<Action, T, Data = any | void>(
  action: (payload: Data) => T,
  payload: Data,
): () => void
export function useAction<Action, T, Data = any | void>(
  action: ((payload: Data) => T) | (() => T),
  payload?: Data,
) {
  return useCallback(() => {
    return payload !== undefined ? action(payload) : (action as () => T)()
  }, [action, payload])
}
