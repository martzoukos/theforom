import { Transforms } from "slate"
import { useSlateStatic } from "slate-react"
import { isVideoUrl } from "../../lib/isVideoURL"
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
        id='videoURL'
        label='Add the URL of the video.'
        notes={[
          'Allowed sources: Youtube, Vimeo, TikTok, Twitch, TED, Facebook, Loom.',
          'You can also paste the URL of the image directly where you type.',
        ]}
        register={register}
        validations={{
          required: true,
          validate: url => {
            return isVideoUrl(url) || 'This doesn\'t seem to be a video URL'
          }
        }}
        errors={errors}
      />
      
      <Button
        disabled={isSubmitting} 
        type='button'
        onClick={handleSubmit(data => {
            const text = { text: '' }
            const video = { type: BLOCK.VIDEO, url: data.videoURL, children: [text] }
            Transforms.insertNodes(editor, video)
          })
        }
      >
        Insert the video
      </Button>
    </div>
  )
}