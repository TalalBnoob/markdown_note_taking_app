import { Note, Tag } from '../App'
import NoteList from '../componnetns/NoteList'

type HomeProps = {
  availableTags: Tag[]
  updateTag: (id: string, label: string) => void
  deleteTag: (id: string) => void
  notes: Note[]
}

function HomePage({ availableTags, notes, updateTag, deleteTag }: HomeProps) {
  return (
    <NoteList
      availableTags={availableTags}
      updateTag={updateTag}
      deleteTag={deleteTag}
      notes={notes}
    />
  )
}

export default HomePage
