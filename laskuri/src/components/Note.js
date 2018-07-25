import React from 'react'

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content} <strong>{note.important ? 'tärkeä' : ''}</strong>
    </li>
  )
}

export default Note