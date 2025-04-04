import { NoteData, Tag } from '../App'
import NoteForm from '../componnetns/NoteForm'
import { useNote } from './NoteLayout'

type EditNotePageProps = {
  onSubmit: (id: string, data: NoteData) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

const EditNotePage = ({
  onSubmit,
  onAddTag,
  availableTags,
}: EditNotePageProps) => {
  const note = useNote()

  return (
    <>
      <h1 className='mb-4'>Edit Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  )
}

export default EditNotePage
