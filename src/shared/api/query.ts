import { fetchBaseQuery, retry } from "@reduxjs/toolkit/query";

const BaseQuery = fetchBaseQuery({
  baseUrl: `${process.env.API_URL}/`,
});

export const baseQueryWithRetry = retry(BaseQuery, { maxRetries: 1 });
