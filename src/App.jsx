import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { fetchAnectodes, updateAnecdoteVote } from './requests'

const App = () => {
  const queryClient = useQueryClient()
  const { isLoading, isError, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: fetchAnectodes,
    retry: 1,
  })

  const updateAnecdoteVoteMutation = useMutation(updateAnecdoteVote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const handleVote = anecdote => {
    updateAnecdoteVoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    })
  }

  const anecdotes = data

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return (
      <div>anecdotes services is not available due to problems in server</div>
    )
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
