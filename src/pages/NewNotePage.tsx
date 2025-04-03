import { NoteData, Tag } from '../App'
import NoteForm from '../componnetns/NoteForm'

type NewNotePageProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

const NewNotePage = ({
  onSubmit,
  onAddTag,
  availableTags,
}: NewNotePageProps) => {
  return (
    <>
      <h1 className='mb-4'>New Note Page</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  )
}

export default NewNotePage
