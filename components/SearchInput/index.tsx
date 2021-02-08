import * as React from 'react'
import { KeyboardEventHandler, useCallback } from 'react'
import { FormikProvider, useFormik } from 'formik'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import styles from 'components/Header/style.module.scss'
import SearchIcon from '@material-ui/icons/Search'
import { FormikFieldMaterial } from 'vendor/components/Forms/Formik/Material'
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useDispatchAction } from 'vendor/hooks/useDispatchAction'
import { AppAction } from 'store/app/actions'
import { Input } from '@material-ui/core'

const useSearchStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      padding: theme.spacing(0, 1),
      color: theme.palette.primary.contrastText,
      width: '100%',
    },
    inputInput: {
      color: 'inherit',
      width: '100%',
    },
  }),
)

function useKeyDownCallback(key: string, cb: KeyboardEventHandler) {
  return useCallback<KeyboardEventHandler>(
    (e) => {
      if (e.key === key) {
        return cb(e)
      }
    },
    [key],
  )
}

export function SearchInput() {
  const classes = useSearchStyles()
  const loading = useSelector((s) => s.app.loading)

  const setLoading = useDispatchAction(AppAction.SET_LOADING, true)
  const setLoaded = useDispatchAction(AppAction.SET_LOADING, false)

  const query = useSelector((s) => s.app.query)

  const { push } = useRouter()
  const form = useFormik({
    onSubmit: async (values) => {
      if (form.dirty) {
        setLoading()
        try {
          await push(`/search/${values.query}`, `/search/${values.query}`, {
            scroll: true,
          })
        } catch (e) {
          console.error(e)
        } finally {
          setLoaded()
        }
      }
    },
    enableReinitialize: true,
    initialValues: {
      query: query,
    },
  })

  const onEnter = useKeyDownCallback('Enter', form.submitForm)
  return (
    <div className={classes.search}>
      <FormikProvider value={form}>
        <FormikFieldMaterial name='query' onBlur={form.submitForm} baseInput>
          <Input
            disabled={loading}
            disableUnderline
            onKeyDown={onEnter}
            placeholder='Search by title and optionally by (year)…'
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ 'aria-label': 'search' }}
            endAdornment={loading ? <AutorenewIcon className={styles.spin} /> : <SearchIcon />}
          />
        </FormikFieldMaterial>
      </FormikProvider>
    </div>
  )
}
