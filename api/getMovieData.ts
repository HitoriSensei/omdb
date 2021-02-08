import { IDParameterApi } from 'gen/api'
import memoizee from 'memoizee'

export const getMovieData = memoizee(
  async function (id: string | string[]) {
    const API = new IDParameterApi({
      apiKey: process.env.OMDB_APIKEY,
    })
    return await API.getId(String(id)).then((r) => r.json())
  },
  {
    maxAge: 60000,
    primitive: true,
  },
)
