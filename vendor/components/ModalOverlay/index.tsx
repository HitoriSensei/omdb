import React from 'react'
import TransitionGroup from 'react-transition-group/TransitionGroup'
import Transition from 'react-transition-group/Transition'
import { motion } from 'framer-motion'
import { mainVariant, sectionVariant } from '../FramerMotion/common-variants'
import classNames from 'classnames'

export function ModalOverlay(props: {
  active: boolean
  styles: Record<string, string>
  children?: React.ReactNode
}) {
  return (
    <TransitionGroup>
      {props.active ? (
        <Transition key={'modal'} timeout={300}>
          {(state) => {
            const isExiting = state === 'exiting'
            return (
              <motion.div
                variants={mainVariant}
                className={classNames(props.styles.overlay)}
                style={{
                  paddingRight: isExiting ? 0 : 'var(--scrollbar-padding)',
                  paddingLeft: 'var(--scrollbar-padding)',
                }}
                initial={'initial'}
                animate={isExiting ? 'exit' : 'enter'}
              >
                <motion.div variants={sectionVariant}>{props.children}</motion.div>
              </motion.div>
            )
          }}
        </Transition>
      ) : null}
    </TransitionGroup>
  )
}
