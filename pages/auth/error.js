import Layout, { siteTitle } from '../../components/Layout';
import Head from "next/head";
import Container from "../../components/Container";
import { useRouter } from 'next/router';

export default function SignIn() {
  const router = useRouter()
  const { error } = router.query
  let errorMessage
  switch (error) {
    case 'Configuration':
      errorMessage = 'There was a problem with our server. If the problem persists, get in touch at hello@theforom.com'
      break;
    case 'AccessDenied':
      errorMessage = 'There was a problem with our server. If the problem persists, get in touch at hello@theforom.com'
      break;
    case 'Verification':
      errorMessage = 'Did you click on an old email maybe? Check your emails again.'
      break;
    case 'Verification':
      errorMessage = 'There was a problem with our server. If the problem persists, get in touch at hello@theforom.com'
      break;
  }
  return (
    <Layout>
      <Head>
        <title>Sign in error - {siteTitle}</title>
      </Head>
      <Container isNarrow={true}>
        <div>
          <h1 className='as-h2'>We can&apos;t sign you in</h1>
          <p style={{textAlign: 'center'}}>
            {errorMessage}
          </p>
        </div>
      </Container>
    </Layout>
  )
}