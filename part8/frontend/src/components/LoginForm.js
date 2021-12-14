import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'

import { useField } from '../hooks'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken }) => {
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.error(error)
    }
  })

  const { reset: resetUsername, ...username } = useField('text')
  const { reset: resetPassword, ...password } = useField('password')

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data])  // eslint-disable-line

  const submit = (event) => {
    event.preventDefault()

    login({
      variables: {
        username: username.value,
        password: password.value
      }
    })

    resetUsername()
    resetPassword()
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username: { }
          <input {...username} />
        </div>
        <div>
          password: { }
          <input {...password} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm