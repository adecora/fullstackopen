import React from 'react'
import Notification from './Notification'

const Login = ({
  message,
  type,
  onSubmit,
  username,
  onChangeUsername,
  password,
  onChangePassword }) => (<>
    <h2>log in to application</h2>
    <Notification message={message} type={type} />
    <form onSubmit={onSubmit}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={onChangeUsername}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={onChangePassword}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </>)

export default Login