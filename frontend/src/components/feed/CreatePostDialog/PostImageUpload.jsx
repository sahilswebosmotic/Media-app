import { useEffect, useState } from "react"
import { Button, CardMedia, Alert } from "@mui/material"

// const   PostImageUpload = ({ error, selectedImage, setValue }) => {
//   const [previewUrl, setPreviewUrl] = useState("")

//   useEffect(() => {
//     return () => {
//       if (previewUrl) URL.revokeObjectURL(previewUrl)
//     }
//   }, [previewUrl])

//   const handleChange = (event) => {
//     const file = event.target.files?.[0] || null
//     setValue("image", file, { shouldValidate: true, shouldDirty: true })

//     if (previewUrl) URL.revokeObjectURL(previewUrl)
//     setPreviewUrl(file ? URL.createObjectURL(file) : "")
//   }

//   return (
//     <>
//       <Button variant="outlined" component="label">
//         {selectedImage ? "Change Image" : "Upload Image"}
//         <input hidden type="file" accept="image/*" onChange={handleChange} />
//       </Button>

//       {error && <Alert severity="error">{error}</Alert>}

//       {previewUrl && (
//         <CardMedia
//           component="img"
//           image={previewUrl}
//           alt="Preview"
//           sx={{ borderRadius: 2, maxHeight: 220, objectFit: "cover" }}
//         />
//       )}
//     </>
//   )
// }

// export default PostImageUpload

const PostImageUpload = ({ error, value, onChange }) => {
  const [previewUrl, setPreviewUrl] = useState("")

  useEffect(() => {
    const handleImage =()=>{
    if (!value) return
    const url = URL.createObjectURL(value)
    setPreviewUrl(url)

    return () => URL.revokeObjectURL(url)
    }
    handleImage();
  }, [value])

  const handleChange = (event) => {
    const file = event.target.files?.[0] || null
    onChange(file)
  }

  return (
    <>
      <Button variant="outlined" component="label">
        {value ? "Change Image" : "Upload Image"}
        <input hidden type="file" accept="image/*" onChange={handleChange} />
      </Button>

      {error && <Alert severity="error">{error}</Alert>}

      {previewUrl && (
        <CardMedia
          component="img"
          image={previewUrl}
          sx={{ borderRadius: 2, maxHeight: 220, objectFit: "cover" }}
        />
      )}
    </>
  )
}

export default PostImageUpload