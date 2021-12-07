import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Card from 'react-bootstrap/Card'

const User = () => {
  const id = useParams().id
  const user = useSelector((state) =>
    state.users.find(user => user.id === id)
  )

  if (user === undefined) {
    return null
  }

  return (
    <Card
      bg="light"
      text="dark"
      style={{ width: '50rem' }}
      className="mb-2"
    >
      <Card.Header as="h5">{user.name}</Card.Header>
      <Card.Body>
        {user.blogs.length === 0
          ? <Card.Title>no added blogs</Card.Title>
          : (
            <div>
              <Card.Title>added blogs</Card.Title>
              <ul>
                {user.blogs.map(blog =>
                  <li key={blog.id}>{blog.title}</li>
                )}
              </ul>
            </div>
          )
        }
      </Card.Body>
    </Card>
  )
}

export default User