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
import {
  Container,
  Navbar,
  Nav
} from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initialLogin())
  }, [dispatch])

  if (user === null) {
    return <Login />
  }

  const cursor = {
    cursor: 'pointer'
  }

  return (
    <Container>
      <Router>
        <Navbar bg="light" expand="lg">
          <Container fluid>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Nav.Link href="#">
                  <Link to="/" as="span">Blogs</Link>
                </Nav.Link>
                <Nav.Link href="#">
                  <Link to="/users">Users</Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Signed in as {user.name} <a style={cursor} onClick={() => dispatch(logOut())}>click to logout</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>

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
    </Container>
  )
}

export default App