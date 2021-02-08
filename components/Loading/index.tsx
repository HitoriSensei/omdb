import React from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  loader: {
    '& div': {
      background: theme.palette.primary.main,
    },
  },
}))

export const Loading = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classNames(styles.loader, classes.loader)}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  )
}
