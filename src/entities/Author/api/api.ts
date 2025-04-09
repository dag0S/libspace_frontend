import { baseApi } from "@/src/shared/api";
import { AuthorCreationData, IAuthor } from "../types/types";

export const authorsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuthors: builder.query<IAuthor[], void>({
      query: () => ({
        url: "/authors",
      }),
      providesTags: ["Author"],
    }),
    createAuthor: builder.mutation<void, AuthorCreationData>({
      query: (data) => ({
        url: "/authors",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Author"],
    }),
    editAuthor: builder.mutation<
      void,
      { authorId: string; data: AuthorCreationData }
    >({
      query: ({ data, authorId }) => ({
        url: `/authors/${authorId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Author"],
    }),
    deleteAuthor: builder.mutation<void, string>({
      query: (authorId) => ({
        url: `/authors/${authorId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Author"],
    }),
  }),
});

export const {
  useGetAuthorsQuery,
  useCreateAuthorMutation,
  useDeleteAuthorMutation,
  useEditAuthorMutation,
} = authorsApi;
