import { useEffect, useState } from 'react'

/**
 * Delays falsy values by given timeout. Truthy values are returned immediately.
 * @param value
 * @param timeout
 */
export const useDebounceFalsy = function (value: any, timeout = 2000) {
  const isTruthy = !!value
  const [renderContent, setRenderContent] = useState<boolean>(isTruthy)
  const [renderContentTimeout, setRenderContentTimeout] = useState<null | number>(null)
  useEffect(() => {
    renderContentTimeout && clearTimeout(renderContentTimeout)
    if (isTruthy) {
      setRenderContent(true)
    } else {
      setRenderContentTimeout(
        window.setTimeout(() => {
          setRenderContent(false)
        }, timeout),
      )
    }

    return () => {
      renderContentTimeout && clearTimeout(renderContentTimeout)
    }
  }, [isTruthy])
  return renderContent
}
