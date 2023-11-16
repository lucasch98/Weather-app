import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './InputLocation.css'
import InputLocation from './components/InputLocation'

function App() {
  return (
    <>
      <h1>Weather app</h1>
      <br/>
      <InputLocation />
    </>
  )
}

export default App;
