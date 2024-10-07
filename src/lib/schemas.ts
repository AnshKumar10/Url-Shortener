import * as Yup from "yup";

export const urlSchema = Yup.object().shape({
  url: Yup.string()
    .trim()
    .required("Url is required")
    .url("Please enter a valid Url"),
});

export const loginFormSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export const signUpFormSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  profilePic: Yup.mixed().required(),
});
