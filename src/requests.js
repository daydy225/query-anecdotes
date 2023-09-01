import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const fetchAnectodes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createAnecdote = async newAnecdote => {
  try {
    if (!newAnecdote?.content || newAnecdote.content.length < 5) {
      throw new Error('Too short anecdote, must have length of 5 or more')
    }

    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateAnecdoteVote = async updatedAnecdote => {
  const response = await axios.put(
    `${baseUrl}/${updatedAnecdote.id}`,
    updatedAnecdote,
  )
  return response.data
}
