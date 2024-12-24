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
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  current_job_title: Yup.string().required("Job Title is required"),
  location: Yup.string().required("Location is required"),
  location_multiplier: Yup.string().optional(),
  linkedin_profile_url: Yup.string().optional()
    .url("Invalid LinkedIn URL")
    .required("LinkedIn URL is required"),
  terms_accepted: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
});

export const skillvalidation = Yup.object({
  job_titles_of_interest : Yup.string().required(
    "Job Titles of Interest is required"),
    total_years_of_experience:Yup.string().required(
      "Total Years of Experience is required"
    ),
    education_level:Yup.string().required(
      "Education Level is required"
    ),
    key_skills:Yup.string().required(
      "At least one skill is required"
    ), 
})
