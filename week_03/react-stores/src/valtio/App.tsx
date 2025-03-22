
import { Radio } from "antd";
import { FormEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloseOutlined } from "@ant-design/icons";
import { proxy, useSnapshot } from "valtio";


// mutable state
type FilterType = "all" | "completed" | "todo";

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type Store = {
  filter: FilterType; todos: Todo[]; error: any;
}

export const store = proxy<Store>({
  filter: 'all',
  todos: [],
  error: null,
})

const addTodo = (title: string) => {
  store.todos.push({
    id: Date.now(),
    title,
    completed: false,
  })
}

const setTodos = (fn: (todos: Array<Todo>) => Array<Todo>) => {
  store.todos = fn(store.todos)
}

const setFilter = (filter: FilterType) => {
  store.filter = filter
}

const setError = (error: any) => {
  store.error = error
}

let keyCount = 0;

const fetchTodos = async () => {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    const todos = await res.json();
    setTodos((r) => r.concat(todos));
  } catch (error) {
    setError(error);
  }
}

const Filter = () => {
  const { filter } = useSnapshot(store)

  return (
    <div className="flex justify-center gap-4 p-4">
      <Radio.Group
        onChange={(e) => setFilter(e.target.value)}
        value={filter}
        className="bg-gray-100 p-2 rounded-lg shadow-md"
      >
        <Radio value="all" className="mx-2">All</Radio>
        <Radio value="completed" className="mx-2">Completed</Radio>
        <Radio value="todo" className="mx-2">Todo</Radio>
      </Radio.Group>
    </div>
  );
};

const TodoItem = ({ item }: { item: Todo }) => {
  const { title, completed, id } = item;

  const toggleCompleted = () =>
    setTodos((prevTodos) =>
      prevTodos.map((prevItem) =>
        prevItem.id === id ? { ...prevItem, completed: !completed } : prevItem
      )
    );

  const remove = () => {
    setTodos((prevTodos) => prevTodos.filter((prevItem) => prevItem.id !== id));
  };

  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow-md border">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={completed}
          onChange={toggleCompleted}
          className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
        />
        <span
          className={`text-lg ${completed ? "line-through text-gray-400" : "text-gray-900"}`}
        >
          {title}
        </span>
      </div>
      <CloseOutlined
        onClick={remove}
        className="cursor-pointer text-red-500 hover:text-red-700 transition"
      />
    </div>
  );
};

const Filtered = () => {
  console.log('filter')
  const { todos, filter } = useSnapshot(store)

  const filterTodo = todos.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    return !todo.completed;
  });

  return (
    <div className="space-y-3 mt-4">
      <AnimatePresence>
        {filterTodo.map((item) => (
          <motion.div
            key={item.id}
            className="item"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TodoItem item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const App = () => {
  const { todos, error } = useSnapshot(store)

  const add = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const title = e.currentTarget.inputTitle.value.trim();
    if (!title) return;

    e.currentTarget.inputTitle.value = "";
    setTodos((prevTodos) => [
      ...prevTodos,
      { title, completed: false, id: keyCount++ },
    ]);
  };

  useEffect(() => {
    // fetchTodos()  
  }, [])

  if (!todos) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Todo List
        </h1>
        <Filter />
        <form onSubmit={add} className="flex gap-2 p-4">
          <input
            name="inputTitle"
            placeholder="Type your todo..."
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Add
          </button>
        </form>
        
        <Filtered />
      </div>
    </div>
  );
};

export default App;
