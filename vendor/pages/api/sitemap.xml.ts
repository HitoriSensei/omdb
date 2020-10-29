import { NextApiRequest, NextApiResponse } from 'next'
import { create } from 'xmlbuilder2'
import globby from 'globby'
import { Rewrite } from 'next/dist/lib/load-custom-routes'
import { rewrites } from '../../next.config'
import uniqBy from 'lodash/uniqBy'
import orderBy from 'lodash/orderBy'
import { swrlru } from 'vendor/utils/swrlru'

export type SitemapEntry = {
  loc?: string | undefined
  lastmod?: string | undefined
  priority?: number | undefined
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never' | undefined
  skip?: boolean | undefined
}

function getPriorityByDepth(path?: string): number {
  return path !== undefined
    ? path === ''
      ? 1
      : 1 - Math.min(0.9, path.split('/').length * 0.1)
    : 0
}

export type GetSitemap = () => Promise<SitemapEntry[]>
export type PageWithSitemap = { getSitemap?: GetSitemap }

async function constructFromDynamicPageData(pages: { path: string; page: PageWithSitemap }[]) {
  const pagesResults = await Promise.all(
    pages.map(async (p) => {
      return {
        path: p.path,
        entries: p.page.getSitemap
          ? await p.page.getSitemap()
          : [p.path.includes('[') ? { skip: true } : {}],
      }
    }),
  )
  const urls: SitemapEntry[] = []
  for (const { entries, path } of pagesResults) {
    for (const data of entries) {
      const loc = typeof data.loc === 'undefined' ? path : data.loc.replace(/^\//, '')
      urls.push({
        ...data,
        loc: loc,
      })
    }
  }
  return urls
}

async function getPages() {
  const paths = await globby(['pages/**/*.{ts,tsx}', '!pages/api', '!pages/_*', '!pages/404.*'])
  const normalizedPaths: Array<PageLocation> = paths
    .map((p) => {
      const modulePath = p
        .replace('pages/', '')
        .replace(/index\.\w+$/g, '')
        .replace(/\..*?$/, '')
      return {
        modulePath: modulePath,
        path: modulePath,
      }
    })
    .concat(constructFromRewrites(await rewrites()))

  const pages = []
  for (const { modulePath, path } of normalizedPaths) {
    console.log(modulePath, path)
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const pageModule = require('../' + modulePath)
      pages.push({
        path: path,
        page: pageModule,
      })
    } catch (e) {
      console.warn('Rewrite could not be resolved', modulePath, e)
      pages.push({
        path: path,
        page: {},
      })
    }
  }
  return pages
}

type PageLocation = { path: string; modulePath: string }

function constructFromRewrites(rewrites: Rewrite[]): Array<PageLocation> {
  return rewrites
    .filter((r) => !r.source.includes(':') && r.destination.startsWith('/'))
    .map((rewrite) => ({
      path: rewrite.source.replace(/^\//, ''),
      modulePath: rewrite.destination.replace(/^\//, ''),
    }))
}

const sitemap = swrlru(
  async (options: { baseUrl: string }): Promise<string> => {
    const pages = await getPages()

    const urls: Array<SitemapEntry> = await constructFromDynamicPageData(pages)

    return create({
      urlset: {
        '@xmlns': 'http://www.sitemaps.org/schemas/sitemap/0.9',
        '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        '@xsi:schemaLocation':
          'http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd',
        url: orderBy(
          uniqBy(
            urls.filter((e) => !e.skip),
            (e) => e.loc,
          ).map(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ({ skip, ...entry }) => ({
              ...entry,
              loc: options.baseUrl + entry.loc,
              priority: entry.priority || getPriorityByDepth(entry.loc),
            }),
          ),
          [(e) => e.priority, (e) => e.loc],
          ['desc', 'asc'],
        ),
      },
    }).end({
      prettyPrint: true,
    })
  },
  {
    revalidateAfter: 1000 * 60 * 60,
  },
)

export async function getSitemap(): Promise<SitemapEntry[]> {
  return [
    {
      skip: true,
    },
  ]
}

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  try {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/xml')
    res.send(
      await sitemap({
        baseUrl: 'https://zywiec-zdroj.pl/',
      }),
    )
  } catch (e) {
    console.error(e)
    res.statusCode = 500
    res.end()
  }
}
