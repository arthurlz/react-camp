import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button1 from './components/Button1'
import App5 from './components/StyledComponents/App5'
import RouterApp from './routes/Index'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <RouterApp />
      {/* <div className='tw:bg-red-500'>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-red-900 pl-2 pt-1 pb-2 mr-4">Vite + React</h1>
      <div className="card skytech">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="test-text">
        Click on the Vite and React logos to learn more
      </p>
      <Button1 /> */}
    </>
  )
}

export default App

