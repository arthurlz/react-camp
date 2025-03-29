import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import { fetchTasks, addTask } from './mock'

let id = 3

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TaskList />
    </QueryClientProvider>
  )
}

function TaskList() {
  const { isPending, error, data } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  })
  
  const mutation = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks']
      })
    }
  })

  if (isPending) return <div>加载中...</div>

  if (error) return <div>出错了: {error.message}...</div>

  return (
    <div>
      <ul>
        {data?.map(task =>(
          <li key={task.id}>{task.name}</li>
        ))}
      </ul>

      <button
        disabled={mutation.isPending}
        onClick={() => {
          mutation.mutate({
            id: id++,
            name: `打游戏${id}`
          })
        }}
      >
        添加任务
      </button>
    </div>
  )
}