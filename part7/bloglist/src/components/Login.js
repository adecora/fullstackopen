import React from 'react'
import { useField } from '../hooks'
import Notification from './Notification'
import PropTypes from 'prop-types'

const Login = ({
  logUser,
}) => {
  const { reset: resetUsername, ...username } = useField('Username', 'text')
  const { reset: resetPassword, ...password } = useField('Password', 'password')

  const handleLogin = (event) => {
    event.preventDefault()

    logUser({
      username: username.value,
      password: password.value
    })

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

Login.propTypes = {
  logUser: PropTypes.func.isRequired
}

export default Login