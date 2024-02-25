import PostsListItem from "./PostsListItem";
import uniqBy from "../../../utils";
import { postItem } from "../../../interfaces/posts";

export default function PostsList({
  postsList,
}: {
  postsList: postItem[]
}) {

  return (
    <div className="posts-list">
      {
        uniqBy(postsList).map(post => <PostsListItem
          post={post}
          key={post.id}
        />)
      }
    </div>
  )
}