import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'
import styles from 'components/MovieCard/style.module.scss'
import React from 'react'

export const Overlay = ({ active, ...props }: HTMLMotionProps<'div'> & { active: boolean }) => {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.overlay}
          {...props}
        ></motion.div>
      )}
    </AnimatePresence>
  )
}
