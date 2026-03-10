import { Dialog, DialogTitle } from "@mui/material"
import CreatePostForm from "./CreatePostForm"

const CreatePostDialog = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={{ pb: 1.2, fontWeight: 800 }}>Create a New Post</DialogTitle>
      <CreatePostForm onClose={onClose} />
    </Dialog>
  )
}

export default CreatePostDialog
