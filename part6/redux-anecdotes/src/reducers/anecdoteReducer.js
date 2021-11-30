const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case 'NEW_ANECDOTE':
      return [
        ...state,
        action.data
      ]
    case 'VOTE_ANECDOTE': {
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const voteAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(a =>
        a.id !== id ? a : voteAnecdote
      )
    }
    default: return state
  }
}

export const initAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: { id }
  }
}

export const createAnecdote = (anecdoteObj) => {
  return {
    type: 'NEW_ANECDOTE',
    data: anecdoteObj
  }
}

export default anecdoteReducer