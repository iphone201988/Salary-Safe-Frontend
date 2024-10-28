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
  preferences: yup.boolean().required(),
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
    .email("Must be a valid email"),
});
export const resetPasswordSchema = yup.object({
  new_password: yup.string().required("Password is required"),
  confirmPassword: yup.string().required("confirmPassword is required"),
});

export const employeeRegistrationSchema = yup
  .object({
    companyName: yup
      .string()
      .required("Company name is required")
      .email("Must be a valid email"),
    companyLocation: yup.string().required("Company Location is required"),
    companySize: yup.string().required("Company Location is required"),
    email: yup.string().email("Must be a valid email"),
    phone: yup
      .string()
      .nullable(),
    password: yup.string().required("Password is required"),
  })
  .test("at-least-one", "Either phone or email is required", function (value) {
    return !!value.phone || !!value.email;
  });

export const employeeLoginSchema = yup
  .object({
    email: yup
      .string()
      .required("Email is required")
      .email("Must be a valid email"),
    phone: yup
      .string()
      .nullable(),
    password: yup.string().required("Password is required"),
  })
  .test("at-least-one", "Either phone or email is required", function (value) {
    return !!value.phone || !!value.email;
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
      if (err.type == "at-least-one") {
        formattedErrors.phone = err.message;
        formattedErrors.email = err.message;
      }
      if (err.path) {
        formattedErrors[err.path] = err.message;
      }
    });

    return formattedErrors;
  }
};
