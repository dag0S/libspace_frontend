import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithRetry } from "./query";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
