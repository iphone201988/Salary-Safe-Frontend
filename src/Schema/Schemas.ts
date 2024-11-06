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
    fullName: yup.string().required(" name is required"),
    email: yup.string().email("Must be a valid email"),
    phone: yup.string().nullable(),
    password: yup.string().required("Password is required"),
  })
  .test("at-least-one", "Either phone or email is required", function (value) {
    return !!value.phone || !!value.email;
  });

export const employeerRegistrationSchema = yup
  .object({
    companyName: yup.string().required("Company name is required"),

    companyLocation: yup.string().required("Company Location is required"),

    companySize: yup.string().required("Company Size is required"),

    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),

    phone: yup
      .string()
      .nullable()
      .matches(/^[0-9]+$/, "Phone number must only contain numbers"),

    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    industry: yup.string().required("Industry is required"),

    PrimaryContact: yup.string().required("Primary contact is required"),

    primaryHiringGoals: yup
      .array()
      .min(1, "Please select at least one primary hiring goal")
      .of(yup.string().required("Each goal must be selected")),

    preferredJobLocations: yup
      .array()
      .min(1, "Please select at least one preferred job location")
      .of(yup.string().required("Each location must be selected")),

    rolesPositions: yup
      .array()
      .min(1, "Please select at least one role/position")
      .of(yup.string().required("Each role must be selected")),

    jobTypes: yup
      .array()
      .min(1, "Please select at least one job type")
      .of(yup.string().required("Each job type must be selected")),

    keyMetrics: yup
      .string()
      .required("Please select at least one key metric")
      /* .of(yup.string().required("Each metric must be selected")) */,

    roleCustomization: yup
      .string()
      .required("Please select at least one role customization option")
      /* .of(yup.string().required("Each customization option must be selected")) */,

    salaryBenchmarking: yup
      .string()
      .required("Please select at least one salary benchmarking option")
      /* .of(yup.string().required("Each benchmarking option must be selected")) */,

    candidateViewingPreferences: yup
      .string()
      .required("Please select at least one candidate viewing preference")
      /* .of(yup.string().required("Each preference must be selected")) */,

    offerOptimization: yup
      .string()
      .required("Please select at least one offer optimization option"),
      // .of(yup.string().required("Each optimization option must be selected")),

    marketRoleAlerts: yup
      .string()
      .required("Please select at least one market role alert"),
      // .of(yup.string().required("Each market role alert must be selected")),

    customReports: yup
      .string()
      .required("Please select at least one custom report option"),
      // .of(yup.string().required("Each report option must be selected")),

    automatedUpdates: yup
      .string()
      .required("Please select automated update option"),
    // .of(yup.string().required("Each update option must be selected")),

    candidateFeedback: yup
      .string()
      .required("Please select at least one candidate feedback option"),
    // .of(
    //   yup
    //     .string()
    //     .required("Each feedback option must be selected")
    //     .test(
    //       "is-string",
    //       "Each item must be a valid string",
    //       (value) => typeof value === "string"
    //     )
    // )
    referralHow: yup.string().nullable(),

    referralCode: yup.string().nullable(),
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
    phone: yup.string().nullable(),
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
