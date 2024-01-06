import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URI,
    prepareHeaders: async (headers, query) => {
      const authToken = localStorage.getItem("ukimmigration_token");
      headers.set("authorization", `Bearer ${authToken}`);
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["AdminApi"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `api/users`,
      providesTags: ["AdminApi"],
    }),

    createCaseWorker: builder.mutation({
      query: (data) => ({
        url: `api/caseworker`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminApi"],
    }),

    linkCompany: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/company/link/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AdminApi"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateCaseWorkerMutation,
  useLinkCompanyMutation
} = adminApi;
