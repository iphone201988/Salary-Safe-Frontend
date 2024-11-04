// src/Redux/reducer/authSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null | any;
  role?: string | null | any;
}
interface Auth {
  token: string | null | any;
  role?: string | null | any;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  role: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Auth>) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.role = "";
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
