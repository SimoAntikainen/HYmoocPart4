import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'

/**const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
  }
  return state
}

const store = createStore(counterReducer)

class App extends React.Component {
  render() {
    return(
      <div>
        <div>
          {store.getState()}
        </div>
        <button onClick={e => store.dispatch({ type: 'INCREMENT'})}>
          plus
        </button>
        <button onClick={e => store.dispatch({ type: 'DECREMENT' })}>
          minus
        </button>
        <button onClick={e => store.dispatch({ type: 'ZERO' })}>
          zero
        </button>
      </div>
    )
  }
}**/

const noteReducer = (state = [], action) => {
  if (action.type === 'NEW_NOTE') {
    return state.concat(action.data)
  }

  return state
}

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

class App extends React.Component {
  render() {
    return(
      <div>
        <ul>
          {store.getState().map(note=>
            <li key={note.id}>
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
