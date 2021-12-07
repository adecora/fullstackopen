import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog } from '../reducers/blogReducer'
import Comments from './Comments'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const Blog = () => {
  const id = useParams().id
  const blog = useSelector((state) =>
    state.blogs.find(blog => blog.id === id)
  )

  if (blog === undefined) {
    return null
  }

  const dispatch = useDispatch()

  const incLike = () => {
    dispatch(
      likeBlog(
        blog.id,
        {
          likes: blog.likes + 1,
        }
      )
    )
  }

  return (
    <Card
      bg="light"
      text="dark"
      style={{ width: '50rem' }}
      className="mb-2"
    >
      <Card.Header as="h5">{blog.title} {blog.author}</Card.Header>
      <Card.Body>
        <Card.Title>
          <a href={blog.url}>{blog.url}</a>
        </Card.Title>
        <Card.Title>
          {blog.likes} likes {' '}
          <Button
            id="like-blog"
            className="ml-4"
            onClick={incLike}
          >
            like
          </Button>
        </Card.Title>
        <Card.Text>
          added by {blog.user.name}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Comments
          id={blog.id}
          comments={blog.comments}
        />
      </Card.Footer>
    </Card>
  )
}

export default Blog