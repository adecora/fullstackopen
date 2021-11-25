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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const handleLogin = (event) => {
    event.preventDefault()
    loginService.login({ username, password })
      .then(user => {
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        )
        setUser(user)
        blogService.setToken(user.token)
        setUsername('')
        setPassword('')
      })
      .catch((_error) => {
        setNotification('wrong username or password')
        setUsername('')
        setPassword('')
        setTimeout(() => {
          setNotification(null)
        }, 3000)
      })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blog = {
      title,
      author,
      url
    }

    blogService
      .create(blog)
      .then(returnedBlog => {
        setNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
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
            type='error'
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
            <Notification message={notification} type='notification' />
            <div>
              {user.name} logged in { }
              <button onClick={handleLogout}>logout</button>
            </div>
            <Togglable buttonLabel="create new blog">
              <NoteForm
                onSubmit={addBlog}
                title={title}
                onChangeTitle={({ target }) => setTitle(target.value)}
                author={author}
                onChangeAuthor={({ target }) => setAuthor(target.value)}
                url={url}
                onChangeUrl={({ target }) => setUrl(target.value)}
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