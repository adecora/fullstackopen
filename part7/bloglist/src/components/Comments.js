import React from 'react'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'

const Comments = ({ id, comments }) => {
  const dispatch = useDispatch()
  const { reset: resetComment, ...comment } = useField('Comment', 'text')

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(
      id,
      { comment: comment.value }
    ))
    resetComment()
  }

  return (
    <div>
      <h3>comments</h3>
      <form onSubmit={handleComment}>
        <input {...comment} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {comments.map(comment =>
          <li key={comment}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

export default Comments