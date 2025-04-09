import { baseApi } from "@/src/shared/api";
import { UserEditionData, IUser, UserCreationData } from "../types/types";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => ({
        url: "/users",
      }),
      providesTags: ["User"],
    }),
    getUserById: builder.query<IUser, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
      }),
      providesTags: ["User"],
    }),
    createUser: builder.mutation<void, UserCreationData>({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    editUser: builder.mutation<void, { userId: string; data: UserEditionData }>(
      {
        query: ({ data, userId }) => ({
          url: `/users/${userId}`,
          method: "PUT",
          body: data,
        }),
        invalidatesTags: ["User"],
      }
    ),
    deleteUser: builder.mutation<void, string>({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useDeleteUserMutation,
  useEditUserMutation,
  useGetUserByIdQuery,
  useGetUsersQuery,
} = usersApi;
