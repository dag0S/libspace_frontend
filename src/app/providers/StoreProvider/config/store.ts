import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "@/src/shared/api";
import { authUserReducer } from "@/src/features/Auth";
import { searchReducer } from "@/src/features/Search";

export const makeStore = () => {
  return configureStore({
    reducer: {
      authUser: authUserReducer,
      search: searchReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
