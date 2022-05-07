import React from 'react'
import Note from './components/Note'
import axios from 'axios'
import noteService from './services/notes'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      notes: [],
      newNotes: '',
      showAll: true,
    }
  }
  addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: this.state.newNotes,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: this.state.notes.length + 1,
    }
    noteService.create(noteObject).then((response) => {
      this.setState({
        notes: this.state.notes.concat(response.data),
        newNotes: '',
      })
    })
  }

  handleNoteChange = (event) => {
    this.setState({
      newNotes: event.target.value,
    })
  }
  toggleVisible = () => {
    this.setState({
      showAll: !this.state.showAll,
    })
  }
  toggleImportanceOf = (id) => {
    console.log('toggle')
    return () => {
      const note = this.state.notes.find((n) => n.id === id)
      const changedNote = { ...note, important: !note.important }
      noteService.update(id, changedNote).then((response) => {
        this.setState({
          notes: this.state.notes.map((note) =>
            note.id !== id ? note : response.data
          ),
        })
      })
    }
  }

  render() {
    console.log('render')
    const notesToShow = this.state.showAll
      ? this.state.notes
      : this.state.notes.filter((note) => note.important === true)
    const label = this.state.showAll ? 'vain tärkeät' : 'kaikki'

    return (
      <div>
        <h1>Muistiinpanot</h1>
        <div>
          <button onClick={this.toggleVisible}>näytä{label}</button>
        </div>
        <ul>
          {notesToShow.map((note) => (
            <Note
              key={note.id}
              note={note}
              toggleImportance={this.toggleImportanceOf(note.id)}
            />
          ))}
        </ul>
        <form onSubmit={this.addNote}>
          <input value={this.state.newNotes} onChange={this.handleNoteChange} />
          <button type="submit">tallenna</button>
        </form>
      </div>
    )
  }
  componentDidMount() {
    noteService.getAll().then((response) => {
      this.setState({ notes: response.data })
    })
  }
}

export default App
