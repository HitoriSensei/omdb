import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { lockScroll, unlockScroll } from '../../hooks/useLockScroll'

export const PageTransitionScrollFixer = () => {
  const router = useRouter()
  useEffect(() => {
    let lastPath = document.location.pathname

    const fixupScroll = () => {
      if (document.location.pathname !== lastPath) {
        lastPath = document.location.pathname
        lockScroll()
      }
    }

    const clearFixupScroll = () => {
      unlockScroll()
    }
    window.addEventListener('popstate', fixupScroll)
    router.events.on('routeChangeComplete', clearFixupScroll)

    return () => {
      window.removeEventListener('popstate', fixupScroll)
      router.events.off('routeChangeComplete', clearFixupScroll)
    }
  }, [router.route])
  return null
}
