/* eslint-disable @next/next/no-img-element */
import { Facebook, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import Container from './Container';
import styles from './UserHeader.module.css';
import ReactTimeAgo from 'react-time-ago';

export const UserHeader = ({ user }) => {
  return (
    <Container isNarrow={true}>
      <div className={styles.topRow}>
        {user.image &&
          <Image
            className={styles.image} 
            src={user.image} 
            alt={user.name}
            width='120'
            height='120'
          />
        }
        <div>
          <h1 className={`
            as-h1
            ${styles.name}
          `}>
            {user.name}
          </h1>
          <div className={styles.info}>
            {user.shortBio &&
              <div>
                {user.shortBio}
                &nbsp;&middot;&nbsp;
              </div>
            }
            <div>{user._count.posts} posts</div>
            &nbsp;&middot;&nbsp;
            <div>Member since <ReactTimeAgo date={user.createdAt} /></div>
          </div>
          <div className={styles.socialLinks}>
            {user.twitterURL &&
              <a href={user.twitterURL} className={styles.socialButton}>
                <Twitter className={`${styles.socialIcon} ${styles.twitter}`} />
              </a>
            }
            {user.facebookURL &&
              <a href={user.facebookURL} className={styles.socialButton}>
                <Facebook className={`${styles.socialIcon} ${styles.facebook}`} />
              </a>
            }
            {user.linkedInURL &&
              <a href={user.linkedInURL} className={styles.socialButton}>
                <Linkedin className={`${styles.socialIcon} ${styles.linkedin}`} />
              </a>
            }
          </div>
        </div>
      </div>
      {user.longBio &&
        <div className={styles.longBio}>
          {user.longBio}    
        </div>
      }
    </Container>
  )
}