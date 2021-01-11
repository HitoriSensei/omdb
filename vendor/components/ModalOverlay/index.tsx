import TransitionGroup from 'react-transition-group/TransitionGroup'
import Transition from 'react-transition-group/Transition'
import { motion } from 'framer-motion'
import { mainVariant, sectionVariant } from '../FramerMotion/common-variants'
import classNames from 'classnames'
import { useVisibleImagesLoaded } from '../../hooks/useVisibleImagesLoaded'
import { useContext } from 'react'
import { SwitchContext } from '../Motion/AnimateSwitch/AnimateSwitch'
import { createPortal } from 'react-dom'
import { useAppendBodyPortal } from 'vendor/hooks/useAppendBodyPortal'

export function ModalOverlay<T extends keyof JSX.IntrinsicElements = 'div'>(props: {
  active: boolean
  className?: string
  children?: React.ReactNode
  portal?: boolean
  wrapperComponent?: T | React.ComponentType
}) {
  const { ref, loaded } = useVisibleImagesLoaded()
  const { animate } = useContext(SwitchContext)
  const portalRef = useAppendBodyPortal(props.portal)

  const content = (
    <TransitionGroup component={props.wrapperComponent}>
      {props.active ? (
        <Transition key={'modal'} timeout={300}>
          {(state) => {
            const isExiting = state === 'exiting'
            return (
              <motion.div
                ref={ref}
                variants={mainVariant}
                className={classNames(props.className, state)}
                style={{
                  paddingRight: isExiting ? 0 : 'var(--scrollbar-padding)',
                  paddingLeft: 'var(--scrollbar-padding)',
                }}
                initial={'initial'}
                animate={loaded ? (isExiting ? 'exit' : animate) : 'initial'}
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
  return props.portal ? portalRef && createPortal(content, portalRef) : content
}
