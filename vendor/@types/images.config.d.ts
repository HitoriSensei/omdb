declare interface PrivateConfig {
  /**
   * https://nextjs.org/docs/basic-features/image-optimization#configuration
   */
  images?: {
    loader?: string
    path?: string
    domains?: string[]
    deviceSizes?: number[]
    imageSizes?: number[]
  }
}
