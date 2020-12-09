import { useEffect, useState } from 'react'
import { IsReadyToShow } from '../../hooks/useIsReadyToShow'
import { useIsomorphicLayoutEffect } from 'react-use'

export function loadLayoutAlteringImages(
  beforeElement: HTMLElement | null,
  cb: (images: HTMLImageElement[]) => void,
): (() => void) | undefined {
  window.getComputedStyle(document.body, 'height')
  const getElementTop = function () {
    return beforeElement === null ? window.innerHeight : beforeElement.getBoundingClientRect().top
  }
  const elementTop = getElementTop()

  const htmlImageElements = Array.from(document.images).filter((img) => {
    const imageTop = img.getBoundingClientRect().top
    // Load only incomplete images that are above the element we need to scroll to.
    // Why? Because images above the element can cause layout shift when they are loaded and displayed. Elements below are (most probably) not important here.
    return !img.complete && imageTop < elementTop
  })

  let abort = false

  function complete(htmlImageElements: HTMLImageElement[]) {
    if (!abort) {
      cb(htmlImageElements)
    }
  }

  if (!htmlImageElements.length) {
    complete(htmlImageElements)
    return
  }

  let counter = 0

  const imgs = htmlImageElements.map((i) => {
    i.addEventListener('load', () => {
      counter++
      if (counter === imgs.length) {
        return complete(htmlImageElements)
      }
    })
    return () => (abort = true)
  })
}

function findElement(hash: string): { id: string; element: HTMLElement | null } {
  const id = hash.substr(1)
  const element = hash
    ? ((document.querySelector(`[data-id="${id}"]`) ||
        document.querySelector(hash)) as HTMLElement | null)
    : null
  return { id, element }
}

/**
 * Scrolls to element targeted by window.location.hash after the layout has been prepared.
 * Also uses --fixed-header-height css variable to offset scroll by fixed header height, if any
 */
export const PrepareLayoutBeforeScroll = (props: { children: React.ReactNode }) => {
  const [ready, setReady] = useState(true)

  useIsomorphicLayoutEffect(() => {
    try {
      const { id, element } = findElement(window.location.hash)

      if (element) {
        element.setAttribute('id', '')
        element.setAttribute('data-id', id)
        setReady(false)
      } else {
        setReady(true)
      }
    } catch (e) {
      console.warn(e)
    }
  }, [])

  useEffect(() => {
    try {
      const { id, element } = findElement(window.location.hash)

      if (element) {
        element.setAttribute('id', id)
        return loadLayoutAlteringImages(element, () => {
          requestAnimationFrame(() => {
            // Force layout recalculation
            window.getComputedStyle(document.body, 'height')
            const top = element!.getBoundingClientRect().top
            const scrollOffset = parseInt(
              window
                .getComputedStyle(document.documentElement)
                .getPropertyValue('--fixed-header-height'),
            )
            window.scrollBy({
              top: top - scrollOffset,
            })
            setReady(true)
          })
        })
      } else {
        setReady(true)
      }
    } catch (e) {
      console.warn(e)
    }
  }, [])

  return <IsReadyToShow.Provider value={ready}>{props.children}</IsReadyToShow.Provider>
}
