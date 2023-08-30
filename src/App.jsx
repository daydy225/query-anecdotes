import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { fetchAnectodes } from './requests'

const App = () => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: fetchAnectodes,
    // refetchOnWindowFocus: false,
    retry: false,
  })

  const handleVote = anecdote => {
    console.log('vote')
  }

  console.log('anecdotes data', data)

  const anecdotes = data
    ? data
    : [
        {
          content: 'If it hurts, do it more often',
          id: '47145',
          votes: 0,
        },
      ]

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