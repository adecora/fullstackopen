import React, { useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NoteForm from './components/NoteForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, logOut } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [])

  // Sort the blogs array by number of likes, sort is an in place operation
  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>

      {user === null
        ? <Login />
        : (
          <>
            <h2>blogs</h2>
            <Notification />
            <div>
              {user.name} logged in { }
              <button onClick={() => dispatch(logOut())}>logout</button>
            </div>
            <Togglable buttonLabel="create new blog">
              <NoteForm />
            </Togglable>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </>
        )
      }
    </div >
  )
}

export default App