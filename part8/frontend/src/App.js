import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Link, Switch, Route, Redirect
} from 'react-router-dom'
import { useApolloClient, useQuery, useLazyQuery, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED, USER } from './queries'

function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const client = useApolloClient()

  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)
  const [loadUser, { data }] = useLazyQuery(USER)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      window.alert(`Book added ${subscriptionData.data.bookAdded.title}`)
    }
  })

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
    <Router>
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
          {!token
            ? <Redirect to="/login" />
            : <BookForm user={user} />
          }
        </Route>
        <Route path="/recommend">
          {!token
            ? <Redirect to="/login" />
            : <Recommend user={user} />
          }
        </Route>
        <Route path="/">
          <Authors result={allAuthors} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
