import CreatePostForm from "./CreatePostForm"
import BaseDialog from "../../../../components/ui/BaseDialog"

export default function CreatePostDialog({ open, onClose }) {
  return (
    <BaseDialog
      open={open}
      onClose={onClose}
      title="Create a New Post"
    >
      <CreatePostForm onClose={onClose} />
    </BaseDialog>
  )
}


