import { useEffect, useRef, useState } from 'react'

/**
 * User to trigger effects when element becomes visible in browsers viewport
 * @param startTrigger
 * @param resetTrigger
 * @param defaultVisibilityState
 */
export const useViewportVisibilityEffect = ({
  startTrigger = 0.4,
  resetTrigger = 0.0,
  defaultVisibilityState = false,
} = {}) => {
  const [isVisible, setIsVisible] = useState<boolean>(defaultVisibilityState)
  const ref = useRef<null | HTMLElement>()

  useEffect(() => {
    if (ref.current) {
      const boundingClientRect = ref.current.getBoundingClientRect()
      const startTriggerPercentage =
        startTrigger <= 1 ? startTrigger : startTrigger / boundingClientRect.height

      const resetTriggerPercentage =
        resetTrigger <= 1 ? resetTrigger : resetTrigger / boundingClientRect.height

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries.find((e) => e.isIntersecting)
          if (entry) {
            if (entry.intersectionRatio >= startTriggerPercentage) {
              setIsVisible(true)
            } else {
              if (entry.intersectionRatio <= resetTriggerPercentage) {
                setIsVisible(false)
              }
            }
          } else {
            setIsVisible(false)
          }
        },
        {
          rootMargin: '0px',
          threshold: [resetTriggerPercentage, startTriggerPercentage],
        },
      )

      observer.observe(ref.current)

      return () => {
        observer.disconnect()
      }
    }
  }, [ref.current])

  return {
    ref,
    isVisible,
  }
}
