export const BLOCK = {
  PARAGRAPH: 'paragraph',
  BR: 'br',
  H1: 'heading-one',
  H2: 'heading-two',
  H3: 'heading-three',
  H4: 'heading-four',
  H5: 'heading-five',
  H6: 'heading-six',
  BLOCKQUOTE: 'block-quote',
  CODEBLOCK: 'code-block',
  UL: 'bulleted-list',
  OL: 'numbered-list',
  LI: 'list-item',
  IMG: 'image',
  UPLOADEDIMG: 'uploaded-image',
  VIDEO: 'video',
  SOCIAL: 'social',
}

export const INLINE = {
  LINK: 'link',
  BOLD: 'bold',
  ITALIC: 'italic',
  UNDERLINE: 'underline',
  STRIKETHROUGH: 'strikethrough',
  CODE: 'code',
}

export const HOTKEYS = {
  'mod+b': INLINE.BOLD,
  'mod+i': INLINE.ITALIC,
  'mod+u': INLINE.UNDERLINE,
  'mod+k': INLINE.LINK,
  'mod+shift+s': INLINE.STRIKETHROUGH,
  'mod+shift+1': BLOCK.H1,
  'mod+shift+2': BLOCK.H2,
  'mod+shift+3': BLOCK.H3,
  'mod+shift+4': BLOCK.H4,
  'mod+shift+5': BLOCK.H5,
  'mod+shift+6': BLOCK.H6,
  'shift+enter': BLOCK.BR,
}

export const MARKDOWN_SHORTCUTS = {
  '*': BLOCK.LI,
  '-': BLOCK.LI,
  '+': BLOCK.LI,
  '1.': BLOCK.LI,
  'a.': BLOCK.LI,
  'i.': BLOCK.LI,
  '>': BLOCK.BLOCKQUOTE,
  '```': BLOCK.CODEBLOCK,
  '#': BLOCK.H1,
  '##': BLOCK.H2,
  '###': BLOCK.H3,
  '####': BLOCK.H4,
  '#####': BLOCK.H5,
  '######': BLOCK.H6,
}

export const LIST_TYPES = [
  BLOCK.OL, 
  BLOCK.UL
]