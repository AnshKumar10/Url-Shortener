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

const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

export const CreateUrlShortenerFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be 50 characters or less")
    .required("Title is required"),
  longUrl: Yup.string()
    .matches(urlRegex, "Enter a valid URL")
    .required("Long URL is required"),
  customUrl: Yup.string()
    .min(3, "Custom URL must be at least 3 characters")
    .max(20, "Custom URL must be 20 characters or less")
    .matches(
      /^[a-zA-Z0-9-_]+$/,
      "Only alphanumeric characters, hyphens, and underscores are allowed"
    )
    .notRequired(),
});
