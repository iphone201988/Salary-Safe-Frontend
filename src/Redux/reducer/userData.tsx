// src/Redux/reducer/userData.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name?: string | any;
  email: string | any;
  phone?: string | any;
  profile?: string|any;
  industry?: string|any;
  location?: string|any;
  size?: string| any;
  role?: string|number|any;
  notifications?: boolean;
}

const initialState: UserState = {
  name: "",
  email: "",
  phone: "",
  profile: "",
  role: "",
  industry: "",
  location: "",
  size: "",
  notifications: false,
};

const userDataSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.email = action.payload.email;
      state.profile = action.payload.profile;
      state.role = action.payload.role;
      state.industry = action.payload.industry;
      state.location = action.payload.location;
      state.size = action.payload.size;
      state.notifications = action.payload.notifications;
    },
    clearUserData: (state) => {
      state.name = "";
      state.email = "";
      state.phone = "";
      state.profile = "";
      state.role = "";
      state.industry = "";
      state.location = "";
      state.size = "";
      state.notifications = false;
    },
  },
});

export const { setUserData, clearUserData } = userDataSlice.actions;
export default userDataSlice.reducer;
