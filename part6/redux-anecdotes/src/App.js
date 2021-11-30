import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService
      .getAll()
      .then(anecdotes => dispatch(initAnecdotes(anecdotes)))
  }, [dispatch])


  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm title="create new" />
    </div>
  )
}

export default App