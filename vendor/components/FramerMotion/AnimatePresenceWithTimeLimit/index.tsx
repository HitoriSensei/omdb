import { motion, MotionProps } from 'framer-motion'
import React, { ReactNode } from 'react'
import { HTMLMotionComponents } from 'framer-motion/types/render/dom/types'
import { SwitchTransition, Transition } from 'react-transition-group'

export function AnimatePresenceWithTimeLimit({
  transitionKey,
  children,
  className,
  timeout = 300,
  onExited = () => window.scrollTo(0, 0),
  Component = motion.div,
  ...otherProps
}: {
  transitionKey: string
  timeout?: number
  className?: string
  children: ReactNode
  onExited?: (() => void) | null
  Component?: HTMLMotionComponents[keyof HTMLMotionComponents]
} & Omit<MotionProps, 'animate'>): React.ReactElement {
  return (
    <SwitchTransition mode='out-in'>
      <Transition key={transitionKey} timeout={timeout} onExited={onExited || undefined}>
        {(state) => {
          console.log('state', state)
          return (
            <Component
              {...otherProps}
              animate={state === 'exiting' || state === 'exited' ? 'exit' : 'enter'}
              className={className}
            >
              {children}
            </Component>
          )
        }}
      </Transition>
    </SwitchTransition>
  )
}
