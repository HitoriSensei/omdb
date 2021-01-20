import { GetStaticPropsResult } from 'next'

export const GlobalStaticPropsDecorators: Array<
  <T>(
    ctx: GetStaticPropsResult<T> | undefined,
  ) => GetStaticPropsResult<T> | Promise<GetStaticPropsResult<T> | undefined> | undefined
> = []
