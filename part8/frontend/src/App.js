import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Link, Switch, Route, Redirect
} from 'react-router-dom'
import { useApolloClient, useQuery, useLazyQuery, useSubscription } from '@apollo/client'

import updateCache from './utils/updateCache'

import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'

import { ALL_AUTHORS, ALL_BOOKS, GENRE_BOOKS, BOOK_ADDED, USER } from './queries'

function App() {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  const client = useApolloClient()

  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)
  const [loadUser, { data: userData }] = useLazyQuery(USER)
  const [loadBooks, recommend] = useLazyQuery(GENRE_BOOKS)

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
      loadUser()
    }
  }, [loadUser])

  useEffect(() => {
    if (userData && userData.user !== null) {
      setUser(userData.user)
    }
  }, [userData])  // eslint-disable-line

  useEffect(() => {
    if (user) {
      loadBooks({
        variables: { genre: user.favoriteGenre }
      })
    }
  }, [loadBooks, user])

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.clear()
    client.resetStore()
  }

  const updateCacheWith = updateCache(client, user)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`Book added ${subscriptionData.data.bookAdded.title}`)
      updateCacheWith(subscriptionData.data.bookAdded)
    }
  })

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
            : <BookForm updateCacheWith={updateCacheWith} user={user} />
          }
        </Route>
        <Route path="/recommend">
          {!token
            ? <Redirect to="/login" />
            : <Recommend user={user} recommend={recommend} />
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
