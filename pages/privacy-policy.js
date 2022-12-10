import Head from "next/head"
import Container from "../components/Container"
import Layout, { siteTitle } from "../components/Layout"

export default function PrivacyPolicy() {
  return(
    <Layout>
      <Head>
        <title>Privacy Policy - {siteTitle}</title>
      </Head>
      <Container>
        <h1 class='as-h2'>Privacy Policy</h1>
        <div class='typography'>
          <p>
              Our forum is committed to protecting the privacy of our users. This privacy policy explains how we collect, use, and share information about you when you use our forum.
          </p>
          <h2>Information We Collect</h2>
          <p>
              We collect information about you when you register for an account on our forum, when you post messages, or when you interact with other features of our forum. This information may include your name, email address, and any other information you choose to provide.
          </p>
          <p>
              We may also collect information about your use of our forum, such as the content you view, the features you use, and the actions you take on our forum. This information may include your IP address, browser type, and other technical information about your device.
          </p>
          <h2>Cookies and Other Technologies</h2>
          <p>
              We may use cookies and other technologies to collect and store information about you and your use of our forum. Cookies are small pieces of data that are stored on your device and used to track your activity on our forum. We may use cookies to personalize your experience on our forum, to remember your preferences, and to provide you with a better user experience.
          </p>
          <p>
              You can choose to disable cookies in your browser settings, but this may affect your ability to use certain features of our forum.
          </p>
          <h2>How We Use Your Information</h2>
          <p>
              We use the information we collect about you for a variety of purposes, including:
          </p>
          <ul>
              <li>To provide and maintain our forum</li>
              <li>To personalize your experience on our forum</li>
              <li>To communicate with you about your use of our forum</li>
              <li>To respond to your questions and inquiries</li>
              <li>To improve the quality of our forum and to develop new features and services</li>
          </ul>
          <p>
              We do not sell, rent, or otherwise disclose your personal information to third parties for their marketing purposes without your consent.
          </p>
          <h2>Your Choices and Rights</h2>
          <p>
              You have the right to access, update, or delete your personal information that we collect and store about you. You can also choose to opt out of certain uses of your information, such as marketing communications.
          </p>
          <p>
              To exercise these rights, please contact us at <a href='mailto:hello@theforom.com'>hello@theforom.com</a>
          </p>
          <p>
              We will respond to your request within a reasonable time frame and provide you with the information you have requested, or take the action you have requested, subject to any legal or technical limitations.
          </p>
          <h2>Changes to This Privacy Policy</h2>
          <p>
              We may update this privacy policy from time to time to reflect changes to our practices or to comply with legal requirements. We will notify you of any material changes to this privacy policy by posting the updated policy on our forum.
          </p>

        </div>
      </Container>
    </Layout>
  )
}