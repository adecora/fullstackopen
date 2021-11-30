import axios from 'axios'

const baseUrl = 'http://localhost:3003/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const newAnecdote = async (anecdote) => {
  const object = {
    content: anecdote,
    votes: 0
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const voteAnecdote = async (anecdoteObj) => {
  const votedAnecdote = {
    ...anecdoteObj,
    votes: anecdoteObj.votes + 1
  }
  const response = await axios.put(`${baseUrl}/${anecdoteObj.id}`, votedAnecdote)
  return response.data
}

const anecdoteService = { getAll, newAnecdote, voteAnecdote }

export default anecdoteService