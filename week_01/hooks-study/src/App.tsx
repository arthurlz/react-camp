import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainLayout from './components/Sample2'
import SampleContext from './components/SampleContext/SampleContext'
import MainComponentHandle from './components/SampleHooks/UseId'

function App() {

  return (
    <>
      <MainComponentHandle />
    </>
  )
}

export default App
