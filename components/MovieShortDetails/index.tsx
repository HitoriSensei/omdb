import { TitleSearch } from 'gen/api'
import { motion } from 'framer-motion'
import Typography from '@material-ui/core/Typography'
import React from 'react'

export const MovieShortDetails = ({ data }: { data: TitleSearch.Search }) => {
  return (
    <>
      <motion.div layoutId={data.imdbID + 'Title'}>
        <Typography gutterBottom variant='h5' component='h2'>
          {data.Title}
        </Typography>
      </motion.div>
      <motion.div layoutId={data.imdbID + 'Year'}>
        <Typography variant='body2' color='textSecondary' component='p'>
          {data.Year}
        </Typography>
      </motion.div>
    </>
  )
}
