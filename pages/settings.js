import Head from 'next/head';
import Layout from '../components/Layout';
import { prisma } from '../lib/prisma'
import Container from '../components/Container';
import Avatar from '../components/Avatar';
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { useState } from 'react';
import { uploadFile } from '../lib/uploadFile';
import { resizeImage } from '../lib/resizeImage';
import FieldRow from '../components/FieldRow';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Button from '../components/Button';

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions,
  )
  const user = session ?
    await prisma.user.findUnique({
      where: {
        id: session ? session.user.id : ''
      }
    })
    : null
  return {
    props: {
      user: user
    },
  }
} 

export default function Home({ user }) {
  const [loading, setLoading] = useState(false)
  const [avatarLoading, setAvatarLoading] = useState(false)
  const [image, setImage] = useState(user.image)

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleAvatarUpload = async event => {
    setAvatarLoading(true)
    const file = event.target.files[0]
    const resizedFile = await resizeImage(file, 400, 400, 'jpg')
    const imageURL = await uploadFile(resizedFile, 'settings')
    const result = await axios.put(`/api/users/${user.id}/avatar`, {
      uid: user.id,
      image: imageURL,
    });
    setAvatarLoading(false)
    switch (result.status) {
      case 200:
        setImage(imageURL)
        break;
      default:
        alert('There was an issue with your request, please try again.')
    }
  }

  const onSubmit = async data => {
    setLoading(true)
    const result = await axios.put(`/api/users/${user.id}`, { 
      uid: user.id,
      user: {
        name: data.name,
        handle: data.handle,
        shortBio: data.shortBio,
        longBio: data.longBio,
        twitterURL: data.twitterURL,
        facebookURL: data.facebookURL,
        linkedInURL: data.linkedInURL,
      }
    })
    .then(() => {
      alert('Your settings are updated')
    })
    .catch(function (error) {
      if (error.response) {
        switch (error.response.status) {
          case 409:
            alert('The handle is already taken')
            break;
          default:
            alert('There was an issue with your request, please try again.')
        }
      }
    })
    setLoading(false)
  }

  if (user) {
    return (
      <Layout>
        <Head>
          <title>Settings</title>
        </Head>
        <Container>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h1>My Settings</h1>
              <div style={{ marginBottom: '1em' }}>
                <Avatar src={image} alt={user.name} />
                {avatarLoading 
                  ? <span>Uploading image</span>
                  : <input type='file' onChange={handleAvatarUpload} />
                }
              </div>
              <FieldRow 
                label='Name'
                name='name'
                defaultValue={user.name}
                registerFunc={register}
              />
              <FieldRow 
                label='Handle (this will be unique and yours only)'
                name='handle'
                defaultValue={user.handle}
                registerFunc={register}
              />
              <FieldRow 
                label='A bit about yourself, like what you do for a living'
                name='shortBio'
                defaultValue={user.shortBio}
                registerFunc={register}
              />
              <FieldRow 
                label='A bit more about yourself'
                name='longBio'
                type='textarea'
                defaultValue={user.longBio}
                registerFunc={register}
              />
              <FieldRow 
                label='Twitter Profile'
                name='twitterURL'
                defaultValue={user.twitterURL}
                registerFunc={register}
              />
              <FieldRow 
                label='Facebook Profile'
                name='facebookURL'
                defaultValue={user.facebookURL}
                registerFunc={register}
              />
              <FieldRow 
                label='Linkedin Profile'
                name='linkedInURL'
                defaultValue={user.linkedInURL}
                registerFunc={register}
              />
              <Button type='submit' disabled={loading}>{loading ? <span>...</span> : <span>Submit</span>}</Button>
            </div>
          </form>
        </Container>
      </Layout>
    );
  }
  return(
    <Layout>
      <Container>
        <p>You are not logged in</p>
      </Container>
    </Layout>
  )
}