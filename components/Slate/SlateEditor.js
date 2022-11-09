import React, { useMemo } from 'react';
import { createEditor } from 'slate';
import { Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { withInlines } from './links'
import { withImages } from './images'
import { withVideos } from './videos'
import styles from './SlateEditor.module.css'
import { SlateToolbar } from './SlateToolbar';
import { SlateTextarea } from './SlateTextarea';

const SlateEditor = ({ setValue }) => {
  const editor = useMemo(
    () => withVideos(withImages(withInlines(withHistory(withReact(createEditor()))))), 
    []
  );  
  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={setValue}
      className={styles.slateEditor}
    >
      <SlateToolbar />
      <SlateTextarea editor={editor} />
    </Slate>
  );
};

/////////////
// INITIAL VALUE
/////////////
const initialValue = [
  {
    type: 'paragraph',
    children: [
      { text: '' },
    ],
  },
];

export default SlateEditor;