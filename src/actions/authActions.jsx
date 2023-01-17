import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: null,
  useName: null,
  userID: null,
}

export const SET_TOKEN = 'SET_TOKEN';

export const setToken = (token) => ({
  type: SET_TOKEN,
  payload: { token },
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state){
      state.isLoggedIn = true
    },
    logout(state) {
      state.isLoggedIn = false
    },
    SET_ACTIVE_USER: (state, action) => {
      console.log(action.payload)
    }
  },
})

export const authActions = authSlice.actions

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectEmail = (state) => state.auth.email
export const selectUserName = (state) => state.auth.userName
export const selectUserId = (state) => state.auth.userID

export default authSlice