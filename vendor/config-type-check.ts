/* eslint-disable @typescript-eslint/no-unused-vars,no-unused-vars */
import publicConfig from 'config/public.json'
import privateConfig from 'config/private.json'

/**
 * These assignments provide a way to check if app config contains required information.
 * Mods can extend PublicConfig and PrivateConfig interfaces to provide a way to configure them.
 *
 * Typescript will show errors here until you configure your app's config/public.json and
 * config/private.json to match the needs of PublicConfig and PrivateConfig interfaces
 */
const privateConfigCheck = privateConfig as PrivateConfig
const publicConfigCheck = publicConfig as PublicConfig
