import { API_HOST } from '../../../utils/api'
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import sharp, { ResizeOptions } from 'sharp'
import { swrlru } from '../../../vendor/utils/swrlru'

const thumbnailCacheMaxAgeSeconds = 60 * 60 * 24 * 10 /* days */

const sharpResize = (imageBuffer: Buffer, resizeOptions: ResizeOptions) => {
  return new Promise((resolve, reject) => {
    const options = Object.assign(resizeOptions)
    sharp(imageBuffer, { failOnError: true })
      .resize(options)
      .flatten({ background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .jpeg({
        force: true,
        quality: 80,
      })
      .toBuffer((err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
  })
}

const imageThumbnail = swrlru(
  async (
    source: string,
    resizeOptions: ResizeOptions = {
      position: 'center',
      width: 80 * 2,
      height: 80 * 2,
      withoutEnlargement: true,
      fit: 'contain',
      background: '#ffffff',
    },
  ) => {
    const response = await axios.get(source, { responseType: 'arraybuffer' })
    const imageBuffer = Buffer.from(response.data, 'binary')

    const thumbnailBuffer = await sharpResize(imageBuffer, resizeOptions)

    return thumbnailBuffer
  },
  {
    revalidateAfter: thumbnailCacheMaxAgeSeconds,
  },
)

/**
 * Cached resized image generator, can be useful in many different situations.
 * Endpoint passes requests to API_HOST.
 *
 * @param req
 * @param res
 */
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const src = (req.query.path as string[])?.join('/')
  if (typeof src === 'string' && src.match(/^[a-z0-9\s/_.-]+$/i)) {
    try {
      const thumbnail = await imageThumbnail(API_HOST + '/' + src, req.query)
      res.statusCode = 200
      res.setHeader('Content-Type', 'image/jpeg')
      res.setHeader('Cache-Control', `public, max-age=${thumbnailCacheMaxAgeSeconds}`)
      res.send(thumbnail)
    } catch (e) {
      console.error(e)
      res.statusCode = 500
      res.end()
    }
  } else {
    res.statusCode = 404
    res.end()
  }
}
