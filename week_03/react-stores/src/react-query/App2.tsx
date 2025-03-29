import { QueryClient, QueryClientProvider, useQuery, useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Suspense, useState } from "react"


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

// const placeholderData = [{
//   "userId": 2,
//   "id": 25,
//   "title": "voluptas quo tenetur perspiciatis explicabo natus",
//   "completed": true
// },
// {
//   "userId": 2,
//   "id": 26,
//   "title": "aliquam aut quasi",
//   "completed": true
// },
// {
//   "userId": 2,
//   "id": 27,
//   "title": "veritatis pariatur delectus",
//   "completed": true
// }]


// function TodoList() {
//   const [page, setPage] = useState(1)

//   const { isPending, error, data } = useQuery<TodoType[]>({
//     queryKey: ['todos', page],
//     queryFn: () => fetchData(page),
//     // staleTime: 10000,
//     gcTime: 0,
    // initialData: placeholderTodos,
    // placeholderData: placeholderData,
//   })

//   if (isPending) return <div>loading...</div>
//   if (error) return <div>error....!🚨</div>

//   return (
//     <>
//       <ul>
//         {data?.map(todo => (<li key={todo.id}>{todo.title}</li>))}
//       </ul>
//       <button onClick={() => setPage((page) => page - 1)}>-</button>
//       <span> {page} </span>
//       <button onClick={() => setPage((page) => page + 1)}>+</button>
//     </>
//   )
// }


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // retry: 3,
      // retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
})

// export default function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <TodoList />
//       <ReactQueryDevtools />
//     </QueryClientProvider>
//   )
// }


function TodoList() {
  const [page, setPage] = useState(1)

  const { data } = useSuspenseQuery<TodoType[]>({
    queryKey: ['todos', page],
    queryFn: () => fetchData(page),
    // staleTime: 10000,
    // gcTime: 0,
  })

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



export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div>loading...</div>}>
        <TodoList />
      </Suspense>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}