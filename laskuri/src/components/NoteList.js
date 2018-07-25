import React from 'react'
import PropTypes from 'prop-types'
import actionFor from '../actionCreators'
import Note from './Note'

class NoteList extends React.Component {
  componentDidMount() {
    const { store } = this.context
    this.unsubscribe = store.subscribe(() =>
      this.forceUpdate()
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }
    
  toggleImportance = (id) => (e) => {
    this.props.store.dispatch(
      actionFor.importanceToggling(id)
    )
  }
  render() {
    return (
      <ul>
        {this.context.store.getState().map(note =>
          <Note
            key={note.id}
            note={note}
            handleClick={this.toggleImportance(note.id)}
          />
        )}
      </ul>
    )
  }
}

NoteList.contextTypes = {
  store: PropTypes.object
}

export default NoteList