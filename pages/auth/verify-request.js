import Layout, { siteTitle } from '../../components/Layout';
import Head from "next/head";
import Container from "../../components/Container";

export default function SignIn() {
  return (
    <Layout>
      <Head>
        <title>Check your email! - {siteTitle}</title>
      </Head>
      <Container isNarrow={true}>
        <div>
          <h1 className='as-h2'>Check your email!</h1>
          <p style={{textAlign: 'center'}}>
            We just sent you an email with the magic link to sign in.
          </p>
        </div>
      </Container>
    </Layout>
  )
}