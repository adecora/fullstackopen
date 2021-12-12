import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import Authors from './components/Authors';

function App() {


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
          <h2>books</h2>
        </Route>
        <Route path="/">
          <Authors />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
