import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_URI,
    prepareHeaders: async (headers, query) => {
      const authToken = localStorage.getItem("ukimmigration_token");
      headers.set("authorization", `Bearer ${authToken}`);
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Chat"],
  endpoints: (builder) => ({
    getUserMessages: builder.query({
      query: (chatId) => `api/message/${chatId}`,
      // providesTags: ["Chat"],
    }),

    sendMessage: builder.mutation({
      query: (data) => ({
        url: `api/message`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Chat"],
    }),

    readMessagesByChat: builder.mutation({
      query: (chatId) => ({
        url: `api/chat/read/${chatId}`,
        method: "POST",
        body: chatId,
      }),
      // invalidatesTags: ["Chat"],
    }),

    chatNotifications: builder.mutation({
      query: (chatId) => ({
        url: `api/chat/unseen/count/${chatId}`,
        method: "POST",
        body: chatId,
      }),
      // invalidatesTags: ["Chat"],
    }),

    getUserChats: builder.query({
      query: () => `api/chats`,
      providesTags: ["Chat"],
    }),
  }),
});

export const {
  useGetUserChatsQuery,
  useGetUserMessagesQuery,
  useSendMessageMutation,
  useReadMessagesByChatMutation,
  useChatNotificationsMutation,
} = chatApi;
