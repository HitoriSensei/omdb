import { SearchParameterApi, TitleSearch } from 'gen/api'

export const moveTheToTheEnd = (search: TitleSearch.Search): TitleSearch.Search => ({
  ...search,
  Title: search.Title.replace(/^\s*The (.*)$/, '$1, The'),
})

export const fetchManyPages = async (
  pages: number,
  getPage: (page: number) => Promise<TitleSearch.Response>,
): Promise<TitleSearch.Response> => {
  const mergedPages: Required<TitleSearch.Response> = {
    totalResults: '0',
    Response: 'False',
    Search: [],
  }
  let page = 1
  let currentPage = await getPage(page)

  while (
    currentPage &&
    Number(currentPage.totalResults) > 0 &&
    currentPage.Search &&
    page <= pages
  ) {
    mergedPages.Response = currentPage.Response
    mergedPages.Search = mergedPages.Search.concat(currentPage.Search)
    page = page + 1
    currentPage = await getPage(page)
  }

  mergedPages.totalResults = String(mergedPages.Search.length)
  return mergedPages
}

export const searchTitles = async function (query: '' | undefined) {
  const API = new SearchParameterApi({
    apiKey: process.env.OMDB_APIKEY,
  })
  let title = query || ''
  let year: number | undefined
  title = title.replace(/\s*[([](\d\d\d\d)[)\]]/, (_, matchedYear) => {
    year = Number(matchedYear)
    return ''
  })

  const searchResults = title
    ? await fetchManyPages(5, (page) => {
        return API.titleSearch(title, year || undefined, 'movie', 'json', page).then((r) =>
          r.json(),
        )
      }).then((result) => {
        return {
          ...result,
          Search: result.Search?.map(moveTheToTheEnd),
        }
      })
    : { Search: [], Response: 'False', totalResults: '0' }
  return searchResults
}
