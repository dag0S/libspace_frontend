import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SearchState {
  searchValue?: string;
}

const initialState: SearchState = {
  searchValue: undefined,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    clearSearchValue: (state) => {
      state.searchValue = "";
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
  },
});

export const { actions: searchActions } = searchSlice;
export const { reducer: searchReducer } = searchSlice;
