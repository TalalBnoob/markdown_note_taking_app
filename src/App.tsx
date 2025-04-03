import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { v4 as uuidV4 } from 'uuid'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import NewNotePage from './pages/NewNotePage'
import useLocalStorage from './hooks/useLocalStorage'
import HomePage from './pages/HomePage'
import NoteLayout from './pages/NoteLayout'
import NotePage from './pages/NotePage'
import EditNotePage from './pages/EditNotePage'

export type Note = {
  id: string
} & NoteData

export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string
  markdown: string
  tagsIds: string[]
}

export type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>('NOTES', [])
  const [tags, setTags] = useLocalStorage<Tag[]>('TAGS', [])
  const navigate = useNavigate()

  const notesWithTags = (): Note[] => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagsIds.includes(tag.id)),
      }
    })
  }

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagsIds: tags.map((tag) => tag.id) },
      ]
    })
  }

  const onEditNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagsIds: tags.map((tag) => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  const onDeleteNote = (id: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id))
    navigate('..', { replace: true })
  }

  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag])
  }

  const updateTag = (id: string, label: string) => {
    setTags((prevTags) => {
      return prevTags.map((tag) => {
        if (tag.id == id) return { ...tag, label }
        else return tag
      })
    })
  }

  const deleteTag = (id: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.id !== id))
  }

  return (
    <Container className='my-4'>
      <Routes>
        <Route
          path='/'
          element={
            <HomePage
              notes={notesWithTags()}
              updateTag={updateTag}
              deleteTag={deleteTag}
              availableTags={tags}
            />
          }
        />
        <Route
          path='/new'
          element={
            <NewNotePage
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
        <Route
          path='/:id'
          element={<NoteLayout notes={notesWithTags()} />}
        >
          <Route
            index
            element={<NotePage onDeleteNote={onDeleteNote} />}
          />
          <Route
            path='edit'
            element={
              <EditNotePage
                onSubmit={onEditNote}
                onAddTag={addTag}
                availableTags={tags}
              />
            }
          />
        </Route>
        <Route
          path='*'
          element={<Navigate to='/' />}
        />
      </Routes>
    </Container>
  )
}

export default App
