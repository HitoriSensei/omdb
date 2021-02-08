import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { TitleSearch } from 'gen/api'
import { motion } from 'framer-motion'
import styles from './style.module.scss'
import MovieDetails from 'components/MovieDetails'
import { useSelector } from 'react-redux'
import { useDispatchAction } from 'vendor/hooks/useDispatchAction'
import { AppAction } from 'store/app/actions'
import classNames from 'classnames'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { MovieShortDetails } from 'components/MovieShortDetails'
import { Overlay } from 'components/Overlay'
import { useStopPropagation } from 'vendor/hooks/useStopPropagation'
import { Button } from '@material-ui/core'

export default function MovieCard({ data }: { data: TitleSearch.Search }) {
  const selectedId = useSelector((s) => s.app.selectedId)
  const select = useStopPropagation(useDispatchAction(AppAction.SET_SELECTED_ID, data.imdbID))
  const deselect = useDispatchAction(AppAction.SET_SELECTED_ID, null)

  const isSelected = selectedId === data.imdbID

  return (
    <>
      <motion.div layout='position'>
        <Card
          variant='elevation'
          className={classNames(styles.movieContainer, isSelected && styles.selected)}
          elevation={isSelected ? 6 : 1}
        >
          <CardActionArea>
            {data.Poster && data.Poster !== 'N/A' ? (
              <CardMedia className={styles.media} onClick={isSelected ? deselect : select}>
                <LazyLoadImage
                  alt={`${data.Title} (${data.Year})`}
                  height={400}
                  src={data.Poster}
                />
              </CardMedia>
            ) : null}
            <CardContent onClick={isSelected ? deselect : select}>
              <MovieShortDetails data={data} />
            </CardContent>
            {isSelected && (
              <>
                <div onClick={isSelected ? deselect : select}>
                  <MovieDetails data={data} />
                </div>

                <Button
                  className={styles.button}
                  fullWidth
                  disableElevation
                  color='primary'
                  variant='contained'
                  component='a'
                  href={`/details/${data.imdbID}`}
                  rel='noreferrer noopener'
                  target='_blank'
                >
                  Open on IMDB
                </Button>
              </>
            )}
          </CardActionArea>
        </Card>
      </motion.div>

      <Overlay active={isSelected} />
    </>
  )
}
