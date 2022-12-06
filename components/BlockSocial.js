import { TwitterEmbed, FacebookEmbed, InstagramEmbed } from 'react-social-media-embed';

export const BlockSocial = ({ url, provider }) => {
  return(
    <>
      {provider === 'twitter' &&
        <TwitterEmbed url={url} />
      }
      {provider === 'facebook' &&
        <FacebookEmbed url={url} />
      }
      {provider === 'instagram' &&
        <InstagramEmbed url={url} />
      }
    </>
  ) 
}