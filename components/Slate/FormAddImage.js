import { useSlateStatic } from "slate-react"
import { uploadAndInsertImage } from "./withImages"
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
        type='file'
        id='uploadImage'
        {...register('imageFile', {
          required: true
        })}
      />
      <p className={styles.note}>
        You can also paste the image directly where you type.
      </p>
      {errors.imageFile?.type === 'required' && 
        <p className={styles.error}>This field is required</p>
      }

      <label className={styles.label} htmlFor='altText'>
        Image description
      </label>
      <input 
        className={styles.input}
        id='altText'
        {...register('altText')}
      />

      <div className={styles.buttonContainer}>
        <Button
          disabled={isSubmitting} 
          type='button'
          onClick={handleSubmit(data => {
            uploadAndInsertImage(editor, data.imageFile[0], data.altText)
            })
          }
        >
          Insert the image
        </Button>
      </div>
    </div>
  )
}