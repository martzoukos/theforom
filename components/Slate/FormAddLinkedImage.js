import { Transforms } from "slate"
import { useSlateStatic } from "slate-react"
import { isImageUrl } from "../../lib/isImageURL"
import { BLOCK } from "./constants"
import { useForm } from "react-hook-form"
import styles from './FormAdd.module.css'
import Button from '../Button'
import FormAddField from './FormAddField'

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
      <FormAddField 
        id='imageURL'
        label='Add the URL of the image.'
        notes={[
          'Use this when you want to reference some image from the web that you know will be online for a while.',
          'You can also paste the URL of the image directly where you type.',
        ]}
        register={register}
        validations={{
          required: true,
          validate: url => {
            return isImageUrl(url) || 'This doesn\'t seem to be an image URL'
          }
        }}
        errors={errors}
      />

      <FormAddField 
        id='imageAlt'
        label='Image description'
        register={register}
        errors={errors}
      />
      
      <div className={styles.buttonContainer}>
        <Button
          disabled={isSubmitting} 
          type='button'
          onClick={handleSubmit(data => {
              const text = { text: '' }
              const image = { 
                type: BLOCK.IMG, 
                url: data.imageURL, 
                alt: data.imageAlt,
                children: [text] 
              }
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