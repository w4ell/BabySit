import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAdmin: null,
  isAdminAuthenticated: false,
  loading: false,
  error: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    LoginAdminRequest: (state) => {
      state.loading = true;
    },
    LoginAdminSuccess: (state, action) => {
      state.loading = false;
      state.currentAdmin = action.payload;
      state.isAdminAuthenticated = true;
      state.error = null;
    },
    LoginAdminFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    LoadAdminRequest: (state) => {
      state.loading = true;
    },
    LoadAdminSuccess: (state, action) => {
      state.isAdminAuthenticated = true;
      state.loading = false;
      state.currentAdmin = action.payload;
      state.error = null;
    },
    LoadAdminFail: (state, action) => {
      state.loading = false;
      state.isAdminAuthenticated = false;
      state.error = action.payload;
    },
    LogoutAdminRequest: (state) => {
      state.loading = true;
    },
    LogoutAdminSuccess: (state, action) => {
      state.isAdminAuthenticated = false;
      state.loading = false;
      state.currentAdmin = null;
      state.error = null;
    },
    LogoutAdminFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { actions: adminActions, reducer: adminReducer } = adminSlice;
