import React, { Fragment, useMemo } from 'react'
import useSWR from 'swr'
import { IDParameter, TitleSearch } from 'gen/api'
import { Alert } from '@material-ui/lab'
import { AnimatePresence, motion } from 'framer-motion'
import { Divider, List, ListItem, ListItemText } from '@material-ui/core'
import { Loading } from 'components/Loading'

const keysToDisplay: Array<keyof IDParameter.Response> = [
  'Director',
  'Genre',
  'imdbRating',
  'Plot',
  'Rated',
  'BoxOffice',
]

const hasData = (data: Partial<IDParameter.Response>) => (key: keyof IDParameter.Response) =>
  Boolean(data[key] && data[key] !== 'N/A')
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

export default function MovieDetails({ data }: { data: TitleSearch.Search }) {
  const { data: movieData, error } = useSWR<Partial<IDParameter.Response>>(
    `/api/details/${data.imdbID}`,
  )
  const filteredKeys: undefined | Array<{ value: unknown; key: string }> = useMemo(
    () =>
      movieData &&
      keysToDisplay.filter(hasData(movieData)).map((key: keyof typeof movieData) => ({
        key,
        value: movieData[key],
      })),
    [movieData],
  )

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {movieData && filteredKeys ? (
          <motion.div {...animation} key='data'>
            <List dense>
              {filteredKeys.map(({ key, value }) => (
                <Fragment key={key}>
                  <Divider component='li' />
                  <ListItem>
                    <ListItemText primary={key} secondary={String(value)} />
                  </ListItem>
                </Fragment>
              ))}
            </List>
          </motion.div>
        ) : error ? (
          <motion.div {...animation} key='error'>
            <Alert severity={'error'}>Could not load movie data, try again later.</Alert>
          </motion.div>
        ) : (
          <motion.div {...animation} key='loader'>
            <Loading />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
