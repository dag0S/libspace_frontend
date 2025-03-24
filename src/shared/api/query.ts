import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query";

const BaseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/`,
  credentials: "include",
});

export const baseQueryWithRetry = retry(BaseQuery, { maxRetries: 1 });
