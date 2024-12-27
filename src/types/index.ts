interface Role {
  value: string;
  label: string;
}

interface InviteTeamMember {
  name: string;
  email: string;
  role: Role;
}

export interface EmployeerDetails {
  email: string;
  company_name: string;
  industry: string;
  company_size: string;
  headquarters_location: string | any;
  primary_contact_person: string;
  contact_phone_number: string;
  primary_hiring_goals: string[];
  preferred_job_locations: string[];
  roles_of_interest: string[];
  job_types: string[];
  dashboard_metrics: string;
  role_specific_customization: boolean;
  salary_benchmarking_preference: string | null;
  candidate_viewing_preferences: string;
  offer_optimization: string | null;
  enable_real_time_market_alerts: boolean;
  enable_custom_reporting: boolean;
  preferred_report_frequency: string;
  automated_updates: string | null | boolean;
  candidate_feedback_analysis: string | null | boolean;
  invite_team_member: InviteTeamMember[];
  referral_source: string;
  referral_code: string;
  terms_accepted: boolean;
  id: string;
  avatar: any;
}

export interface SignUpFormData {
  companyName: string;
  companyLocation: string;
  companySize: string;
  email: string;
  phone: string;
  password: string;
  industry: string;
  PrimaryContact: string;
  primaryHiringGoals: any[];
  preferredJobLocations: any[];
  rolesPositions: any[];
  jobTypes: any[];
  keyMetrics: any | string;
  roleCustomization: any | string;
  salaryBenchmarking: any | string;
  candidateViewingPreferences: any | string;
  offerOptimization: any | string;
  marketRoleAlerts: any | string;
  customReports: any | any;
  automatedUpdates: any | string;
  candidateFeedback: any | string;
  referralHow: string | any;
  referralCode: string | any;
  avatar?: any;
}

export interface SignUpFormErrors {
  companyName?: string;
  companyLocation?: string;
  companySize?: string;
  email?: string;
  phone?: string;
  password?: string;
  industry?: string;
  PrimaryContact?: string;
  primaryHiringGoals?: string;
  preferredJobLocations?: string;
  rolesPositions?: string;
  jobTypes?: string;
  keyMetrics?: string;
  roleCustomization?: string;
  salaryBenchmarking?: string;
  candidateViewingPreferences?: string;
  offerOptimization?: any | string;
  marketRoleAlerts?: string;
  customReports?: any | string;
  automatedUpdates?: any | string;
  candidateFeedback?: any | string;
  referralHow?: string;
  referralCode?: string;
}

export interface TeamMember {
  name: string;
  email: string;
  role: string;
}

export interface SignUpCandidate {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  location: string;
  current_job_title: string;
  linkedin_profile_url: string;
  job_titles_of_interest: string;
  total_years_of_experience: string | any | undefined;
  key_skills: any | string;
  preferred_benefits: any | string;
  industries_of_interest: any | string;
  job_type_preferences: any | string;
  professional_development_areas: any | string;
  resume_upload: any;
  cover_letter_upload: any;
  notificationPreferences: any | string;
  education_level: string | any;
  general_salary_range: string;
  preferred_salary_type: string | any;
  open_to_performance_based_compensation: boolean;
  willing_to_negociate: boolean;
  minimum_acceptable_salary: string;
  view_salary_expectations: string | any;
  hide_profile_from_current_employer: boolean;
  actively_looking_for_new_job: boolean;
  career_goals: string;
  role_specific_salary_adjustments: string;
  employer_name: string;
  contact_person_name: string;
  contact_email: string;
  message_to_employer: string;
  referral_code: string;
  referral_source: string | any;
  job_alerts_frequency: string | any;
  salaryInsightsInterest: boolean;
  invite_employer: boolean;
  terms_accepted: boolean;
}

export interface SignUpCandidateFormErrors {
  full_name?: string;
  email?: string;
  phone_number?: string;
  password?: string;
  location?: string;
  current_job_title?: string;
  linkedin_profile_url?: string;
  job_titles_of_interest?: string;
  total_years_of_experience?: string;
  key_skills?: any;
  preferred_benefits?: any;
  industries_of_interest?: any;
  job_type_preferences?: any;
  professional_development_areas?: any;
  resume_upload?: any;
  cover_letter_upload?: any;
  notificationPreferences?: any;
  education_level?: string;
  general_salary_range?: string;
  preferred_salary_type?: string;
  open_to_performance_based_compensation?: boolean;
  willing_to_negociate?: boolean;
  minimum_acceptable_salary?: string;
  view_salary_expectations?: string;
  hide_profile_from_current_employer?: boolean;
  actively_looking_for_new_job?: boolean;
  career_goals?: string;
  role_specific_salary_adjustments?: string;
  employer_name?: string;
  contact_person_name?: string;
  contact_email?: string;
  message_to_employer?: string;
  referral_code?: string;
  referral_source?: string;
  job_alerts_frequency?: string;
  salaryInsightsInterest?: boolean;
  invite_employer?: boolean;
  terms_accepted?: boolean;
}

export type CompanyProfileType = {
  formData: SignUpFormData;
  errors: SignUpFormErrors;
  setFormData: React.Dispatch<React.SetStateAction<SignUpFormData>>;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  edit?: boolean;
};
export type CandidateProfileType = {
  formData: candidateDetails;
  errors: candidateDetails;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  edit?: boolean;
};

export interface candidateDetails {
  full_name: string;
  email: string;
  phone_number: string;
  location: string;
  headquarters_location?: string;
  current_job_title: string;
  linkedin_profile_url: string;
  job_titles_of_interest?: string;
  total_years_of_experience?: number;
  education_level?: string;
  key_skills?: string[];
  general_salary_range?: string;
  preferred_salary_type?: "Hourly" | "Annual";
  open_to_performance_based_compensation?: boolean;
  willing_to_negociate?: boolean;
  minimum_acceptable_salary?: number;
  preferred_benefits?: string[];
  view_salary_expectations?: "Private" | "Public";
  hide_profile_from_current_employer?: boolean;
  industries_of_interest?: string[];
  job_type_preferences?: ("full_time" | "part_time" | "contract")[];
  actively_looking_for_new_job?: boolean;
  career_goals?: string;
  professional_development_areas?: string[];
  role_specific_salary_adjustments?: string;
  interested_in_salary_benchmarks?: boolean;
  resume_upload?: string | null;
  cover_letter_upload?: string | null;
  invite_employer?: any | null;
  employer_name?: string;
  contact_person_name?: string;
  contact_email?: string;
  message_to_employer?: string;
  job_alerts_frequency?: "instant" | "daily" | "weekly";
  referral_source?: string;
  referral_code?: string;
  terms_accepted?: boolean;
  id?: string;
  profileImage?: any | null;
  notificationPreferences?: any | string[];
}
