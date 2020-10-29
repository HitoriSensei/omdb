type privateConfig = typeof import('../../config/private.json')
type publicConfig = typeof import('../../config/public.json')

declare module 'next/config' {
  type Config = {
    serverRuntimeConfig: privateConfig
    publicRuntimeConfig: publicConfig
  }
  declare const _default: () => Config
  export default _default
  export declare function setConfig(configValue: Config): void
}
