import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { candidateDetails , EmployeerDetails } from "../../types";

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
      state.employeerDetails = action.payload;
    },
    setemployeDetails: (state, action: PayloadAction<candidateDetails>) => {
      state.employeDetails = action.payload;
    },
  },
});

export const { clearUserData, setemployeDetails, setemployeerDetails } =
  userDataSlice.actions;
export default userDataSlice.reducer;
