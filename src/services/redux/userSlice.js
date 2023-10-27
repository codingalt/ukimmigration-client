import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  user: null,
  isAuthenticated: false,
  applicationType: "",
  captcha: null
};

const payment = {
  
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload.data;
      state.isAuthenticated = true;
    },

    logout: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    },

    setApplicationTypeToSlice: (state, action) => {
      state.applicationType = action.payload;
    },

    setCaptchaToSlice: (state, action) => {
      state.captcha = action.payload;
    },

  },
});

export const { setUserData, logout, setApplicationTypeToSlice, setCaptchaToSlice } =
  userSlice.actions;
export default userSlice.reducer;