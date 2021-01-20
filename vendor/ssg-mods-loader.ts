if (typeof window === 'undefined') {
  const requireAll = (r: __WebpackModuleApi.RequireContext) => {
    r.keys().forEach(r)
  }
  requireAll(require.context('./mods', true, /ssg\.(ts|tsx)$/))
}

export default null
