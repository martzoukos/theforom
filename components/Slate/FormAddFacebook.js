import { Transforms } from "slate"
import { useSlateStatic } from "slate-react"
import { getSocialProvider } from '../../lib/getSocialProvider'
import { BLOCK } from "./constants"
import { useForm } from "react-hook-form"
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
        id='facebookURL'
        label='Add the URL of the Facebook post.'
        notes={[
          'You can also paste the image directly where you type.'
        ]}
        register={register}
        validations={{
          required: true,
          validate: url => {
            return getSocialProvider(url) === 'facebook' || 'This doesn\'t seem to be a Facebook URL'
          }
        }}
        errors={errors}
      />

      <Button
        disabled={isSubmitting} 
        type='button'
        onClick={handleSubmit(data => {
            const text = { text: '' }
            const social = { type: BLOCK.SOCIAL, url: data.facebookURL, provider: getSocialProvider(data.facebookURL) , children: [text] }
            Transforms.insertNodes(editor, social)
          })
        }
      >
        Insert the post
      </Button>
    </div>
  )
}