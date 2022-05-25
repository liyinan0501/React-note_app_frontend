import React from 'react'

const Note = ({ note, toggleImportance, delNote }) => {
  const label = note.important ? 'make not important' : 'make importance'
  return (
    <li>
      {note.content} <button onClick={toggleImportance}>{label}</button>{' '}
      <button onClick={delNote}>Delete</button>
    </li>
  )
}

export default Note
