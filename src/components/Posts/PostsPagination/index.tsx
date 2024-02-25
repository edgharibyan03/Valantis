import { postItem } from "../../../interfaces/posts"

interface props {
  filterObj: {
    offset: number,
    limit: number
  },
  postsList: postItem[],
  handleChangePagination: (action: 'increment' | 'decrement') => void
}

export default function PostsPagination({
  filterObj,
  postsList,
  handleChangePagination
}: props) {
  return (
    <div className="posts-pagination">
      <span className={filterObj.offset === 0 ? 'disabled' : ''} onClick={() => handleChangePagination('decrement')}>{`<`}</span>
      <span className={postsList.length < 47 ? 'disabled' : ''} onClick={() => handleChangePagination('increment')}>{`>`}</span>
    </div>
  )
}