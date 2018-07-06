import React from 'react'
import Note from './components/Note'
import Notification from './components/Notification'
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
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
  
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleNoteChange = (e) => {
    this.setState({ new_note: e.target.value })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
    /**if (event.target.name === 'password') {
      this.setState({ password: event.target.value })
    } else if (event.target.name === 'username') {
      this.setState({ username: event.target.value })
    }**/
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

    return (
      <div>
        <h1>Muistiinpanot</h1>

        <Notification message={this.state.error} />

        <h2>Kirjaudu</h2>

        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleUsernameChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </div>
          <button>kirjaudu</button>
        </form>

        <h2>Luo uusi muistiinpano</h2>

        <form onSubmit={this.addNote}>
          <input
            value={this.state.newNote}
            onChange={this.handleNoteChange}
          />
          <button type="submit">tallenna</button>
        </form>

        <Notification message={this.state.error} />
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