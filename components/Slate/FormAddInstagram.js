import { Transforms } from "slate"
import { useSlateStatic } from "slate-react"
import { getSocialProvider } from '../../lib/getSocialProvider'
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
      <label className={styles.label} htmlFor='addInstagramURL'>
        Add the URL of the Instagram post.
      </label>
      <input 
        className={styles.input}
        id='addInstagramURL'
        {...register('url', {
          required: true,
          validate: url => {
            return getSocialProvider(url) === 'instagram' || 'This doesn\'t seem to be an Instagram URL'
          }
        })}
      />
      <p className={styles.note}>
        Add the URL of the Instagram post.
        <br/>
        You can also paste the URL of the post directly where you type.
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
              const social = { type: BLOCK.SOCIAL, url: data.url, provider: getSocialProvider(data.url) , children: [text] }
              Transforms.insertNodes(editor, social)
            })
          }
        >
          Insert the post
        </Button>
      </div>
    </div>
  )
}