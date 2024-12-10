import * as Yup from "yup";

export const validationSchema = Yup.object({
  full_name: Yup.string().required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone_number: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Phone number is not valid")
    .required("Phone is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  current_job_title: Yup.string().required("Job Title is required"),
  linkedin_profile_url: Yup.string()
    .url("Invalid LinkedIn URL")
    .required("LinkedIn URL is required"),
  terms_accepted: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});
