// postValidation.js
import * as yup from "yup"

export const postDefaultValues = {
  title: "",
  description: "",
  image: null,
  isPrivate: false,
}

export const createPostSchema = yup.object({
  title: yup.string().required("Title is required.").min(2).max(120),
  description: yup.string().max(600),
  isPrivate: yup.boolean().required(),
  image: yup
    .mixed()
    .nullable()
    .test("fileType", "Only image files are allowed.", (file) => {
      if (!file) return true
      return file.type.startsWith("image/")
    }),
})
