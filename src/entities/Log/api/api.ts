import { baseApi } from "@/src/shared/api";
import { ILog } from "../types/types";

export const logsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLogsById: builder.query<ILog[], string>({
      query: (userId) => ({
        url: `/logs/${userId}`,
      }),
      providesTags: ["Log"],
    }),
    deleteLog: builder.mutation<void, string>({
      query: (logId) => ({
        url: `/logs/${logId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Log"],
    }),
  }),
});

export const { useDeleteLogMutation, useGetLogsByIdQuery } = logsApi;
