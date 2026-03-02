import { useState, useEffect } from "react";
import {
  Alert,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreatePostMutation } from "@store/slice/postsApi";

const postDefaultValues = {
  title: "",
  description: "",
  image: null,
  isPrivate: false,
};

const createPostSchema = yup.object({
  title: yup.string().required("Title is required.").min(2).max(120),
  description: yup.string().max(600),
  isPrivate: yup.boolean().required(),
  image: yup
    .mixed()
    .nullable()
    .test("fileType", "Only image files are allowed.", (file) => {
      if (!file) return true;
      return file.type.startsWith("image/");
    }),
});

const CreatePostDialog = ({ open, onClose }) => {
  const [previewUrl, setPreviewUrl] = useState("");
  const [createPost, { isLoading }] = useCreatePostMutation();

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: postDefaultValues,
    resolver: yupResolver(createPostSchema),
  });

  const selectedImage = useWatch({ control, name: "image" });

  // Cleanup preview on close
  useEffect(() => {
    if (!open) {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl("");
      reset(postDefaultValues);
    }
  }, [open]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0] || null;

    setValue("image", file, { shouldValidate: true, shouldDirty: true });

    if (previewUrl) URL.revokeObjectURL(previewUrl);

    setPreviewUrl(file ? URL.createObjectURL(file) : "");
  };

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description || "");
      formData.append("isPrivate", values.isPrivate ? "true" : "false");

      if (values.image) {
        formData.append("image", values.image);
      }

      await createPost(formData).unwrap();
      onClose();
    } catch (err) {
      setError("root.apiError", {
        message: err?.data?.message || "Unable to create post.",
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create a New Post</DialogTitle>

      <Stack component="form" onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ pt: 1 }}>
          {errors.root?.apiError?.message && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.root.apiError.message}
            </Alert>
          )}

          <Stack spacing={2}>
            <TextField
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
            />

            <Button variant="outlined" component="label">
              {selectedImage ? "Change Image" : "Upload Image"}
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>

            {errors.image?.message && (
              <Alert severity="error">{errors.image.message}</Alert>
            )}

            {previewUrl && (
              <CardMedia
                component="img"
                image={previewUrl}
                alt="Preview"
                sx={{ borderRadius: 2, maxHeight: 220, objectFit: "cover" }}
              />
            )}

            <FormControlLabel
              control={<Switch {...register("isPrivate")} />}
              label="Private post"
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
    </Dialog>
  );
};

export default CreatePostDialog;
