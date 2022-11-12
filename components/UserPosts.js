import documentToPlainText from "../lib/documentToPlainText"
import styles from './UserPosts.module.css'
import Masonry from '@mui/lab/Masonry';
import { Card, CardActions, CardContent } from "@mui/material";
import Link from "next/link";

export const UserPosts = ({ posts }) => {
  return (
    <section className={styles.container}>
      <h2>Posts: </h2>
      <Masonry 
        columns={2}
        spacing={3}
      >
        {posts.map((post, i) => {
          const text = documentToPlainText(post.content).trim()
          const createdAtDate = new Date(post.createdAt).toLocaleString()
          return (
            <Card key={i} variant="outlined">
              <CardContent>
                <div className={styles.content}>
                  {text.split(' ').slice(0, 100).join(' ')}
                </div>
                <div className={styles.date}>
                  Posted at: 
                  {createdAtDate}
                </div>
                <Link 
                  href={`/threads/${post.Thread.id}#post-${post.id}`}
                  className={styles.thread}
                >
                  {post.Thread.subject}
                </Link>
              </CardContent>
            </Card>
          )}
        )}
      </Masonry>
    </section>
  )
}