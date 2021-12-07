import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { useField } from '../hooks'
import {
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap'

const NoteForm = () => {
  const dispatch = useDispatch()

  const { reset: resetTitle, ...title } = useField('Title', 'text')
  const { reset: resetAuthor, ...author } = useField('Author', 'text')
  const { reset: resetUrl, ...url } = useField('Url', 'url')

  const addBlog = (event) => {
    event.preventDefault()

    dispatch(
      createBlog(
        {
          title: title.value,
          author: author.value,
          url: url.value
        }
      )
    )

    resetTitle()
    resetAuthor()
    resetUrl()
  }

  return (
    <div>
      <h2 className="mt-3 mb-3">Create new</h2>
      <Row>
        <Col sm="4">
          <Form className="mb-2" onSubmit={addBlog}>
            <Form.Group as={Row} className="mb-3" controlId="formGroupTitle">
              <Form.Label column sm="2">Title:</Form.Label>
              <Col sm="10">
                <Form.Control placeholder="Title" {...title} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formGroupAuthor">
              <Form.Label column sm="2">Author:</Form.Label>
              <Col sm="10">
                <Form.Control placeholder="Author" {...author} />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="formGroupUrl">
              <Form.Label column sm="2">Url:</Form.Label>
              <Col sm="10">
                <Form.Control placeholder="Url" {...url} />
              </Col>
            </Form.Group>
            <Button id="create-blog" type="submit">create</Button>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default NoteForm