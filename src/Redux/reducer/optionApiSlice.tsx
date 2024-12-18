import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { /* candidateDetails , */ EmployeerDetails } from "../../types";

interface OptionsState {
  skillOption?: string[];
  locationOption?: string[];
  industryOption?: string[];
}

const initialState: OptionsState = {
skillOption: [],
locationOption: [],
industryOption: [],
};

const optionsDataSlice = createSlice({
  name: "optionApi",
  initialState,
  reducers: {
    setskillOption: (state, action: PayloadAction<string[]>) => {
      state.skillOption = action.payload;
    },
    setlocationOption: (state, action: PayloadAction<string[]>) => {
      state.locationOption = action.payload;
    },
    setIndustryOption: (state, action: PayloadAction<string[]>) => {
      state.industryOption = action.payload;
    },
  },
});

export const {  setskillOption, setlocationOption, setIndustryOption} =
optionsDataSlice.actions;
export default optionsDataSlice.reducer;
