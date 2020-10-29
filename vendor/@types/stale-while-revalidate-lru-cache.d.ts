declare module 'stale-while-revalidate-lru-cache' {
  let module: <T, P>(options: {
    max: number
    maxAge: number
    staleWhileRevalidate: number
    validate: (params: P) => Promise<T>
  }) => (query: { key: string; params: P }) => Promise<T>
  export default module
}
