import styles from './BlockVideo.module.css';
import urlParser from 'js-video-url-parser';

export const BlockVideo = ({ url }) => {
  const parsedURL = urlParser.parse(url)
  const embedURL = getEmbedVideoURL(parsedURL)
  return(
    <iframe 
      src={embedURL} 
      className={`
        ${styles.video}
        ${styles[parsedURL.provider]}
      `}
      frameBorder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen="true" 
      scrolling="no"   
    />
  ) 
}

export const getEmbedVideoURL = parsedURL => {
  switch (parsedURL.provider) {
    case 'youtube':
      return `https://www.youtube.com/embed/${parsedURL.id}`
    case 'vimeo':
      return `https://player.vimeo.com/video/${parsedURL.id}?h=de6f341435`
    case 'tiktok':
      return `https://www.tiktok.com/embed/v2/${parsedURL.id}`
    case 'twitch':
      return `https://player.twitch.tv/?channel=${parsedURL.channel}&parent=www.theforom.com`
    case 'ted':
      return `https://embed.ted.com/talks/lang/en/${parsedURL.id}`
    case 'facebook':
      return `https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Fpeopleareawesome%2Fvideos%2F${parsedURL.id}%2F&show_text=false&width=476&t=0`
    case 'loom':
      return `https://www.loom.com/embed/${parsedURL.id}`
  } 
}