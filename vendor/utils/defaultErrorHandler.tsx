import React from 'react'
import Pages404 from '../../pages/404'

export const HandleErrors = <T extends any>(
  Component: React.ComponentType<T>,
): React.ComponentType<T> => {
  const HandleErrorsWrapper = (props: T & { _is403?: boolean }) => {
    return props._is403 ? <Pages404 /> : <Component {...props} />
  }
  return HandleErrorsWrapper
}
