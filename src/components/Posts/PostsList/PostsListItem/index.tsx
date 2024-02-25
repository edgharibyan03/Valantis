import { postItem } from "../../../../interfaces/posts"

export default function PostsListItem({
  post
}: {
  post: postItem
}) {
  return (
    <div className="posts-list-item">
      <h3>{post.product}</h3>
      {post.brand && <span>{post.brand}</span>}
      <span>{post.price}</span>
    </div>
  )
}