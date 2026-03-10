import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>React UI Storybook</h1>
      <p>Component library sandbox.</p>
    </div>
  )
}

export default App
