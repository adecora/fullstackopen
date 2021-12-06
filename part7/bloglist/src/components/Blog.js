import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = () => {
  const id = useParams().id
  const blog = useSelector((state) =>
    state.blogs.find(blog => blog.id === id)
  )

  if (blog === undefined) {
    return null
  }

  const dispatch = useDispatch()
  const username = useSelector((state) => state.user.username)

  const incLike = () => {
    dispatch(
      likeBlog(
        blog.id,
        {
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: blog.likes + 1,
          user: blog.user.id
        }
      )
    )
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
    }
  }

  const removeStyle = {
    backgroundColor: 'cornflowerblue',
    borderRadius: 5
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
      {
        username === blog.user.username &&
        <button style={removeStyle} onClick={removeBlog}>remove</button>
      }
    </div>
  )
}

export default Blog