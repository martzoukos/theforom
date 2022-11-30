import { getCsrfToken } from "next-auth/react"
import Layout, { siteTitle } from '../components/Layout';
import Head from "next/head";
import Container from "../components/Container";
import SignInForm from "../components/SignInForm";

export default function SignIn({ csrfToken }) {
  return (
    <Layout>
      <Head>
        <title>Sign in - {siteTitle}</title>
      </Head>
      <Container isNarrow={true}>
        <SignInForm csrfToken />
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