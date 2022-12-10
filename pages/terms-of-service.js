/* eslint-disable react/no-unescaped-entities */
import Head from "next/head"
import Container from "../components/Container"
import Layout, { siteTitle } from "../components/Layout"

export default function TermsOfService() {
  return(
    <Layout>
      <Head>
        <title>Terms of Service - {siteTitle}</title>
      </Head>
      <Container>
        <h1 class='as-h2'>Terms of Service</h1>
        <div class='typography'>
          <p>Thank you for visiting The Forom! By accessing and using our forum, you are agreeing to comply with and be bound by the following terms and conditions of use. Please read them carefully.</p>

          <h2>1. Introduction</h2>
          <p>The Forom is a forum for discussion and exchange of ideas. The forum is provided as a service to its users. By using The Forom, you are agreeing to be bound by these terms and conditions of use, which may be updated by us from time to time without notice to you. If you do not agree with these terms and conditions, please do not use The Forom.</p>

          <h2>2. User Conduct</h2>
          <p>By using The Forom, you agree to follow the rules of conduct set forth below. We reserve the right to remove any content or terminate any user's access to The Forom for any reason, at any time, without prior notice.</p>
          <ul>
            <li>Do not post any content that is illegal, fraudulent, threatening, abusive, libelous, defamatory, obscene, pornographic, or otherwise offensive or inappropriate.</li>
            <li>Do not post any content that infringes on the rights of any third party, including intellectual property rights.</li>
            <li>Do not impersonate any other person or entity, or falsely represent your affiliation with any person or entity.</li>
            <li>Do not engage in any activities that may be harmful to The Forom or its users, including hacking, spamming, or distributing viruses or other malicious software.</li>
            <li>Do not use The Forom for any commercial purposes, including advertising or promoting any product or service.</li>
            <li>Do not collect or store personal information about other users without their consent.</li>
          </ul>

          <h2>3. User Content</h2>
          <p>By posting any content on The Forom, you represent and warrant that you have the right to do so and grant us a non-exclusive, perpetual, irrevocable, royalty-free, worldwide license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content. You also agree that we may remove or delete any content at any time, for any reason, without notice to you.</p>

          <h2>4. Disclaimer of Warranties</h2>
          <p>The Forom is provided on an "as is" and "as available" basis. We do not make any representations or warranties of any kind, express or implied, as to the operation of The Forom or the information, content, materials, or products included on The Forom. To the full extent permissible by applicable law, we disclaim all warranties, express or implied, including, but not limited to, implied warranties of merchantability and fitness for a particular purpose.</p>

          <h2>5. Limitation of Liability</h2>
          <p>We will not be liable for any damages of any kind arising from the use of The Forom, including, but not limited to, direct, indirect, incidental, punitive, and consequential damages.</p>

          <h2>6. Indemnification</h2>
          <p>You agree to indemnify and hold us and our affiliates, officers, agents, and employees harmless from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your use of The Forom, your violation of these terms and conditions, or your violation of any rights of another person or entity.</p>

          <h2>7. Governing Law</h2>
          <p>These terms and conditions of use shall be governed by and construed in accordance with the laws of the European Union, without giving effect to any principles of conflicts of law.</p>

          <h2>8. Changes to These Terms and Conditions</h2>
          <p>We reserve the right to change these terms and conditions of use at any time, without notice to you. Any changes will be effective immediately upon posting to The Forom. By continuing to use The Forom after any changes are posted, you are agreeing to be bound by the revised terms and conditions of use.</p>

          <h2>9. Contact Us</h2>
          <p>If you have any questions or concerns about these terms and conditions, please contact us at <a href='mailto:hello@theforom.com'>hello@theforom.com</a>.</p>

        </div>
      </Container>
    </Layout>
  )
}