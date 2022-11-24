export default function flattenParticipants(posts, uniqueKey, count) {
  return posts.filter((post, index, posts) => {
    return posts.map(p => p.User[uniqueKey]).indexOf(post.User[uniqueKey]) === index
  })
  .slice(0, count)
  .map(p => p.User)
}