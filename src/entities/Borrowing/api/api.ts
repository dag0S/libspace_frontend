import { baseApi } from "@/src/shared/api";
import { IBorrowData, IBorrowing } from "../types/types";

export const borrowingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBorrowingsByUserId: builder.query<IBorrowing[], string>({
      query: (userId) => ({
        url: `/borrowings/${userId}`,
      }),
      providesTags: ["Borrowing"],
    }),
    borrowABook: builder.mutation<void, IBorrowData>({
      query: (borrowData) => ({
        url: "/borrowings",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["Borrowing"],
    }),
    returnBook: builder.mutation<void, string>({
      query: (borrowingId) => ({
        url: `/borrowings/${borrowingId}`,
        method: "PUT",
      }),
      invalidatesTags: ["Borrowing"],
    }),
    removeBorrowing: builder.mutation<void, string>({
      query: (borrowingId) => ({
        url: `/borrowings/${borrowingId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Borrowing"],
    }),
    checkBookStatus: builder.query<
      { hasBorrowed: boolean; borrowingId?: string },
      { bookId: string; userId?: string }
    >({
      query: ({ bookId, userId }) => ({
        url: `borrowings/check?bookId=${bookId}&userId=${userId}`,
      }),
      providesTags: ["Borrowing"],
    }),
  }),
});

export const {
  useGetBorrowingsByUserIdQuery,
  useBorrowABookMutation,
  useCheckBookStatusQuery,
  useReturnBookMutation,
  useRemoveBorrowingMutation,
} = borrowingsApi;
