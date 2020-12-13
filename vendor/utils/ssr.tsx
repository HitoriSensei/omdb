import { useIsServer } from '../hooks/useIsServer'

/**
 * Render only first child on the server, rest will be rendered on client
 * @param props
 * @constructor
 */
export const SSRFirstOnly = (props: { children: React.ReactNodeArray }): React.ReactElement => {
  const isServer = useIsServer()

  return <>{(isServer ? props.children[0] : props.children) || null}</>
}
/**
 * Decide if content should render on server or only on client
 * @param props
 * @constructor
 */
export const SSRControl = (props: {
  skipSSR: boolean
  children: React.ReactNode
}): React.ReactElement => {
  const isServer = useIsServer()
  return <>{(isServer && props.skipSSR ? null : props.children) || null}</>
}
