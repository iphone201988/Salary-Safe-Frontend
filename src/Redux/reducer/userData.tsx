import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { /* candidateDetails , */ EmployeerDetails } from "../../types";
interface candidateDetails {
  full_name?: string;
  email?: string;
  phone_number?: string;
  location?: string;
  location_multiplier?: string;
  current_job_title?: string;
  linkedin_profile_url?: string;
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
  job_alerts_frequency?: any|string[];
  referral_source?: string;
  referral_code?: string;
  terms_accepted?: boolean;
  id?: string;
  profileImage?: any | null;
  notification_preferences?: any | string[];
  avatar: any;
}
interface UserState {
  employeerDetails?: EmployeerDetails;
  employeDetails?: candidateDetails;
}

const initialState: UserState = {
  employeerDetails: {} as EmployeerDetails,
  employeDetails: {} as candidateDetails,
};

const userDataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.employeDetails = undefined;
      state.employeerDetails = undefined;
    },
    setemployeerDetails: (state, action: PayloadAction<EmployeerDetails>) => {
      state.employeerDetails = { ...state.employeerDetails, ...action.payload };
    },
    setemployeDetails: (state, action: PayloadAction<candidateDetails>) => {
      state.employeDetails = action.payload;
    },
  },
});

export const { clearUserData, setemployeDetails, setemployeerDetails } =
  userDataSlice.actions;
export default userDataSlice.reducer;
