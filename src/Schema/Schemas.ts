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
  email: yup
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

export const candidateSignUpSchema = yup.object({
  full_name: yup.string().required("Full name is required"),

  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),

    phone_number: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^\+\d{1,3}\d{6,15}$/,
      "Phone number must start with '+' followed by 1-3 digit country code and 6-15 digit phone number"
    ),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  location: yup.string().required("Location is required"),

  current_job_title: yup.string().nullable().required("Current job title is required"),

  linkedin_profile_url: yup.string().url("Must be a valid URL").nullable(),

  job_titles_of_interest: yup
    .string()
    .required("Job titles of interest are required"),

  total_years_of_experience: yup
  .string().required("Education level is required"),

  education_level: yup.string().required("Education level is required"),

  key_skills: yup
    .array()
    .of(yup.string().required("Each skill is required"))
    .min(1, "Please add at least one key skill"),

  general_salary_range: yup.string().required("Salary range is required"),

  preferred_salary_type: yup.string().required("Salary type is required"),

  open_to_performance_based_compensation: yup.boolean(),

  willing_to_negociate: yup.boolean(),

  minimum_acceptable_salary: yup
    .string()
    .required("Minimum acceptable salary is required"),

  preferred_benefits: yup
    .array()
    .of(yup.string().required("Each benefit is required"))
    .min(1, "Please select at least one preferred benefit"),

  view_salary_expectations: yup.string().required(),

  hide_profile_from_current_employer: yup.boolean().required(),

  industries_of_interest: yup
    .array()
    .of(yup.string().required("Each industry is required"))
    .min(1, "Please select at least one industry of interest"),

  job_type_preferences: yup
    .array()
    .of(yup.string().required("Each job type is required"))
    .min(1, "Please select at least one job type"),

  actively_looking_for_new_job: yup.boolean(),

  career_goals: yup.string().nullable().required("career goals is required"),

  professional_development_areas: yup
    .array()
    .of(yup.string().required("Each area is required"))
    .min(1, "Please specify at least one development area"),

  role_specific_salary_adjustments: yup.string().nullable().required("Role-Specific Salary Adjustments is required"),

  salaryInsightsInterest: yup.boolean().required(),

  resume_upload: yup.mixed().nullable(),

  cover_letter_upload: yup.mixed().nullable(),

  invite_employer: yup.boolean(),
  employer_name: yup.string().when("invite_employer", {
    is: true,
    then: (schema) => schema.required("Employer name is required"),
    otherwise: (schema) => schema.nullable(),
  }),

  contact_person_name: yup.string().when("invite_employer", {
    is: true,
    then: (schema) => schema.required("Contact person name is required"),
    otherwise: (schema) => schema.nullable(),
  }),

  contact_email: yup.string().when("invite_employer", {
    is: true,
    then: (schema) => schema.email("Must be a valid email").required("Contact email is required"),
    otherwise: (schema) => schema.nullable(),
  }),

  message_to_employer: yup.string().nullable(),

  notificationPreferences: yup
    .array()
    .of(yup.string().required("Each preference is required"))
    .min(1, "Please select at least one notification preference"),

  job_alerts_frequency: yup.string().nullable().required("Job alerts frequency is required"),

  referral_source: yup.string().nullable(),

  referral_code: yup.string().nullable(),

  terms_accepted: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

