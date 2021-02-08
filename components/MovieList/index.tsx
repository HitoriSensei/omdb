import { TitleSearch } from 'gen/api'
import MovieCard from 'components/MovieCard/MovieCard'
import React from 'react'
import { Masonry } from 'react-masonry-responsive'
import { useDispatchAction } from 'vendor/hooks/useDispatchAction'
import { AppAction } from 'store/app/actions'
import { ClickAwayListener, useTheme } from '@material-ui/core'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './style.module.scss'

export const animation = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.3, ease: [0.48, 0.15, 0.25, 0.96], staggerChildren: 0.1 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: [0.48, 0.15, 0.25, 0.96], staggerChildren: 0.1 },
  },
}

export function MovieList(props: { items: TitleSearch.Search[]; query: string }) {
  const deselect = useDispatchAction(AppAction.SET_SELECTED_ID, null)
  const theme = useTheme()

  return (
    <ClickAwayListener onClickAway={deselect}>
      <div className={styles.container}>
        <AnimatePresence exitBeforeEnter>
          <motion.div {...animation} key={props.query}>
            <Masonry
              gap={theme.spacing(3)}
              items={props.items.map((item) => ({
                key: item.imdbID,
                node: <MovieCard data={item} />,
              }))}
              minColumnWidth={240}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </ClickAwayListener>
  )
}
