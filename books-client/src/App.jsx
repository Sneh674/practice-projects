import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)
  const fecthAPI=async()=>{
    const response=await axios.get("http://localhost:4000")
    console.log(response)
    console.log(response.data)
    console.log(response.data.message)
    setCount(response.data.message)
  }

  useEffect(()=>{
    fecthAPI()
  },[])

  return (
    <div>
      <h1>hello</h1>
      <div>{count}</div>
    </div>
  )
}

export default App
