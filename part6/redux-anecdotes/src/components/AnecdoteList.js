import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'

const AnecdoteList = ({ title }) => {
  const anecdotes = useSelector(state =>
    state.anecdotes.filter(a => a.content.includes(state.filter))
  )
    .sort((a, b) => b.votes - a.votes)

  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted '${anecdote.content}'`))

    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList