import { Transforms } from "slate"
import { useSlateStatic } from "slate-react"
import isUrl from 'is-url'
import { INLINE } from "./constants"
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
      <label className={styles.label} htmlFor='addLink'>
        Add the URL
      </label>
      <input 
        className={styles.input}
        id='addLink'
        {...register('url', {
          required: true,
          validate: url => {
            return isUrl(url) || 'This doesn\'t seem to be a valid URL'
          }
        })}
      />
      <p className={styles.note}>
        If you paste the URL directly where you type, you will also get a Link.
      </p>
      {errors.url?.type === 'validate' && 
        <p className={styles.error}>{errors.url.message}</p>
      }
      {errors.url?.type === 'required' && 
        <p className={styles.error}>This field is required</p>
      }
      
      <label className={styles.label} htmlFor='addLinkText'>
        Optionally some text to be linked
      </label>
      <input 
        className={styles.input}
        id='addLinkText'
        {...register('text')}
      />
      <p className={styles.note}>
        If you select some text and paste the URL your text will be linked.
      </p>

      <div className={styles.buttonContainer}>
        <Button
          disabled={isSubmitting} 
          type='button'
          onClick={handleSubmit(data => {
              const link = {
                type: INLINE.LINK,
                url: data.url,
                children: data.text ? [{ text: data.text }] : [{ text: data.url }],
              }
              Transforms.insertNodes(editor, link)
            })
          }
        >
          Insert the link
        </Button>
      </div>
    </div>
  )
}