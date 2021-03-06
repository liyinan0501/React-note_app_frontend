import React from 'react'
import Note from './components/Note'
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
    noteService.create(noteObject).then((newNote) => {
      this.setState({
        notes: this.state.notes.concat(newNote),
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
      noteService.update(id, changedNote).then((changedNote) => {
        this.setState({
          notes: this.state.notes.map((note) =>
            note.id !== id ? note : changedNote
          ),
        })
      })
    }
  }

  delNote = (id) => {
    return () => {
      window.confirm('Are you sure want to delete') &&
        noteService.deleteNote(id).then(() => {
          this.setState({
            notes: this.state.notes.filter((person) => person.id !== id),
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
              delNote={this.delNote(note.id)}
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
      this.setState({ notes: response })
    })
  }
}

export default App
