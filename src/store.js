import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userSlice from "./services/redux/userSlice";
import { userApi } from "./services/api/userApi";
import { applicationApi } from "./services/api/applicationApi";
import { chatApi } from "./services/api/chatApi";
import { caseworkerApi } from "./services/api/caseworkerApi";
import { companyClientApi } from "./services/api/companyClient";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [applicationApi.reducerPath]: applicationApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [caseworkerApi.reducerPath]: caseworkerApi.reducer,
    [companyClientApi.reducerPath]: companyClientApi.reducer,
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      userApi.middleware,
      applicationApi.middleware,
      chatApi.middleware,
      caseworkerApi.middleware,
      companyClientApi.middleware,
    ]),
});

setupListeners(store.dispatch);
