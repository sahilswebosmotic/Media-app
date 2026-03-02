import {
  TextField,
} from "@mui/material";

const FormInput = ({
  label,
  name,
  type = "text",
  register,
  error,
}) => {
  return (
    <TextField
      label={label}
      type={type}
      {...register(name)}
      error={Boolean(error)}
      helperText={error?.message}
      fullWidth
      margin="normal"
    />
  );
};
export default FormInput;
