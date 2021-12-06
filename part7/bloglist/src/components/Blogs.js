import React, { useEffect } from 'react'
// import Blog from './Blog'
import { Link } from 'react-router-dom'
import NoteForm from './NoteForm'
import Togglable from './Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from '../reducers/blogReducer'

const Blogs = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  // Sort the blogs array by number of likes, sort is an in place operation
  blogs.sort((a, b) => b.likes - a.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <Togglable buttonLabel="create new blog">
        <NoteForm />
      </Togglable>
      {blogs.map(blog =>
        <div className="blog" style={blogStyle} key={blog.id} blog={blog} >
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      )}
    </div>
  )
}

export default Blogs