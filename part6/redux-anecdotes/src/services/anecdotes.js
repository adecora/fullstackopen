import axios from 'axios'

const baseUrl = 'http://localhost:3003/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const newAnecdote = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const anecdoteService = { getAll, newAnecdote }

export default anecdoteService