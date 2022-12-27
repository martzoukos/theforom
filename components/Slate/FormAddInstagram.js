import { Transforms } from "slate"
import { useSlateStatic } from "slate-react"
import { getSocialProvider } from '../../lib/getSocialProvider'
import { BLOCK } from "./constants"
import { useForm } from "react-hook-form"
import styles from './FormAdd.module.css'
import Button from '../Button'
import FormAddField from "./FormAddField"

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
        id='instagramURL'
        label='Add the URL of the Instagram post.'
        notes={[
          'You can also paste the URL of the post directly where you type.',
        ]}
        register={register}
        validations={{
          required: true,
          validate: url => {
            return getSocialProvider(url) === 'instagram' || 'This doesn\'t seem to be an Instagram URL'
          }
        }}
        errors={errors}
      />

      <div className={styles.buttonContainer}>
        <Button
          disabled={isSubmitting} 
          type='button'
          onClick={handleSubmit(data => {
              const text = { text: '' }
              const social = { type: BLOCK.SOCIAL, url: data.instagramURL, provider: getSocialProvider(data.instagramURL) , children: [text] }
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