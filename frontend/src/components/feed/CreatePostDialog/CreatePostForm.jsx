import { useEffect } from "react"
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Switch,
  Stack,
} from "@mui/material"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useCreatePostMutation } from "@store/slice/postsApi"
import { createPostSchema, postDefaultValues } from "./postValidation"
import PostImageUpload from "./PostImageUpload"
import FormInput from "@components/common/FormInput"
import { useToast } from "@context/toast/useToast"
 
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

const CreatePostForm = ({ onClose, initialText }) => {
  const [createPost, { isLoading }] = useCreatePostMutation()
  const {showSuccess} = useToast();
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

  useEffect(() => {
    if (initialText) {
      reset({ ...postDefaultValues, title: initialText });
    } else {
      reset(postDefaultValues);
    }
  }, [initialText, reset]);

  const onSubmit = async (values) => {
    try {
      await createPost(buildCreatePostFormData(values)).unwrap()
      reset(postDefaultValues)
      onClose()
      showSuccess("Post created successfully.");
    } catch (err) {
      setError("root.apiError", {
        message: err?.data?.message || "Unable to create post.",
      })
    }
  }

  return (
    <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
      <DialogContent sx={{ pt: 1.1 }}>
        {errors.root?.apiError?.message && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errors.root.apiError.message}
          </Alert>
        )}

        <Stack spacing={2.1}>
          <FormInput label="Title" name="title" register={register} error={errors?.title} />
          <FormInput label="Description" name="description" register={register} error={errors?.description} />

          <FormControlLabel
            control={<Switch {...register("isPrivate")} />}
            label="Private post"
            sx={{ m: 0, "& .MuiFormControlLabel-label": { color: "text.secondary" } }}
          />

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
