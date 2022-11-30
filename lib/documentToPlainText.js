import { Node } from "slate"

export default function documentToPlainText(nodes) {
  if (nodes === '') { return }
  return nodes.map(n => serialize(n)).join('')
}

const serialize = nodes => {
  return nodes.children.map(n => Node.string(n)).join('\n')
}