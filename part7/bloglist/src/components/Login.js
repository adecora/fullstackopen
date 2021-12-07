import React from 'react'
import { useDispatch } from 'react-redux'
import { logIn } from '../reducers/loginReducer'
import { useField } from '../hooks'
import Notification from './Notification'
import {
  Container,
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap'


const Login = () => {
  const dispatch = useDispatch()

  const { reset: resetUsername, ...username } = useField('Username', 'text')
  const { reset: resetPassword, ...password } = useField('Password', 'password')

  const handleLogin = (event) => {
    event.preventDefault()

    dispatch(
      logIn({
        username: username.value,
        password: password.value
      })
    )

    resetUsername()
    resetPassword()
  }

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col md="6">
          <Notification />
          <h2 className="mt-3 mb-3">log in</h2>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="formGroupUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control placeholder="Username" {...username} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control placeholder="Password" {...password} />
            </Form.Group>
            <Button variant="primary" type="submit">
              login
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  )
}

export default Login