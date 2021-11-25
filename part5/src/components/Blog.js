import React, { useState } from 'react'

const Blog = ({ blog }) => {
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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
        <button onClick={toggleDetail}>{showDetail ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenDetail}>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button>like</button>
        </div>
        <div>{blog.author}</div>
      </div>
    </div>
  )
}

export default Blog