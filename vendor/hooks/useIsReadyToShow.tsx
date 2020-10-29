import { createContext, useContext } from 'react'

export const IsReadyToShow = createContext(true)

export function useIsReadyToShow(): boolean {
  return useContext(IsReadyToShow)
}
