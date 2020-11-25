import { cloneElement, ReactElement } from 'react'
import { SwitchTransition, Transition } from 'react-transition-group'
import { MotionProps } from 'framer-motion'

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
  transitionKey?: string
  timeout?: number
  className?: string
  children: ReactElement<MotionProps> | null
  onExited?: (() => void) | null
} & Omit<MotionProps, 'animate'>): React.ReactElement {
  return (
    <SwitchTransition mode='out-in'>
      <Transition
        key={transitionKey || children?.key}
        timeout={timeout}
        onExited={onExited || undefined}
      >
        {(state) => {
          return (
            children &&
            cloneElement(children, {
              animate: state === 'exiting' || state === 'exited' ? 'exit' : 'enter',
            })
          )
        }}
      </Transition>
    </SwitchTransition>
  )
}
