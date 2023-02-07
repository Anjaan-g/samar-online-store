import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";


const initialState = {
    accessToken: Cookies.get("access_token"),
    refreshToken: Cookies.get("refresh_token"),
    user: {
        name: "",
        email: "",
        phone: "",
        isAdmin: false,
    },
    expiry: null,
    loading: false,
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action) => {
            console.log(action.payload);
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.user = action.payload.user;

            const data = jwt_decode(action.payload.accessToken);
            console.log(data);

            state.expiry = data.exp;
            localStorage.setItem("accessToken", action.payload.accessToken);
            localStorage.setItem("refreshToken", action.payload.refreshToken);
        },

        removeToken: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.expiry = null;
            state.user = null;
            localStorage.removeItem("accessToken")
            localStorage.removeItem("refreshToken")
        },
    },
});

export const { setToken, removeToken } = authSlice.actions;

export const authReducer = authSlice.reducer;
