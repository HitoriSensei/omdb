import { createContext, ReactElement, useState } from 'react'
import { MotionProps } from 'framer-motion'
import { useIsomorphicLayoutEffect } from 'react-use'

type SwitchProps = { initial: string; animate: string }

export const SwitchContext = createContext<SwitchProps>({
  initial: 'initial',
  animate: 'enter',
})

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
  children?: ((props: SwitchProps) => ReactElement) | null
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

  const switchContext = savedChild
    ? {
        initial: 'initial',
        animate: 'exit',
      }
    : {
        initial: 'initial',
        animate: 'enter',
      }

  return (
    <SwitchContext.Provider value={switchContext}>
      {savedChild
        ? savedChild(switchContext)
        : instance.currentChild
        ? instance.currentChild(switchContext)
        : null}
    </SwitchContext.Provider>
  )
}
