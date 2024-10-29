// src/Redux/reducer/userData.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
  email: string;
  avatar: string;
  role: string|number;
}

const initialState: UserState = {
  name: "",
  email: "",
  avatar: "",
  role: "",
};

const userDataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.avatar = action.payload.avatar;
      state.role = action.payload.role;
    },
    clearUserData: (state) => {
      state.name = "";
      state.email = "";
      state.avatar = "";
      state.role = "";
    },
  },
});

export const { setUserData, clearUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
