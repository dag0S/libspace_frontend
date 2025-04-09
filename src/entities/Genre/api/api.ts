import { baseApi } from "@/src/shared/api";
import { GenreCreationData, IGenre } from "../types/types";

export const genresApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGenres: builder.query<IGenre[], void>({
      query: () => ({
        url: "/genres",
      }),
      providesTags: ["Genre"],
    }),
    createGenre: builder.mutation<void, GenreCreationData>({
      query: (data) => ({
        url: "/genres",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Genre"],
    }),
    editGenre: builder.mutation<
      void,
      { genreId: string; data: GenreCreationData }
    >({
      query: ({ data, genreId }) => ({
        url: `/genres/${genreId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Genre"],
    }),
    deleteGenre: builder.mutation<void, string>({
      query: (genreId) => ({
        url: `/genres/${genreId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Genre"],
    }),
  }),
});

export const {
  useGetGenresQuery,
  useCreateGenreMutation,
  useDeleteGenreMutation,
  useEditGenreMutation,
} = genresApi;
