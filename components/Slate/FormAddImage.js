import { useSlateStatic } from "slate-react"
import { uploadAndInsertImage } from "./withImages"
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
        id='imageFile'
        label='Upload an image'
        type='file'
        notes={[
          'You can also paste the image directly where you type.'
        ]}
        register={register}
        validations={{
          required: true
        }}
        errors={errors}
      />

      <FormAddField 
        id='imageAlt'
        label='Image description'
        register={register}
        errors={errors}
      />

      <Button
        disabled={isSubmitting} 
        type='button'
        onClick={handleSubmit(data => {
          uploadAndInsertImage(editor, data.imageFile[0], data.imageAlt)
          })
        }
      >
        Insert the image
      </Button>
    </div>
  )
}