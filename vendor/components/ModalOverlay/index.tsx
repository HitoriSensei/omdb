import TransitionGroup from 'react-transition-group/TransitionGroup'
import Transition from 'react-transition-group/Transition'
import { motion } from 'framer-motion'
import { mainVariant, sectionVariant } from '../FramerMotion/common-variants'
import classNames from 'classnames'

export function ModalOverlay<T extends keyof JSX.IntrinsicElements = 'div'>(props: {
  active: boolean
  className?: string
  children?: React.ReactNode
  wrapperComponent?: T | React.ComponentType
}) {
  return (
    <TransitionGroup component={props.wrapperComponent}>
      {props.active ? (
        <Transition key={'modal'} timeout={300}>
          {(state) => {
            const isExiting = state === 'exiting'
            return (
              <motion.div
                variants={mainVariant}
                className={classNames(props.className, state)}
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
      ) : (
        <></>
      )}
    </TransitionGroup>
  )
}
