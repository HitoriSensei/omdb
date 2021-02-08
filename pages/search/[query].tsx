import React from 'react'
import { VendorGetStaticProps } from 'vendor/utils/VendorGetStaticProps'
import { TitleSearch } from 'gen/api'
import { GetStaticPaths } from 'next'
import { searchTitles } from 'api/searchTitles'
import { Container } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import { MovieList } from 'components/MovieList'
import { Alert } from '@material-ui/lab'
import { AppAction } from 'store/app/actions'
import { useSelector } from 'react-redux'
import { Overlay } from 'components/Overlay'

type Props = { searchResults?: TitleSearch.Response; query?: string }

const SearchPage = (props: Props) => {
  const searches = props.searchResults?.Search
  const loading = useSelector((s) => s.app.loading)
  return (
    <Container>
      <Box my={3}>
        {props.query ? (
          searches && searches.length > 0 ? (
            <MovieList items={searches} query={props.query} />
          ) : (
            <Alert severity='warning'>No matches found!</Alert>
          )
        ) : (
          <>
            <Alert severity='info'>
              Type the title and optionally a year in parenthesis (eg. Hawk (2010)) in the search
              field above.
            </Alert>
          </>
        )}
      </Box>
      <Overlay active={loading} />
    </Container>
  )
}

export const getStaticProps = VendorGetStaticProps<Props, { query: '' }>(
  async ({ params, store }) => {
    const query = params?.query || ''

    store.dispatch(AppAction.SET_QUERY(query))

    const searchResults = await searchTitles(query)
    const props: Props = {
      query: query,
      searchResults: searchResults,
    }
    return {
      props,
    }
  },
)

export const getStaticPaths: GetStaticPaths = async () => ({
  fallback: 'blocking',
  paths: [],
})

export default SearchPage
