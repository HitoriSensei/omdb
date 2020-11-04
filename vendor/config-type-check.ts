import publicConfig from 'config/public.json'
import privateConfig from 'config/private.json'

/**
 * These function provide a way to check if app config contains required information.
 * Mods can extend PublicConfig and PrivateConfig interfaces to provide a way to configure them.
 *
 * Typescript will show errors here until you configure your app's config/public.json and
 * config/private.json to match the needs of PublicConfig and PrivateConfig interfaces
 */
export function loadPublicConfig(): PublicConfig {
  return publicConfig
}

export function loadPrivateConfig(): PrivateConfig {
  return privateConfig
}
