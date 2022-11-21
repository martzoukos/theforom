import Head from 'next/head';
import Layout from '../components/Layout';
import prisma from '../lib/prisma'
import Container from '../components/Container';
import Avatar from '../components/Avatar';
import Button from '../components/Button';
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { useState } from 'react';
import { uploadFile } from '../lib/uploadFile';
import { stringAvatar } from '../lib/stringAvatar';
import { resizeImage } from '../lib/resizeImage';

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
  const [name, setName] = useState(user.name)
  const [image, setImage] = useState(user.image)
  const [shortBio, setShortBio] = useState(user.shortBio)
  const [longBio, setLongBio] = useState(user.longBio)
  const [twitterURL, setTwitterURL] = useState(user.twitterURL)
  const [facebookURL, setFacebookURL] = useState(user.facebookURL)
  const [linkedInURL, setLinkedInURL] = useState(user.linkedInURL)

  const handleAvatarUpload = async event => {
    setAvatarLoading(true)
    const file = event.target.files[0]
    const resizedFile = await resizeImage(file, 400, 400, 'jpg')
    const imageURL = await uploadFile(resizedFile, 'settings')
    const result = await fetch(`/api/users/${user.id}/avatar`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid: user.id,
        image: imageURL,
      }),
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

  const handleSubmit = async event => {
    setLoading(true)
    event.preventDefault()
    const body = { 
      uid: user.id,
      user: {
        name: name,
        shortBio: shortBio,
        longBio: longBio,
        twitterURL: twitterURL,
        facebookURL: facebookURL,
        linkedInURL: linkedInURL,
      }
     };
    const result = await fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    setLoading(false)
    switch (result.status) {
      case 200:
        alert('Your settings are updated')
        break;
      default:
        alert('There was an issue with your request, please try again.')
    }
  }

  if (user) {
    return (
      <Layout>
        <Head>
          <title>Settings</title>
        </Head>
        <Container>
          <form onSubmit={handleSubmit}>
            <div>
              <h1>My Settings</h1>
              <div>
                {image ?
                  <Avatar src={image} />
                : <Avatar sx={{ bgcolor: 'blue' }} {...stringAvatar(name)} />
                }
                <input type='file' onChange={handleAvatarUpload} />
              </div>
              <input
                type='text' 
                value={name} 
                onChange={e => setName(e.target.value) } 
              />
              <input
                type='text' 
                label='Short bio' 
                value={shortBio} 
                onChange={e => setShortBio(e.target.value) } 
              />
              <input
                type='text' 
                label='Long bio' 
                value={longBio} 
                onChange={e => setLongBio(e.target.value) } 
                multiline={true} 
              />
              <input
                type='text' 
                label='Twitter profile' 
                value={twitterURL} 
                onChange={e => setTwitterURL(e.target.value) } 
              />
              <input
                type='text' 
                label='Facebook profile' 
                value={facebookURL} 
                onChange={e => setFacebookURL(e.target.value) } 
              />
              <input
                type='text' 
                label='Linkedin profile' 
                value={linkedInURL} 
                onChange={e => setLinkedInURL(e.target.value) } 
              />
              <Button type='submit' loading={loading} variant='contained'>Submit</Button>
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