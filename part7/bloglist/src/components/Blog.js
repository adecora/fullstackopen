import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { useTogglable } from '../hooks'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const username = useSelector((state) => state.user.username)

  const togglable = useTogglable(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const removeStyle = {
    backgroundColor: 'cornflowerblue',
    borderRadius: 5
  }

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

  return (
    <div className="blog" style={blogStyle}>
      <div className="showAlways">
        {blog.title} {blog.author}
        <button onClick={togglable.toggleVisibility}>
          {togglable.value ? 'hide' : 'view'}
        </button>
      </div>
      <div style={togglable.showWhenVisible} className="showWhenDetail">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button id="like-blog" onClick={incLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {
          username === blog.user.username &&
          <button style={removeStyle} onClick={removeBlog}>remove</button>
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog