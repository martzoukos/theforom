import React, { useMemo } from 'react';
import { createEditor } from 'slate';
import { Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { withInlines } from './links'
import { withImages } from './images'
import { withVideos } from './videos'
import { withHTML } from './pasteHTML';
import { withShortcuts } from './markdownShortcuts';
import { withLineReset } from './withLineReset';
import styles from './SlateEditor.module.css'
import { SlateToolbar } from './SlateToolbar';
import { SlateTextarea } from './SlateTextarea';
import { BLOCK } from './constants';
import create from 'zustand'

export const useUploadedMedia = create((set) => ({
  uploadedMedia: {},
  upsertUploadedMedia: (id, media) => {
    set((state) => ({
      uploadedMedia: {
        ...state.uploadedMedia,
        [id]: media,
      },
    }), false)
  }
  ,
}))

const SlateEditor = ({ setValue }) => {
  const editor = useMemo(
    () => withVideos(
      withHTML(
        withLineReset(
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
      )
    ), []
  );  
  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={setValue}
    >
      <div className={styles.slateEditor}>
        <SlateToolbar />
        <SlateTextarea editor={editor} />
      </div>
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