import { useEffect, useState } from 'react'

export const useIsServer = function () {
  // isServer is needed to prevent double component rendering on SSR
  const [isServer, setIsServer] = useState(true)
  useEffect(() => setIsServer(false), [])
  return isServer
}
