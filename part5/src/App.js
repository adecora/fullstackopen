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
  const [notificationType, setNotificationType] = useState(null)
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
        console.log(returnedBlog)
        setNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setNotificationType("notification")
        setBlogs(blogs.concat(returnedBlog))

        setTimeout(() => {
          setNotification(null)
          setNotificationType(null)
        }, 3000)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const incLike = (id, changedBlog) => {
    console.log(id, changedBlog)
    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        console.log(returnedBlog)
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        console.log(error)

        setNotification(
          `Blog '${changedBlog.title}' was already removed from the server`
        )
        setNotificationType("error")

        setTimeout(() => {
          setNotification(null)
          setNotificationType(null)
        }, 3000)
        setBlogs(blogs.filter(blog => blog.id !== id))
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
            <Notification message={notification} type={notificationType} />
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
              <Blog key={blog.id} blog={blog} updateLike={incLike} />
            )}
          </>
        )
      }
    </div >
  )
}

export default App