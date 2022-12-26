import { Transforms } from "slate"
import { useSlateStatic } from "slate-react"
import { isVideoUrl } from "../../lib/isVideoURL"
import { BLOCK } from "./constants"
import { useForm } from "react-hook-form"
import styles from './FormAdd.module.css'
import Button from '../Button'

export default function FormAddLinkedImage() {
  const editor = useSlateStatic()
  const { 
    register, 
    handleSubmit, 
    formState: { 
      errors, 
      isSubmitting 
    } 
  } = useForm()
  return(
    <div>
      <label className={styles.label} htmlFor='addVideoURL'>
        Add the URL of the video.
      </label>
      <input 
        className={styles.input}
        id='addVideoURL'
        {...register('url', {
          required: true,
          validate: url => {
            return isVideoUrl(url) || 'This doesn\'t seem to be a video URL'
          }
        })}
      />
      <p className={styles.note}>
        Allowed sources: Youtube, Vimeo, TikTok, Twitch, TED, Facebook, Loom.
        <br/>
        You can also paste the URL of the image directly where you type.
      </p>
      {errors.url?.type === 'validate' && 
        <p className={styles.error}>{errors.url.message}</p>
      }
      {errors.url?.type === 'required' && 
        <p className={styles.error}>This field is required</p>
      }
      <div className={styles.buttonContainer}>
        <Button
          disabled={isSubmitting} 
          type='button'
          onClick={handleSubmit(data => {
              const text = { text: '' }
              const video = { type: BLOCK.VIDEO, url: data.url, children: [text] }
              Transforms.insertNodes(editor, video)
            })
          }
        >
          Insert the video
        </Button>
      </div>
    </div>
  )
}