import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

createRoot(document.getElementById('root')).render(<App />)

// axios.get('http://localhost:3001/notes').then((response) => {
//   const notes = response.data
//   createRoot(document.getElementById('root')).render(<App notes={notes} />)
// })
