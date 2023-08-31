import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const createAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: newAnecdote => {
      queryClient.setQueryData(['anecdotes'], prevAnecdotes => [
        ...prevAnecdotes,
        newAnecdote,
      ])
    },
  })

  const onCreate = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (!content && content.length < 5)
      return alert('Anecdote must be at least 5 characters long')
    event.target.anecdote.value = ''
    createAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
