import { 
  Transforms,
  Editor, 
  Element,
} from "slate"
import { BLOCK } from "./constants"

export const withLineReset = editor => {
  const { insertBreak } = editor

  editor.insertBreak = () => {
    const { selection } = editor

    if (selection) {
      const [title] = Editor.nodes(editor, {
        match: n =>
          !Editor.isEditor(n) &&
          Element.isElement(n) &&
          (
            n.type === BLOCK.H1 ||
            n.type === BLOCK.H2 ||
            n.type === BLOCK.H3 ||
            n.type === BLOCK.H4 ||
            n.type === BLOCK.H5 ||
            n.type === BLOCK.H6 ||
            n.type === BLOCK.BLOCKQUOTE
          )
      })

      if(title){
        Transforms.insertNodes(editor, {
          children: [{text: ""}],
          type: 'default'
        })
        return
      }
    }
    insertBreak()
  }

  return editor
}
