import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EmployeerDetails } from "../../types";

interface UserState {
  employeerDetails?: EmployeerDetails;
  employeDetails?: {};
}

const initialState: UserState = {
  employeerDetails: {} as EmployeerDetails,
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
    setemployeDetails: (state, action) => {
      state.employeDetails = action.payload;
    },
  },
});

export const { clearUserData, setemployeDetails, setemployeerDetails } =
  userDataSlice.actions;
export default userDataSlice.reducer;
