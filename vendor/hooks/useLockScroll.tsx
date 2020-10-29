import { useEffect } from 'react'
import { scrollbarWidth } from '@xobotyi/scrollbar-width'

/**
 * https://stackoverflow.com/questions/43563795/bootstrap-modal-background-scroll-on-ios
 */
export function lockScroll() {
  const scrollingElement = document.body.scrollTop ? document.body : document.documentElement
  scrollingElement.setAttribute('data-scroll', String(scrollingElement.scrollTop))

  Object.assign(document.body.style, {
    marginTop: -scrollingElement.scrollTop + 'px',
    overflow: 'hidden',
    paddingRight: scrollbarWidth() + 'px',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'fixed',
  })
}

export function unlockScroll() {
  const scrollingElement = document.body.getAttribute('data-scroll')
    ? document.body
    : document.documentElement
  const scrollTop = parseInt(scrollingElement.getAttribute('data-scroll') ?? '0')
  Object.assign(document.body.style, {
    marginTop: 0,
    paddingRight: 0,
    overflow: 'visible',
    left: 'auto',
    right: 'auto',
    top: 'auto',
    bottom: 'auto',
    position: 'static',
  })
  scrollingElement.scrollTop = scrollTop
}

export const useLockScroll = (isModalOpen: boolean): void => {
  useEffect(() => {
    if (isModalOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
  }, [isModalOpen])
}
