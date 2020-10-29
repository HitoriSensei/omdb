import { createMedia } from '@artsy/fresnel'

export const breakpoints = {
  mobile: 0,
  tablet: 712,
  desktop: 1025,
}

export const { MediaContextProvider, Media } = createMedia({
  breakpoints,
})
