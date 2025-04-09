import { baseApi } from "@/src/shared/api";

export const authorsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuthors: builder.query<string[], void>({
      query: () => ({
        url: "/authors",
      }),
    }),
  }),
});

export const { useGetAuthorsQuery } = authorsApi;
