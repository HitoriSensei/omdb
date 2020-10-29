import SWRLRU from 'stale-while-revalidate-lru-cache'

/**
 * Create LRU cache driven by stale-while-revalidate return algorithm
 * @param f
 * @param max
 * @param revalidateAfter
 * @param normalizer
 */
export function swrlru<F extends (...args: any[]) => any>(
  f: F,
  {
    max,
    revalidateAfter,
    normalizer = JSON.stringify,
  }: {
    revalidateAfter?: number
    normalizer?: (params: Parameters<F>) => string
    max?: number
  } = {},
): (...args: Parameters<F>) => ReturnType<F> {
  const swrlru = SWRLRU({
    max: max || 30000,
    maxAge: revalidateAfter || 5000,
    staleWhileRevalidate: 60 * 60 * 1000 * 24 * 30,
    validate: async (params: Parameters<F>): Promise<any> => f(...params),
  })
  return (...params: Parameters<F>): ReturnType<F> =>
    swrlru({
      key: normalizer(params),
      params: params,
    }) as any
}
