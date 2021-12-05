import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NoteForm from './components/NoteForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // Sort the blogs array by number of likes, sort is an in place operation
  blogs.sort((a, b) => b.likes - a.likes)

  const handleLogin = (userObject) => {
    loginService
      .login(userObject)
      .then(user => {
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        )
        setUser(user)
        blogService.setToken(user.token)
      })
      .catch(() => {
        dispatch(setNotification('wrong username or password', 'error', 3))
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>

      {user === null
        ? <Login logUser={handleLogin} />
        : (
          <>
            <h2>blogs</h2>
            <Notification />
            <div>
              {user.name} logged in { }
              <button onClick={handleLogout}>logout</button>
            </div>
            <Togglable buttonLabel="create new blog">
              <NoteForm />
            </Togglable>
            {blogs.map(blog =>
              <Blog key={blog.id}
                blog={blog}
                username={user.username}
              />
            )}
          </>
        )
      }
    </div >
  )
}

export default App