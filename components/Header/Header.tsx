import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { Slide, useScrollTrigger } from '@material-ui/core'
import * as React from 'react'
import { SearchInput } from 'components/SearchInput'

function HideOnScroll(props: { children: React.ReactElement }) {
  const { children } = props

  const trigger = useScrollTrigger({ target: typeof window !== 'undefined' ? window : undefined })

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      flexShrink: 0,
      marginRight: theme.spacing(2),
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
  }),
)

export default function SearchAppBar() {
  const classes = useStyles()

  return (
    <>
      <div className={classes.root}>
        <HideOnScroll>
          <AppBar>
            <Toolbar>
              <Typography className={classes.title} variant='h6' noWrap>
                Yet another OMDBAPI frontend
              </Typography>

              <SearchInput />
            </Toolbar>
          </AppBar>
        </HideOnScroll>

        <Toolbar />
      </div>
    </>
  )
}
