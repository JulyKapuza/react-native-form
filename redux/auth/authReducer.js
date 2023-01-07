import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  login: null,
  avatar: null,
  stateChange: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState: state,

  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
      avatar: payload.avatar,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOutUser: () => state,
  },
});

// console.log("authSlice", authSlice);
