// src/Redux/reducer/userData.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {

  authType?: string|number;
}

const initialState: UserState = {
    authType:""
};

const selectOption = createSlice({
  name: "selectOption",

  initialState,
  reducers: {
    setSelectOption: (state, action: PayloadAction<UserState>) => {
      state.authType = action.payload.authType;
    },
    clearSelectOption: (state) => {
      state.authType = "";
    },
  },
});

export const { setSelectOption, clearSelectOption } = selectOption.actions;
export default selectOption.reducer;
