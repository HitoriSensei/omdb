import { useEffect } from 'react'
import { scrollbarWidth } from '@xobotyi/scrollbar-width'

/**
 * https://stackoverflow.com/questions/43563795/bootstrap-modal-background-scroll-on-ios
 */
export function lockScroll() {
  const scrollingElement = document.body.scrollTop ? document.body : document.documentElement
  scrollingElement.setAttribute('data-scroll', String(scrollingElement.scrollTop))

  const scrollBarWidth =
    scrollingElement.scrollHeight > scrollingElement.clientHeight ? scrollbarWidth() : 0

  document.documentElement.style.setProperty('--scrollbar-padding', `${scrollBarWidth}px`)

  Object.assign(document.body.style, {
    marginTop: -scrollingElement.scrollTop + 'px',
    overflow: 'hidden',
    paddingRight: scrollBarWidth + 'px',
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
    marginTop: '',
    paddingRight: '',
    overflow: '',
    left: '',
    right: '',
    top: '',
    bottom: '',
    position: '',
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
