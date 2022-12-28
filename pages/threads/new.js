import Head from 'next/head';
import Layout, { siteTitle } from '../../components/Layout'
import { useState } from 'react';
import { useRouter } from 'next/router';
import Editor, { useUploadedMedia } from '../../components/Slate/SlateEditor';
import { useSession, signIn } from 'next-auth/react';
import Button from '../../components/Button';
import Container from '../../components/Container';
import FieldRow from '../../components/FieldRow';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import CategoriesInput from '../../components/CategoriesInput';

export default function Thread() {
  const [loading, setLoading] = useState('')
  const [richTextContent, setRichTextContent] = useState('')
  const [categories, setCategories] = useState([])
  const router = useRouter()
  const { data: session } = useSession()
  const uploadedMedia = useUploadedMedia()
  const { register, handleSubmit } = useForm();

  const onSubmit = async data => {
    setLoading(true)
    const result = await axios.post('/api/thread', { 
      title: data.subject, 
      categories: categories,
      content: richTextContent,
      uploadedMedia: uploadedMedia.uploadedMedia,
    })
    setLoading(false)
    switch (result.status) {
      case 200:
        await router.push(`/threads/${result.data.slug}/${result.data.id}`)
        break;
      default:
        alert('There was an issue with your request, please try again.')
    }
  }

  if (session) {
    return (
      <Layout>
        <Head>
          <title>Create your Thread - {siteTitle}</title>
        </Head>
        <Container isNarrow={true}>
          <form  onSubmit={handleSubmit(onSubmit)}>
            <h1 className='as-h2'>Create your Thread</h1>
            <FieldRow
              label='Thread Title'
              name='subject'
              registerFunc={register}
            />
            <CategoriesInput 
              categories={categories}
              setCategories={setCategories}
            />
            <div style={{ marginBottom: '1.5em' }}>
              <label style={{ 
                display: 'block',
                marginBottom: '0.5em' 
              }}>Your Content</label>
              <Editor 
                value={richTextContent}
                setValue={setRichTextContent}
                expanded={true}
              />
            </div>
            <Button 
              type='submit' 
              disabled={loading}
            >
              {loading 
                ? <span>...</span> 
                : <span>Publish your Thread</span>
              }
            </Button>
          </form>
        </Container>
      </Layout>
    )
  } else {
    return(
      <Layout>
        <Head>
          <title>Create your Thread</title>
        </Head>
        <Container isNarrow={true}>
          <div style={{
            margin: '2em auto',
            textAlign: 'center'
          }}>
            <Button onClick={() => signIn()}>Connect to create a Thread</Button>    
          </div>
        </Container>
      </Layout>
    )
  }
}