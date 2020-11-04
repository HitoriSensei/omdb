import Markdown from 'markdown-to-jsx'

export function FormattedText(props: { children: string }) {
  return <Markdown>{props.children}</Markdown>
}
