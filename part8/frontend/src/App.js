import React, { useState } from 'react'
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import { useApolloClient, useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import LoginForm from './components/LoginForm'

import { ALL_AUTHORS, ALL_BOOKS } from './queries'

function App() {
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)

  const logout = () => {
    setToken(null)
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
          {token ? <Redirect to="/" /> : <LoginForm setToken={setToken} />}
        </Route>
        <Route path="/book_form">
          {!token ? <Redirect to="/login" /> : <BookForm />}
        </Route>
        <Route path="/">
          <Authors result={allAuthors} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
