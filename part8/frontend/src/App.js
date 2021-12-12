import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './query'
import Authors from './components/Authors'
import Books from './components/Books'

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
      </div>
      <Switch>
        <Route path="/books">
          <Books result={allBooks} />
        </Route>
        <Route path="/">
          <Authors result={allAuthors} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
