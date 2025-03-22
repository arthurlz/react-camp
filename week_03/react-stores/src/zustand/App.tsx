import { create } from 'zustand'
import { Radio } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
// react-spring
import { AnimatePresence, motion } from 'framer-motion'
import { FormEvent, useEffect } from 'react'
import { shallow } from 'zustand/shallow'

type FilterType = 'all' | 'completed' | 'todo'

type Todo = {
  id: number
  title: string
  completed: boolean
}

type TodoFunc = (todos: Array<Todo>) => Array<Todo>
type Store = {
  todos: Array<Todo>
  filter: FilterType
  error: any;
  setFilter: (filter: FilterType) => void;
  setTodos: (fn: TodoFunc) => void;
  fetchTodos: () => Promise<void>
}

const useStore = create<Store>((set) => ({
  filter: 'all',
  todos: [],
  error: null,
  setFilter(filter: FilterType) {
    set({ filter })
  },
  setTodos(fn: TodoFunc) {
    set(prev => ({ todos: fn(prev.todos) }))
  },
  fetchTodos: async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts')
      const todos = await res.json()
      set( { todos })
    } catch( error ) {
      set({ error })
    }
  }
}))

let keyCount = 9999

const Filter = () => {
  console.log('filter')
  const { filter, setFilter } = useStore()
  return (
    <div className='flex justify-center gap-4 p-4'>
      <Radio.Group
        className='bg-gray-100 p-2 rounded-lg shadow-md'
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
      >
        <Radio value='all' className='mx-2'>All</Radio>
        <Radio value='completed' className='mx-2'>Completed</Radio>
        <Radio value='todo' className='mx-2'>Todo</Radio>
      </Radio.Group>
    </div>
  )
}

const TodoItem = ({ item }: { item: Todo }) => {
  const { setTodos } = useStore()
  const { title, completed, id } = item

  const toggleCompleted = () => setTodos((prevTodos) => prevTodos.map((prevItem) => 
    prevItem.id === id ? { ...prevItem, completed: !completed } : prevItem)
  );
  
  const remove = () => {
    setTodos((prevTodos) => prevTodos.filter((prevItem) => prevItem.id !== id))
  }
  return (
    <div className='flex items-center justify-between bg-white p-3 rounded-lg shadow-md border'>
      <div className='flex items-center space-x-3'>
        <input
          className='w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400'
          type="checkbox"
          checked={completed}
          onChange={toggleCompleted}
        />
        <span
          className={`text-lg ${completed ? "line-through text-gray-400" : "text-gray-900"}`}
        >
          { title }
        </span>
      </div>
      <CloseOutlined
        onClick={remove}
        className="cursor-pointer text-red-500 hover:text-red-700 transition"
      />
    </div>
  )
}

const Filtered = () => {
  const { todos, filter } = useStore()
  const filterTodo = todos.filter(todo => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed
    return !todo.completed
  })

  return (
    <div className='space-y-3 mt-4'>
      <AnimatePresence>
        {filterTodo.map((item) => (
          <motion.div
            key={item.id}
            className='item'
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TodoItem item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export const App = () => {
  const { setTodos, fetchTodos, todos, error } = useStore()

  const add = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.inputTitle.value.trim()
    if (!title) {
      return
    }
    e.currentTarget.inputTitle.value = ''
    setTodos((prevTodos) => [
      ...prevTodos,
      { title, completed: false, id: keyCount++ }
    ])
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  if (!todos) return <div>Loading...</div>

  if(error) return <div>{error.message}</div>

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-lg'>
        <h1 className='text-2xl font-bold text-center text-gray-800 mb-4'>Todo List</h1>
        <Filter />
        <form onSubmit={add}>
          <input
            name='inputTitle'
            placeholder='Type your todo...'
            className='w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400'
          />
          <button
            type="submit"
            className='px-4 py-2 mt-2 bg-blue-500 text-white rounded-lg hover:bg-blue-500 transition'
          >
            Add
          </button>
        </form>

        <Filtered />
      </div>
    </div>
  )
}


export default App

// export { 
//   App
// }