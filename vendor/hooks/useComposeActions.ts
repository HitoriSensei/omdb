import { useCallback } from 'react'

export const useComposeActions = (...actionCallbacks: Array<() => void>): (() => void) => {
  return useCallback(() => {
    for (const cb of actionCallbacks) {
      cb()
    }
  }, actionCallbacks)
}
