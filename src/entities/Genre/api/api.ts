import { baseApi } from "@/src/shared/api";
import { IGenre } from "../types/IGenre";

export const genresApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getGenres: builder.query<IGenre[], void>({
      query: () => ({
        url: "/genres",
      }),
    }),
  }),
});

export const { useGetGenresQuery } = genresApi;
