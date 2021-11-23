import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault()
    loginService.login({ username, password })
      .then(user => {
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        )
        setUser(user)
        setUsername('')
        setPassword('')
      })
      .catch((_error) => {
        setErrorMessage('wrong username or password')
        setUsername('')
        setPassword('')
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
      <Notification message={errorMessage} />
      {user === null
        ? (
          <Login
            onSubmit={handleLogin}
            username={username}
            onChangeUsername={({ target }) => setUsername(target.value)}
            password={password}
            onChangePassword={({ target }) => setPassword(target.value)}
          />
        )
        : (
          <>
            <h2>blogs</h2>
            <div>
              {user.name} logged in { }
              <button onClick={handleLogout}>logout</button>
            </div>
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