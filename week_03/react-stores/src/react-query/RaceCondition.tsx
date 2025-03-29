import { useEffect, useState } from "react"

type Props = {
  todoId: number
}

function TodoTitle ({ todoId }: Props) {
  const [text, setText] = useState('')

  useEffect(() => {
    const abortController = new AbortController()
    const loadTodo = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${todoId}?_delay=${10000 / todoId}`,
        {
          signal: abortController.signal
        }
      )
      const { title } = await response.json()
      setText(`${todoId}-${title}`)
    }
    loadTodo()
    return () => {
      abortController.abort()
    }
  }, [todoId])

  return <div className="text-red-400 mt-2">{ text || "loading" }</div>
}

export default function App() {
  const [currentId, setCurrentId] = useState(1)

  return (
    <>
      <button
        className="w-20 bg-amber-500 border-solid border-2 border-amber-200 hover:cursor-pointer hover:bg-sky-400"
        onClick={() => setCurrentId(prev => prev + 1)}
      >
        +1
      </button>
      <TodoTitle todoId={currentId} />
    </>
  )
}