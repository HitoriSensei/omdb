type LocalPrivateConfig = ReturnType<typeof import('../../config/private.json')['default']>
type LocalPublicConfig = ReturnType<typeof import('../../config/public.json')['default']>

declare interface PrivateConfig {}
declare interface PublicConfig {}

declare module 'next/config' {
  type Config = {
    serverRuntimeConfig: LocalPrivateConfig
    publicRuntimeConfig: LocalPublicConfig
  }
  declare const _default: () => Config
  export default _default
  export declare function setConfig(configValue: Config): void
}
