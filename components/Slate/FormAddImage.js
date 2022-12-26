import { Transforms } from "slate"
import { useSlateStatic } from "slate-react"
import { isImageUrl } from "../../lib/isImageURL"
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
      <label className={styles.label} htmlFor='uploadImage'>
        Upload an image
      </label>
      <input 
        className={styles.input}
        id='uploadImage'
        {...register('url', {
          required: true,
          validate: url => {
            return isImageUrl(url) || 'This doesn\'t seem to be an image URL'
          }
        })}
      />
      <p className={styles.note}>
        You can also paste the URL of the image directly where you type.
      </p>
      <label className={styles.label} htmlFor='imageAlt'>
        Image description
      </label>
      <input 
        className={styles.input}
        id='imageAlt'
        {...register('url', {
          required: true,
          validate: url => {
            return isImageUrl(url) || 'This doesn\'t seem to be an image URL'
          }
        })}
      />
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
          onClick={handleSubmit(url => {
              const text = { text: '' }
              const image = { type: BLOCK.IMG, url, children: [text] }
              Transforms.insertNodes(editor, image)
            })
          }
        >
          Insert the image
        </Button>
      </div>
    </div>
  )
}