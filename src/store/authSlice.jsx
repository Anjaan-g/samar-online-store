import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        name: "",
        email: "",
        phone: "",
        isAdmin: false,
    },
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
        },

        removeUser: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, removeUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
