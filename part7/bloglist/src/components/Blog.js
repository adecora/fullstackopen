import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import Comments from './Comments'

const Blog = () => {
  const id = useParams().id
  const blog = useSelector((state) =>
    state.blogs.find(blog => blog.id === id)
  )

  if (blog === undefined) {
    return null
  }

  const dispatch = useDispatch()

  const incLike = () => {
    dispatch(
      likeBlog(
        blog.id,
        {
          likes: blog.likes + 1,
        }
      )
    )
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button id="like-blog" onClick={incLike}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      <Comments
        id={blog.id}
        comments={blog.comments}
      />
    </div>
  )
}

export default Blog