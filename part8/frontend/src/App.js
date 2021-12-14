import React, { useEffect, useState } from 'react'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import { useApolloClient, useQuery, useLazyQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import LoginForm from './components/LoginForm'

import { ALL_AUTHORS, ALL_BOOKS, USER } from './queries'

function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const client = useApolloClient()

  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)
  const [loadUser, { data }] = useLazyQuery(USER)

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
      loadUser()
    }
  }, [loadUser])

  useEffect(() => {
    if (data && data.user !== null) {
      setUser(data.user)
    }
  }, [data])  // eslint-disable-line

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <Link to="/">
          <button>authors</button>
        </Link>
        <Link to="/books">
          <button>books</button>
        </Link>
        {token
          ? (
            <>
              <Link to="/book_form">
                <button>add book</button>
              </Link>
              <Link to="/recommend">
                <button>recommend</button>
              </Link>
              <button onClick={logout}>logout</button>
            </>
          )
          : (
            <Link to="/login">
              <button>login</button>
            </Link>
          )
        }
      </div>
      <Switch>
        <Route path="/books">
          <Books result={allBooks} />
        </Route>
        <Route path="/login">
          {token
            ? <Redirect to="/" />
            : <LoginForm setToken={setToken} setUser={loadUser} />
          }
        </Route>
        <Route path="/book_form">
          {!token ? <Redirect to="/login" /> : <BookForm />}
        </Route>
        <Route path="/recommend">
          {!token
            ? <Redirect to="/login" />
            : <Books result={allBooks} user={user} />
          }
        </Route>
        <Route path="/">
          <Authors result={allAuthors} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
