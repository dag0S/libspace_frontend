import { createSlice } from "@reduxjs/toolkit";

import { authApi } from "../../api/api";
import { AuthUserSchema } from "../types/authUserSchema";

const initialState: AuthUserSchema = {
  user: null,
};

export const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.me.matchFulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { actions: authUserActions } = authUserSlice;
export const { reducer: authUserReducer } = authUserSlice;
