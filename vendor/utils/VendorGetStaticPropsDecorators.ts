import { GetStaticPropsResult } from 'next'

export const GlobalStaticPropsDecorators: Array<
  <T>(
    ctx: GetStaticPropsResult<T> | Promise<GetStaticPropsResult<T> | void> | void,
  ) => GetStaticPropsResult<T> | Promise<GetStaticPropsResult<T> | void> | void
> = []
