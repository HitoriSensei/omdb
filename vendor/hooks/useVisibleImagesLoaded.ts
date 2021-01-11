import { useEffect, useRef, useState } from 'react'
import { loadLayoutAlteringImages } from '../components/PrepareLayoutBeforeScroll'

/**
 * Returns the loaded state of images (only those in viewport) within {ref} component.
 * Pass changed deps to force rechecking.
 * @param deps
 */
export const useVisibleImagesLoaded = (...deps: any[]) => {
  const [visibleImagedLoaded, setReady] = useState(true)
  const ref = useRef<any | null>(null)

  useEffect(() => {
    const current = ref.current
    if (current) {
      try {
        setReady(false)
        return loadLayoutAlteringImages(
          {
            insideElement: current,
          },
          () => {
            setReady(true)
          },
        )
      } catch (e) {
        console.warn(e)
        setReady(true)
      }
    }
  }, [ref.current, ...deps])

  return { ref, loaded: visibleImagedLoaded }
}
