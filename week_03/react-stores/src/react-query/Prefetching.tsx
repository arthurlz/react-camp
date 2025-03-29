import { QueryClient, QueryClientProvider, useQuery, useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Suspense, useState } from "react"


type TodoType = {
  id: number
  title: string
  completed: boolean
}

const fetchData = async () => {
  const res = await fetch(`
    https://jsonplaceholder.typicode.com/todos`)
  return await res.json()
}

function TodoList() {
  const { data } = useQuery<TodoType[]>({
    queryKey: ['todo'],
    queryFn: () => fetchData(),
    staleTime: 60000
  })

  return (
    <>
      <ul>
        {data?.map(todo => (<li key={todo.id}>{todo.title}</li>))}
      </ul>
    </>
  )
}



export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // retry: 3,
        // retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
    },
  })
  const prefetch = () => queryClient.prefetchQuery({
    queryKey: ['todo'],
    queryFn: () => fetchData(),
    staleTime: 60000
  })

  const [isShow, setIsShow] = useState(false)
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>loading...</div>}>
        <button
          className="bg-amber-700 hover:bg-purple-700 px-2"
          onMouseEnter={prefetch}
          onClick={() => setIsShow(true)}
        > show todo list</button>
        {isShow && <TodoList />}
      </Suspense>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}