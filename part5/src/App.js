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
        setNotificationType('notification')
        setBlogs(blogs.concat(returnedBlog))

        setTimeout(() => {
          setNotification(null)
          setNotificationType(null)
        }, 3000)
      })
      .catch(error => {
        console.log(error)
        setNotification(error.response.data.error)
        setNotificationType('error')

        setTimeout(() => {
          setNotification(null)
          setNotificationType(null)
        }, 3000)
      })
  }

  const incLike = (id, changedBlog) => {
    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        console.log(error)

        setNotification(
          `Blog '${changedBlog.title}' was already removed from the server`
        )
        setNotificationType('error')

        setTimeout(() => {
          setNotification(null)
          setNotificationType(null)
        }, 3000)
        setBlogs(blogs.filter(blog => blog.id !== id))
      })
  }

  const removeBlog = (id) => {
    blogService
      .remove(id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id))
      })
      .catch(error => {
        console.log(error)

        setNotification(error.response.statusText)
        setNotificationType('error')

        setTimeout(() => {
          setNotification(null)
          setNotificationType(null)
        }, 3000)
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
              <Blog key={blog.id}
                blog={blog}
                username={user.username}
                updateLike={incLike}
                removeBlog={removeBlog}
              />
            )}
          </>
        )
      }
    </div >
  )
}

export default App