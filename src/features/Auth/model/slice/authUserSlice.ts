import { createSlice } from "@reduxjs/toolkit";

import { authApi } from "../../api/api";
import { AuthUserSchema } from "../types/authUserSchema";

const initialState: AuthUserSchema = {
  user: null,
};

export const authUserSlice = createSlice({
  name: "authUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.me.matchFulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
      state.user = null;
    });
  },
});

export const { actions: authUserActions } = authUserSlice;
export const { reducer: authUserReducer } = authUserSlice;
