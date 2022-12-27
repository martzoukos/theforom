import { Transforms } from "slate"
import { useSlateStatic } from "slate-react"
import isUrl from 'is-url'
import { INLINE } from "./constants"
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
        id='linkURL'
        label='Add the URL.'
        notes={[
          'If you paste the URL directly where you type, you will also get a Link.',
        ]}
        register={register}
        validations={{
          required: true,
          validate: url => {
            return isUrl(url) || 'This doesn\'t seem to be a valid URL'
          }
        }}
        errors={errors}
      />
      
      <FormAddField 
        id='linkText'
        label='Optionally some text to be linked.'
        notes={[
          'If you select some text and paste the URL your text will be linked.',
        ]}
        register={register}
        errors={errors}
      />
    
      <Button
        disabled={isSubmitting} 
        type='button'
        onClick={handleSubmit(data => {
            const link = {
              type: INLINE.LINK,
              url: data.linkURL,
              children: data.linkText ? [{ text: data.linkText }] : [{ text: data.linkURL }],
            }
            Transforms.insertNodes(editor, link)
          })
        }
      >
        Insert the link
      </Button>
    </div>
  )
}