import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NoteForm from './components/NoteForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
      .catch((_error) => {
        setNotification('wrong username or password')

        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (blog) => {
    blogService
      .create(blog)
      .then(returnedBlog => {
        setNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setBlogs(blogs.concat(returnedBlog))

        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div>

      {user === null
        ? (
          <Login
            message={notification}
            logUser={handleLogin}
          />
        )
        : (
          <>
            <h2>blogs</h2>
            <Notification message={notification} type='notification' />
            <div>
              {user.name} logged in { }
              <button onClick={handleLogout}>logout</button>
            </div>
            <Togglable buttonLabel="create new blog">
              <NoteForm
                createBlog={addBlog}
              />
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