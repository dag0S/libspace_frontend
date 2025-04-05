import { baseApi } from "@/src/shared/api";
import { IBorrowData, IBorrowing } from "../types/types";

export const borrowingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBorrowingsByUserId: builder.query<IBorrowing[], string>({
      query: (userId) => ({
        url: `/borrowings/${userId}`,
      }),
    }),
    borrowABook: builder.mutation<void, IBorrowData>({
      query: (borrowData) => ({
        url: "/borrowings",
        method: "POST",
        body: borrowData,
      }),
    }),
    checkBookStatus: builder.query<
      { hasBorrowed: boolean },
      { bookId: string; userId?: string }
    >({
      query: ({ bookId, userId }) => ({
        url: `borrowings/check?bookId=${bookId}&userId=${userId}`,
      }),
    }),
  }),
});

export const {
  useGetBorrowingsByUserIdQuery,
  useBorrowABookMutation,
  useCheckBookStatusQuery,
} = borrowingsApi;
