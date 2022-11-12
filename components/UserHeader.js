/* eslint-disable @next/next/no-img-element */
import { Facebook, Linkedin, Twitter } from 'lucide-react';
import styles from './UserHeader.module.css';

export const UserHeader = ({ user }) => {
  return (
    <div className={styles.container}>
      <div className={styles.topRow}>
        {user.image &&
          <img className={styles.image} src={user.image} alt={user.name} />
        }
        <div>
          <h1 className={styles.name}>{user.name}</h1>
          <div className={styles.info}>
            {user.shortBio &&
              <span>
                {user.shortBio}
                &nbsp;&middot;&nbsp;
              </span>
            }
            <span>{user._count.posts} posts</span>
            &nbsp;&middot;&nbsp;
            {user.twitterURL &&
              <a href={user.twitterURL} className={styles.socialButton}>
                <Twitter className={styles.socialIcon} />
              </a>
            }
            {user.facebookURL &&
              <a href={user.facebookURL} className={styles.socialButton}>
                <Facebook className={styles.socialIcon} />
              </a>
            }
            {user.linkedInURL &&
              <a href={user.linkedInURL} className={styles.socialButton}>
                <Linkedin className={styles.socialIcon} />
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
    </div>
  )
}