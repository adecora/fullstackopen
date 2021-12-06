import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { initialLogin, logOut } from './reducers/loginReducer'
import Notification from './components/Notification'
import Login from './components/Login'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'


const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initialLogin())
  }, [dispatch])

  return (
    <Router>
      {user && (
        <div>
          <h2>blogs</h2>
          <Notification />
          <div>
            {user.name} logged in { }
            <button onClick={() => dispatch(logOut())}>logout</button>
          </div>
        </div>
      )}
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          {user === null
            ? <Login />
            : <Blogs />
          }
        </Route>
      </Switch>
    </Router>
  )
}

export default App