import { ReactElement, useState } from 'react'
import { MotionProps } from 'framer-motion'
import { useIsomorphicLayoutEffect } from 'react-use'

/**
 * Works in similar way to AnimatePresence with exitBeforeEnter, but using SwitchTransition with ability to timeout exit animation
 * @param transitionKey
 * @param children
 * @param timeout
 * @param onExited
 * @constructor
 */
export function AnimateSwitch({
  transitionKey,
  children,
  timeout = 300,
  onExited = () => window.scrollTo(0, 0),
}: {
  transitionKey: any
  timeout?: number
  className?: string
  children?: ((props: { initial: string; animate: string }) => ReactElement) | null
  onExited?: (() => void) | null
} & Omit<MotionProps, 'animate'>): ReactElement {
  const [{ children: savedChild }, setSavedChild] = useState<{
    children?: ((props: MotionProps) => ReactElement) | null
  }>({ children: null })
  const [instance] = useState<{ transitionKey: any; currentTimer?: number; currentChild: any }>({
    currentTimer: undefined,
    currentChild: children,
    transitionKey: transitionKey,
  })

  useIsomorphicLayoutEffect(() => {
    clearTimeout(instance.currentTimer)
    instance.currentTimer = undefined
    setSavedChild({ children: instance.currentChild })
    instance.currentChild = children
    instance.transitionKey = transitionKey

    instance.currentTimer = window.setTimeout(() => {
      onExited && onExited()
      setSavedChild({ children: null })
    }, timeout)

    return () => clearTimeout(instance.currentTimer)
  }, [transitionKey])

  if (transitionKey === instance.transitionKey) {
    instance.currentChild = children
  }

  return (
    <>
      {savedChild
        ? savedChild({
            initial: 'initial',
            animate: 'exit',
          })
        : instance.currentChild
        ? instance.currentChild({
            initial: 'initial',
            animate: 'enter',
          })
        : null}
    </>
  )
}
