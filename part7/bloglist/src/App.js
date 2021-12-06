import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialLogin, logOut } from './reducers/loginReducer'
import {
  BrowserRouter as Router,
  Link, Switch, Route
} from 'react-router-dom'
import {
  Blog,
  Blogs,
  Login,
  Notification,
  User,
  Users
} from './components'


const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initialLogin())
  }, [dispatch])

  if (user === null) {
    return <Login />
  }

  const padding = {
    padding: 5
  }

  const navigation = {
    backgroundColor: 'lightgrey',
    padding: 5
  }

  return (
    <Router>
      <div style={navigation}>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user.name} logged in { }
        <button onClick={() => dispatch(logOut())}>logout</button>
      </div>
      <Notification />
      <Switch>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Blogs />
        </Route>
      </Switch>
    </Router>
  )
}

export default App