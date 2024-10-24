import * as yup from "yup";

export const companyRegistrationSchema = yup.object({
  company_name: yup.string().required("Company name is required"),
  company_email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  // contact_person: yup.string().required("Contact person is required"),
  password: yup.string().required("Password is required"),
});
export const companyRegistrationStep1Schema = yup.object({
  full_name: yup.string().required("Full name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
});
export const companyRegistrationStep2Schema = yup.object({

  company_name: yup.string().required("Company name is required"),
  role: yup.string().required("Role is required"),
});
export const companyRegistrationStep3Schema = yup.object({
  preferences:  yup.boolean().required(),
  notifications: yup.boolean().required(),
});
export const companyLoginSchema = yup.object({
  company_name: yup.string().required("Company name is required"),
  company_email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  password: yup.string().required("Password is required"),
});

export const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email")
});
export const resetPasswordSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email")
});

export const employeeRegistrationSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  password: yup.string().required("Password is required"),
  qualifications: yup.string().required("Qualifications are required"),
  salary_expectation: yup
    .number()
    .min(1, "Salary Expectations cannot be empty")
    .required("Salary Expectation are required"),
});

export const employeeLoginSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Must be a valid email"),
  password: yup.string().required("Password is required"),
});

export const validateForm = async (
  schema: yup.ObjectSchema<any>,
  data: any
) => {
  try {
    await schema.validate(data, {
      abortEarly: false,
    });
  } catch (error: any) {
    const formattedErrors: Record<string, string> = {};
    error.inner.forEach((err: any) => {
      if (err.path) {
        formattedErrors[err.path] = err.message;
      }
    });
    return formattedErrors;
  }
};
