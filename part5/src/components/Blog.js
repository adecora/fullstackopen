import React, { useState } from 'react'

const Blog = ({ blog, updateLike }) => {
  const [showDetail, setShowDetail] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetail = () => {
    setShowDetail(!showDetail)
  }

  const showWhenDetail = { display: showDetail ? '' : 'none' }

  const incLike = () => {
    console.log({ blog })
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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetail}>{showDetail ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenDetail}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={incLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog