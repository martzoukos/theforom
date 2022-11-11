export const BLOCK = {
  PARAGRAPH: 'paragraph',
  H1: 'headine-one',
  H2: 'headine-two',
  H3: 'headine-three',
  H4: 'headine-four',
  H5: 'headine-five',
  H6: 'headine-six',
  BLOCKQUOTE: 'block-quote',
  UL: 'bulleted-list',
  OL: 'numbered-list',
  LI: 'list-item',
  IMG: 'image',
  VIDEO: 'video',
}

export const INLINE = {
  LINK: 'link',
  BOLD: 'bold',
  ITALIC: 'italic',
  UNDERLINE: 'underline',
  STRIKETHROUGH: 'strikethrough',
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
}

export const MARKDOWN_SHORTCUTS = {
  '*': BLOCK.LI,
  '-': BLOCK.LI,
  '+': BLOCK.LI,
  '>': BLOCK.BLOCKQUOTE,
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