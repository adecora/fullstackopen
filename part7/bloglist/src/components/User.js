import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const id = useParams().id
  const user = useSelector((state) =>
    state.users.find(user => user.id === id)
  )

  if (user === undefined) {
    return null
  }

  return (
    <div>
      <h2>{user.name}</h2>
      {user.blogs.length === 0
        ? <h3>no added blogs</h3>
        : (
          <div>
            <h3>added blogs</h3>
            <ul>
              {user.blogs.map(blog =>
                <li key={blog.id}>{blog.title}</li>
              )}
            </ul>
          </div>
        )
      }
    </div>
  )
}

export default User