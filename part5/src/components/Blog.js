import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, username, updateLike, removeBlog }) => {
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
    updateLike(
      blog.id,
      {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id
      }
    )
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
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
          <button style={removeStyle} onClick={deleteBlog}>remove</button>
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  updateLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog