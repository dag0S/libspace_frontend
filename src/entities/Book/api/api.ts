import { baseApi } from "@/src/shared/api";
import { BookCreationData, IBookWithGenresAndAuthor } from "../types/types";

export const booksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBooksFullInfo: builder.query<IBookWithGenresAndAuthor[], void>({
      query: () => ({
        url: "/books/info",
      }),
      providesTags: ["Book"],
    }),
    createBook: builder.mutation<void, BookCreationData>({
      query: (data) => ({
        url: "/books",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),
    editBook: builder.mutation<
      void,
      { bookId: string; data: BookCreationData }
    >({
      query: ({ data, bookId }) => ({
        url: `/books/${bookId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Book"],
    }),
    deleteBook: builder.mutation<void, string>({
      query: (bookId) => ({
        url: `/books/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useCreateBookMutation,
  useDeleteBookMutation,
  useEditBookMutation,
  useGetBooksFullInfoQuery,
} = booksApi;
