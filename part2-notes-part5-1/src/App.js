import React from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NoteForm from './components/NoteForm'
import noteService from './services/notes'
import loginService from './services/login'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      notes: [],
      newNote: '',
      showAll: true,
      error: null,
      username: '',
      password: '',
      user: null
    }
  }

  componentWillMount() {
    noteService
      .getAll()
      .then(notes => {
        this.setState({ notes })
      })

    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      noteService.setToken(user.token)
    }    
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: this.state.newNote,
      date: new Date(),
      important: Math.random() > 0.5
    }

    this.noteForm.toggleVisibility()
    
    noteService
      .create(noteObject)
      .then(newNote => {
        this.setState({
          notes: this.state.notes.concat(newNote),
          newNote: ''
        })
      })
  }

  toggleImportanceOf = (id) => {
    return () => {
      const note = this.state.notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }

      noteService
        .update(id, changedNote)
        .then(changedNote => {
          this.setState({
            notes: this.state.notes.map(note => note.id !== id ? note : changedNote)
          })
        })
        .catch(error => {
          this.setState({
            error: `muistiinpano '${note.content}' on jo valitettavasti poistettu palvelimelta`,
            notes: this.state.notes.filter(n => n.id !== id)
          })
          setTimeout(() => {
            this.setState({ error: null })
          }, 50000)
        })
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user))
      noteService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleNoteChange = (event) => {
    this.setState({ newNote: event.target.value })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  render() {
    const notesToShow =
      this.state.showAll ?
        this.state.notes :
        this.state.notes.filter(note => note.important === true)

    const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'

    const loginForm = () => (
      <Togglable buttonLabel="login">
        <LoginForm
          visible={this.state.visible}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleLoginFieldChange}
          handleSubmit={this.login}
        />
      </Togglable>
    )

    const noteForm = () => (
      <Togglable buttonLabel="new note" ref={component => this.noteForm = component}>
        <NoteForm
          onSubmit={this.addNote}
          value={this.state.newNote}
          handleChange={this.handleNoteChange}
        />
      </Togglable>
    )

    return (
      <div>
        <h1>Muistiinpanot</h1>

        <Notification message={this.state.error} />

        {this.state.user === null ?
          loginForm() :
          <div>
            <p>{this.state.user.name} logged in</p>
            {noteForm()}
          </div>
        }

        <div>
          <button onClick={this.toggleVisible}>
            näytä {label}
          </button>
        </div>
        <ul>
          {notesToShow.map(note => 
            <Note 
              key={note.id} 
              note={note} 
              toggleImportance={this.toggleImportanceOf(note.id)}
            />)}
        </ul>

      </div>
    )
  }
}

export default App