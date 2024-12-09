
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    jobDetailInApplication:job
}
interface job {
    title: string|any,
    status: string|any,
    location: string|any,
    postedDate: string|any,
}

const initialState: AuthState = {
    jobDetailInApplication:{} as job
};

const jobSlice = createSlice({
  name: "JobDetails",
  initialState,
  reducers: {
    setDetailInApplication: (state, action: PayloadAction<job>) => {
      state.jobDetailInApplication = action.payload;
    },
 
    
  },
});

export const { setDetailInApplication } = jobSlice.actions;
export default jobSlice.reducer;
