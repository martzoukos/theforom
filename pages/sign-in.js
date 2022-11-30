import { getCsrfToken, useSession } from "next-auth/react"
import Layout, { siteTitle } from '../components/Layout';
import Head from "next/head";
import Container from "../components/Container";
import SignInForm from "../components/SignInForm";
import { useRouter } from "next/router";

export default function SignIn({ csrfToken }) {
  const { data: session } = useSession()
  const router = useRouter()
  if (session) {
    router.push('/')
  }
  return (
    <Layout>
      <Head>
        <title>Sign in - {siteTitle}</title>
      </Head>
      <Container isNarrow={true}>
        <SignInForm csrfToken={csrfToken} />
      </Container>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context)
  return {
    props: { csrfToken },
  }
}