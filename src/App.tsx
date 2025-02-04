import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(5)

  return (
    <>
      <div>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          I love jen x{count} (click me)
        </button>
      </div>
    </>
  )
}

export default App
