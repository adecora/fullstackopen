import React from 'react'
import { useDispatch } from 'react-redux'
import { logIn } from '../reducers/loginReducer'
import { useField } from '../hooks'
import Notification from './Notification'

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
    <div>
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login