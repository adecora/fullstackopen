import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Anecdote from './Anecdote'

const AnecdoteList = (props) => {

  const vote = (anecdote) => {
    props.voteAnecdote(anecdote)
    props.setNotification(`you voted '${anecdote.content}'`, 5)
  }

  return (
    <div>
      {props.anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote)}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  console.log(state, ownProps)
  return {
    anecdotes: state
      .anecdotes
      .filter(a => a.content.includes(state.filter))
      .sort((a, b) => b.votes - a.votes)
  }
}

const mapDipatchToProps = (dispatch) => {
  return {
    voteAnecdote: (anecdote) => {
      dispatch(voteAnecdote(anecdote))
    },
    setNotification: (notification, seconds) => {
      dispatch(setNotification(notification, seconds))
    }
  }
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDipatchToProps
)(AnecdoteList)
export default ConnectedAnecdoteList