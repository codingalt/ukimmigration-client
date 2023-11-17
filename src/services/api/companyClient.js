import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const companyClientApi = createApi({
  reducerPath: "companyClientApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URI,
    prepareHeaders: async (headers, query) => {
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Company"],
  endpoints: (builder) => ({
    getAllCompanies: builder.query({
      query: () => `api/companies`,
      providesTags: ["companyClientApi"],
    }),

    signupCompanyClient: builder.mutation({
      query: (data) => ({
        url: `api/companyclient/signup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["companyClientApi","Users"],
    }),
  }),
});

export const {
  useGetAllCompaniesQuery,
  useSignupCompanyClientMutation
} = companyClientApi;
