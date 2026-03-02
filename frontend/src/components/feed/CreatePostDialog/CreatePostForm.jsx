// import {
//   Alert,
//   Button,
//   DialogActions,
//   DialogContent,
//   Stack,
//   TextField,
// } from "@mui/material"
// import { useForm, useWatch } from "react-hook-form"
// import { yupResolver } from "@hookform/resolvers/yup"
// import { useCreatePostMutation } from "@store/slice/postsApi"
// import { createPostSchema, postDefaultValues } from "./postValidation"
// import PostImageUpload from "./PostImageUpload"

// const CreatePostForm = ({ onClose }) => {
//   const [createPost, { isLoading }] = useCreatePostMutation()

//   const {
//     control,
//     register,
//     handleSubmit,
//     setValue,
//     setError,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: postDefaultValues,
//     resolver: yupResolver(createPostSchema),
//   })

//   const selectedImage = useWatch({ control, name: "image" })

//   const onSubmit = async (values) => {
//     try {
//       const formData = new FormData()
//       formData.append("title", values.title)
//       formData.append("description", values.description || "")
//       formData.append("isPrivate", values.isPrivate ? "true" : "false")

//       if (values.image) {
//         formData.append("image", values.image)
//       }

//       await createPost(formData).unwrap()
//       reset(postDefaultValues)
//       onClose()
//     } catch (err) {
//       setError("root.apiError", {
//         message: err?.data?.message || "Unable to create post.",
//       })
//     }
//   }

//   return (
//     <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
//       <DialogContent sx={{ pt: 1 }}>
//         {errors.root?.apiError?.message && (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             {errors.root.apiError.message}
//           </Alert>
//         )}

//         <Stack spacing={2}>
//           <TextField
//             label="Title"
//             fullWidth
//             {...register("title")}
//             error={Boolean(errors.title)}
//             helperText={errors.title?.message}
//           />

//           <TextField
//             label="Description"
//             fullWidth
//             multiline
//             minRows={3}
//             {...register("description")}
//             error={Boolean(errors.description)}
//             helperText={errors.description?.message}
//           />

//           <PostImageUpload
//             error={errors.image?.message}
//             selectedImage={selectedImage}
//             setValue={setValue}
//           />


//         </Stack>
//       </DialogContent>

//       <DialogActions sx={{ px: 3, pb: 2 }}>
//         <Button variant="outlined" onClick={onClose} disabled={isLoading}>
//           Cancel
//         </Button>

//         <Button type="submit" variant="contained" disabled={isLoading}>
//           {isLoading ? "Posting..." : "Post"}
//         </Button>
//       </DialogActions>
//     </Stack>
//   )
// }

// export default CreatePostForm

import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
} from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useCreatePostMutation } from "@store/slice/postsApi"
import { createPostSchema, postDefaultValues } from "./postValidation"
import PostImageUpload from "./PostImageUpload"
import AuthFieldList from "@components/forms/AuthFieldList"

const buildCreatePostFormData = (values) => {
  const formData = new FormData()
  formData.append("title", values.title)
  formData.append("isPrivate", values.isPrivate ? "true" : "false")

  if (values.description?.trim()) {
    formData.append("description", values.description.trim())
  }

  if (values.image) {
    formData.append("image", values.image)
  }

  return formData
}

const CreatePostForm = ({ onClose }) => {
  const [createPost, { isLoading }] = useCreatePostMutation()

  const {
    control,
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: postDefaultValues,
    resolver: yupResolver(createPostSchema),
  })

  const onSubmit = async (values) => {
    try {
      await createPost(buildCreatePostFormData(values)).unwrap()
      reset(postDefaultValues)
      onClose()
    } catch (err) {
      setError("root.apiError", {
        message: err?.data?.message || "Unable to create post.",
      })
    }
  }

  const POST_FIELDS = [{
    label:"Title",
    name:"title"
  },{
    label:"Description",
    name:"description"
  }]

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
      <DialogContent sx={{ pt: 1 }}>
        {errors.root?.apiError?.message && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.root.apiError.message}
          </Alert>
        )}

        <Stack spacing={2}>
          {/* <TextField
            label="Title"
            fullWidth
            {...register("title")}
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={3}
            {...register("description")}
            error={Boolean(errors.description)}
            helperText={errors.description?.message}
          /> */}
          <AuthFieldList fields={POST_FIELDS} register={register} errors={errors} />

          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <PostImageUpload
                error={errors.image?.message}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>

        <Button type="submit" variant="contained" disabled={isLoading}>
          {isLoading ? "Posting..." : "Post"}
        </Button>
      </DialogActions>
    </Stack>
  )
}

export default CreatePostForm
