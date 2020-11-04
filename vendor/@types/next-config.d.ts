declare module 'next/config' {
  type Config = {
    serverRuntimeConfig: PrivateConfig
    publicRuntimeConfig: PublicConfig
  }
  const _default: () => Config
  export default _default
  export function setConfig(configValue: Config): void
}
