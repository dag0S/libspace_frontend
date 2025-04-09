import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./query";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Borrowing", "User", "Genre", "Author"],
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
});
