import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = ({ title }) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()

    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.newAnecdote({
      content: anecdote,
      votes: 0
    })
    dispatch(createAnecdote(newAnecdote))
  }

  return (
    <div>
      <h2>{title}</h2>
      <form onSubmit={addAnecdote} >
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm