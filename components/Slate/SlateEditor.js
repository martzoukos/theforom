import React, { useMemo } from 'react';
import { createEditor } from 'slate';
import { Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { withInlines } from './withInlines'
import { withImages } from './withImages'
import { withVideos } from './withVideos'
import { withSocials } from './withSocials'
import { withHTML } from './pasteHTML';
import { withShortcuts } from './withShortcuts';
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

const SlateEditor = ({ setValue, expanded, toolbarVisible }) => {
  const editor = useMemo(
    () => 
    withSocials(
      withVideos(
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
        <SlateTextarea editor={editor} expanded={expanded} />
        <SlateToolbar visible={toolbarVisible || expanded} />
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