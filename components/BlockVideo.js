import styles from './BlockVideo.module.css';
import urlParser from 'js-video-url-parser';

export const BlockVideo = ({ url }) => {
  
  // @TODO: add logic for different video providers
  const embedYoutubeURL = urlParser.parse(url)

  return (
    <iframe 
      className={styles.video}
      src={`https://www.youtube.com/embed/${embedYoutubeURL.id}`}
      title="YouTube video player" 
      frameborder="0" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowFullScreen   
    />
  )      
}