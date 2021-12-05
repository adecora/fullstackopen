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
import { initializeBlogs, createBlog } from './reducers/blogReducer'

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

  const addBlog = (blog) => {
    dispatch(createBlog(blog))
    // blogService
    //   .create(blog)
    //   .then(returnedBlog => {
    //     dispatch(
    //       setNotification(
    //         `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
    //         'notification',
    //         3
    //       )
    //     )
    //     setBlogs(blogs.concat(returnedBlog))
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     dispatch(setNotification(error.response.data.error, 'error', 3))
    //   })
  }

  const incLike = (id, changedBlog) => {
    console.log(id, changedBlog)
    // blogService
    //   .update(id, changedBlog)
    //   .then(returnedBlog => {
    //     setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     dispatch(
    //       setNotification(
    //         `Blog '${changedBlog.title}' was already removed from the server`,
    //         'error',
    //         3
    //       )
    //     )
    //     setBlogs(blogs.filter(blog => blog.id !== id))
    //   })
  }

  const removeBlog = (id) => {
    console.log(id)
    // blogService
    //   .remove(id)
    //   .then(() => {
    //     setBlogs(blogs.filter(blog => blog.id !== id))
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     dispatch(setNotification(error.response.statusText, 'error', 3))
    //   })
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