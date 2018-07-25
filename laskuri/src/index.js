import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import noteReducer from './noteReducer'
import actionFor from './actions'


const store = createStore(noteReducer)

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'sovelluksen tila talletetaan storeen',
    important: true,
    id: 1
  }
})

store.dispatch({
  type: 'NEW_NOTE',
  data: {
    content: 'tilanmuutokset tehdään actioneilla',
    important: false,
    id: 2
  }
})

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

class App extends React.Component {
  addNote = (event) => {
    event.preventDefault()
    store.dispatch(
      actionFor.noteCreation(event.target.note.value)
    )
    event.target.note.value = ''
  }
  toggleImportance = (id) => () => {
    store.dispatch(
      actionFor.importanceToggling(id)
    )
  }
  /**addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    store.dispatch({
      type: 'NEW_NOTE',
      data: {
        content: content,
        important: false,
        id: generateId()
      }
    })
    event.target.note.value = ''
  }
  toggleImportance = (id) => () => {
    store.dispatch({
      type: 'TOGGLE_IMPORTANCE',
      data: { id }
    })
  }**/


  render() {
    return(
      <div>
        <form onSubmit={this.addNote}>
          <input name="note" />
          <button type="submit">lisää</button>
        </form>
        <ul>
          {store.getState().map(note=>
            <li key={note.id} onClick={this.toggleImportance(note.id)}>
              {note.content} <strong>{note.important ? 'tärkeä' : ''}</strong>
            </li>
          )}
         </ul>
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

store.subscribe(() => {
  const storeNow = store.getState()
  console.log(storeNow)
})
