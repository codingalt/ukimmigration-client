import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const applicationApi = createApi({
  reducerPath: "applicationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URI,
    prepareHeaders: async (headers, query) => {
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Application"],
  endpoints: (builder) => ({
    postPhase1: builder.mutation({
      query: (data) => ({
        url: "api/application/phase1",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postPhase2: builder.mutation({
      query: (data) => ({
        url: `api/application/phase2/${data.applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    getApplicationByUserId: builder.query({
      query: () => `api/user/application`,
      providesTags: ["Application"],
    }),
  }),
});

export const {
  useGetApplicationByUserIdQuery,
  usePostPhase1Mutation,
  usePostPhase2Mutation
} = applicationApi;
