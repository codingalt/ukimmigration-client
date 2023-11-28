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
  tagTypes: ["companyClientApi"],
  endpoints: (builder) => ({
    getGroupClientAppById: builder.query({
      query: (applicationId) => `api/company/application/${applicationId}`,
      providesTags: ["companyClientApi", "Users"],
    }),

    getGroupClientAppByUserId: builder.query({
      query: () => `api/company/user/application`,
      providesTags: ["companyClientApi", "Users"],
    }),

    getCompanyDetailsById: builder.query({
      query: (companyId) => `api/company/${companyId}`,
      providesTags: ["companyClientApi", "Application"],
    }),

    signupCompanyClient: builder.mutation({
      query: (data) => ({
        url: `api/companyclient/signup`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["companyClientApi", "Users"],
    }),

    postGroupClientPhase1: builder.mutation({
      query: ({ values, applicationId }) => ({
        url: `api/company/phase1/${applicationId}`,
        method: "POST",
        body: values,
      }),
      invalidatesTags: ["companyClientApi", "Users"],
    }),

    postGroupClientPhase2: builder.mutation({
      query: (data) => ({
        url: `api/company/phase2`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["companyClientApi", "Users"],
    }),

    postGroupClientPhase3: builder.mutation({
      query: ({ formData, applicationId }) => ({
        url: `api/company/phase3/${applicationId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["companyClientApi", "Users"],
    }),

    groupPayWithCard: builder.mutation({
      query: (data) => ({
        url: `api/company/payment`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application", "companyClientApi", "Users"],
    }),

    postGroupGeneral: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/group/application/general/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postGroupAccomodation: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/group/application/accomodation/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postGroupFamily: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/group/application/family/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postGroupLanguage: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/group/application/language/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postGroupEducation: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/group/application/education/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postGroupEmployment: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/group/application/employment/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postGroupMaintenance: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/group/application/maintenance/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postGroupTravel: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/group/application/travel/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),

    postGroupCharacter: builder.mutation({
      query: ({ data, applicationId }) => ({
        url: `api/group/application/character/${applicationId}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Application"],
    }),
  }),
});

export const {
  useSignupCompanyClientMutation,
  usePostGroupClientPhase1Mutation,
  usePostGroupClientPhase2Mutation,
  usePostGroupClientPhase3Mutation,
  useGetGroupClientAppByIdQuery,
  useGetGroupClientAppByUserIdQuery,
  useGetCompanyDetailsByIdQuery,
  useGroupPayWithCardMutation,
  usePostGroupGeneralMutation,
  usePostGroupAccomodationMutation,
  usePostGroupFamilyMutation,
  usePostGroupLanguageMutation,
  usePostGroupEducationMutation,
  usePostGroupEmploymentMutation,
  usePostGroupMaintenanceMutation,
  usePostGroupTravelMutation,
  usePostGroupCharacterMutation,
} = companyClientApi;
