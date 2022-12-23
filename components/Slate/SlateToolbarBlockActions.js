/* eslint-disable jsx-a11y/alt-text */
import { Facebook, Film, Image, ImagePlus, Instagram, Link, Twitter } from "lucide-react"
import { useReducer } from "react"
import FormAddLink from "./FormAddLink"
import FormAddImage from "./FormAddImage"
import FormAddLinkedImage from "./FormAddLinkedImage"
import FormAddVideo from "./FormAddVideo"
import FormAddTweet from "./FormAddTweet"
import FormAddFacebook from "./FormAddFacebook"
import FormAddInstagram from "./FormAddInstagram"
import styles from './SlateToolbarBlockActions.module.css'

const BLOCK_ACTIONS = [
  {
    type: 'image',
    icon: <ImagePlus size={18} />,
    label: 'Image',
    form: <FormAddImage />
  },
  {
    type: 'linkedImage',
    icon: <Image size={18} />,
    label: 'Linked Image',
    form: <FormAddLinkedImage />,
  },
  {
    type: 'video',
    icon: <Film size={18} />,
    label: 'Video',
    form: <FormAddVideo />,
  },
  {
    type: 'link',
    icon: <Link size={18} />,
    label: 'Link',
    form: <FormAddLink />,
  },
  {
    type: 'tweet',
    icon: <Twitter size={18} />,
    label: 'Tweet',
    form: <FormAddTweet />,
  },
  {
    type: 'instagram',
    icon: <Instagram size={18} />,
    label: 'Instagram Post',
    form: <FormAddInstagram />,
  },
  {
    type: 'facebook',
    icon: <Facebook size={18} />,
    label: 'Facebook Post',
    form: <FormAddFacebook />,
  }
]

const blockActionsInitialValue = BLOCK_ACTIONS.map(action => ({[action.type]: false}))

const blockActionsReducer = (state, action) => {
  const newValue = !state[action.type]
  return {
    ...blockActionsInitialValue,
    [action.type]: newValue
  }
}

export default function SlateToolbarBlockActions() {
  const [blockActions, dispatchToBlockActions] = useReducer(blockActionsReducer, blockActionsInitialValue )
  
  const BlockButton = ({ type, children }) => {
    const isActive = blockActions[type]
    return(
      <button 
        className={`
          ${styles.button}
          ${isActive && styles.buttonActive}
        `}
        type='button'
        onMouseDown={() => {
          dispatchToBlockActions({type})
        }}
      >
        {children}
      </button>
    )
  }

  return(
    <div className={styles.addAction}>
      <h6>Add any of these blocks in your text</h6>
      <div className={styles.buttonsContainer}>
        {BLOCK_ACTIONS.map((button, i) => 
          <BlockButton type={button.type} key={i}>
            {button.icon}
            <span>{button.label}</span>
          </BlockButton>
        )}
      </div>
      <div>
        {BLOCK_ACTIONS.map(action => {
          if (blockActions[action.type]) {
            return action.form
          }
        })}
      </div>
    </div>
  )
}