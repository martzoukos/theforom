import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
// import prisma from '../lib/prisma'
import Link from 'next/link'
import { List, ListItem, Container, Avatar, Button, Paper, TextField, InputAdornment, Snackbar } from '@mui/material';
import { useSession, signIn } from 'next-auth/react';
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { Stack } from '@mui/system';
import { useState } from 'react';
import { Facebook, Linkedin, Twitter } from 'lucide-react';
import { LoadingButton } from '@mui/lab';

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
  const [name, setName] = useState(user.name)
  const [image, setImage] = useState(user.image)
  const [shortBio, setShortBio] = useState(user.shortBio)
  const [longBio, setLongBio] = useState(user.longBio)
  const [twitterURL, setTwitterURL] = useState(user.twitterURL)
  const [facebookURL, setFacebookURL] = useState(user.facebookURL)
  const [linkedInURL, setLinkedInURL] = useState(user.linkedInURL)


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
            <Stack spacing={2}>
              <h1>My Settings</h1>
              <TextField 
                label='Name' 
                value={name} 
                onChange={e => setName(e.target.value) } 
              />
              <TextField 
                label='Short bio' 
                value={shortBio} 
                onChange={e => setShortBio(e.target.value) } 
              />
              <TextField 
                label='Long bio' 
                value={longBio} 
                onChange={e => setLongBio(e.target.value) } 
                multiline={true} 
              />
              <TextField 
                label='Twitter profile' 
                value={twitterURL} 
                onChange={e => setTwitterURL(e.target.value) } 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Twitter />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField 
                label='Facebook profile' 
                value={facebookURL} 
                onChange={e => setFacebookURL(e.target.value) } 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Facebook />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField 
                label='Linkedin profile' 
                value={linkedInURL} 
                onChange={e => setLinkedInURL(e.target.value) } 
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Linkedin />
                    </InputAdornment>
                  ),
                }}
              />
              <LoadingButton type='submit' loading={loading} variant='contained'>Submit</LoadingButton>
            </Stack>
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