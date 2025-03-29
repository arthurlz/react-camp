import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"


type TodoType = {
  id: number
  title: string
  completed: boolean
}

const fetchData = async (page: number) => {
  const res = await fetch(`
    https://jsonplaceholder.typicode.com/todos?_delay=1000&_limit=5&_page=${page}
  `)
  return await res.json()
}

function TodoList() {
  const [page, setPage] = useState(1)

  const { isPending, error, data } = useQuery<TodoType[]>({
    queryKey: ['todos', page],
    queryFn: () => fetchData(page),
    staleTime: 10000,
  })

  if (isPending) return <div>loading...</div>
  if (error) return <div>error....!🚨</div>

  return (
    <>
      <ul>
        {data?.map(todo => (<li key={todo.id}>{todo.title}</li>))}
      </ul>
      <button onClick={() => setPage((page) => page - 1)}>-</button>
      <span> {page} </span>
      <button onClick={() => setPage((page) => page + 1)}>+</button>
    </>
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
      <TodoList />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
