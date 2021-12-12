import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import BookForm from './components/BookForm'

function App() {
  const allAuthors = useQuery(ALL_AUTHORS)
  const allBooks = useQuery(ALL_BOOKS)

  return (
    <div>
      <div>
        <Link to="/">
          <button>authors</button>
        </Link>
        <Link to="/books">
          <button>books</button>
        </Link>
        <Link to="/book_form">
          <button>add book</button>
        </Link>
      </div>
      <Switch>
        <Route path="/books">
          <Books result={allBooks} />
        </Route>
        <Route path="/book_form">
          <BookForm />
        </Route>
        <Route path="/">
          <Authors result={allAuthors} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
