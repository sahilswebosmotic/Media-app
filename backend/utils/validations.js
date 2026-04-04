const yup = require("yup");
const { Types } = require("mongoose");

const validationSchema = {
  firstname: yup
    .string()
    .required("Firstname is required")
    .min(2, "Firstname must be at least 2 characters")
    .max(30, "Firstname must be at most 30 characters")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Firstname must contain only alphanumeric characters."
    ),
  lastname: yup
    .string()
    .required("Lastname is required")
    .min(2, "Lastname must be at least 2 characters")
    .max(30, "Lastname must be at most 30 characters")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Lastname must contain only alphanumeric characters."
    ),
  email: yup
    .string()
    .email("Invalid email address.")
    .required("Email is required"),
  username: yup
    .string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters")
    .max(30, "Username must be at most 30 characters")
    .matches(
      /^[a-zA-Z0-9-_@.]+$/,
      "Username must contain only alphanumeric characters and/or the following special characters: -, _, @, and ."
    ),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "The password must be at least 8 characters")
    .max(15, "The password can be at most 15 characters"),
  isPrivate: yup.boolean().required("Private or not is required."),
  filePath: yup.string(),
  title: yup.string().required("Post title is required."),
  description: yup.string(),
  
  // Social features validations
  postId: yup
    .string()
    .required("Post ID is required")
    .test("is-valid-objectid", "Invalid post ID", (value) =>
      Types.ObjectId.isValid(value)
    ),
  userId: yup
    .string()
    .required("User ID is required")
    .test("is-valid-objectid", "Invalid user ID", (value) =>
      Types.ObjectId.isValid(value)
    ),
  commentText: yup
    .string()
    .required("Comment text is required")
    .min(1, "Comment must be at least 1 character")
    .max(500, "Comment must not exceed 500 characters"),
  sharedText: yup
    .string()
    .optional()
    .max(200, "Shared text must not exceed 200 characters"),
};

module.exports = validationSchema;
