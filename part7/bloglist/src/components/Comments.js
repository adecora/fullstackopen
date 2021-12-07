import React from 'react'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'
import {
  Col,
  Button,
  Row,
  Form
} from 'react-bootstrap'

const Comments = ({ id, comments }) => {
  const dispatch = useDispatch()
  const { reset: resetComment, ...comment } = useField('Comment', 'text')

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(
      id,
      { comment: comment.value }
    ))
    resetComment()
  }

  return (
    <div>
      <h3 style={{ textStyle: 'end' }}>comments</h3>
      <Form onSubmit={handleComment}>
        <Form.Group as={Row} className="mb-3" controlId="formGroupComment">
          <Col sm="8">
            <Form.Control placeholder="Comment" {...comment} />
          </Col>
          <Col sm="4">
            <Button type="submit">add comment</Button>
          </Col>
        </Form.Group>
      </Form>
      <ul>
        {comments.map((comment, index) =>
          <li key={comment + index}>{comment}</li>
        )}
      </ul>
    </div>
  )
}

export default Comments