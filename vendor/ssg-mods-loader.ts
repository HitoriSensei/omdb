function requireAll(r: __WebpackModuleApi.RequireContext) {
  r.keys().forEach(r)
}

export default requireAll(require.context('./mods', true, /ssg\.(ts|tsx)$/))
