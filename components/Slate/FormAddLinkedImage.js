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
      <label className={styles.label} htmlFor='addLinkedImageField'>
        Add the URL of the image.
      </label>
      <input 
        className={styles.input}
        id='addLinkedImageField'
        {...register('url', {
          required: true,
          validate: url => {
            return isImageUrl(url) || 'This doesn\'t seem to be an image URL'
          }
        })}
      />
      <p className={styles.note}>
        Use this when you want to reference some image from the web that you know will be online for a while.
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