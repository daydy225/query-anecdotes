import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotification } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const createAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: newAnecdote => {
      queryClient.setQueryData(['anecdotes'], prevAnecdotes => [
        ...prevAnecdotes,
        newAnecdote,
      ])
      setNotification(`a new anecdote ${newAnecdote.content} created!`)
      setTimeout(() => {
        clearNotification()
      }, 5000)
    },
    onError: error => {
      setNotification(error.message)
      setTimeout(() => {
        clearNotification()
      }, 5000)
    },
  })

  const { setNotification, clearNotification } = useNotification()

  const onCreate = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
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
