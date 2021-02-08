import { useCallback } from 'react'

const isEvent = function (e: unknown | Event): e is Event {
  return Boolean(e && typeof e === 'object' && 'stopPropagation' in e)
}
export const useStopPropagation = <T extends [any], R>(f: (...args: T) => R) =>
  useCallback(
    (...args: T): R => {
      const e = args[0]
      console.log(e)
      if (isEvent(e)) {
        console.log('is event')
        e.stopPropagation()
      }
      return f(...args)
    },
    [f],
  )
