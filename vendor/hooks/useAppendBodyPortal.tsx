import { useState } from 'react'
import { useIsomorphicLayoutEffect } from 'react-use'

export const useAppendBodyPortal = function (enabled = true, element = 'div') {
  const [portalRef, setPortalRef] = useState<HTMLElement | null>(null)

  useIsomorphicLayoutEffect(() => {
    if (enabled) {
      const p = document.createElement(element)
      const nextRoot = document.body
      nextRoot.appendChild(p)
      setPortalRef(p)
      return () => {
        p.parentElement?.removeChild(p)
      }
    }
  }, [enabled])
  return portalRef
}
