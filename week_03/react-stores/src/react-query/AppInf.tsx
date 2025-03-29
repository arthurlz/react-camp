import { QueryClientProvider, useInfiniteQuery, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Fragment, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect } from "react"

const fetchTasks = async ({
  pageParam
}: { pageParam: number}) => {
  const res = await fetch(`
    https://jsonplaceholder.typicode.com/todos?_delay=1000&_limit=15&_page=${pageParam}
  `)
  return await res.json()
}

function TodoList() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
    initialPageParam: 1,
    getNextPageParam: (_lastPage, allPages) => allPages.length + 1
  })

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight;
      const docHeight = document.documentElement.offsetHeight
      if (docHeight - scrollY < 50 && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)

  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  if (isLoading) return <div className="p-6 text-center">加载中</div>
  if (isError) return <div className="p-6 text-center text-red-500">加载失败</div>

  return (
    <div className="max-w-2xl mx-auto space-y-6 p-6">
      {
        data?.pages.map((page, pageIndex) => (
          <Fragment key={pageIndex}>
            {
              page.map((task: { id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                <div key={task.id} className="p-4 rounded-md shadow-sm bg-white border border-gray-200 hover:shadow-md transition">
                  <p className="font-medium text-gray-800">{task.title}</p>
                </div>
              ))
            }
          </Fragment>
        ))
      }
      {
        isFetchingNextPage && (
          <div className="text-center text-sm text-gray-400">正在加载更多任务...</div>
        )
      }
      {
        !hasNextPage && (
          <div className="text-center text-sm text-gray-400">已经加载全部内容</div>
        )
      }
    </div>
  )
}


export default function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
