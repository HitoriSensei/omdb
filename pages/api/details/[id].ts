import { NextApiRequest, NextApiResponse } from 'next'
import { getMovieData } from 'api/getMovieData'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id
  if (!id) {
    res.statusCode = 404
    return res.end()
  }
  const data = await getMovieData(id)
  res.send(data)
}
