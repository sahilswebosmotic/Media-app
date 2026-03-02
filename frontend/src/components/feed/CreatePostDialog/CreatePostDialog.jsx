import { Dialog, DialogTitle } from "@mui/material"
import CreatePostForm from "./CreatePostForm"

const CreatePostDialog = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
        sx= {{
          borderRadius: 3,
          border: "1px solid rgba(148, 163, 184, 0.2)",
          bgcolor: "rgba(15, 23, 42, 0.96)",
        }}
    >
      <DialogTitle sx={{ pb: 1.2, fontWeight: 800 }}>Create a New Post</DialogTitle>
      <CreatePostForm onClose={onClose} />
    </Dialog>
  )
}

export default CreatePostDialog
