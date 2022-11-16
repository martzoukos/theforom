import React, { useMemo } from 'react';
import { createEditor } from 'slate';
import { Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { withInlines } from './links'
import { withImages } from './images'
import { withVideos } from './videos'
import { withHTML } from './pasteHTML';
import { withShortcuts } from './markdownShortcuts';
import styles from './SlateEditor.module.css'
import { SlateToolbar } from './SlateToolbar';
import { SlateTextarea } from './SlateTextarea';
import { BLOCK } from './constants';
import create from 'zustand'

export const useStore = create(set => ({
  entities: {},
  upsertEntity: (id, entity) =>
    set((state) => ({
      entities: {
        ...state.entities,
        [id]: entity,
      },
    })),
}))

const SlateEditor = ({ setValue }) => {
  const editor = useMemo(
    () => withVideos(
      withHTML(
        withShortcuts(
          withImages(
            withInlines(
              withHistory(
                withReact(
                  createEditor()
                )
              )
            )
          )
        )
      )
    ), []
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
    type: BLOCK.PARAGRAPH,
    children: [
      { text: '' },
    ],
  },
];


export default SlateEditor;