import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "@/src/shared/api";
import { authUserReducer } from "@/src/features/Auth";

export const makeStore = () => {
  return configureStore({
    reducer: {
      authUser: authUserReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
