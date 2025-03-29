import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

type TodoType = {
  id: number
  title: string
  completed: boolean
}

const queryFn = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts`)
  const data = await response.json()
  return data
}

function Header() {
  const { data, isPending } = useQuery<TodoType[]>({
    queryKey: ['todo'],
    queryFn,
    retry: 2,
    retryDelay: 2000,
  })

  if (isPending) return <div>Loading...</div>
  return (
    <ul>
      {
        data?.map(todo => (<li key={todo.id}>{todo.title}</li>))
      }
    </ul>
  )
}
/*
 /todo -> ['todo']
 /todo/1 -> ['todo', id]
 /todo/2/task -> ['todo', id, 'task']
 /todo?authorId=3 -> ['todo', { authorId: 3 }]
*/

function Footer() {
  const { data, isPending } = useQuery<TodoType[]>({
    queryKey: ['todo'],
    queryFn
  })

  if (isPending) return <div>Loading...</div>
  return (
    <ul>
      {
        data?.map(todo => (<li key={todo.id}>{todo.title}</li>))
      }
    </ul>
  )
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Footer />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
