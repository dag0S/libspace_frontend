import { baseApi } from "@/src/shared/api";
import { IAuthor } from "../types/IAuthor";

export const authorsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuthors: builder.query<IAuthor[], void>({
      query: () => ({
        url: "/authors",
      }),
    }),
  }),
});

export const { useGetAuthorsQuery } = authorsApi;
