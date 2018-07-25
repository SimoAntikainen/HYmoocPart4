import React from 'react'
import NoteForm from './components/NoteForm'
import NoteList from './components/NoteList'

class App extends React.Component {
  render() {
    return (
      <div>
        <NoteForm />
        <NoteList />
      </div>
    )
  }
}

export default App