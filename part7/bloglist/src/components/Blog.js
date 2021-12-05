import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog, username }) => {
  const dispatch = useDispatch()

  const [showDetail, setShowDetail] = useState(false)

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

  const toggleDetail = () => {
    setShowDetail(!showDetail)
  }

  const showWhenDetail = { display: showDetail ? '' : 'none' }

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
        <button onClick={toggleDetail}>{showDetail ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenDetail} className="showWhenDetail">
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
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
}

export default Blog