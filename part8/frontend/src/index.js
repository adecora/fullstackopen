import React from 'react'
import ReactDOM from 'react-dom'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink
} from '@apollo/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000/'
  })
})

ReactDOM.render(
  <ApolloProvider client={client} >
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);

