import { useEffect, useState } from "react"
import { Button, CardMedia, Alert } from "@mui/material"


const PostImageUpload = ({ error, value, onChange }) => {
  const [previewUrl, setPreviewUrl] = useState("")

  useEffect(() => {
    const handleImageUrl = () => {
      if (!value) {
        setPreviewUrl("")
        return
      }

      const url = URL.createObjectURL(value)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }

    return handleImageUrl()
  }, [value])

  const handleChange = (event) => {
    const file = event.target.files?.[0] || null
    onChange(file)
  }

  return (
    <>
      <Button variant="outlined" component="label" sx={{ alignSelf: "flex-start" }}>
        {value ? "Change Image" : "Upload Image"}
        <input hidden type="file" accept="image/*" onChange={handleChange} />
      </Button>

      {error && <Alert severity="error">{error}</Alert>}

      {previewUrl && (
        <CardMedia
          component="img"
          image={previewUrl}
          sx={{
            borderRadius: 2,
            maxHeight: 240,
            objectFit: "cover",
            border: "1px solid rgba(148, 163, 184, 0.2)",
          }}
        />
      )}
    </>
  )
}

export default PostImageUpload
